import { useState, useEffect, useMemo } from 'react';
import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import FiltroEvento from '../headers_menu_users/FiltroEvento';
import Pagination from '@components/buttons_inputs/Pagination';
import Button from '@components/buttons_inputs/Button';
import { MagnifyingGlass, Check, Eye, Calendar } from '@components/icons';

interface Group {
  id_group: number;
  name: string;
  mode: string;
  venue_name: string;
  language: string;
  level: string;
  available_places?: number;
  schedule?: string;
  start_date?: string;
  end_date?: string;
  start_hour?: string;
  end_hour?: string;
  excluded_days?: ExcludedDay[];
}

interface ExcludedDay {
  excluded_date: string; // formato ISO
  reason?: string;
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
    SEDE: '__All__',
    mode: '__All__',
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarDays, setCalendarDays] = useState<ExcludedDay[]>([]);
  const [calendarGroup, setCalendarGroup] = useState<Group | null>(null);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-MX', {
      weekday: 'short', // ej. 'lun.'
      day: '2-digit', // ej. '09'
      month: 'short', // ej. 'jun.'
      year: 'numeric', // ej. '2025'
    });
  };

  const formatTime = (timeVal?: string | Date | null) => {
    if (!timeVal) return 'N/A';
    let dateObj: Date;
    if (typeof timeVal === 'string') {
      // Puede venir como "HH:mm:ss", "HH:mm", o ISO
      if (/^\d{2}:\d{2}(:\d{2})?$/.test(timeVal)) {
        // Convertir a una fecha arbitraria para extraer la hora
        dateObj = new Date(`1970-01-01T${timeVal.length === 5 ? timeVal + ':00' : timeVal}Z`);
      } else {
        // ISO string
        dateObj = new Date(timeVal);
      }
    } else {
      dateObj = timeVal;
    }
    if (isNaN(dateObj.getTime())) return 'N/A';
    // Extraer hora y minutos en formato 24h
    const hh = dateObj.getUTCHours().toString().padStart(2, '0');
    const mm = dateObj.getUTCMinutes().toString().padStart(2, '0');
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
            group.start_date && group.end_date
              ? `${formatDate(group.start_date)} – ${formatDate(group.end_date)}`
              : undefined,
          start_date: group.start_date,
          end_date: group.end_date,
          // Guardar las horas tal como vienen para formatearlas después
          start_hour: group.start_hour,
          end_hour: group.end_hour,
          SEDE: group.venues?.name || 'N/A',
          cupo: `${group.occupied_places || 0}/${group.max_places || 'N/A'} Personas`,
          horarios:
            group.start_hour && group.end_hour
              ? `${formatTime(group.start_hour)} – ${formatTime(group.end_hour)}`
              : 'N/A',
          excluded_days: group.excluded_days || [],
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
    ...uniqueVenues.map((SEDE) => ({ label: SEDE, value: SEDE })),
  ];

  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return groups.filter((group) => {
      const matchesSearch =
        !searchTerm ||
        group.name.toLowerCase().includes(searchTerm) ||
        group.venue_name.toLowerCase().includes(searchTerm);
      const matchesSEDE =
        filterActiva.SEDE === '__All__' ? true : group.venue_name === filterActiva.SEDE;
      const matchesMode = filterActiva.mode === '__All__' ? true : group.mode === filterActiva.mode;
      return matchesSearch && matchesSEDE && matchesMode;
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
      label: 'SEDE',
      key: 'SEDE',
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

  // Abrir calendario de días de descanso
  const openCalendar = async (group: Group) => {
    setCalendarGroup(group);
    setIsCalendarOpen(true);
    try {
      const res = await fetch(`http://localhost:3000/api/groups/${group.id_group}/excluded_days`);
      if (!res.ok) throw new Error('No se pudieron obtener los días de descanso');
      const data = await res.json();
      setCalendarDays(Array.isArray(data) ? data : []);
    } catch (e) {
      // Usa los días excluidos del grupo si existen
      if (group.excluded_days && Array.isArray(group.excluded_days)) {
        setCalendarDays(group.excluded_days);
      } else {
        setCalendarDays([]);
      }
    }
  };

  // Cerrar calendario
  const closeCalendar = () => {
    setIsCalendarOpen(false);
    setCalendarDays([]);
    setCalendarGroup(null);
  };

  // Genera los días activos y de descanso para el calendario
  function getCalendarMap(group: Group, excluded: ExcludedDay[]) {
    if (!group.start_date || !group.end_date) return {};
    const start = new Date(group.start_date);
    const end = new Date(group.end_date);
    const excludedSet = new Set(excluded.map((d) => d.excluded_date.slice(0, 10)));
    const days: Record<string, 'active' | 'excluded'> = {};
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().slice(0, 10);
      days[key] = excludedSet.has(key) ? 'excluded' : 'active';
    }
    return days;
  }

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
            <th className='p-2 text-center'>SEDE</th>
            <th className='p-2 text-center'>Cupo</th>
            <th className='p-2 text-center'>Fechas</th>
            <th className='p-2 text-center'>Horarios</th>
            <th className='p-2 text-center'>Acciones</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {paginatedData.map((group) => {
            const isSelected = group.id_group === selectedGroupId;
            return (
              <tr
                key={group.id_group}
                className={`border-t border-gray-200 transition-colors duration-200 ${
                  isSelected ? 'bg-[#ede6f7] border-l-8 border-l-[#6E2D75]' : ''
                }`}
              >
                <td className='p-2 text-center'>{group.name}</td>
                <td className='p-2 text-center'>{group.mode}</td>
                <td className='p-2 text-center'>{group.venue_name}</td>
                <td className='p-2 text-center'>{group.available_places}</td>
                <td className='p-2 text-center'>
                  {group.start_date ? formatDate(group.start_date) : 'N/A'}
                  <br />
                  {group.end_date ? 'al ' + formatDate(group.end_date) : ''}
                </td>
                <td className='p-2 text-center'>
                  {group.start_hour ? formatTime(group.start_hour) : 'N/A'}
                  {group.end_hour ? ' - ' + formatTime(group.end_hour) : ''}
                </td>
                <td className='p-2 flex gap-2 justify-center'>
                  {!isSelected ? (
                    <Button
                      label=''
                      variant='success'
                      round
                      showLeftIcon
                      IconLeft={Check}
                      onClick={() => onSelect(group.id_group)}
                    />
                  ) : (
                    <span
                      className='inline-flex items-center px-3 py-1 rounded-full bg-[#6E2D75] text-white text-xs font-bold'
                      title='Grupo seleccionado'
                    >
                      Seleccionado
                    </span>
                  )}
                  <Button
                    variant='primary'
                    label=''
                    round
                    showLeftIcon={true}
                    IconLeft={Eye}
                    type='button'
                    onClick={() => openGroupPopup(group)}
                  />
                  <Button
                    variant='secondary'
                    label=''
                    round
                    showLeftIcon={true}
                    IconLeft={Calendar}
                    type='button'
                    onClick={() => openCalendar(group)}
                  />
                </td>
              </tr>
            );
          })}
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
                <strong>SEDE:</strong> {selectedGroup.venue_name}
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
      {/* Calendario de días activos y de descanso */}
      {isCalendarOpen && calendarGroup && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative max-h-full overflow-y-auto text-gray-800'>
            <h2 className='text-2xl text-center mb-4'>Calendario del Grupo</h2>
            <div className='mb-2 text-center'>
              <span className='font-semibold'>Curso:</span> {calendarGroup.name}
              <br />
              <span className='font-semibold'>Fechas:</span>{' '}
              {calendarGroup.start_date ? formatDate(calendarGroup.start_date) : 'N/A'} al{' '}
              {calendarGroup.end_date ? formatDate(calendarGroup.end_date) : 'N/A'}
            </div>
            <CalendarTable group={calendarGroup} excludedDays={calendarDays} />
            <div className='mt-4 flex justify-center'>
              <Button label='Cerrar' variant='primary' type='button' onClick={closeCalendar} />
            </div>
            <div className='mt-2 text-xs text-center'>
              <span className='inline-block w-3 h-3 bg-green-300 mr-1 align-middle'></span> Día
              activo
              <span className='inline-block w-3 h-3 bg-red-300 ml-4 mr-1 align-middle'></span> Día
              de descanso
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente para mostrar el calendario visualmente
function CalendarTable({ group, excludedDays }: { group: Group; excludedDays: ExcludedDay[] }) {
  if (!group.start_date || !group.end_date) return null;
  const start = new Date(group.start_date);
  const end = new Date(group.end_date);
  // Normaliza los días excluidos a formato YYYY-MM-DD
  const excludedSet = new Set(
    excludedDays
      .map((d) => {
        const date =
          typeof d.excluded_date === 'string' ? new Date(d.excluded_date) : d.excluded_date;
        return date instanceof Date && !isNaN(date.getTime())
          ? date.toISOString().slice(0, 10)
          : '';
      })
      .filter(Boolean),
  );
  // Generar todos los días entre start y end
  type CalendarDayType = 'active' | 'excluded' | 'empty';
  const days: { date: Date; type: CalendarDayType }[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().slice(0, 10);
    days.push({
      date: new Date(d),
      type: excludedSet.has(key) ? 'excluded' : 'active',
    });
  }
  // Agrupar por semanas (empezando en lunes)
  const weeks: { date: Date; type: CalendarDayType }[][] = [];
  let week: { date: Date; type: CalendarDayType }[] = [];
  days.forEach((day) => {
    if (week.length === 0 && day.date.getDay() !== 1) {
      // Rellenar días vacíos antes del primer día (si no es lunes)
      for (let i = 1; i < (day.date.getDay() === 0 ? 7 : day.date.getDay()); i++) {
        week.push({ date: new Date(''), type: 'empty' });
      }
    }
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length > 0) {
    while (week.length < 7) week.push({ date: new Date(''), type: 'empty' });
    weeks.push(week);
  }
  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  return (
    <table className='w-full border mb-2'>
      <thead>
        <tr>
          {dayNames.map((d) => (
            <th key={d} className='p-1 text-xs border'>
              {d}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, i) => (
          <tr key={i}>
            {week.map((day, j) =>
              day.type === 'empty' ? (
                <td key={j} className='border p-1 bg-gray-100'></td>
              ) : (
                <td
                  key={j}
                  className={`border p-1 text-center ${
                    day.type === 'excluded' ? 'bg-red-300' : 'bg-green-300'
                  }`}
                  title={day.type === 'excluded' ? 'Día de descanso' : 'Día activo'}
                >
                  {day.date.getDate()}
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ParticipantGroupSelectionTable;
