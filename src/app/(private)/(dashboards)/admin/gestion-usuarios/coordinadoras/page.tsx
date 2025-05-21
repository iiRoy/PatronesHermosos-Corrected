'use client';

import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import { Trash, Highlighter } from '@/components/icons';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Coordinadora {
  id_venue_coord: number;
  nombre: string; // Combinación de name, paternal_name, maternal_name
  email: string;
  phone_number: string;
  venue: string; // Nombre de la sede
}

interface Venue {
  id_venue: number;
  name: string;
  // Otros campos de venues si son necesarios
}

const GestionCoordinadoras = () => {
  const [inputValue, setInputValue] = useState('');
  const [section, setSection] = useState('__All__');
  const [currentPage, setCurrentPage] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCoordinadora, setSelectedCoordinadora] = useState<Coordinadora | null>(null);
  const [coordinadorasData, setCoordinadorasData] = useState<Coordinadora[]>([]);
  const [venuesMap, setVenuesMap] = useState<Map<number, string>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const rowsPerPage = 5;

  useEffect(() => {
    const fetchCoordinadoras = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
        console.log('Token:', token);
        if (!token) {
          console.log('No token found, redirecting to login');
          router.push('/login');
          return;
        }

        // Obtener coordinadoras (con token)
        const coordResponse = await fetch('/api/venue-coordinators/specific', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Coordinator response status:', coordResponse.status);

        // Leer el cuerpo de la respuesta una sola vez
        const coordData = await coordResponse.json();
        console.log('Coordinator response body:', coordData);

        if (!coordResponse.ok) {
          console.log('Coordinator error data:', coordData);
          if (coordResponse.status === 403) {
            setError('No tienes permisos para acceder a los coordinadores');
            return;
          }
          throw new Error(`Error fetching coordinators: ${coordResponse.status} - ${coordData.message || 'Unknown error'}`);
        }

        console.log('Coordinator data:', coordData);

        // Obtener sedes (con token)
        const venuesResponse = await fetch('/api/venues', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Venues response status:', venuesResponse.status);

        // Leer el cuerpo de la respuesta una sola vez
        const venuesDataResponse = await venuesResponse.json();
        console.log('Venues response body:', venuesDataResponse);

        if (!venuesResponse.ok) {
          console.log('Venues error data:', venuesDataResponse);
          if (venuesResponse.status === 403) {
            setError('No tienes permisos para acceder a las sedes');
            return;
          }
          throw new Error(`Error fetching venues: ${venuesResponse.status} - ${venuesDataResponse.message || 'Unknown error'}`);
        }

        const venuesData = venuesDataResponse as Venue[];
        console.log('Venues data:', venuesData);
        const venuesMapData = new Map<number, string>(
          venuesData.map((venue: Venue) => [venue.id_venue, venue.name || 'Sin nombre'] as const)
        );
        setVenuesMap(venuesMapData);

        const formattedData = coordData.data.map((coordinator: any) => ({
          id_venue_coord: coordinator.id_venue_coord,
          nombre: `${coordinator.name} ${coordinator.paternal_name || ''} ${coordinator.maternal_name || ''}`.trim(),
          email: coordinator.email || 'Sin correo',
          phone_number: coordinator.phone_number || 'Sin teléfono',
          venue: venuesMapData.get(coordinator.id_venue) || 'Sede desconocida',
        }));
        setCoordinadorasData(formattedData);
      } catch (error: any) {
        console.error('Error al obtener coordinadoras:', error);
        setError(error.message);
      }
    };
    fetchCoordinadoras();
  }, [router]);

  const uniqueVenues = Array.from(new Set(coordinadorasData.map(coordinadora => coordinadora.venue))).sort();
  const venueOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueVenues.map(venue => ({ label: venue, value: venue })),
  ];

  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return coordinadorasData.filter(coordinadora => {
      const matchesSearch =
        !searchTerm ||
        coordinadora.nombre.toLowerCase().includes(searchTerm) ||
        coordinadora.email.toLowerCase().includes(searchTerm) ||
        coordinadora.phone_number.toLowerCase().includes(searchTerm) ||
        coordinadora.venue.toLowerCase().includes(searchTerm);
      const matchesVenue = section === '__All__' ? true : coordinadora.venue === section;
      return matchesSearch && matchesVenue;
    });
  }, [inputValue, section, coordinadorasData]);

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

  const handleDeleteClick = (coordinadora: Coordinadora) => {
    setSelectedCoordinadora(coordinadora);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCoordinadora(null);
  };

  const handleConfirmDelete = () => {
    if (selectedCoordinadora) {
      alert(`Eliminando a ${selectedCoordinadora.nombre}`); // Placeholder para la lógica real de eliminación
      handleClosePopup();
    }
  };

  if (error) {
    return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
      <PageTitle>Coordinadoras de Sede</PageTitle>

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
                label="Filtros"
                showSecciones
                labelSecciones="Sedes"
                secciones={venueOptions}
                seccionActiva={section}
                onChangeSeccion={sectionFilterChange}
              />
            </div>
          </div>
        </div>

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
              {paginatedData.map((coordinadora, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="p-2 text-center">{coordinadora.nombre}</td>
                  <td className="p-2 text-center">{coordinadora.email}</td>
                  <td className="p-2 text-center">{coordinadora.phone_number}</td>
                  <td className="p-2 text-center">{coordinadora.venue}</td>
                  <td className="p-2 flex gap-2 justify-center">
                    <Button label='' variant="error" round showLeftIcon IconLeft={Trash} onClick={() => handleDeleteClick(coordinadora)} />
                    <Button label='' variant="warning" round showLeftIcon IconLeft={Highlighter} />
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

        {isPopupOpen && selectedCoordinadora && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-3xl font-bold mb-4 text-center">Confirmar Eliminación</h2>
              <p className="my-12">¿Estás seguro de que quieres eliminar a la coordinadora {selectedCoordinadora.nombre}?</p>
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

export default GestionCoordinadoras;