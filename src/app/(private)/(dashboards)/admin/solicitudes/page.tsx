'use client';

import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import { MagnifyingGlass, Eye, Check, X } from '@/components/icons';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/components/buttons_inputs/Notification'; // Add notification hook

// Interfaces para los datos de cada sección
interface Participante {
  id_participant: number;
  name: string;
  paternal_name: string;
  maternal_name: string;
  email: string;
  preferred_group: number | null;
  groups?: { name: string; venues?: { name: string } } | null;
  status: string;
  tutors?: { phone_number: string };
}

interface ApoyoStaff {
  id_collaborator: number;
  name: string;
  paternal_name: string;
  maternal_name: string;
  email: string;
  phone_number: string;
  college: string;
  degree: string;
  semester: string;
  gender: string;
  status: string;
  preferred_role: string;
  preferred_language: string;
  preferred_level: string;
  preferred_group: number | null;
  groups?: { name: string; venues?: { name: string } } | null;
  role: string;
  level: string;
  language: string;
}

interface Sede {
  id_venue: number;
  name: string;
  country: string;
  state: string;
  address: string;
  status: string;
}

interface GroupOption {
  id_group: number;
  name: string;
  available_places: number;
}

const SolicitudesRegistroAdmin = () => {
  const [inputValue, setInputValue] = useState('');
  const [section, setSection] = useState<'PARTICIPANTES' | 'APOYO & STAFF' | 'SEDES'>('PARTICIPANTES');
  const [currentPage, setCurrentPage] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Participante | ApoyoStaff | Sede | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null); // For Participants
  const [selectedGroup, setSelectedGroup] = useState<string>(''); // For Apoyo & Staff
  const [selectedRole, setSelectedRole] = useState<string>(''); // For Apoyo & Staff roles
  const [availableGroups, setAvailableGroups] = useState<GroupOption[]>([]);
  const [venueName, setVenueName] = useState('');
  const [participantesData, setParticipantesData] = useState<Participante[]>([]);
  const [apoyoStaffData, setApoyoStaffData] = useState<ApoyoStaff[]>([]);
  const [sedesData, setSedesData] = useState<Sede[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { notify } = useNotification(); // Initialize notification

  const rowsPerPage = 20;

  // Fetch available groups for a participant
  const fetchAvailableGroups = async (participantId: number) => {
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

      const response = await fetch(`/api/participants/${participantId}/available-groups`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener grupos disponibles');
      }

      const data = await response.json();
      setAvailableGroups(data.groups || []);
      setVenueName(data.venue || 'No asignado');
      // Set default group to preferred group if available
      const participant = participantesData.find(p => p.id_participant === participantId);
      const preferredGroupId = participant?.preferred_group;
      const defaultGroup = data.groups.find((g: GroupOption) => g.id_group === preferredGroupId);
      setSelectedGroupId(defaultGroup ? defaultGroup.id_group : data.groups[0]?.id_group || null);
    } catch (error: any) {
      console.error('Error fetching available groups:', error);
      notify({
        color: 'red',
        title: 'Error',
        message: `No se pudieron cargar los grupos disponibles: ${error.message}`,
        duration: 5000,
      });
    }
  };

  // Obtener datos de la base de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
        if (!token) {
          setError('No token found, redirecting to login');
          router.push('/login');
          return;
        }

        // Obtener participantes
        const participantsResponse = await fetch('/api/participants', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!participantsResponse.ok) {
          const errorData = await participantsResponse.json();
          throw new Error(`Error fetching participants: ${participantsResponse.status} - ${errorData.message || 'Unknown error'}`);
        }
        const participantsData = await participantsResponse.json();
        const pendingParticipants = participantsData.dataForRequests.filter((p: Participante) => p.status === 'Pendiente');
        setParticipantesData(pendingParticipants);

        // Obtener colaboradores
        const collaboratorsResponse = await fetch('/api/collaborators', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!collaboratorsResponse.ok) {
          const errorData = await collaboratorsResponse.json();
          throw new Error(`Error fetching collaborators: ${collaboratorsResponse.status} - ${errorData.message || 'Unknown error'}`);
        }
        const collaboratorsData = await collaboratorsResponse.json();
        const pendingCollaborators = collaboratorsData.dataForRequests.filter((c: ApoyoStaff) => c.status === 'Pendiente');
        setApoyoStaffData(pendingCollaborators);

        // Obtener sedes
        const venuesResponse = await fetch('/api/venues', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!venuesResponse.ok) {
          const errorData = await venuesResponse.json();
          throw new Error(`Error fetching venues: ${venuesResponse.status} - ${errorData.message || 'Unknown error'}`);
        }
        const venuesData = await venuesResponse.json();
        const pendingVenues = venuesData.filter((v: Sede) => v.status === 'Pendiente');
        setSedesData(pendingVenues);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [router]);

  // Filtrar los datos según el valor de búsqueda y la sección activa
  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    if (!searchTerm) {
      return section === 'PARTICIPANTES' ? participantesData : section === 'APOYO & STAFF' ? apoyoStaffData : sedesData;
    }

    if (section === 'PARTICIPANTES') {
      return participantesData.filter(item => {
        const fullName = `${item.name} ${item.paternal_name} ${item.maternal_name}`.toLowerCase().trim();
        return (
          fullName.includes(searchTerm) ||
          (item.groups?.venues?.name || '').toLowerCase().includes(searchTerm) ||
          (item.groups?.name || '').toLowerCase().includes(searchTerm)
        );
      });
    } else if (section === 'APOYO & STAFF') {
      return apoyoStaffData.filter(item => {
        const fullName = `${item.name} ${item.paternal_name} ${item.maternal_name}`.toLowerCase().trim();
        return (
          fullName.includes(searchTerm) ||
          (item.groups?.venues?.name || '').toLowerCase().includes(searchTerm) ||
          (item.groups?.name || '').toLowerCase().includes(searchTerm) ||
          item.preferred_role.toLowerCase().includes(searchTerm) ||
          item.preferred_language.toLowerCase().includes(searchTerm) ||
          item.preferred_level.toLowerCase().includes(searchTerm)
        );
      });
    } else {
      return sedesData.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.state.toLowerCase().includes(searchTerm) ||
        item.address.toLowerCase().includes(searchTerm)
      );
    }
  }, [inputValue, section, participantesData, apoyoStaffData, sedesData]);

  const sectionFilterChange = (newSection: 'PARTICIPANTES' | 'APOYO & STAFF' | 'SEDES') => {
    setSection(newSection);
    setCurrentPage(0);
    setInputValue('');
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    } else if (totalPages === 0) {
      setCurrentPage(0);
    }
  }, [filteredData.length, currentPage, totalPages]);

  const openPopup = (item: Participante | ApoyoStaff | Sede) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedItem(null);
  };

  const openConfirmPopup = (item: Participante | ApoyoStaff | Sede) => {
    setSelectedItem(item);
    if (section === 'PARTICIPANTES') {
      fetchAvailableGroups((item as Participante).id_participant);
    } else if (section === 'APOYO & STAFF') {
      setSelectedRole((item as ApoyoStaff).preferred_role || 'Instructora');
      setSelectedGroup((item as ApoyoStaff).groups?.name || 'Luna');
    }
    setIsConfirmPopupOpen(true);
  };

  const closeConfirmPopup = () => {
    setIsConfirmPopupOpen(false);
    setSelectedItem(null);
    setSelectedGroupId(null);
    setSelectedGroup('');
    setSelectedRole('');
    setAvailableGroups([]);
    setVenueName('');
  };

  const openRejectPopup = (item: Participante | ApoyoStaff | Sede) => {
    setSelectedItem(item);
    setIsRejectPopupOpen(true);
  };

  const closeRejectPopup = () => {
    setIsRejectPopupOpen(false);
    setSelectedItem(null);
  };

  const handleAccept = async () => {
    if (!selectedItem) {
      closeConfirmPopup();
      return;
    }

    if (section === 'PARTICIPANTES') {
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

        if (!selectedGroupId) {
          notify({
            color: 'red',
            title: 'Error',
            message: 'Por favor selecciona un grupo',
            duration: 5000,
          });
          return;
        }

        const response = await fetch(`/api/participants/${(selectedItem as Participante).id_participant}/approve`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ groupId: selectedGroupId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al aprobar participante');
        }

        // Remove participant from list
        setParticipantesData(prev => prev.filter(p => p.id_participant !== (selectedItem as Participante).id_participant));

        const fullName = `${(selectedItem as Participante).name} ${(selectedItem as Participante).paternal_name} ${(selectedItem as Participante).maternal_name}`.trim();
        notify({
          color: 'green',
          title: 'Éxito',
          message: `Participante ${fullName} aprobado exitosamente`,
          duration: 5000,
        });

        closeConfirmPopup();
      } catch (error: any) {
        console.error('Error approving participant:', error);
        const fullName = `${(selectedItem as Participante).name} ${(selectedItem as Participante).paternal_name} ${(selectedItem as Participante).maternal_name}`.trim();
        notify({
          color: 'red',
          title: 'Error',
          message: `No se pudo aprobar al participante ${fullName}: ${error.message}`,
          duration: 5000,
        });
      }
    } else if (section === 'APOYO & STAFF') {
      // Placeholder for Apoyo & Staff approval
      console.log('Solicitud aceptada para:', selectedItem, 'Rol:', selectedRole, 'Grupo:', selectedGroup);
      const fullName = `${(selectedItem as ApoyoStaff).name} ${(selectedItem as ApoyoStaff).paternal_name} ${(selectedItem as ApoyoStaff).maternal_name}`.trim();
      notify({
        color: 'green',
        title: 'Éxito',
        message: `Colaborador ${fullName} aprobado (rol: ${selectedRole}, grupo: ${selectedGroup})`,
        duration: 5000,
      });
      closeConfirmPopup();
    } else {
      // Placeholder for Sedes
      console.log('Solicitud aceptada para:', selectedItem);
      notify({
        color: 'green',
        title: 'Éxito',
        message: `Sede ${(selectedItem as Sede).name} aprobada`,
        duration: 5000,
      });
      closeConfirmPopup();
    }
  };

  const handleReject = async () => {
    if (!selectedItem) {
      closeRejectPopup();
      return;
    }

    if (section === 'PARTICIPANTES') {
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

        const response = await fetch(`/api/participants/${(selectedItem as Participante).id_participant}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: 'Rechazada' }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al rechazar participante');
        }

        // Remove participant from list
        setParticipantesData(prev => prev.filter(p => p.id_participant !== (selectedItem as Participante).id_participant));

        const fullName = `${(selectedItem as Participante).name} ${(selectedItem as Participante).paternal_name} ${(selectedItem as Participante).maternal_name}`.trim();
        notify({
          color: 'green',
          title: 'Éxito',
          message: `Participante ${fullName} rechazado exitosamente`,
          duration: 5000,
        });

        closeRejectPopup();
      } catch (error: any) {
        console.error('Error rejecting participant:', error);
        const fullName = `${(selectedItem as Participante).name} ${(selectedItem as Participante).paternal_name} ${(selectedItem as Participante).maternal_name}`.trim();
        notify({
          color: 'red',
          title: 'Error',
          message: `No se pudo rechazar al participante ${fullName}: ${error.message}`,
          duration: 5000,
        });
      }
    } else if (section === 'APOYO & STAFF') {
      // Placeholder for Apoyo & Staff rejection
      console.log('Solicitud rechazada para:', selectedItem);
      const fullName = `${(selectedItem as ApoyoStaff).name} ${(selectedItem as ApoyoStaff).paternal_name} ${(selectedItem as ApoyoStaff).maternal_name}`.trim();
      notify({
        color: 'green',
        title: 'Éxito',
        message: `Colaborador ${fullName} rechazado`,
        duration: 5000,
      });
      closeRejectPopup();
    } else {
      // Placeholder for Sedes
      console.log('Solicitud rechazada para:', selectedItem);
      notify({
        color: 'green',
        title: 'Éxito',
        message: `Sede ${(selectedItem as Sede).name} rechazada`,
        duration: 5000,
      });
      closeRejectPopup();
    }
  };

  if (error) {
    return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
      <PageTitle>Solicitudes de Registro</PageTitle>

      <div className="fondo-sedes flex flex-col p-6 gap-4 overflow-auto">
        {/* Fila de búsqueda */}
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
          </div>
        </div>

        {/* Section Headers */}
        <div className="flex justify-center gap-48 mt-2 pb-2">
          <div
            className={`cursor-pointer text-lg font-bold ${section === 'PARTICIPANTES' ? 'text-purple-800' : 'text-gray-500'}`}
            onClick={() => sectionFilterChange('PARTICIPANTES')}
          >
            Participantes
          </div>
          <div
            className={`cursor-pointer text-lg font-bold ${section === 'APOYO & STAFF' ? 'text-purple-800' : 'text-gray-500'}`}
            onClick={() => sectionFilterChange('APOYO & STAFF')}
          >
            Apoyo & Staff
          </div>
          <div
            className={`cursor-pointer text-lg font-bold ${section === 'SEDES' ? 'text-purple-800' : 'text-gray-500'}`}
            onClick={() => sectionFilterChange('SEDES')}
          >
            Sedes
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-purple-800 font-bold">
              <tr className='texto-primary-shade'>
                <th className="p-2 text-center"></th>
                <th className="p-2 text-center"></th>
                {section === 'PARTICIPANTES' && (
                  <>
                    <th className="p-2 text-center">Nombre</th>
                    <th className="p-2 text-center">Grupo Preferido</th>
                    <th className="p-2 text-center">Sede</th>
                  </>
                )}
                {section === 'APOYO & STAFF' && (
                  <>
                    <th className="p-2 text-center">Nombre</th>
                    <th className="p-2 text-center">Rol Preferido</th>
                    <th className="p-2 text-center">Idioma Preferido</th>
                    <th className="p-2 text-center">Nivel Preferido</th>
                    <th className="p-2 text-center">Grupo Preferido</th>
                    <th className="p-2 text-center">Sede</th>
                  </>
                )}
                {section === 'SEDES' && (
                  <>
                    <th className="p-2 text-center">Nombre</th>
                    <th className="p-2 text-center">Ubicación</th>
                    <th className="p-2 text-center">Dirección</th>
                  </>
                )}
                <th className="p-2 text-center"></th>
                <th className="p-2 text-center"></th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {paginatedData.map((item, index) => (
                <tr key={index} className="border-t border-gray-300">
                  {section === 'PARTICIPANTES' && (
                    <>
                      <td className="p-2 text-center"></td>
                      <td className="p-2 text-center">
                        <Button label='' variant="warning" round showLeftIcon IconLeft={Eye} onClick={() => openPopup(item as Participante)} />
                      </td>
                      <td className="p-2 text-center">{`${(item as Participante).name} ${(item as Participante).paternal_name} ${(item as Participante).maternal_name}`.trim()}</td>
                      <td className="p-2 text-center">{(item as Participante).groups?.name || 'No asignado'}</td>
                      <td className="p-2 text-center">{(item as Participante).groups?.venues?.name || 'No asignado'}</td>
                      <td className="p-2 text-center">
                        <div className='flex gap-4 justify-center'>
                          <Button label='' variant="success" round showLeftIcon IconLeft={Check} onClick={() => openConfirmPopup(item as Participante)} />
                          <Button label='' variant="error" round showLeftIcon IconLeft={X} onClick={() => openRejectPopup(item as Participante)} />
                        </div>
                      </td>
                    </>
                  )}
                  {section === 'APOYO & STAFF' && (
                    <>
                      <td className="p-2 text-center"></td>
                      <td className="p-2 text-center">
                        <Button label='' variant="warning" round showLeftIcon IconLeft={Eye} onClick={() => openPopup(item as ApoyoStaff)} />
                      </td>
                      <td className="p-2 text-center">{`${(item as ApoyoStaff).name} ${(item as ApoyoStaff).paternal_name} ${(item as ApoyoStaff).maternal_name}`.trim()}</td>
                      <td className="p-2 text-center">{(item as ApoyoStaff).preferred_role}</td>
                      <td className="p-2 text-center">{(item as ApoyoStaff).preferred_language}</td>
                      <td className="p-2 text-center">{(item as ApoyoStaff).preferred_level}</td>
                      <td className="p-2 text-center">{(item as ApoyoStaff).groups?.name || 'No asignado'}</td>
                      <td className="p-2 text-center">{(item as ApoyoStaff).groups?.venues?.name || 'No asignado'}</td>
                      <td className="p-2 text-center">
                        <div className='flex gap-4 justify-center'>
                          <Button label='' variant="success" round showLeftIcon IconLeft={Check} onClick={() => openConfirmPopup(item as ApoyoStaff)} />
                          <Button label='' variant="error" round showLeftIcon IconLeft={X} onClick={() => openRejectPopup(item as ApoyoStaff)} />
                        </div>
                      </td>
                    </>
                  )}
                  {section === 'SEDES' && (
                    <>
                      <td className="p-2 text-center"></td>
                      <td className="p-2 text-center">
                        <Button label='' variant="warning" round showLeftIcon IconLeft={Eye} onClick={() => openPopup(item as Sede)} />
                      </td>
                      <td className="p-2 text-center">{(item as Sede).name}</td>
                      <td className="p-2 text-center">{(item as Sede).state}</td>
                      <td className="p-2 text-center">{(item as Sede).address}</td>
                      <td className="p-2 text-center">
                        <div className='flex gap-4 justify-center'>
                          <Button label='' variant="success" round showLeftIcon IconLeft={Check} onClick={() => openConfirmPopup(item as Sede)} />
                          <Button label='' variant="error" round showLeftIcon IconLeft={X} onClick={() => openRejectPopup(item as Sede)} />
                        </div>
                      </td>
                    </>
                  )}
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
            variant="secondary-shade"
            pageLinks={Array(totalPages).fill('#')}
          />
        </div>

        {/* Pop-up de información */}
        {isPopupOpen && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="texto-popup bg-white p-6 rounded-lg shadow-lg w-96 relative max-h-[80vh] overflow-y-auto">
              <h2 className="text-3xl font-bold mb-4 text-center">Solicitud de Registro</h2>
              {section === 'PARTICIPANTES' && selectedItem && (
                <div className='pt-6 pb-6'>
                  <p><strong>ID:</strong> {(selectedItem as Participante).id_participant}</p>
                  <p><strong>Nombre:</strong> {`${(selectedItem as Participante).name} ${(selectedItem as Participante).paternal_name} ${(selectedItem as Participante).maternal_name}`.trim()}</p>
                  <p><strong>Correo:</strong> {(selectedItem as Participante).email}</p>
                  <p><strong>Teléfono del tutor:</strong> {(selectedItem as Participante).tutors?.phone_number || 'No asignado'}</p>
                  <p><strong>Grupo preferido:</strong> {(selectedItem as Participante).groups?.name || 'No asignado'}</p>
                  <p><strong>Sede:</strong> {(selectedItem as Participante).groups?.venues?.name || 'No asignado'}</p>
                  <p><strong>Estado:</strong> {(selectedItem as Participante).status}</p>
                </div>
              )}
              {section === 'APOYO & STAFF' && selectedItem && (
                <div className='pt-6 pb-6'>
                  <p><strong>ID:</strong> {(selectedItem as ApoyoStaff).id_collaborator}</p>
                  <p><strong>Nombre:</strong> {`${(selectedItem as ApoyoStaff).name} ${(selectedItem as ApoyoStaff).paternal_name} ${(selectedItem as ApoyoStaff).maternal_name}`.trim()}</p>
                  <p><strong>Correo:</strong> {(selectedItem as ApoyoStaff).email}</p>
                  <p><strong>Teléfono:</strong> {(selectedItem as ApoyoStaff).phone_number}</p>
                  <p><strong>Universidad:</strong> {(selectedItem as ApoyoStaff).college}</p>
                  <p><strong>Carrera:</strong> {(selectedItem as ApoyoStaff).degree}</p>
                  <p><strong>Semestre:</strong> {(selectedItem as ApoyoStaff).semester}</p>
                  <p><strong>Género:</strong> {(selectedItem as ApoyoStaff).gender}</p>
                  <p><strong>Rol preferido:</strong> {(selectedItem as ApoyoStaff).preferred_role}</p>
                  <p><strong>Idioma preferido:</strong> {(selectedItem as ApoyoStaff).preferred_language}</p>
                  <p><strong>Nivel preferido:</strong> {(selectedItem as ApoyoStaff).preferred_level}</p>
                  <p><strong>Grupo preferido:</strong> {(selectedItem as ApoyoStaff).groups?.name || 'No asignado'}</p>
                  <p><strong>Sede:</strong> {(selectedItem as ApoyoStaff).groups?.venues?.name || 'No asignado'}</p>
                  <p><strong>Rol asignado:</strong> {(selectedItem as ApoyoStaff).role}</p>
                  <p><strong>Nivel asignado:</strong> {(selectedItem as ApoyoStaff).level}</p>
                  <p><strong>Idioma asignado:</strong> {(selectedItem as ApoyoStaff).language}</p>
                  <p><strong>Estado:</strong> {(selectedItem as ApoyoStaff).status}</p>
                </div>
              )}
              {section === 'SEDES' && selectedItem && (
                <div className='pt-6 pb-6'>
                  <p><strong>ID:</strong> {(selectedItem as Sede).id_venue}</p>
                  <p><strong>Nombre:</strong> {(selectedItem as Sede).name}</p>
                  <p><strong>País:</strong> {(selectedItem as Sede).country}</p>
                  <p><strong>Ubicación:</strong> {(selectedItem as Sede).state}</p>
                  <p><strong>Dirección:</strong> {(selectedItem as Sede).address}</p>
                  <p><strong>Estado:</strong> {(selectedItem as Sede).status}</p>
                </div>
              )}
              <div className="mt-4 flex justify-center">
                <Button label="Cerrar" variant="primary" onClick={closePopup} />
              </div>
            </div>
          </div>
        )}

        {/* Pop-up de confirmación (Aceptar) */}
        {isConfirmPopupOpen && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative text-gray-700">
              <h2 className="text-3xl font-bold mb-4 text-center">
                ¿Aceptar a {section === 'SEDES' ? (selectedItem as Sede).name : `${(selectedItem as Participante | ApoyoStaff).name} ${(selectedItem as Participante | ApoyoStaff).paternal_name} ${(selectedItem as Participante | ApoyoStaff).maternal_name}`.trim()}?
              </h2>
              <div className="pt-6 pb-6">
                {section === 'PARTICIPANTES' && selectedItem && (
                  <>
                    <p><strong>Sede:</strong> {venueName}</p>
                    <p><strong>Grupo preferido:</strong> {(selectedItem as Participante).groups?.name || 'No asignado'}</p>
                    <p className="mt-4"><strong>Asignar a un grupo</strong></p>
                    <select
                      className="w-full p-2 border rounded mt-2 bg-purple-100"
                      value={selectedGroupId || ''}
                      onChange={(e) => setSelectedGroupId(parseInt(e.target.value))}
                      disabled={availableGroups.length === 0}
                    >
                      {availableGroups.length === 0 ? (
                        <option value="">No hay grupos disponibles</option>
                      ) : (
                        availableGroups.map(group => (
                          <option key={group.id_group} value={group.id_group}>
                            {group.name}
                          </option>
                        ))
                      )}
                    </select>
                    {selectedGroupId && (
                      <p className="mt-2">
                        <strong>Cupo disponible:</strong>{' '}
                        {availableGroups.find(g => g.id_group === selectedGroupId)?.available_places || 0}
                      </p>
                    )}
                  </>
                )}
                {section === 'APOYO & STAFF' && selectedItem && (
                  <>
                    <p><strong>Sede:</strong> {(selectedItem as ApoyoStaff).groups?.venues?.name || 'No asignado'}</p>
                    <p><strong>Rol preferido:</strong> {(selectedItem as ApoyoStaff).preferred_role}</p>
                    <p className="mt-4"><strong>Asignar un rol</strong></p>
                    <select
                      className="w-full p-2 border rounded mt-2 bg-purple-100"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      <option>Instructora</option>
                      <option>Staff</option>
                      <option>Facilitadora</option>
                    </select>
                    <p className="mt-4"><strong>Asignar a un grupo</strong></p>
                    <select
                      className="w-full p-2 border rounded mt-2 bg-purple-100"
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value)}
                    >
                      <option>Luna</option>
                      <option>Sol</option>
                      <option>Mar</option>
                      <option>Montaña</option>
                    </select>
                  </>
                )}
                {section === 'SEDES' && selectedItem && (
                  <>
                    <p><strong>Nombre:</strong> {(selectedItem as Sede).name}</p>
                    <p><strong>Ubicación:</strong> {(selectedItem as Sede).state}</p>
                    <p><strong>Dirección:</strong> {(selectedItem as Sede).address}</p>
                  </>
                )}
              </div>
              <div className="mt-4 flex justify-center gap-4">
                <Button label="Aceptar" variant="success" onClick={handleAccept} disabled={section === 'PARTICIPANTES' && !selectedGroupId} />
                <Button label="Cancelar" variant="error" onClick={closeConfirmPopup} />
              </div>
            </div>
          </div>
        )}

        {/* Pop-up de rechazo */}
        {isRejectPopupOpen && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative text-gray-700">
              <h2 className="text-2xl font-bold mx-4 mt-6 mb-12 text-center">
                ¿Seguro que quieres rechazar la solicitud de {section === 'SEDES' ? (selectedItem as Sede).name : `${(selectedItem as Participante | ApoyoStaff).name} ${(selectedItem as Participante | ApoyoStaff).paternal_name} ${(selectedItem as Participante | ApoyoStaff).maternal_name}`.trim()}?
              </h2>
              <div className="mt-4 flex justify-center gap-4">
                <Button label="Rechazar" variant="error" onClick={handleReject} />
                <Button label="Cancelar" variant="primary" onClick={closeRejectPopup} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolicitudesRegistroAdmin;