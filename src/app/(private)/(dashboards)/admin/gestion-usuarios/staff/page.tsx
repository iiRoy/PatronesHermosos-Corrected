'use client';

import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import { Trash, Highlighter } from '@/components/icons';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/components/buttons_inputs/Notification';

// Definir el tipo Apoyo
interface Apoyo {
  id_collaborator: number;
  name: string; // Nombre
  paternal_name: string; // Apellido paterno
  maternal_name: string; // Apellido materno
  email: string;
  role: string;
  level: string;
  language: string;
  group: string;
  venue: string; // Nombre de la sede
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
}

const GestionApoyo = () => {
  const [inputValue, setInputValue] = useState('');
  const [section, setSection] = useState('__All__'); // Inicializar con "Todas" para sedes
  const [filterActivaExtra, setFilterActivaExtra] = useState({ role: '__All__' }); // Inicializar con "Todas" para roles
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // Estado para controlar el popup de eliminación
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false); // Estado para controlar el popup de información
  const [selectedApoyo, setSelectedApoyo] = useState<Apoyo | null>(null); // Persona seleccionada para eliminar o mostrar info
  const [apoyoData, setApoyoData] = useState<Apoyo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null); // Estado para la notificación
  const router = useRouter();
  const { notify } = useNotification();

  const rowsPerPage = 10;

  useEffect(() => {
    const fetchApoyo = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
        console.log('Token:', token);
        if (!token) {
          console.log('No token found, redirecting to login');
          router.push('/login');
          return;
        }

        // Obtener todos los colaboradores (con token)
        const collaboratorsResponse = await fetch('/api/collaborators', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Collaborators response status:', collaboratorsResponse.status);

        const collaboratorsData = await collaboratorsResponse.json();
        console.log('Collaborators response body:', collaboratorsData);

        if (!collaboratorsResponse.ok) {
          console.log('Collaborators error data:', collaboratorsData);
          if (collaboratorsResponse.status === 403) {
            setError('No tienes permisos para acceder a los colaboradores');
            return;
          }
          throw new Error(`Error fetching collaborators: ${collaboratorsResponse.status} - ${collaboratorsData.message || 'Unknown error'}`);
        }

        // Formatear los datos para incluir las propiedades necesarias para el popup
        const formattedData = collaboratorsData.data.map((collab: any) => ({
          id_collaborator: collab.id_collaborator,
          name: collab.name || 'Sin nombre',
          paternal_name: collab.paternal_name || 'Sin apellido',
          maternal_name: collab.maternal_name || 'Sin apellido',
          email: collab.email || 'Sin correo',
          role: collab.role || 'Sin rol',
          level: collab.level || 'Sin nivel',
          language: collab.language || 'Sin idioma',
          group: collab.group || 'Sin grupo',
          venue: collab.venue || 'Sin sede',
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
        }));

        console.log('Datos formateados:', formattedData);
        setApoyoData(formattedData);
      } catch (error: any) {
        console.error('Error al obtener colaboradores:', error);
        setError(error.message);
      }
    };
    fetchApoyo();
  }, [router]);

  // Obtener sedes y roles únicos
  const uniqueSedes = Array.from(new Set(apoyoData.map(apoyo => apoyo.venue))).sort();
  const uniqueRoles = Array.from(new Set(apoyoData.map(apoyo => apoyo.role))).sort();

  const sedeOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueSedes.map(sede => ({ label: sede, value: sede })),
  ];

  const rolOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueRoles.map(rol => ({ label: rol, value: rol })),
  ];

  // Filtrar los datos según el valor de búsqueda, sede, rol y status
  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return apoyoData.filter(apoyo => {
      // Filtro por status: solo mostrar aprobadas
      const matchesStatus = apoyo.status.toLowerCase() === 'aprobada';

      // Filtro por nombre completo, correo o grupo
      const fullName = `${apoyo.name} ${apoyo.paternal_name} ${apoyo.maternal_name}`.toLowerCase().trim();
      const matchesSearch =
        !searchTerm ||
        fullName.includes(searchTerm) ||
        apoyo.email.toLowerCase().includes(searchTerm) ||
        apoyo.group.toLowerCase().includes(searchTerm) ||
        apoyo.venue.toLowerCase().includes(searchTerm);

      // Filtro por sede
      const matchesSede = section === '__All__' ? true : apoyo.venue === section;

      // Filtro por rol
      const selectedRol = filterActivaExtra['role'];
      const matchesRol = selectedRol === '__All__' ? true : apoyo.role === selectedRol;

      return matchesStatus && matchesSearch && matchesSede && matchesRol;
    });
  }, [inputValue, section, filterActivaExtra, apoyoData]);

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

  const extraHandleFilterChange = (key: string, value: string) => {
    setFilterActivaExtra((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(0); // Resetear página al cambiar de filtro
  };

  // Función para abrir el popup de eliminación
  const handleDeleteClick = (apoyo: Apoyo, event: React.MouseEvent) => {
    event.stopPropagation(); // Evitar que el clic en el botón abra el popup de información
    setSelectedApoyo(apoyo);
    setIsDeletePopupOpen(true);
  };

  // Función para cerrar el popup de eliminación
  const handleCloseDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setSelectedApoyo(null);
  };

  // Función para confirmar la eliminación (cambiar status a "Cancelada")
  const handleConfirmDelete = async () => {
    if (selectedApoyo) {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
        if (!token) {
          setError('No token found, redirecting to login');
          router.push('/login');
          return;
        }

        // Obtener los datos originales del colaborador desde el backend
        const collaboratorResponse = await fetch(`/api/collaborators/${selectedApoyo.id_collaborator}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!collaboratorResponse.ok) {
          const errorData = await collaboratorResponse.json();
          throw new Error(`Error fetching collaborator: ${collaboratorResponse.status} - ${errorData.message || 'Unknown error'}`);
        }

        const collaboratorData = await collaboratorResponse.json();
        const collaborator = collaboratorData.data;
        console.log('Datos originales del colaborador:', collaborator);

        // Preparar los datos para la actualización, usando los valores originales
        const updateData = {
          name: collaborator.name,
          paternal_name: collaborator.paternal_name,
          maternal_name: collaborator.maternal_name,
          email: collaborator.email,
          phone_number: collaborator.phone_number,
          college: collaborator.college,
          degree: collaborator.degree,
          semester: collaborator.semester,
          gender: collaborator.gender,
          preferred_role: collaborator.preferred_role,
          preferred_language: collaborator.preferred_language,
          preferred_level: collaborator.preferred_level,
          // Omite preferred_group si es null para evitar la validación de sede
          ...(collaborator.preferred_group !== null && { preferred_group: collaborator.preferred_group }),
          role: collaborator.role,
          status: 'Cancelada', // Solo cambiamos el status
          level: collaborator.level,
          language: collaborator.language,
        };

        console.log('Datos enviados al servidor para actualización:', updateData);

        // Actualizar el status del colaborador a "Cancelada"
        const response = await fetch(`/api/collaborators/${selectedApoyo.id_collaborator}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        });

        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);

        if (!response.ok) {
          throw new Error(`Error updating collaborator: ${response.status} - ${responseData.message || 'Unknown error'}`);
        }

        // Actualizar el estado local para reflejar el cambio
        setApoyoData(prevData =>
          prevData.filter(apoyo => apoyo.id_collaborator !== selectedApoyo.id_collaborator)
        );

        // Mostrar notificación de éxito
        const fullName = `${selectedApoyo.name} ${selectedApoyo.paternal_name} ${selectedApoyo.maternal_name}`;
        notify({
          color: 'green',
          title: 'Usuario Cancelado',
          message: `El usuario ${fullName} ha sido eliminado correctamente`,
          duration: 5000,
        });

        handleCloseDeletePopup();
      } catch (error: any) {
        console.error('Error al actualizar el status del colaborador:', error);
        setError(error.message);
      }
    }
  };

  // Función para abrir el popup de información
  const handleRowClick = (apoyo: Apoyo) => {
    setSelectedApoyo(apoyo);
    setIsInfoPopupOpen(true);
  };

  // Función para cerrar el popup de información
  const handleCloseInfoPopup = () => {
    setIsInfoPopupOpen(false);
    setSelectedApoyo(null);
  };

  if (error) {
    return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
      <PageTitle>Gestión de Apoyo</PageTitle>

      <div className="fondo-sedes flex flex-col p-6 gap-4 overflow-auto">
        {/* Notificación de éxito */}
        {notification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
            {notification}
          </div>
        )}

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
                label="Filtros"
                showSecciones
                labelSecciones="Sedes"
                secciones={sedeOptions}
                seccionActiva={section}
                onChangeSeccion={sectionFilterChange}
                extraFilters={[
                  {
                    label: 'Roles',
                    key: 'role',
                    options: rolOptions,
                  },
                ]}
                filterActiva={filterActivaExtra}
                onExtraFilterChange={extraHandleFilterChange}
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
                <th className="p-2 text-center">Rol</th>
                <th className="p-2 text-center">Level</th>
                <th className="p-2 text-center">Language</th>
                <th className="p-2 text-center">Grupo</th>
                <th className="p-2 text-center">Sede</th>
                <th className="p-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {paginatedData.map((apoyo, index) => {
                const fullName = `${apoyo.name} ${apoyo.paternal_name} ${apoyo.maternal_name}`.trim();
                return (
                  <tr
                    key={index}
                    className="border-t border-gray-300 cursor-pointer hover:bg-gray-300"
                    onClick={() => handleRowClick(apoyo)}
                  >
                    <td className="p-2 text-center">{fullName}</td>
                    <td className="p-2 text-center">{apoyo.email}</td>
                    <td className="p-2 text-center">{apoyo.role}</td>
                    <td className="p-2 text-center">{apoyo.level}</td>
                    <td className="p-2 text-center">{apoyo.language}</td>
                    <td className="p-2 text-center">{apoyo.group}</td>
                    <td className="p-2 text-center">{apoyo.venue}</td>
                    <td className="p-2 flex gap-2 justify-center">
                      <Button
                        label=''
                        variant="error"
                        round
                        showLeftIcon
                        IconLeft={Trash}
                        onClick={(event: React.MouseEvent) => handleDeleteClick(apoyo, event)}
                      />
                      <Button
                        label=''
                        variant="warning"
                        round
                        showLeftIcon
                        IconLeft={Highlighter}
                        onClick={(event: React.MouseEvent) => event.stopPropagation()} // Evitar abrir el popup de info
                      />
                    </td>
                  </tr>
                );
              })}
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

        {/* Popup de eliminación */}
        {isDeletePopupOpen && selectedApoyo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-3xl font-bold mb-4 text-center">Confirmar Eliminación</h2>
              <p className="my-12">
                ¿Segura que quieres eliminar a la {selectedApoyo.role.toLowerCase()} {`${selectedApoyo.name} ${selectedApoyo.paternal_name} ${selectedApoyo.maternal_name}`.trim()}?
              </p>
              <div className="flex justify-center gap-4">
                <Button label="Eliminar" variant="error" onClick={handleConfirmDelete} />
                <Button label="Cancelar" variant="secondary" onClick={handleCloseDeletePopup} />
              </div>
            </div>
          </div>
        )}

        {/* Popup de información */}
        {isInfoPopupOpen && selectedApoyo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
              <h2 className="text-3xl font-bold mb-4 text-center">Información del Colaborador</h2>
              <div className="space-y-2">
                <p><strong>ID:</strong> {selectedApoyo.id_collaborator}</p>
                <p><strong>Nombre completo:</strong> {`${selectedApoyo.name} ${selectedApoyo.paternal_name} ${selectedApoyo.maternal_name}`.trim()}</p>
                <p><strong>Correo:</strong> {selectedApoyo.email}</p>
                <p><strong>Teléfono:</strong> {selectedApoyo.phone_number}</p>
                <p><strong>Universidad:</strong> {selectedApoyo.college}</p>
                <p><strong>Carrera:</strong> {selectedApoyo.degree}</p>
                <p><strong>Semestre:</strong> {selectedApoyo.semester}</p>
                <p><strong>Género:</strong> {selectedApoyo.gender}</p>
                <p><strong>Rol:</strong> {selectedApoyo.role}</p>
                <p><strong>Estado:</strong> {selectedApoyo.status}</p>
                <p><strong>Nivel:</strong> {selectedApoyo.level}</p>
                <p><strong>Idioma:</strong> {selectedApoyo.language}</p>
                <p><strong>Grupo:</strong> {selectedApoyo.group}</p>
                <p><strong>Sede:</strong> {selectedApoyo.venue}</p>
                <p><strong>Rol preferido:</strong> {selectedApoyo.preferred_role}</p>
                <p><strong>Idioma preferido:</strong> {selectedApoyo.preferred_language}</p>
                <p><strong>Nivel preferido:</strong> {selectedApoyo.preferred_level}</p>
                <p><strong>Grupo preferido:</strong> {selectedApoyo.preferred_group || 'Sin grupo preferido'}</p>
              </div>
              <div className="flex justify-center mt-6">
                <Button label="Cerrar" variant="secondary" onClick={handleCloseInfoPopup} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionApoyo;