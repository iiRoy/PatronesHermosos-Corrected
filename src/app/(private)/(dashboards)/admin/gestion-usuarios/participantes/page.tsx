'use client';

import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import { Trash, Highlighter, Eye } from '@/components/icons';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/components/buttons_inputs/Notification';

interface Participante {
  id: number;
  name: string;
  paternal_name: string;
  maternal_name: string;
  nombre: string; // Computed full name
  sede: string;
  grupo: string;
  correo: string;
  status: string;
  tutors?: {
    phone_number: string;
  };
  groups?: {
    name: string;
    venues?: {
      name: string;
    };
  };
}

const GestionParticipantes = () => {
  const [inputValue, setInputValue] = useState('');
  const [section, setSection] = useState('__All__');
  const [filterActivaExtra, setFilterActivaExtra] = useState({ grupo: '__All__' });
  const [currentPage, setCurrentPage] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [selectedParticipante, setSelectedParticipante] = useState<Participante | null>(null);
  const [participantesData, setParticipantesData] = useState<Participante[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [apiToken, setApiToken] = useState<string | null>(null);
  const router = useRouter();
  const { notify } = useNotification();

  const rowsPerPage = 10;

  // Obtener token solo en cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setApiToken(localStorage.getItem('api_token'));
    }
  }, []);

  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
        if (!apiToken) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/participants', {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 403) {
            if (typeof window !== 'undefined') localStorage.removeItem('api_token');
            router.push('/login');
            return;
          }
          throw new Error(
            `Error fetching participants: ${response.status} - ${
              errorData.message || 'Unknown error'
            }`,
          );
        }

        const data = await response.json();
        setParticipantesData(data.data);
      } catch (error: any) {
        console.error('Error al obtener participantes:', error);
        setError(error.message);
      }
    };
    if (apiToken) fetchParticipantes();
  }, [router, apiToken]);

  const extraHandleFilterChange = (key: string, value: string) => {
    setFilterActivaExtra((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(0);
  };

  const uniqueSedes = Array.from(
    new Set(participantesData.map((participante) => participante.sede || 'No asignado')),
  )
    .filter((sede) => sede !== 'No asignado')
    .sort();

  const uniqueGrupos = Array.from(
    new Set(participantesData.map((participante) => participante.grupo || 'No asignado')),
  )
    .filter((grupo) => grupo !== 'No asignado')
    .sort();

  const sedeOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueSedes.map((sede) => ({ label: sede, value: sede })),
  ];

  const grupoOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueGrupos.map((grupo) => ({ label: grupo, value: grupo })),
  ];

  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return participantesData.filter((participante) => {
      const matchesSearch = !searchTerm || participante.nombre.toLowerCase().includes(searchTerm);
      const sede = participante.sede || 'No asignado';
      const grupo = participante.grupo || 'No asignado';
      const matchesSede = section === '__All__' ? true : sede === section;
      const selectedGrupo = filterActivaExtra['grupo'];
      const matchesGrupo = selectedGrupo === '__All__' ? true : grupo === selectedGrupo;
      const isNotCancelled = participante.status?.toLowerCase() !== 'cancelada';
      const isApproved = participante.status?.toLowerCase() === 'aprobada';
      return matchesSearch && matchesSede && matchesGrupo && isNotCancelled && isApproved;
    });
  }, [inputValue, section, filterActivaExtra, participantesData]);

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

  const handleDeleteClick = (participante: Participante) => {
    setSelectedParticipante(participante);
    setIsPopupOpen(true);
  };

  const handleEditClick = (participante: Participante) => {
    router.push(`/admin/gestion-usuarios/participantes/editarParticipante/${participante.id}`);
  };

  const handleDetailsClick = async (participante: Participante) => {
    setSelectedParticipante(participante);
    setIsDetailsPopupOpen(true);

    // Clean up previous PDF URL
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }

    // Fetch PDF
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

      const response = await fetch(`/api/participants/${participante.id}/pdf`, {
        headers: { Authorization: `Bearer ${apiToken}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        notify({
          color: 'red',
          title: 'Error',
          message: `No se pudo cargar el PDF: ${errorData.message || 'Error desconocido'}`,
          duration: 5000,
        });
        setPdfUrl(null);
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error: any) {
      console.error('Error fetching participant PDF:', error);
      notify({
        color: 'red',
        title: 'Error',
        message: `No se pudo cargar el PDF: ${error.message}`,
        duration: 5000,
      });
      setPdfUrl(null);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedParticipante(null);
  };

  const handleCloseDetailsPopup = () => {
    setIsDetailsPopupOpen(false);
    setSelectedParticipante(null);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl); // Clean up object URL
      setPdfUrl(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedParticipante) {
      try {
        if (!apiToken) {
          router.push('/login');
          return;
        }

        const response = await fetch(`/api/participants/${selectedParticipante.id}/reject`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error rejecting participant: ${errorData.message || 'Unknown error'}`);
        }

        setParticipantesData((prev) => prev.filter((p) => p.id !== selectedParticipante.id));

        notify({
          color: 'green',
          title: 'Usuario Eliminado',
          message: `El usuario ${selectedParticipante.nombre} ha sido eliminado correctamente`,
          duration: 5000,
        });

        handleClosePopup();
      } catch (error: any) {
        console.error('Error al rechazar participante:', error);
        notify({
          color: 'red',
          title: 'Error',
          message: `No se pudo rechazar al usuario ${selectedParticipante.nombre}: ${error.message}`,
          duration: 5000,
        });
        handleClosePopup();
      }
    }
  };

  const handleRowClick = (
    participante: Participante,
    event: React.MouseEvent<HTMLTableRowElement>,
  ) => {
    const isButtonClick = (event.target as HTMLElement).closest('button');
    if (!isButtonClick) {
      handleDetailsClick(participante);
    }
  };

  if (error) {
    return <div className='p-6 pl-14 text-red-500'>Error: {error}</div>;
  }

  return (
    <div className='p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes'>
      <PageTitle>Gestión de Participantes</PageTitle>

      <div className='fondo-sedes flex flex-col p-6 gap-4 overflow-auto'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-1 gap-4'>
            <div className='basis-2/3'>
              <InputField
                label=''
                showDescription={false}
                placeholder='Buscar participante'
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
                showSecciones
                labelSecciones='Sedes'
                secciones={sedeOptions}
                seccionActiva={section}
                onChangeSeccion={sectionFilterChange}
                extraFilters={[
                  {
                    label: 'Grupos',
                    key: 'grupo',
                    options: grupoOptions,
                  },
                ]}
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
                <th className='p-2 text-center'>Sede</th>
                <th className='p-2 text-center'>Grupo</th>
                <th className='p-2 text-center'>Correo</th>
                <th className='p-2 text-center'>Acciones</th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {paginatedData.map((participante, index) => (
                <tr
                  key={index}
                  className='border-t border-gray-300 hover:bg-gray-300 cursor-pointer'
                  onClick={(event) => handleRowClick(participante, event)}
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
                        handleDetailsClick(participante);
                      }}
                    />
                  </td>
                  <td className='p-2 text-center'>{participante.nombre}</td>
                  <td className='p-2 text-center'>{participante.sede || 'No asignado'}</td>
                  <td className='p-2 text-center'>{participante.grupo || 'No asignado'}</td>
                  <td className='p-2 text-center'>{participante.correo}</td>
                  <td className='p-2 flex gap-2 justify-center'>
                    <Button
                      label=''
                      variant='error'
                      round
                      showLeftIcon
                      IconLeft={Trash}
                      onClick={() => handleDeleteClick(participante)}
                    />
                    <Button
                      label=''
                      variant='warning'
                      round
                      showLeftIcon
                      IconLeft={Highlighter}
                      onClick={() => handleEditClick(participante)}
                    />
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

        {isPopupOpen && selectedParticipante && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96 text-gray-800'>
              <h2 className='text-3xl font-bold mb-4 text-center'>Confirmar Eliminación</h2>
              <p className='mt-12 mb-12'>
                ¿Estás segura de que quieres eliminar a la participante{' '}
                {selectedParticipante.nombre}?
              </p>
              <div className='flex justify-center gap-4'>
                <Button label='Eliminar' variant='error' onClick={handleConfirmDelete} />
                <Button label='Cerrar' variant='secondary' onClick={handleClosePopup} />
              </div>
            </div>
          </div>
        )}

        {isDetailsPopupOpen && selectedParticipante && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-200'>
            <div className='texto-popup bg-white p-6 rounded-lg shadow-lg-3 w-[1000px] relative max-h-[80vh] overflow-y-auto text-gray-800 custom-scrollbar-tabla'>
              <h2 className='text-3xl font-title font-bold mb-4 text-center'>
                Detalles del Participante
              </h2>
              <div className='pt-6 pb-6'>
                <p>
                  <strong>Nombre Completo:</strong>{' '}
                  {`${selectedParticipante.name} ${selectedParticipante.paternal_name || ''} ${
                    selectedParticipante.maternal_name || ''
                  }`.trim()}
                </p>
                <p>
                  <strong>Correo:</strong> {selectedParticipante.correo}
                </p>
                <p>
                  <strong>Teléfono del Tutor:</strong>{' '}
                  {selectedParticipante.tutors?.phone_number || 'No asignado'}
                </p>
                <p>
                  <strong>Grupo:</strong> {selectedParticipante.groups?.name || 'No asignado'}
                </p>
                <p>
                  <strong>Sede:</strong>{' '}
                  {selectedParticipante.groups?.venues?.name || 'No asignado'}
                </p>
                <p>
                  <strong>Estado:</strong> {selectedParticipante.status}
                </p>
                {pdfUrl ? (
                  <div className='mt-4'>
                    <p>
                      <strong>Carta de Selección:</strong>
                    </p>
                    <iframe
                      src={pdfUrl}
                      className='w-full h-[500px] border rounded-lg'
                      title='Participation File'
                    />
                  </div>
                ) : (
                  <p className='mt-4 text-red-600'>
                    <strong>Carta de Selección:</strong> No disponible
                  </p>
                )}
              </div>
              <div className='mt-4 flex justify-center'>
                <Button label='Cerrar' variant='primary' onClick={handleCloseDetailsPopup} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionParticipantes;
