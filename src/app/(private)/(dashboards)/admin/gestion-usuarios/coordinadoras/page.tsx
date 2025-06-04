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

interface Coordinadora {
  id_venue_coord: number;
  nombre: string;
  email: string;
  phone_number: string;
  venue: string;
  name: string;
  paternal_name: string;
  maternal_name: string;
  status: string;
}

interface Venue {
  id_venue: number;
  name: string;
}

const GestionCoordinadoras = () => {
  const [inputValue, setInputValue] = useState('');
  const [section, setSection] = useState('__All__');
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [selectedCoordinadora, setSelectedCoordinadora] = useState<Coordinadora | null>(null);
  const [coordinadorasData, setCoordinadorasData] = useState<Coordinadora[]>([]);
  const [venuesMap, setVenuesMap] = useState<Map<number, string>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const [newCoordinatorData, setNewCoordinatorData] = useState({
    name: '',
    paternal_name: '',
    maternal_name: '',
    email: '',
    phone_number: '',
    gender: '',
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { notify } = useNotification();

  const rowsPerPage = 5;

  useEffect(() => {
    const fetchCoordinadoras = async () => {
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

        const coordResponse = await fetch('/api/venue-coordinators/specific', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const coordData = await coordResponse.json();

        if (!coordResponse.ok) {
          if (coordResponse.status === 403) {
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
          throw new Error(`Error fetching coordinators: ${coordResponse.status} - ${coordData.message || 'Unknown error'}`);
        }

        const venuesResponse = await fetch('/api/venues', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const venuesDataResponse = await venuesResponse.json();

        if (!venuesResponse.ok) {
          if (venuesResponse.status === 403) {
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
          throw new Error(`Error fetching venues: ${venuesResponse.status} - ${venuesDataResponse.message || 'Unknown error'}`);
        }

        const venuesData = venuesDataResponse as Venue[];
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
          name: coordinator.name || 'Sin nombre',
          paternal_name: coordinator.paternal_name || 'Sin apellido paterno',
          maternal_name: coordinator.maternal_name || 'Sin apellido materno',
          status: coordinator.status || 'Pendiente',
        }));
        setCoordinadorasData(formattedData);
      } catch (error: any) {
        console.error('Error al obtener coordinadoras:', error);
        setError(error.message);
        notify({
          color: 'red',
          title: 'Error',
          message: `No se pudieron cargar las coordinadoras: ${error.message}`,
          duration: 5000,
        });
      }
    };
    fetchCoordinadoras();
  }, [router, notify]);

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
      const matchesStatus = coordinadora.status === 'Aprobada';
      return matchesSearch && matchesVenue && matchesStatus;
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
    setIsDeletePopupOpen(true);
    setNewCoordinatorData({
      name: '',
      paternal_name: '',
      maternal_name: '',
      email: '',
      phone_number: '',
      gender: '',
      username: '',
      password: '',
    });
    setFormErrors({});
  };

  const handleDetailsClick = (coordinadora: Coordinadora) => {
    setSelectedCoordinadora(coordinadora);
    setIsDetailsPopupOpen(true);
  };

  const handleEditClick = (coordinadora: Coordinadora) => {
    router.push(`/admin/gestion-usuarios/coordinadoras/editarCoordinadora/${coordinadora.id_venue_coord}`);
  };

  const handleCloseDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setSelectedCoordinadora(null);
    setFormErrors({});
  };

  const handleCloseDetailsPopup = () => {
    setIsDetailsPopupOpen(false);
    setSelectedCoordinadora(null);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!newCoordinatorData.name) errors.name = 'El nombre es obligatorio';
    if (!newCoordinatorData.email) errors.email = 'El correo es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(newCoordinatorData.email)) errors.email = 'El correo no es válido';
    if (!newCoordinatorData.phone_number) errors.phone_number = 'El teléfono es obligatorio';
    if (!newCoordinatorData.username) errors.username = 'El nombre de usuario es obligatorio';
    if (!newCoordinatorData.password) errors.password = 'La contraseña es obligatoria';
    if (!newCoordinatorData.gender) errors.gender = 'El género es obligatorio';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmReplace = async () => {
    if (!selectedCoordinadora) {
      handleCloseDeletePopup();
      return;
    }

    if (!validateForm()) {
      notify({
        color: 'red',
        title: 'Error',
        message: 'Por favor, completa todos los campos requeridos correctamente',
        duration: 5000,
      });
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

      const response = await fetch(`/api/venue-coordinators/${selectedCoordinadora.id_venue_coord}/replace`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCoordinatorData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al reemplazar la coordinadora');
      }

      setCoordinadorasData(prev => {
        const newCoordinator = result.data;
        const formattedNewCoordinator: Coordinadora = {
          id_venue_coord: newCoordinator.id_venue_coord,
          nombre: `${newCoordinator.name || ''} ${newCoordinator.paternal_name || ''} ${newCoordinator.maternal_name || ''}`.trim(),
          email: newCoordinatorData.email,
          phone_number: newCoordinatorData.phone_number,
          venue: selectedCoordinadora.venue,
          name: newCoordinatorData.name,
          paternal_name: newCoordinatorData.paternal_name || 'Sin apellido paterno',
          maternal_name: newCoordinatorData.maternal_name || 'Sin apellido materno',
          status: 'Aprobada',
        };
        return [
          ...prev.filter(c => c.id_venue_coord !== selectedCoordinadora.id_venue_coord),
          formattedNewCoordinator,
        ];
      });

      notify({
        color: 'green',
        title: 'Coordinadora Reemplazada',
        message: `Coordinadora ${selectedCoordinadora.nombre} reemplazada exitosamente por ${newCoordinatorData.name}`,
        duration: 5000,
      });

      handleCloseDeletePopup();
    } catch (error: any) {
      console.error('Error al reemplazar la coordinadora:', error);
      notify({
        color: 'red',
        title: 'Error',
        message: `No se pudo reemplazar la coordinadora ${selectedCoordinadora.nombre}: ${error.message}`,
        duration: 5000,
      });
    }
  };

  const handleInputChange = (field: keyof typeof newCoordinatorData, value: string) => {
    setNewCoordinatorData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
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

        <div className="overflow-x-auto custom-scrollbar-tabla">
          <table className="min-w-full text-left text-sm">
            <thead className="text-purple-800 font-bold sticky top-0 bg-[#ebe6eb]">
              <tr className="texto-primary-shade">
                <th className="p-2 text-center">Nombre</th>
                <th className="p-2 text-center">Correo</th>
                <th className="p-2 text-center">Teléfono</th>
                <th className="p-2 text-center">Sede</th>
                <th className="p-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {paginatedData.map((coordinadora, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-300 cursor-pointer hover:bg-gray-300"
                  onClick={(e) => {
                    const isButtonClick = (e.target as HTMLElement).closest('button');
                    if (!isButtonClick) {
                      handleDetailsClick(coordinadora);
                    }
                  }}
                >
                  <td className="p-2 text-center">{coordinadora.nombre}</td>
                  <td className="p-2 text-center">{coordinadora.email}</td>
                  <td className="p-2 text-center">{coordinadora.phone_number}</td>
                  <td className="p-2 text-center">{coordinadora.venue}</td>
                  <td className="p-2 flex gap-2 items-center justify-center">
                    <Button
                      label=""
                      variant="error"
                      round
                      showLeftIcon
                      IconLeft={Trash}
                      onClick={() => handleDeleteClick(coordinadora)}
                    />
                    <Button
                      label=""
                      variant="warning"
                      round
                      showLeftIcon
                      IconLeft={Highlighter}
                      onClick={() => handleEditClick(coordinadora)}
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

        {isDeletePopupOpen && selectedCoordinadora && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-gray-800 max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Reemplazar Coordinadora</h2>
              <p className="mb-4 text-center">
                Para eliminar a <strong>{selectedCoordinadora.nombre}</strong>, crea una nueva coordinadora para la sede <strong>{selectedCoordinadora.venue}</strong>.
              </p>

              <div className="space-y-4">
                <InputField
                  label="Nombre"
                  placeholder="Nombre"
                  value={newCoordinatorData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                  showDescription={!!formErrors.name}
                  description={formErrors.name}
                  variant="accent"
                />
                <InputField
                  label="Apellido Paterno"
                  placeholder="Apellido Paterno"
                  value={newCoordinatorData.paternal_name}
                  onChangeText={(text) => handleInputChange('paternal_name', text)}
                  showDescription={!!formErrors.paternal_name}
                  description={formErrors.paternal_name}
                  variant="accent"
                />
                <InputField
                  label="Apellido Materno"
                  placeholder="Apellido Materno"
                  value={newCoordinatorData.maternal_name}
                  onChangeText={(text) => handleInputChange('maternal_name', text)}
                  showDescription={!!formErrors.maternal_name}
                  description={formErrors.maternal_name}
                  variant="accent"
                />
                <InputField
                  label="Correo Electrónico"
                  placeholder="Correo electrónico"
                  type="email"
                  value={newCoordinatorData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  showDescription={!!formErrors.email}
                  description={formErrors.email}
                  variant="accent"
                />
                <InputField
                  label="Teléfono"
                  placeholder="Número de teléfono"
                  value={newCoordinatorData.phone_number}
                  onChangeText={(text) => handleInputChange('phone_number', text)}
                  showDescription={!!formErrors.phone_number}
                  description={formErrors.phone_number}
                  variant="accent"
                />
                <InputField
                  label="Género"
                  placeholder="Género (Femenino/Masculino)"
                  value={newCoordinatorData.gender}
                  onChangeText={(text) => handleInputChange('gender', text)}
                  showDescription={!!formErrors.gender}
                  description={formErrors.gender}
                  variant="accent"
                />
                <InputField
                  label="Nombre de usuario"
                  placeholder="Usuario"
                  value={newCoordinatorData.username}
                  onChangeText={(text) => handleInputChange('username', text)}
                  showDescription={!!formErrors.username}
                  description={formErrors.username}
                  variant="accent"
                />
                <InputField
                  label="Contraseña"
                  placeholder="Contraseña"
                  type="password"
                  value={newCoordinatorData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                  showDescription={!!formErrors.password}
                  description={formErrors.password}
                  variant="accent"
                />
              </div>

              <div className="flex justify-between mt-6">
                <Button label="Confirmar Reemplazo" variant="primary" onClick={handleConfirmReplace} />
                <Button label="Cancelar" variant="secondary" onClick={handleCloseDeletePopup} />
              </div>
            </div>
          </div>
        )}

        {isDetailsPopupOpen && selectedCoordinadora && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative max-h-[80vh] overflow-y-auto text-gray-800">
              <h2 className="text-3xl font-bold mb-4 text-center">Detalles de la Coordinadora</h2>
              <div className="pt-6 pb-6">
                <p><strong>Nombre:</strong> {selectedCoordinadora.name}</p>
                <p><strong>Apellido Paterno:</strong> {selectedCoordinadora.paternal_name}</p>
                <p><strong>Apellido Materno:</strong> {selectedCoordinadora.maternal_name}</p>
                <p><strong>Correo:</strong> {selectedCoordinadora.email}</p>
                <p><strong>Teléfono:</strong> {selectedCoordinadora.phone_number}</p>
                <p><strong>Sede:</strong> {selectedCoordinadora.venue}</p>
                <p><strong>Status:</strong> {selectedCoordinadora.status}</p>
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

export default GestionCoordinadoras;