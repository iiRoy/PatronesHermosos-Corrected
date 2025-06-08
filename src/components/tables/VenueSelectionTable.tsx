import { useState, useEffect, useMemo } from 'react';
import InputField from '@components/buttons_inputs/InputField';
import Pagination from '@components/buttons_inputs/Pagination';
import Button from '@components/buttons_inputs/Button';
import { MagnifyingGlass, Check, Eye } from '@components/icons';

interface Venue {
  id_venue: number;
  name: string;
  state: string;
  address: string;
}

interface VenueSelectionTableProps {
  onSelect: (id_venue: number) => void;
  selectedVenueId?: number;
  rowsPerPage?: number;
}

const VenueSelectionTable: React.FC<VenueSelectionTableProps> = ({
  onSelect,
  selectedVenueId,
  rowsPerPage = 4,
}) => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch venues
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/venues');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Expected an array of venues, but received: ' + JSON.stringify(data));
        }
        const transformedVenues = data.map((venue: any) => ({
          id_venue: venue.id_venue,
          name: venue.name || 'N/A',
          state: venue.state || 'N/A',
          address: venue.address || 'N/A',
        }));
        setVenues(transformedVenues);
      } catch (err) {
        console.error('Error fetching venues:', err);
      }
    };
    fetchVenues();
  }, []);

  // Filter venues
  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return venues.filter((venue) => {
      return (
        !searchTerm ||
        venue.name.toLowerCase().includes(searchTerm) ||
        venue.state.toLowerCase().includes(searchTerm) ||
        venue.address.toLowerCase().includes(searchTerm)
      );
    });
  }, [inputValue, venues]);

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

  return (
    <div className='fondo-tabla-forms flex flex-col p-6 gap-4 overflow-auto h-[50vh] sm:h-[75vh]'>
      <div className='flex flex-wrap justify-between gap-4'>
        <div className='flex flex-1 gap-4 top-0'>
          <InputField
            label=''
            showDescription={false}
            placeholder='Buscar sede, ciudad o dirección'
            variant='primary'
            icon='MagnifyingGlass'
            value={inputValue}
            onChangeText={setInputValue}
          />
        </div>
      </div>
      <div className='overflow-auto'>
        <table className='min-w-full text-left text-sm'>
          <thead className='sticky top-0 fondo-titulos-tabla text-purple-800 font-bold'>
            <tr className='texto-primary-shade'>
              <th className='p-2 text-center'>Sede</th>
              <th className='p-2 text-center'>Ciudad</th>
              <th className='p-2 text-center'>Dirección</th>
              <th className='p-2 text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {paginatedData.map((venue) => (
              <tr
                key={venue.id_venue}
                className={`border-t border-gray-300 ${venue.id_venue === selectedVenueId ? 'bg-purple-100' : ''}`}
              >
                <td className='p-2 text-center'>{venue.name}</td>
                <td className='p-2 text-center'>{venue.state}</td>
                <td className='p-2 text-center'>{venue.address}</td>
                <td className='p-2 flex gap-2 justify-center'>
                  <Button
                    label=''
                    variant='success'
                    round
                    showLeftIcon
                    IconLeft={Check}
                    onClick={() => onSelect(venue.id_venue)}
                  />
                  <Button label='' variant='primary' round showLeftIcon IconLeft={Eye} />
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
        variant='secondary-shade'
        pageLinks={Array(totalPages).fill('#')}
      />
    </div>
  );
};

export default VenueSelectionTable;
