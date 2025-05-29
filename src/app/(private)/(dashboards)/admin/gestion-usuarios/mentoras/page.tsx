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

interface Mentora {
  id_mentor: number;
  name: string; // Combinación de name, paternal_name, maternal_name
  email: string;
  phone_number: string;
  venue: string; // Nombre de la sede
  name_only: string; // Campo separado para el popup
  paternal_name: string;
  maternal_name: string;
  number_of_groups: number;
  status: string;
}

const GestionMentoras = () => {
  const [inputValue, setInputValue] = useState('');
  const [section, setSection] = useState('__All__');
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [selectedMentora, setSelectedMentora] = useState<Mentora | null>(null);
  const [mentorasData, setMentorasData] = useState<Mentora[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { notify } = useNotification();

  const rowsPerPage = 5;

  useEffect(() => {
    const fetchMentoras = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
        if (!token) {
          notify({
            color: 'red',
            title: 'Error',
            message: 'No se encontró el token, redirigiendo al login',
            duration: 5000,
          });
          router.push('/login');
          return;
        }

        // Obtener mentoras (con token)
        const mentorsResponse = await fetch('/api/mentors', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const mentorsData = await mentorsResponse.json();

        if (!mentorsResponse.ok) {
          if (mentorsResponse.status === 403) {
            localStorage.removeItem('api_token');
            notify({
              color: 'red',
              title: 'Error',
              message: 'Sesión expirada, redirigiendo al login',
              duration: 5000,
            });
            router.push('/login');
            return;
          }
          throw new Error(`Error fetching mentors: ${mentorsResponse.status} - ${mentorsData.message || 'Unknown error'}`);
        }

        // Formatear los datos para incluir los campos separados
        const formattedData = mentorsData.data.map((mentor: any) => ({
          id_mentor: mentor.id_mentor,
          name: mentor.name,
          email: mentor.email || 'Sin correo',
          phone_number: mentor.phone_number || 'Sin teléfono',
          venue: mentor.venue || 'Sede desconocida',
          name_only: mentor.name || 'Sin nombre',
          paternal_name: mentor.paternal_name || 'Sin apellido paterno',
          maternal_name: mentor.maternal_name || 'Sin apellido materno',
          status: mentor.status,
          number_of_groups: mentor.number_of_groups || 0,
        }));
        setMentorasData(formattedData);
      } catch (error: any) {
        console.error('Error al obtener mentoras:', error);
        setError(error.message);
        notify({
          color: 'red',
          title: 'Error',
          message: `No se pudieron cargar las mentoras: ${error.message}`,
          duration: 5000,
        });
      }
    };
    fetchMentoras();
  }, [router, notify]);

  const uniqueVenues = Array.from(new Set(mentorasData.map(mentora => mentora.venue))).sort();
  const venueOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueVenues.map(venue => ({ label: venue, value: venue })),
  ];

  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return mentorasData.filter(mentora => {
      const matchesSearch =
        !searchTerm ||
        mentora.name.toLowerCase().includes(searchTerm) ||
        mentora.email.toLowerCase().includes(searchTerm) ||
        mentora.phone_number.toLowerCase().includes(searchTerm) ||
        mentora.venue.toLowerCase().includes(searchTerm);
      const matchesVenue = section === '__All__' ? true : mentora.venue === section;
      // Filtrar solo mentoras con status Aprobada
      const matchesStatus = mentora.status === 'Aprobada';
      return matchesSearch && matchesVenue && matchesStatus;
    });
  }, [inputValue, section, mentorasData]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

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

  const handleDeleteClick = (mentora: Mentora) => {
    setSelectedMentora(mentora);
    setIsDeletePopupOpen(true);
  };

  const handleDetailsClick = (mentora: Mentora) => {
    setSelectedMentora(mentora);
    setIsDetailsPopupOpen(true);
  };

  const handleEditClick = (mentora: Mentora) => {
    router.push(`/admin/gestion-usuarios/mentoras/editarMentora/${mentora.id_mentor}`);
  };

  const handleCloseDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setSelectedMentora(null);
  };

  const handleCloseDetailsPopup = () => {
    setIsDetailsPopupOpen(false);
    setSelectedMentora(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedMentora) {
      handleCloseDeletePopup();
      return;
    }

    try {
      const token = localStorage.getItem('api_token');
      if (!token) {
        notify({
          color: 'red',
          title: 'Error',
          message: 'No se encontró el token, redirigiendo al login',
          duration: 5000,
        });
        router.push('/login');
        return;
      }

      const response = await fetch(`/api/mentors/${selectedMentora.id_mentor}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cancelar la mentora');
      }

      // Remover la mentora de la lista (ya que cambia a Cancelada y no cumple el filtro)
      setMentorasData(prev => prev.filter(m => m.id_mentor !== selectedMentora.id_mentor));

      notify({
        color: 'green',
        title: 'Éxito',
        message: `Mentora ${selectedMentora.name} cancelada exitosamente`,
        duration: 5000,
      });

      handleCloseDeletePopup();
    } catch (error: any) {
      console.error('Error al cancelar la mentora:', error);
      notify({
        color: 'red',
        title: 'Error',
        message: `No se pudo cancelar la mentora ${selectedMentora.name}: ${error.message}`,
        duration: 5000,
      });
    }
  };

  if (error) {
    return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
      <PageTitle>Gestión de Mentoras</PageTitle>

      <div className="fondo-sedes flex flex-col p-6 gap-4 overflow-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-1 gap-4">
            <div className="basis-2/3">
              <InputField
                label=""
                showDescription={false}
                placeholder="Search"
                showError={false}
                variant="primary"
                icon="MagnifyingGlass"
                value={inputValue}
                onChangeText={(val) => setInputValue(val)}
              />
            </div>

            <div className="basis-1/3">
              <FiltroEvento
                disableCheckboxes
                label="Filtrar por sede"
                showSecciones
                labelSecciones="Sedes"
                secciones={venueOptions}
                seccionActiva={section}
                onChangeSeccion={sectionFilterChange}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar-tabla">
          <table className="min-w-full text-left text-sm">
            <thead className="text-purple-800 font-bold sticky top-0 bg-[#ebe6eb]">
              <tr className='texto-primary-shade'>
                <th className="p-2 text-center">Nombre</th>
                <th className="p-2 text-center">Correo</th>
                <th className="p-2 text-center">Teléfono</th>
                <th className="p-2 text-center">Sede</th>
                <th className="p-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {paginatedData.map((mentora, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-300 cursor-pointer hover:bg-gray-300"
                  onClick={() => handleDetailsClick(mentora)}
                >
                  <td className="p-2 text-center">{mentora.name}</td>
                  <td className="p-2 text-center">{mentora.email}</td>
                  <td className="p-2 text-center">{mentora.phone_number}</td>
                  <td className="p-2 text-center">{mentora.venue}</td>
                  <td className="p-2 flex gap-2 justify-center">
                    <Button
                      label=""
                      variant="error"
                      round
                      showLeftIcon
                      IconLeft={Trash}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(mentora);
                      }}
                    />
                    <Button
                      label=""
                      variant="warning"
                      round
                      showLeftIcon
                      IconLeft={Highlighter}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(mentora);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-auto pt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            variant="primary"
            pageLinks={Array(totalPages).fill('#')}
          />
        </div>

        {/* Popup de eliminación */}
        {isDeletePopupOpen && selectedMentora && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-gray-800">
              <h2 className="text-3xl font-bold mb-4 text-center">Confirmar Cancelación</h2>
              <p className="my-12">¿Estás seguro de que quieres cancelar a la mentora {selectedMentora.name}?</p>
              <div className="flex justify-center gap-4">
                <Button label="Cancelar Mentora" variant="error" onClick={handleConfirmDelete} />
                <Button label="Cerrar" variant="secondary" onClick={handleCloseDeletePopup} />
              </div>
            </div>
          </div>
        )}

        {/* Popup de detalles */}
        {isDetailsPopupOpen && selectedMentora && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative max-h-[80vh] overflow-y-auto text-gray-800">
              <h2 className="text-3xl font-bold mb-4 text-center">Detalles de la Mentora</h2>
              <div className="pt-6 pb-6">
                <p><strong>Nombre:</strong> {selectedMentora.name_only}</p>
                <p><strong>Apellido Paterno:</strong> {selectedMentora.paternal_name}</p>
                <p><strong>Apellido Materno:</strong> {selectedMentora.maternal_name}</p>
                <p><strong>Correo:</strong> {selectedMentora.email}</p>
                <p><strong>Teléfono:</strong> {selectedMentora.phone_number}</p>
                <p><strong>Sede:</strong> {selectedMentora.venue}</p>
                <p><strong>Status:</strong> {selectedMentora.status}</p>
                <p><strong>Número de Grupos:</strong> {selectedMentora.number_of_groups}</p>
              </div>
              <div className="mt-4 flex justify-center">
                <Button label="Cerrar" variant="primary" onClick={handleCloseDetailsPopup} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionMentoras;