import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import { MagnifyingGlass } from '@/components/icons';
import { useState, useMemo } from 'react';
import { TableData } from '@/types/tableData';

interface DataTableProps<T extends TableData> {
  data: T[];
  columns: { key: string; label: string }[];
  onSearch: (term: string) => void;
  rowsPerPage?: number;
  role?: 'admin';
  renderCell?: (item: T, columnKey: string) => React.ReactNode;
}

const DataTable = <T extends TableData>({
  data,
  columns,
  onSearch,
  rowsPerPage = 4,
  renderCell,
}: DataTableProps<T>) => {
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return searchTerm
      ? data.filter((item) =>
          columns.some((col) => String(item[col.key]).toLowerCase().includes(searchTerm)),
        )
      : data;
  }, [inputValue, data, columns]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage,
  );

  return (
    <div className='p-6 flex flex-col gap-4'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div className='flex-1'>
          <InputField
            label=''
            showDescription={false}
            placeholder='Search'
            showError={false}
            variant='primary'
            icon='MagnifyingGlass'
            value={inputValue}
            onChangeText={(val) => {
              setInputValue(val);
              onSearch(val);
            }}
          />
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full text-left text-sm'>
          <thead className='text-purple-800 font-bold'>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className='p-2 text-center'>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {paginatedData.map((item, index) => (
              <tr key={index} className='border-t border-gray-300'>
                {columns.map((col) => (
                  <td key={col.key} className='p-2 text-center'>
                    {renderCell ? renderCell(item, col.key) : String(item[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-auto pt-4 flex justify-center'>
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          variant='secondary-shade'
          pageLinks={Array(totalPages).fill('#')}
        />
      </div>
    </div>
  );
};

export default DataTable;
