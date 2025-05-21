'use client';

import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import { Trash, Highlighter } from '@/components/icons';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Definir el tipo Mentora
interface Mentora {
  id_mentor: number;
  name: string; // Nombre completo (name + paternal_name + maternal_name)
  email: string;
  phone_number: string;
  venue: string; // Nombre de la sede
}

const GestionMentoras = () => {
  const [inputValue, setInputValue] = useState('');
  const [section, setSection] = useState('__All__'); // Inicializar con "Todas"
  const [currentPage, setCurrentPage] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para controlar el popup
  const [selectedMentora, setSelectedMentora] = useState<Mentora | null>(null); // Mentora seleccionada para eliminar
  const [mentorasData, setMentorasData] = useState<Mentora[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const rowsPerPage = 5;

  useEffect(() => {
    const fetchMentoras = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
        console.log('Token:', token);
        if (!token) {
          console.log('No token found, redirecting to login');
          router.push('/login');
          return;
        }

        // Obtener mentoras (con token)
        const mentorsResponse = await fetch('/api/mentors', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Mentors response status:', mentorsResponse.status);

        const mentorsData = await mentorsResponse.json();
        console.log('Mentors response body:', mentorsData);

        if (!mentorsResponse.ok) {
          console.log('Mentors error data:', mentorsData);
          if (mentorsResponse.status === 403) {
            setError('No tienes permisos para acceder a las mentoras');
            return;
          }
          throw new Error(`Error fetching mentors: ${mentorsResponse.status} - ${mentorsData.message || 'Unknown error'}`);
        }

        setMentorasData(mentorsData.data);
      } catch (error: any) {
        console.error('Error al obtener mentoras:', error);
        setError(error.message);
      }
    };
    fetchMentoras();
  }, [router]);

  // Obtener sedes únicas y convertirlas en opciones para FiltroEvento
  const uniqueSedes = Array.from(new Set(mentorasData.map(mentora => mentora.venue))).sort();
  const sedeOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueSedes.map(sede => ({ label: sede, value: sede })),
  ];

  // Filtrar los datos según el valor de búsqueda y la sede seleccionada
  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return mentorasData.filter(mentora => {
      // Filtro por nombre, correo o teléfono
      const matchesSearch =
        !searchTerm ||
        mentora.name.toLowerCase().includes(searchTerm) ||
        mentora.email.toLowerCase().includes(searchTerm) ||
        mentora.phone_number.toLowerCase().includes(searchTerm) ||
        mentora.venue.toLowerCase().includes(searchTerm);

      // Filtro por sede
      const matchesSede = section === '__All__' ? true : mentora.venue === section;

      return matchesSearch && matchesSede;
    });
  }, [inputValue, section, mentorasData]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  // Añadimos un useEffect para reiniciar currentPage cuando filteredData cambie
  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    } else if (totalPages === 0) {
      setCurrentPage(0);
    }
  }, [filteredData.length, currentPage, totalPages]);

  const sectionFilterChange = (value: string) => {
    setSection(value);
    setInputValue(''); // Resetear búsqueda al cambiar de sección
    setCurrentPage(0); // Resetear página al cambiar de filtro
  };

  // Función para abrir el popup de confirmación
  const handleDeleteClick = (mentora: Mentora) => {
    setSelectedMentora(mentora);
    setIsPopupOpen(true);
  };

  // Función para cerrar el popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedMentora(null);
  };

  // Función para confirmar la eliminación
  const handleConfirmDelete = () => {
    if (selectedMentora) {
      alert(`Eliminando a ${selectedMentora.name}`); // Placeholder para la lógica real de eliminación
      handleClosePopup();
    }
  };

  if (error) {
    return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
      <PageTitle>Gestión de Mentoras</PageTitle>

      <div className="fondo-sedes flex flex-col p-6 gap-4 overflow-auto">
        {/* Fila de búsqueda, filtro y botón */}
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
                secciones={sedeOptions}
                seccionActiva={section}
                onChangeSeccion={sectionFilterChange}
              />
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-purple-800 font-bold">
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
                <tr key={index} className="border-t border-gray-300">
                  <td className="p-2 text-center">{mentora.name}</td>
                  <td className="p-2 text-center">{mentora.email}</td>
                  <td className="p-2 text-center">{mentora.phone_number}</td>
                  <td className="p-2 text-center">{mentora.venue}</td>
                  <td className="p-2 flex gap-2 justify-center">
                    <Button label='' variant="error" round showLeftIcon IconLeft={Trash} onClick={() => handleDeleteClick(mentora)} />
                    <Button label='' variant="warning" round showLeftIcon IconLeft={Highlighter} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="mt-auto pt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            variant="primary"
            pageLinks={Array(totalPages).fill('#')}
          />
        </div>

        {/* Popup de confirmación */}
        {isPopupOpen && selectedMentora && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-3xl font-bold mb-4 text-center">Confirmar Eliminación</h2>
              <p className="my-12">¿Estás seguro de que quieres eliminar a la mentora {selectedMentora.name}?</p>
              <div className="flex justify-center gap-4">
                <Button label="Eliminar" variant="error" onClick={handleConfirmDelete} />
                <Button label="Cancelar" variant="secondary" onClick={handleClosePopup} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionMentoras;