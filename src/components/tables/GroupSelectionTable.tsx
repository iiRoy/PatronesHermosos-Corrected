import { useState, useEffect, useMemo } from 'react';
import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Pagination from '@components/buttons_inputs/Pagination';
import Button from '@components/buttons_inputs/Button';
import { MagnifyingGlass, Check, Eye, Star } from '@components/icons';

interface Group {
  id_group: number;
  name: string;
  mode: string;
  sede: string;
  cupo: string;
  horarios: string;
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

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/groups');
        const data = await response.json();
        const transformedGroups = data.map((group: any) => ({
          id_group: group.id_group,
          name: group.name,
          mode: group.mode || 'Presencial',
          sede: group.venues?.name || 'N/A',
          cupo: `${group.occupied_places || 0}/${group.max_places || 'N/A'} Personas`,
          horarios: `${group.start_hour || 'N/A'} - ${group.end_hour || 'N/A'}`,
        }));
        setGroups(transformedGroups);
      } catch (err) {
        console.error('Error fetching groups:', err);
      }
    };
    fetchGroups();
  }, []);

  const uniqueModes = Array.from(new Set(groups.map(group => group.mode))).sort();
  const modeOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueModes.map(mode => ({ label: mode, value: mode })),
  ];

  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return groups.filter(group => {
      const matchesSearch = !searchTerm ||
        group.name.toLowerCase().includes(searchTerm) ||
        group.sede.toLowerCase().includes(searchTerm);
      const matchesMode = section === '__All__' ? true : group.mode === section;
      return matchesSearch && matchesMode;
    });
  }, [inputValue, section, groups]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) setCurrentPage(totalPages - 1);
    else if (totalPages === 0) setCurrentPage(0);
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
          <InputField
            label=""
            showDescription={false}
            placeholder="Search"
            variant="primary"
            icon="MagnifyingGlass"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <Dropdown
            label="Modalidad"
            options={modeOptions}
            value={section}
            onChange={sectionFilterChange}
            variant="primary"
          />
        </div>
      </div>
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-2 text-center">Grupo</th>
            <th className="p-2 text-center">Modalidad</th>
            <th className="p-2 text-center">Sede</th>
            <th className="p-2 text-center">Cupo</th>
            <th className="p-2 text-center">Horarios</th>
            <th className="p-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {paginatedData.map((group) => (
            <tr
              key={group.id_group}
              className={`border-t border-gray-300 ${group.id_group === selectedGroupId ? 'bg-purple-100' : ''}`}
            >
              <td className="p-2 text-center">{group.name}</td>
              <td className="p-2 text-center">{group.mode}</td>
              <td className="p-2 text-center">{group.sede}</td>
              <td className="p-2 text-center">{group.cupo}</td>
              <td className="p-2 text-center">{group.horarios}</td>
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

export default ParticipantGroupSelectionTable;