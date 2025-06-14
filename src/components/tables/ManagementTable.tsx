import { useState, useMemo, useEffect } from 'react';
import InputField from '@components/buttons_inputs/InputField';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import Pagination from '@/components/buttons_inputs/Pagination';
import Button from '@components/buttons_inputs/Button';
import { MagnifyingGlass, Check, Eye, Star, X } from '@/components/icons';
import withIconDecorator from '../decorators/IconDecorator';

interface Group {
  id_group: number;
  name: string;
  mode: string;
  language: string;
  level: string;
  start_date: string;
  end_date: string;
  venue_name: string;
  max_places: number;
  occupied_places: number;
  start_hour: string;
  end_hour: string;
  location: string;
}

interface GroupSelectionTableProps {
  onSelect: (id_group: number) => void;
  selectedGroupId?: number;
  rowsPerPage?: number;
}

const GroupSelectionTable: React.FC<GroupSelectionTableProps> = ({
  onSelect,
  selectedGroupId,
  rowsPerPage = 4,
}) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [section, setSection] = useState('__All__');
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  // Fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/groups');
        const data = await response.json();
        const transformedGroups = data.map((group: any) => ({
          id_group: group.id_group,
          name: group.name,
          mode: group.mode || 'Presencial',
          language: group.language || 'Español',
          level: group.level || 'Básico',
          start_date: group.start_date
            ? new Date(group.start_date).toLocaleDateString('es-MX')
            : 'N/A',
          end_date: group.end_date ? new Date(group.end_date).toLocaleDateString('es-MX') : 'N/A',
          venue_name: group.venues?.name || 'N/A',
          max_places: group.max_places || 0,
          occupied_places: group.occupied_places || 0,
          start_hour: group.start_hour || 'N/A',
          end_hour: group.end_hour || 'N/A',
          location: group.location || 'N/A',
        }));
        setGroups(transformedGroups);
      } catch (err) {
        console.error('Error fetching groups:', err);
      }
    };
    fetchGroups();
  }, []);

  // Get unique modes
  const uniqueModes = Array.from(new Set(groups.map((group) => group.mode))).sort();
  const modeOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueModes.map((mode) => ({ label: mode, value: mode })),
  ];

  // Filter groups
  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return groups.filter((group) => {
      const matchesSearch =
        !searchTerm ||
        group.name.toLowerCase().includes(searchTerm) ||
        group.venue_name.toLowerCase().includes(searchTerm);
      const matchesMode = section === '__All__' ? true : group.mode === section;
      return matchesSearch && matchesMode;
    });
  }, [inputValue, section, groups]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage,
  );

  // Reset currentPage when filteredData changes
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

  const openModal = (group: Group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGroup(null);
    setIsModalOpen(false);
  };

  return (
    <div className='fondo-tabla-forms flex flex-col p-6 gap-4 overflow-auto h-[50vh] sm:h-[75vh]'>
      <div className='flex flex-wrap justify-between gap-4'>
        <div className='flex flex-1 gap-4 top-0'>
          <div className='basis-2/3'>
            <InputField
              label=''
              showDescription={false}
              placeholder='Search'
              showError={false}
              variant='primary'
              icon='MagnifyingGlass'
              value={inputValue}
              onChangeText={setInputValue}
            />
          </div>
          <div className='basis-1/3'>
            <FiltroEvento
              disableCheckboxes
              label='Modalidad'
              showSecciones
              labelSecciones='Seleccionar'
              secciones={modeOptions}
              seccionActiva={section}
              onChangeSeccion={sectionFilterChange}
            />
          </div>
        </div>
      </div>
      <div className='overflow-auto'>
        <table className='min-w-full text-left text-sm'>
          <thead className='sticky top-0 fondo-titulos-tabla text-purple-800 font-bold'>
            <tr className='texto-primary-shade'>
              <th className='p-2 text-center'>Grupo</th>
              <th className='p-2 text-center'>Modalidad</th>
              <th className='p-2 text-center'>Idioma</th>
              <th className='p-2 text-center'>Nivel</th>
              <th className='p-2 text-center'>Fechas</th>
              <th className='p-2 text-center'>Sede</th>
              <th className='p-2 text-center'></th>
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
                <td className='p-2 text-center'>{group.language}</td>
                <td className='p-2 text-center'>{group.level}</td>
                <td className='p-2 text-center'>{`${group.start_date} - ${group.end_date}`}</td>
                <td className='p-2 text-center'>{group.venue_name}</td>
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
                    label=''
                    variant='primary'
                    round
                    showLeftIcon
                    IconLeft={Eye}
                    onClick={() => openModal(group)}
                  />
                  <Button label='' variant='warning' round showLeftIcon IconLeft={Star} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        variant='secondary-shade'
        pageLinks={Array(totalPages).fill('#')}
      />
      {isModalOpen && selectedGroup && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-96 relative text-black'>
            <h2 className='text-3xl font-bold mb-4 text-center'>Detalles del Grupo</h2>
            <p>
              <strong>Nombre:</strong> {selectedGroup.name}
            </p>
            <p>
              <strong>Modalidad:</strong> {selectedGroup.mode}
            </p>
            <p>
              <strong>Idioma:</strong> {selectedGroup.language}
            </p>
            <p>
              <strong>Nivel:</strong> {selectedGroup.level}
            </p>
            <p>
              <strong>Fechas:</strong> {`${selectedGroup.start_date} - ${selectedGroup.end_date}`}
            </p>
            <p>
              <strong>Horario:</strong> {`${selectedGroup.start_hour} - ${selectedGroup.end_hour}`}
            </p>
            <p>
              <strong>Sede:</strong> {selectedGroup.venue_name}
            </p>
            <p>
              <strong>Ubicación:</strong> {selectedGroup.location}
            </p>
            <p>
              <strong>Capacidad:</strong> {selectedGroup.max_places}
            </p>
            <p>
              <strong>Lugares Ocupados:</strong> {selectedGroup.occupied_places}
            </p>
            <div className='mt-4 flex justify-center'>
              <Button
                label='Cerrar'
                variant='primary'
                onClick={closeModal}
                showLeftIcon
                IconLeft={X}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupSelectionTable;
