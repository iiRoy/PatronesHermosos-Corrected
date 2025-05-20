import { useState, useMemo, useEffect } from 'react';
import InputField from '@components/buttons_inputs/InputField';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import Pagination from '@/components/buttons_inputs/Pagination';
import Button from '@components/buttons_inputs/Button';
import { MagnifyingGlass, Check, Eye, Star } from '@components/icons';

interface Group {
  id_group: number;
  name: string;
  mode: string;
  language: string;
  level: string;
  start_date: string;
  end_date: string;
  venue_name: string;
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
          start_date: group.start_date ? new Date(group.start_date).toLocaleDateString('es-MX') : 'N/A',
          end_date: group.end_date ? new Date(group.end_date).toLocaleDateString('es-MX') : 'N/A',
          venue_name: group.venues?.name || 'N/A',
        }));
        setGroups(transformedGroups);
      } catch (err) {
        console.error('Error fetching groups:', err);
      }
    };
    fetchGroups();
  }, []);

  // Get unique modes
  const uniqueModes = Array.from(new Set(groups.map(group => group.mode))).sort();
  const modeOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueModes.map(mode => ({ label: mode, value: mode })),
  ];

  // Filter groups
  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return groups.filter(group => {
      const matchesSearch = !searchTerm ||
        group.name.toLowerCase().includes(searchTerm) ||
        group.venue_name.toLowerCase().includes(searchTerm);
      const matchesMode = section === '__All__' ? true : group.mode === section;
      return matchesSearch && matchesMode;
    });
  }, [inputValue, section, groups]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
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

  return (
    <div className="fondo-tabla-forms flex flex-col p-6 gap-4 overflow-auto h-[50vh] sm:h-[75vh]">
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-1 gap-4 top-0">
          <div className="basis-2/3">
            <InputField
              label=""
              showDescription={false}
              placeholder="Search"
              showError={false}
              variant="primary"
              icon="MagnifyingGlass"
              value={inputValue}
              onChangeText={setInputValue}
            />
          </div>
          <div className="basis-1/3">
            <FiltroEvento
              disableCheckboxes
              label="Modalidad"
              showSecciones
              labelSecciones="Seleccionar"
              secciones={modeOptions}
              seccionActiva={section}
              onChangeSeccion={sectionFilterChange}
            />
          </div>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="sticky top-0 fondo-titulos-tabla text-purple-800 font-bold">
            <tr className="texto-primary-shade">
              <th className="p-2 text-center">Grupo</th>
              <th className="p-2 text-center">Modalidad</th>
              <th className="p-2 text-center">Idioma</th>
              <th className="p-2 text-center">Nivel</th>
              <th className="p-2 text-center">Fechas</th>
              <th className="p-2 text-center">Sede</th>
              <th className="p-2 text-center"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paginatedData.map((group, index) => (
              <tr
                key={group.id_group}
                className={`border-t border-gray-300 ${group.id_group === selectedGroupId ? 'bg-purple-100' : ''}`}
              >
                <td className="p-2 text-center">{group.name}</td>
                <td className="p-2 text-center">{group.mode}</td>
                <td className="p-2 text-center">{group.language}</td>
                <td className="p-2 text-center">{group.level}</td>
                <td className="p-2 text-center">{`${group.start_date} - ${group.end_date}`}</td>
                <td className="p-2 text-center">{group.venue_name}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <Button
                    label=""
                    variant="success"
                    round
                    showLeftIcon
                    IconLeft={Check}
                    onClick={() => onSelect(group.id_group)}
                  />
                  <Button label="" variant="primary" round showLeftIcon IconLeft={Eye} />
                  <Button label="" variant="warning" round showLeftIcon IconLeft={Star} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        variant="secondary-shade"
        pageLinks={Array(totalPages).fill('#')}
      />
    </div>
  );
};

export default GroupSelectionTable;