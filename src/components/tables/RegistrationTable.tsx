'use client';
import { useState, useEffect } from 'react';
import DataTable from './DataTable';
import Button from '@/components/buttons_inputs/Button';
import { Eye } from '@/components/icons';
import { TableData } from '@/types/tableData';

interface RegistrationTableProps {
  section: 'PARTICIPANTES' | 'APOYO & STAFF' | 'SEDES';
}

const RegistrationTable = ({ section }: RegistrationTableProps) => {
  const [data, setData] = useState<TableData[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TableData | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/registrations?section=${section}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token if required
          },
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Error fetching data');
        setData(result);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    };
    fetchData();
  }, [section]);

  const columns =
    section === 'SEDES'
      ? [
          { key: 'institucion', label: 'Institución' },
          { key: 'lugar', label: 'Lugar' },
          { key: 'actions', label: 'Acciones' },
        ]
      : [
          { key: 'nombre', label: 'Nombre' },
          { key: 'sede', label: 'Sede' },
          { key: 'actions', label: 'Acciones' },
        ];

  const openPopup = (item: TableData) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedItem(null);
  };

  const handleAccept = async () => {
    if (selectedItem) {
      try {
        const response = await fetch(`http://localhost:3001/api/registrations/${selectedItem.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ status: 'accept', section }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Error accepting registration');
        const fetchResponse = await fetch(
          `http://localhost:3001/api/registrations?section=${section}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        const newData = await fetchResponse.json();
        setData(newData);
        closePopup();
      } catch (error) {
        console.error('Error accepting registration:', error);
      }
    }
  };

  const handleReject = async () => {
    if (selectedItem) {
      try {
        const response = await fetch(`http://localhost:3001/api/registrations/${selectedItem.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ status: 'reject', section }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Error rejecting registration');
        const fetchResponse = await fetch(
          `http://localhost:3001/api/registrations?section=${section}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        const newData = await fetchResponse.json();
        setData(newData);
        closePopup();
      } catch (error) {
        console.error('Error rejecting registration:', error);
      }
    }
  };

  const formatValue = (value: string | number | Date | undefined): string => {
    if (value instanceof Date) {
      return value.toLocaleDateString('es-MX');
    }
    return value?.toString() ?? 'N/A';
  };

  return (
    <div className='p-6 pl-14 flex gap-4 flex-col text-primaryShade'>
      <h1 className='text-4xl font-bold'>Solicitudes de Registro</h1>
      <DataTable
        data={data}
        columns={columns}
        onSearch={() => {}}
        role='admin'
        renderCell={(item: TableData, columnKey: string) => {
          if (columnKey === 'actions') {
            return (
              <div className='flex gap-2 justify-center'>
                <Button
                  label=''
                  variant='primary'
                  round
                  showLeftIcon
                  IconLeft={Eye}
                  onClick={() => openPopup(item)}
                />
              </div>
            );
          }
          return formatValue(item[columnKey as keyof TableData]);
        }}
      />
      {isPopupOpen && selectedItem && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-96 relative text-black'>
            <h2 className='text-3xl font-bold mb-4 text-center'>Solicitud de Registro</h2>
            {columns
              .filter((col) => col.key !== 'actions')
              .map((col) => (
                <p key={col.key}>
                  <strong>{col.label}:</strong>{' '}
                  {formatValue(selectedItem[col.key as keyof TableData])}
                </p>
              ))}
            <div className='mt-4 flex justify-center gap-4'>
              <Button label='Aceptar' variant='success' onClick={handleAccept} />
              <Button label='Rechazar' variant='error' onClick={handleReject} />
              <Button label='Cerrar' variant='primary' onClick={closePopup} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationTable;
