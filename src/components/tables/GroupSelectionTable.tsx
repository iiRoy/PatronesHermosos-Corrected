import { useState, useEffect, useMemo } from 'react';
import InputField from '@components/buttons_inputs/InputField';
import Pagination from '@components/buttons_inputs/Pagination';
import Button from '@components/buttons_inputs/Button';
import { MagnifyingGlass, Check, Eye } from '@components/icons';

interface Group {
  id_group: number;
  name: string;
  mode: string;
  venue_name: string;
  language: string;
  level: string;
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
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch groups
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
          name: group.name || 'N/A',
          mode: group.mode || 'Presencial',
          venue_name: group.venues?.name || 'N/A',
          language: group.language || 'N/A',
          level: group.level || 'N/A',
        }));
        setGroups(transformedGroups);
      } catch (err) {
        console.error('Error fetching groups:', err);
      }
    };
    fetchGroups();
  }, []);

  // Filter groups
  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return groups.filter(group => {
      return (
        !searchTerm ||
        group.name.toLowerCase().includes(searchTerm) ||
        group.venue_name.toLowerCase().includes(searchTerm) ||
        group.language.toLowerCase().includes(searchTerm) ||
        group.level.toLowerCase().includes(searchTerm)
      );
    });
  }, [inputValue, groups]);

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

  // Placeholder for viewing group details
  const handleViewDetails = (group: Group) => {
    alert(`Detalles del grupo:\nNombre: ${group.name}\nModalidad: ${group.mode}\nSede: ${group.venue_name}\nIdioma: ${group.language}\nNivel: ${group.level}`);
  };

  return (
    <div className="fondo-tabla-forms flex flex-col p-6 gap-4 overflow-auto h-[50vh] sm:h-[75vh]">
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-1 gap-4 top-0">
          <InputField
            label=""
            showDescription={false}
            placeholder="Buscar grupo, sede, idioma o nivel"
            variant="primary"
            icon="MagnifyingGlass"
            value={inputValue}
            onChangeText={setInputValue}
          />
        </div>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="sticky top-0 fondo-titulos-tabla text-purple-800 font-bold">
            <tr className="texto-primary-shade">
              <th className="p-2 text-center">Grupo</th>
              <th className="p-2 text-center">Modalidad</th>
              <th className="p-2 text-center">Sede</th>
              <th className="p-2 text-center">Idioma</th>
              <th className="p-2 text-center">Nivel</th>
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
                <td className="p-2 text-center">{group.venue_name}</td>
                <td className="p-2 text-center">{group.language}</td>
                <td className="p-2 text-center">{group.level}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <Button
                    label=""
                    variant="success"
                    round
                    showLeftIcon
                    IconLeft={Check}
                    type="button" // Prevent form submission
                    onClick={() => onSelect(group.id_group)}
                  />
                  <Button
                    label=""
                    variant="primary"
                    round
                    showLeftIcon
                    IconLeft={Eye}
                    type="button" // Prevent form submission
                    onClick={() => handleViewDetails(group)}
                  />
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