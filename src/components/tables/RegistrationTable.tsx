import { PrismaClient } from '@prisma/client';
import DataTable from './DataTable';
import Button from '@/components/buttons_inputs/Button';
import { Eye, Check, X } from '@/components/icons';
import { useState } from 'react';

const prisma = new PrismaClient();

interface RegistrationTableProps {
  section: 'PARTICIPANTES' | 'APOYO & STAFF' | 'SEDES';
}

const RegistrationTable = ({ section }: RegistrationTableProps) => {
  const [data, setData] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Fetch data based on section
  const fetchData = async () => {
    let result;
    switch (section) {
      case 'PARTICIPANTES':
        result = await prisma.participants.findMany({
          select: {
            id_participant: true,
            name: true,
            paternal_name: true,
            maternal_name: true,
            email: true,
            year: true,
            venues: {
              select: { name: true },
            },
            created_at: true,
          },
        });
        setData(
          result.map((item) => ({
            id: item.id_participant.toString(),
            nombre: `${item.name || ''} ${item.paternal_name || ''} ${item.maternal_name || ''}`.trim(),
            sede: item.venues?.name || '',
            fecha: item.created_at.toLocaleDateString('es-MX'),
          }))
        );
        break;
      case 'APOYO & STAFF':
        result = await prisma.collaborators.findMany({
          select: {
            id_collaborator: true,
            name: true,
            paternal_name: true,
            maternal_name: true,
            email: true,
            phone_number: true,
            college: true,
            created_at: true,
            venues: {
              select: { name: true },
            },
          },
        });
        setData(
          result.map((item) => ({
            id: item.id_collaborator.toString(),
            nombre: `${item.name || ''} ${item.paternal_name || ''} ${item.maternal_name || ''}`.trim(),
            sede: item.venues?.name || '',
            fecha: item.created_at.toLocaleDateString('es-MX'),
          }))
        );
        break;
      case 'SEDES':
        result = await prisma.venues.findMany({
          select: {
            id_venue: true,
            name: true,
            state: true,
            created_at: true,
          },
        });
        setData(
          result.map((item) => ({
            id: item.id_venue.toString(),
            institucion: item.name,
            lugar: item.state || '',
            fecha: item.created_at.toLocaleDateString('es-MX'),
          }))
        );
        break;
    }
  };

  // Initial fetch
  fetchData();

  const columns =
    section === 'SEDES'
      ? [
          { key: 'institucion', label: 'Institución' },
          { key: 'lugar', label: 'Lugar' },
          { key: 'fecha', label: 'Fecha' },
        ]
      : [
          { key: 'nombre', label: 'Nombre' },
          { key: 'sede', label: 'Sede' },
          { key: 'fecha', label: 'Fecha' },
        ];

  const openPopup = (item: any) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedItem(null);
  };

  const handleAccept = async () => {
    if (selectedItem) {
      // Update status in database (example for participants)
      if (section === 'PARTICIPANTES') {
        await prisma.participants.update({
          where: { id_participant: parseInt(selectedItem.id) },
          data: { status: 'Aprobada' },
        });
      } else if (section === 'APOYO & STAFF') {
        await prisma.collaborators.update({
          where: { id_collaborator: parseInt(selectedItem.id) },
          data: { status: 'Aprobada' },
        });
      } else if (section === 'SEDES') {
        await prisma.venues.update({
          where: { id_venue: parseInt(selectedItem.id) },
          data: { status: 'Registrada_con_participantes' },
        });
      }
      fetchData(); // Refresh data
      closePopup();
    }
  };

  const handleReject = async () => {
    if (selectedItem) {
      if (section === 'PARTICIPANTES') {
        await prisma.participants.update({
          where: { id_participant: parseInt(selectedItem.id) },
          data: { status: 'Rechazada' },
        });
      } else if (section === 'APOYO & STAFF') {
        await prisma.collaborators.update({
          where: { id_collaborator: parseInt(selectedItem.id) },
          data: { status: 'Rechazada' },
        });
      } else if (section === 'SEDES') {
        await prisma.venues.update({
          where: { id_venue: parseInt(selectedItem.id) },
          data: { status: 'Rechazada' },
        });
      }
      fetchData(); // Refresh data
      closePopup();
    }
  };

  return (
    <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade">
      <h1 className="text-4xl font-bold">Solicitudes de Registro</h1>
      <DataTable
        data={data}
        columns={columns}
        onSearch={() => {}}
        role="admin"
      />
      {isPopupOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-3xl font-bold mb-4 text-center">Solicitud de Registro</h2>
            {columns.map((col) => (
              <p key={col.key}><strong>{col.label}:</strong> {selectedItem[col.key]}</p>
            ))}
            <div className="mt-4 flex justify-center gap-4">
              <Button label="Aceptar" variant="success" onClick={handleAccept} />
              <Button label="Rechazar" variant="error" onClick={handleReject} />
              <Button label="Cerrar" variant="primary" onClick={closePopup} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationTable;