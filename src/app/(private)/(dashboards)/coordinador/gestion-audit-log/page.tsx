'use client';

import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import { MagnifyingGlass } from '@/components/icons';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useNotification } from '@/components/buttons_inputs/Notification';

interface AuditLog {
  id: number;
  action: string;
  table_name: string;
  venue_name: string;
  username: string;
  message: string;
  created_at: string;
  id_venue: number | null;
}

interface DecodedToken {
  userId: number;
  email: string;
  username: string;
  role: string;
  tokenVersion: number;
  id_venue: number;
}

const GestionAuditLogsCoordinadora = () => {
  const [inputValue, setInputValue] = useState('');
  const [section, setSection] = useState('__All__'); // Sede
  const [filterActivaExtra, setFilterActivaExtra] = useState({
    action: '__All__',
    username: '__All__',
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [auditLogsData, setAuditLogsData] = useState<AuditLog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [coordinatorVenueId, setCoordinatorVenueId] = useState<number | null>(null);
  const [coordinatorUsername, setCoordinatorUsername] = useState<string | null>(null);
  const [apiToken, setApiToken] = useState<string | null>(null);
  const router = useRouter();
  const { notify } = useNotification();

  const rowsPerPage = 10;

  // Obtener token solo en cliente y decodificarlo
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('api_token');
      setApiToken(token);
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          if (decoded.role !== 'venue_coordinator') {
            setError('Este dashboard es solo para coordinadores de sede');
            router.push('/login');
          } else {
            setCoordinatorVenueId(decoded.id_venue);
            setCoordinatorUsername(decoded.username);
          }
        } catch (err) {
          console.error('Error al decodificar el token:', err);
          setError('Token inválido');
          router.push('/login');
        }
      } else {
        setError('No se encontró el token, por favor inicia sesión');
        router.push('/login');
      }
    }
  }, [router]);

  // Obtener registros de audit_log
  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        if (!apiToken) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/audit-logs', {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 403) {
            setError('No tienes permisos para acceder a los registros de auditoría');
            if (typeof window !== 'undefined') localStorage.removeItem('api_token');
            router.push('/login');
            return;
          }
          throw new Error(
            `Error fetching audit logs: ${response.status} - ${
              errorData.message || 'Unknown error'
            }`,
          );
        }

        const data = await response.json();
        setAuditLogsData(data.data);
      } catch (error: any) {
        console.error('Error al obtener registros de auditoría:', error);
        setError(error.message);
      }
    };

    if (coordinatorVenueId !== null && coordinatorUsername !== null && apiToken) {
      fetchAuditLogs();
    }
  }, [router, coordinatorVenueId, coordinatorUsername, apiToken]);

  // Obtener opciones para filtros
  const uniqueActions = Array.from(new Set(auditLogsData.map((log) => log.action))).sort();
  const uniqueUsers = Array.from(new Set(auditLogsData.map((log) => log.username))).sort();

  const actionOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueActions.map((action) => ({ label: action, value: action })),
  ];

  const userOptions = [
    { label: 'Todos', value: '__All__' },
    ...uniqueUsers.map((user) => ({ label: user, value: user })),
  ];

  // Filtrar datos
  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return auditLogsData.filter((log) => {
      const matchesSearch =
        !searchTerm ||
        log.username.toLowerCase().includes(searchTerm) ||
        log.message.toLowerCase().includes(searchTerm);
      const matchesVenueFilter = section === '__All__' ? true : log.venue_name === section;
      const matchesAction =
        filterActivaExtra.action === '__All__' ? true : log.action === filterActivaExtra.action;
      const matchesUser =
        filterActivaExtra.username === '__All__'
          ? true
          : log.username === filterActivaExtra.username;
      return matchesSearch && matchesVenueFilter && matchesAction && matchesUser;
    });
  }, [inputValue, section, filterActivaExtra, auditLogsData]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage,
  );

  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    } else if (totalPages === 0) {
      setCurrentPage(0);
    }
  }, [filteredData.length, currentPage, totalPages]);

  const sectionFilterChange = (value: string) => {
    setSection(value);
    setInputValue('');
    setCurrentPage(0);
  };

  const extraHandleFilterChange = (key: string, value: string) => {
    setFilterActivaExtra((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(0);
  };

  const handleRowClick = (log: AuditLog) => {
    setSelectedLog(log);
    setIsDetailsPopupOpen(true);
  };

  if (error) {
    return <div className='p-6 pl-14 text-red-500'>Error: {error}</div>;
  }

  return (
    <div className='p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes'>
      <PageTitle>Gestión de Registros de Auditoría</PageTitle>

      <div className='fondo-sedes flex flex-col p-6 gap-4 overflow-auto'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-1 gap-4'>
            <div className='basis-2/3'>
              <InputField
                label=''
                showDescription={false}
                placeholder='Buscar por usuario o mensaje'
                showError={false}
                variant='primary'
                icon='MagnifyingGlass'
                value={inputValue}
                onChangeText={(val) => setInputValue(val)}
              />
            </div>

            <div className='basis-1/3'>
              <FiltroEvento
                disableCheckboxes
                label='Filtros'
                extraFilters={[
                  { key: 'action', label: 'Acción', options: actionOptions },
                  { key: 'username', label: 'Usuario', options: userOptions },
                ]}
                filterActiva={filterActivaExtra}
                onExtraFilterChange={extraHandleFilterChange}
              />
            </div>
          </div>
        </div>

        <div className='overflow-x-auto custom-scrollbar-tabla'>
          <table className='min-w-full text-left text-sm'>
            <thead className='text-purple-800 font-bold'>
              <tr className='texto-primary-shade'>
                <th className='p-2 text-center'>ID</th>
                <th className='p-2 text-center'>Acción</th>
                <th className='p-2 text-center'>Tabla</th>
                <th className='p-2 text-center'>Sede</th>
                <th className='p-2 text-center'>Usuario</th>
                <th className='p-2 text-center'>Mensaje</th>
                <th className='p-2 text-center'>Fecha</th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {paginatedData.map((log, index) => (
                <tr
                  key={index}
                  className='border-t border-gray-300 hover:bg-gray-300 cursor-pointer'
                  onClick={() => handleRowClick(log)}
                >
                  <td className='p-2 text-center'>{log.id}</td>
                  <td className='p-2 text-center'>{log.action}</td>
                  <td className='p-2 text-center'>{log.table_name}</td>
                  <td className='p-2 text-center'>{log.venue_name || 'No especificada'}</td>
                  <td className='p-2 text-center'>{log.username}</td>
                  <td className='p-2 text-center truncate max-w-xs' title={log.message}>
                    {log.message}
                  </td>
                  <td className='p-2 text-center'>
                    {new Date(log.created_at).toLocaleString('es-MX', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='mt-auto pt-4 flex justify-center'>
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            variant='primary'
            pageLinks={Array(totalPages).fill('#')}
          />
        </div>

        {isDetailsPopupOpen && selectedLog && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto text-gray-800'>
              <h2 className='text-3xl font-bold mb-4 text-center'>
                Detalles del Registro de Auditoría
              </h2>
              <div className='pt-6 pb-6'>
                <p>
                  <strong>ID:</strong> {selectedLog.id}
                </p>
                <p>
                  <strong>Acción:</strong> {selectedLog.action}
                </p>
                <p>
                  <strong>Tabla:</strong> {selectedLog.table_name}
                </p>
                <p>
                  <strong>Sede:</strong> {selectedLog.venue_name || 'No especificada'}
                </p>
                <p>
                  <strong>Usuario:</strong> {selectedLog.username}
                </p>
                <p>
                  <strong>Mensaje:</strong> {selectedLog.message}
                </p>
                <p>
                  <strong>Fecha:</strong>{' '}
                  {new Date(selectedLog.created_at).toLocaleString('es-MX', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
              <div className='mt-4 flex justify-center'>
                <Button
                  label='Cerrar'
                  variant='primary'
                  onClick={() => setIsDetailsPopupOpen(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionAuditLogsCoordinadora;
