import { useState, useEffect, useMemo } from 'react';
import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import FiltroEvento from '../headers_menu_users/FiltroEvento';
import Pagination from '@components/buttons_inputs/Pagination';
import Button from '@components/buttons_inputs/Button';
import { MagnifyingGlass, Check, Eye, Star } from '@components/icons';



interface Group {
  id_group: number;
  name: string;
  mode: string;
  venue_name: string;
  language: string;
  level: string;
  available_places?: number; // Optional for future expansion
  schedule?: string; // Optional for future expansion
}

interface ParticipantGroupSelectionTableProps {
  onSelect: (id_group: number) => void;
  selectedGroupId?: number;
  rowsPerPage?: number;
}

const ParticipantGroupSelectionTable: React.FC<ParticipantGroupSelectionTableProps> = ({
  onSelect,
  selectedGroupId,
  rowsPerPage = 4,
}) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [section, setSection] = useState('__All__');
  const [currentPage, setCurrentPage] = useState(0);
  const [isGroupPopupOpen, setIsGroupPopupOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [filterActiva, setFilterActiva] = useState<Record<string, string>>({
    sede: '__All__',
    mode: '__All__',
  });

  const formatDate = (dateStr?: string) => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-MX', {
    weekday: 'short',   // ej. 'lun.'
    day: '2-digit',     // ej. '09'
    month: 'short',     // ej. 'jun.'
    year: 'numeric',    // ej. '2025'
  });
};

const formatTime = (timeStr?: string) => {
  if (!timeStr) return 'N/A';
  // Extraemos HH:mm de "HH:mm" o "HH:mm:ss"
  const match = /^(\d{1,2}):(\d{2})/.exec(timeStr);
  if (!match) return 'N/A';
  let [, hh, mm] = match;
  // Aseguramos dos dígitos
  hh = hh.padStart(2, '0');
  return `${hh}:${mm}`;
};



  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/groups');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Expected an array of groups, but received: ' + JSON.stringify(data));
        }
        const transformedGroups = data.map((group: any) => ({
          id_group: group.id_group,
          name: group.name,
          mode: group.mode || 'Presencial',
          venue_name: group.venues?.name || 'N/A',
          language: group.language || 'N/A',
          level: group.level || 'N/A',
          available_places:
            group.max_places !== undefined && group.occupied_places !== undefined
              ? group.max_places - group.occupied_places
              : undefined,
          schedule:
    group.start_date && group.end_date && group.start_hour && group.end_hour
      ? `${formatDate(group.start_date)} – ${formatDate(group.end_date)}`
      : undefined,
          // For compatibility with the rest of the code
          sede: group.venues?.name || 'N/A',
          cupo: `${group.occupied_places || 0}/${group.max_places || 'N/A'} Personas`,
          horarios: `${formatDate(group.start_date)|| 'N/A'} – ${formatDate(group.end_date)|| 'N/A'} || 'N/A'}`,
        }));
        setGroups(transformedGroups);
      } catch (err) {
        console.error('Error fetching groups:', err);
      }
    };
    fetchGroups();
  }, []);

  const uniqueModes = Array.from(new Set(groups.map((group) => group.mode))).sort();
  const modeOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueModes.map((mode) => ({ label: mode, value: mode })),
  ];

  const uniqueVenues = Array.from(new Set(groups.map((group) => group.venue_name))).sort();
  const venueOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueVenues.map((sede) => ({ label: sede, value: sede })),
  ];

  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return groups.filter((group) => {
      const matchesSearch =
        !searchTerm ||
        group.name.toLowerCase().includes(searchTerm) ||
        group.venue_name.toLowerCase().includes(searchTerm);
      const matchesSede =
        filterActiva.sede === '__All__' ? true : group.venue_name === filterActiva.sede;
      const matchesMode = filterActiva.mode === '__All__' ? true : group.mode === filterActiva.mode;
      return matchesSearch && matchesSede && matchesMode;
    });
  }, [inputValue, filterActiva, groups]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage,
  );

  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) setCurrentPage(totalPages - 1);
    else if (totalPages === 0) setCurrentPage(0);
  }, [filteredData.length, currentPage, totalPages]);

  const handleExtraFilterChange = (key: string, value: string) => {
    setFilterActiva((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(0); // Resetear a la primera página al cambiar el filtro
  };

  const extraFilters = [
    {
      label: 'Sede',
      key: 'sede',
      options: venueOptions,
    },
    {
      label: 'Modalidad',
      key: 'mode',
      options: modeOptions,
    },
  ];

  const sectionFilterChange = (value: string) => {
    setSection(value);
    setInputValue('');
    setCurrentPage(0);
  };

  // Reset currentPage when filteredData changes
  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    } else if (totalPages === 0) {
      setCurrentPage(0);
    }
  }, [filteredData.length, currentPage, totalPages]);

  // Open group details popup
  const openGroupPopup = (group: Group) => {
    setSelectedGroup(group);
    setIsGroupPopupOpen(true);
  };

  // Close group details popup
  const closeGroupPopup = () => {
    setIsGroupPopupOpen(false);
    setSelectedGroup(null);
  };

  return (
    <div className='fondo-tabla-forms flex flex-col p-6 gap-4 overflow-auto h-[50vh] sm:h-[75vh] items-center justify-between'>
      <div className='flex flex-wrap justify-between gap-4 w-full'>
        <div className='flex flex-1 gap-4  items-center w-full'>
          <div className='basis-2/3'>
            <InputField
              label=''
              showDescription={false}
              placeholder='Search'
              variant='secondary-shade'
              icon='MagnifyingGlass'
              value={inputValue}
              onChangeText={setInputValue}
            />
          </div>
          <div className='basis-1/3'>
            <FiltroEvento
              label='Filtros'
              labelOptions='Opciones'
              extraFilters={extraFilters}
              filterActiva={filterActiva}
              onExtraFilterChange={handleExtraFilterChange}
            />
          </div>
        </div>
      </div>
      <table className='min-w-full text-left text-sm'>
        <thead className='text-[#6E2D75] text-md'>
          <tr>
            <th className='p-2 text-center'>Grupo</th>
            <th className='p-2 text-center'>Modalidad</th>
            <th className='p-2 text-center'>Sede</th>
            <th className='p-2 text-center'>Cupo</th>
            <th className='p-2 text-center'>Horarios</th>
            <th className='p-2 text-center'>Acciones</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {paginatedData.map((group) => (
            <tr
              key={group.id_group}
              className={`border-t border-gray-300 ${group.id_group === selectedGroupId ? 'bg-purple-100' : ''}`}
            >
              <td className='p-2 text-center'>{group.name}</td>
              <td className='p-2 text-center'>{group.mode}</td>
              <td className='p-2 text-center'>{group.venue_name}</td>
              <td className='p-2 text-center'>{group.available_places}</td>
              <td className='p-2 text-center'>{group.schedule}</td>
              <td className='p-2 flex gap-2 justify-center'>
                <Button
                  label=''
                  variant='success'
                  round
                  showLeftIcon
                  IconLeft={Check}
                  onClick={() => onSelect(group.id_group)}
                />
                <Button
                  variant='primary'
                  label=''
                  round
                  showLeftIcon={true}
                  IconLeft={Eye}
                  type='button'
                  onClick={() => openGroupPopup(group)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        variant='secondary-shade'
        pageLinks={Array(totalPages).fill('#')}
      />
      {/* Group Details Popup */}
      {isGroupPopupOpen && selectedGroup && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='texto-popup bg-white p-6 rounded-lg shadow-lg w-96 relative max-h-full overflow-y-auto text-gray-800 custom-scrollbar-tabla'>
            <h2 className='text-3xl text-center'>Detalles del Grupo</h2>
            <div className='pt-6 pb-6'>
              <p>
                <strong>Nombre:</strong> {selectedGroup.name}
              </p>
              <p>
                <strong>Modalidad:</strong> {selectedGroup.mode}
              </p>
              <p>
                <strong>Sede:</strong> {selectedGroup.venue_name}
              </p>
              <p>
                <strong>Idioma:</strong> {selectedGroup.language}
              </p>
              <p>
                <strong>Nivel:</strong> {selectedGroup.level}
              </p>
              {selectedGroup.available_places !== undefined && (
                <p>
                  <strong>Cupo Disponible:</strong> {selectedGroup.available_places}
                </p>
              )}
              {selectedGroup.schedule && (
                <p>
                  <strong>Horario:</strong> {selectedGroup.schedule}
                </p>
              )}
            </div>
            <div className='mt-4 flex justify-center'>
              <Button label='Cerrar' variant='primary' type='button' onClick={closeGroupPopup} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantGroupSelectionTable;
