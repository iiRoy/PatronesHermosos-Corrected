'use client';

import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import { Trash, Highlighter, Eye } from '@/components/icons';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/components/buttons_inputs/Notification';
import { jwtDecode } from 'jwt-decode';

interface Apoyo {
  id_collaborator: number;
  name: string;
  paternal_name: string;
  maternal_name: string;
  email: string;
  role: string;
  level: string;
  language: string;
  college: string;
  degree: string;
  semester: string;
  gender: string;
  status: string;
  phone_number: string;
  preferred_role: string;
  preferred_language: string;
  preferred_level: string;
  preferred_group: number | null;
  venue: string;
  id_venue: number | null;
}

interface DecodedToken {
  userId: number;
  email: string;
  username: string;
  role: string;
  tokenVersion: number;
}

const GestionApoyo = () => {
  const [inputValue, setInputValue] = useState('');
  const [filterActivaExtra, setFilterActivaExtra] = useState({ role: '__All__' });
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [selectedApoyo, setSelectedApoyo] = useState<Apoyo | null>(null);
  const [apoyoData, setApoyoData] = useState<Apoyo[]>([]);
  const [coordinatorVenueId, setCoordinatorVenueId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiToken, setApiToken] = useState<string | null>(null);
  const router = useRouter();
  const { notify } = useNotification();

  const rowsPerPage = 10;

  // Obtener token y decodificarlo solo en cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('api_token');
      setApiToken(token);
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          if (decoded.role === 'venue_coordinator') {
            setCoordinatorVenueId(decoded.userId);
          } else {
            setError('Este dashboard es solo para coordinadores de sede');
            router.push('/login');
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

  useEffect(() => {
    const fetchApoyo = async () => {
      try {
        if (!apiToken) {
          router.push('/login');
          return;
        }

        const collaboratorsResponse = await fetch('/api/collaborators', {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });

        const collaboratorsData = await collaboratorsResponse.json();

        if (!collaboratorsResponse.ok) {
          if (collaboratorsResponse.status === 403) {
            setError('No tienes permisos para acceder a los colaboradores');
            return;
          }
          throw new Error(
            `Error fetching collaborators: ${collaboratorsResponse.status} - ${
              collaboratorsData.message || 'Unknown error'
            }`,
          );
        }

        const formattedData = collaboratorsData.data
          .filter((collab: any) => {
            const collabVenueId = typeof collab.id_venue === 'number' ? collab.id_venue : null;
            return collabVenueId === coordinatorVenueId;
          })
          .map((collab: any) => ({
            id_collaborator: collab.id_collaborator,
            name: collab.name || 'Sin nombre',
            paternal_name: collab.paternal_name || 'Sin apellido',
            maternal_name: collab.maternal_name || 'Sin apellido',
            email: collab.email || 'Sin correo',
            role: collab.role || 'Sin rol',
            level: collab.level || 'Sin nivel',
            language: collab.language || 'Sin idioma',
            college: collab.college || 'Sin universidad',
            degree: collab.degree || 'Sin carrera',
            semester: collab.semester || 'Sin semestre',
            gender: collab.gender || 'Sin género',
            status: collab.status || 'Sin estado',
            phone_number: collab.phone_number || 'Sin teléfono',
            preferred_role: collab.preferred_role || 'Sin rol preferido',
            preferred_language: collab.preferred_language || 'Sin idioma preferido',
            preferred_level: collab.preferred_level || 'Sin nivel preferido',
            preferred_group: collab.preferred_group || null,
            venue: collab.venue || 'Sin sede',
            id_venue: collab.id_venue,
          }));

        setApoyoData(formattedData);
      } catch (error: any) {
        console.error('Error al obtener colaboradores:', error);
        setError(error.message);
      }
    };
    if (coordinatorVenueId !== null && apiToken) {
      fetchApoyo();
    }
  }, [router, coordinatorVenueId, apiToken]);

  const uniqueRoles = Array.from(new Set(apoyoData.map((apoyo) => apoyo.role))).sort();

  const rolOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueRoles.map((rol) => ({ label: rol, value: rol })),
  ];

  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return apoyoData.filter((apoyo) => {
      const matchesStatus = (apoyo.status || 'Sin estado').toLowerCase() === 'aprobada';
      const fullName = `${apoyo.name} ${apoyo.paternal_name} ${apoyo.maternal_name}`
        .toLowerCase()
        .trim();
      const matchesSearch =
        !searchTerm ||
        fullName.includes(searchTerm) ||
        apoyo.email.toLowerCase().includes(searchTerm);
      const selectedRol = filterActivaExtra['role'];
      const matchesRol = selectedRol === '__All__' ? true : apoyo.role === selectedRol;

      return matchesStatus && matchesSearch && matchesRol;
    });
  }, [inputValue, filterActivaExtra, apoyoData]);

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

  const extraHandleFilterChange = (key: string, value: string) => {
    setFilterActivaExtra((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(0);
  };

  const handleDeleteClick = (apoyo: Apoyo, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedApoyo(apoyo);
    setIsDeletePopupOpen(true);
  };

  const handleInfoClick = (apoyo: Apoyo) => {
    setSelectedApoyo(apoyo);
    setIsInfoPopupOpen(true);
  };

  const handleEditClick = (apoyo: Apoyo, event: React.MouseEvent) => {
    event.stopPropagation();
    router.push(
      `/coordinador/gestion-usuarios-coordinadora/staff/editarApoyo/${apoyo.id_collaborator}`,
    );
  };

  const handleCloseDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setSelectedApoyo(null);
  };

  const handleCloseInfoPopup = () => {
    setIsInfoPopupOpen(false);
    setSelectedApoyo(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedApoyo) {
      handleCloseDeletePopup();
      return;
    }

    try {
      if (!apiToken) {
        notify({
          color: 'red',
          title: 'Error',
          message: 'No se encontró el token, redirigiendo al login',
          duration: 5000,
        });
        router.push('/login');
        return;
      }

      const response = await fetch(`/api/collaborators/${selectedApoyo.id_collaborator}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cancelar la colaboradora');
      }

      setApoyoData((prev) =>
        prev.filter((m) => m.id_collaborator !== selectedApoyo.id_collaborator),
      );

      notify({
        color: 'green',
        title: 'Usuario Eliminado',
        message: `Colaboradora ${selectedApoyo.name} ${selectedApoyo.paternal_name} ${selectedApoyo.maternal_name} eliminada exitosamente`,
        duration: 5000,
      });

      handleCloseDeletePopup();
    } catch (error: any) {
      console.error('Error al cancelar la colaboradora:', error);
      notify({
        color: 'red',
        title: 'Error',
        message: `Error al eliminar a la colaboradora ${selectedApoyo.name} ${selectedApoyo.paternal_name} ${selectedApoyo.maternal_name}`,
        duration: 5000,
      });
    }
  };

  if (error) {
    return <div className='p-6 pl-14 text-red-500'>Error: {error}</div>;
  }

  return (
    <div className='p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes'>
      <PageTitle>Gestión de Apoyo</PageTitle>
      <div className='fondo-sedes flex flex-col p-6 gap-4 overflow-auto'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-1 gap-4'>
            <div className='basis-2/3'>
              <InputField
                label=''
                showDescription={false}
                placeholder='Buscar colaboradora'
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
                showSecciones={false}
                extraFilters={[{ label: 'Roles', key: 'role', options: rolOptions }]}
                filterActiva={filterActivaExtra}
                onExtraFilterChange={extraHandleFilterChange}
              />
            </div>
          </div>
        </div>
        <div className='overflow-x-auto custom-scrollbar-tabla'>
          <table className='min-w-full text-left text-sm'>
            <thead className='text-purple-800 font-bold sticky top-0 bg-[#ebe6eb]'>
              <tr className='texto-primary-shade'>
                <th className='p-2 text-center'></th>
                <th className='p-2 text-center'>Nombre</th>
                <th className='p-2 text-center'>Correo</th>
                <th className='p-2 text-center'>Sede</th>
                <th className='p-2 text-center'>Rol</th>
                <th className='p-2 text-center'></th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {paginatedData.map((apoyo, index) => {
                const fullName =
                  `${apoyo.name} ${apoyo.paternal_name} ${apoyo.maternal_name}`.trim();
                return (
                  <tr
                    key={index}
                    className='border-t border-gray-300 cursor-pointer hover:bg-gray-300'
                    onClick={() => handleInfoClick(apoyo)}
                  >
                    <td className='p-2 text-center'>
                      <Button
                        label=''
                        variant='primary'
                        round
                        showLeftIcon
                        IconLeft={Eye}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInfoClick(apoyo);
                        }}
                      />
                    </td>
                    <td className='p-2 text-center'>{fullName}</td>
                    <td className='p-2 text-center'>{apoyo.email}</td>
                    <td className='p-2 text-center'>{apoyo.venue || 'Sin asignado'}</td>
                    <td className='p-2 text-center'>{apoyo.role}</td>
                    <td className='p-2 flex gap-2 justify-center'>
                      <Button
                        label=''
                        variant='error'
                        round
                        showLeftIcon
                        IconLeft={Trash}
                        onClick={(event: React.MouseEvent) => handleDeleteClick(apoyo, event)}
                      />
                      <Button
                        label=''
                        variant='warning'
                        round
                        showLeftIcon
                        IconLeft={Highlighter}
                        onClick={(event: React.MouseEvent) => handleEditClick(apoyo, event)}
                      />
                    </td>
                  </tr>
                );
              })}
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
        {isDeletePopupOpen && selectedApoyo && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96 text-gray-800'>
              <h2 className='text-3xl font-bold mb-4 text-center'>Confirmar Eliminación</h2>
              <p className='my-12'>
                ¿Segura que quieres eliminar a la {selectedApoyo.role.toLowerCase()}{' '}
                {`${selectedApoyo.name} ${selectedApoyo.paternal_name} ${selectedApoyo.maternal_name}`.trim()}
                ?
              </p>
              <div className='flex justify-center gap-4'>
                <Button label='Eliminar' variant='error' onClick={handleConfirmDelete} />
                <Button label='Cancelar' variant='secondary' onClick={handleCloseDeletePopup} />
              </div>
            </div>
          </div>
        )}
        {isInfoPopupOpen && selectedApoyo && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto text-gray-800 custom-scrollbar-tabla'>
              <h2 className='text-3xl font-bold mb-4 text-center'>Información del Colaborador</h2>
              <div className='space-y-2'>
                <p>
                  <strong>Nombre:</strong> {selectedApoyo.name}
                </p>
                <p>
                  <strong>Apellido Paterno:</strong> {selectedApoyo.paternal_name}
                </p>
                <p>
                  <strong>Apellido Materno:</strong> {selectedApoyo.maternal_name}
                </p>
                <p>
                  <strong>Correo:</strong> {selectedApoyo.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {selectedApoyo.phone_number}
                </p>
                <p>
                  <strong>Universidad:</strong> {selectedApoyo.college}
                </p>
                <p>
                  <strong>Carrera:</strong> {selectedApoyo.degree}
                </p>
                <p>
                  <strong>Semestre:</strong> {selectedApoyo.semester}
                </p>
                <p>
                  <strong>Género:</strong> {selectedApoyo.gender}
                </p>
                <p>
                  <strong>Rol:</strong> {selectedApoyo.role}
                </p>
                <p>
                  <strong>Nivel:</strong> {selectedApoyo.level}
                </p>
                <p>
                  <strong>Idioma:</strong> {selectedApoyo.language}
                </p>
                <p>
                  <strong>Rol preferido:</strong> {selectedApoyo.preferred_role}
                </p>
                <p>
                  <strong>Idioma preferido:</strong> {selectedApoyo.preferred_language}
                </p>
                <p>
                  <strong>Nivel preferido:</strong> {selectedApoyo.preferred_level}
                </p>
                <p>
                  <strong>Grupo preferido:</strong>{' '}
                  {selectedApoyo.preferred_group || 'Sin grupo preferido'}
                </p>
                <p>
                  <strong>Sede:</strong> {selectedApoyo.venue}
                </p>
              </div>
              <div className='flex justify-center mt-6'>
                <Button label='Cerrar' variant='secondary' onClick={handleCloseInfoPopup} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionApoyo;
