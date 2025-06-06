'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import InputField from '@/components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@/components/buttons_inputs/Button';
import { MapPin } from '@/components/icons'; // Ícono para la sede (similar a MapPin en EditarParticipante)
import withIconDecorator from '@/components/decorators/IconDecorator';
import { useNotification } from '@/components/buttons_inputs/Notification';

interface Mentora {
  id_mentor: number;
  name: string;
  paternal_name: string;
  maternal_name: string;
  email: string;
  phone_number: string;
  id_venue: number;
  venue: string;
}

interface Venue {
  id_venue: number;
  name: string;
}

const EditarMentora = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // Obtener el id_mentor de la URL
  const { notify } = useNotification();

  const [mentora, setMentora] = useState<Mentora | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [name, setName] = useState('');
  const [paternalName, setPaternalName] = useState('');
  const [maternalName, setMaternalName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedVenue, setSelectedVenue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
        if (!token) {
          router.push('/login');
          return;
        }

        // Obtener datos de la mentora
        const mentorResponse = await fetch(`/api/mentors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!mentorResponse.ok) {
          const errorData = await mentorResponse.json().catch(() => ({ message: 'Respuesta no válida del servidor' }));
          if (mentorResponse.status === 404) {
            throw new Error('Mentora no encontrada');
          }
          throw new Error(`Error fetching mentor: ${mentorResponse.status} - ${errorData.message || 'Unknown error'}`);
        }
        const mentorData = await mentorResponse.json();
        const mentor = mentorData.data;
        setMentora(mentor);
        setName(mentor.name || '');
        setPaternalName(mentor.paternal_name || '');
        setMaternalName(mentor.maternal_name || '');
        setEmail(mentor.email || '');
        setPhoneNumber(mentor.phone_number || '');

        // Obtener sedes
        const venuesResponse = await fetch('/api/venues', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!venuesResponse.ok) {
          const errorData = await venuesResponse.json();
          throw new Error(`Error fetching venues: ${venuesResponse.status} - ${errorData.message || 'Unknown error'}`);
        }
        const venuesData = await venuesResponse.json();
        setVenues(venuesData);

        // Establecer la sede inicial
        const venue = venuesData.find((v: Venue) => v.id_venue === mentor.id_venue);
        setSelectedVenue(venue ? venue.name : '');
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, router]);

  const venueOptions = venues.map((venue) => ({
    label: venue.name,
    value: venue.name,
  }));

  const handleVenueChange = (value: string) => {
    setSelectedVenue(value);
  };

  const handleSubmit = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
      if (!token) {
        router.push('/login');
        return;
      }

      const selectedVenueData = venues.find((v) => v.name === selectedVenue);
      if (!selectedVenueData) {
        throw new Error('Sede seleccionada no encontrada');
      }

      const updatedMentora = {
        name,
        paternal_name: paternalName,
        maternal_name: maternalName,
        email,
        phone_number: phoneNumber,
        id_venue: selectedVenueData.id_venue,
      };

      const response = await fetch(`/api/mentors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedMentora),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error updating mentor: ${errorData.message || 'Unknown error'}`);
      }

      notify({
        color: 'green',
        title: 'Mentora Actualizada',
        message: `La mentora ${name} ha sido actualizada exitosamente`,
        duration: 5000,
      });

      router.push('/admin/gestion-usuarios/mentoras');
    } catch (error: any) {
      console.error('Error updating mentor:', error);
      notify({
        color: 'red',
        title: 'Error',
        message: `No se pudo actualizar la mentora: ${error.message}`,
        duration: 5000,
      });
    }
  };

  if (error) {
    return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
  }

  if (!mentora) {
    return <div className="p-6 pl-14">Cargando...</div>;
  }

  return (
    <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
      <PageTitle>Editar Mentora</PageTitle>

      <div className="fondo-editar-usuario flex flex-col p-6 gap-4 overflow-auto">
        <div className="flex justify-between gap-4 items-center pb-2 mb-4">
          <div className="basis-1/3">
            <InputField
              label="Nombre"
              icon='Fingerprint'
              showDescription={false}
              placeholder={mentora.name}
              showError={false}
              variant="primary"
              value={name}
              onChangeText={(val) => setName(val)}
            />
          </div>

          <div className="basis-1/3">
            <InputField
              label="Apellido Paterno"
              icon='Fingerprint'
              showDescription={false}
              placeholder={mentora.paternal_name || 'Sin apellido paterno'}
              showError={false}
              variant="primary"
              value={paternalName}
              onChangeText={(val) => setPaternalName(val)}
            />
          </div>
          <div className="basis-1/3">
            <InputField
              label="Apellido Materno"
              icon='Fingerprint'
              showDescription={false}
              placeholder={mentora.maternal_name || 'Sin apellido materno'}
              showError={false}
              variant="primary"
              value={maternalName}
              onChangeText={(val) => setMaternalName(val)}
            />
          </div>

        </div>

        <div className="flex gap-4 justify-between mb-4">

          <div className="basis-1/2">
            <InputField
              label="Correo"
              icon='At'
              showDescription={false}
              placeholder={mentora.email}
              showError={false}
              variant="accent"
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
          </div>
          <div className="basis-1/2">
            <InputField
              label="Teléfono"
              icon='Phone'
              showDescription={false}
              placeholder={mentora.phone_number}
              showError={false}
              variant="accent"
              value={phoneNumber}
              onChangeText={(val) => setPhoneNumber(val)}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-between mb-4">
          <div className="basis-1/2">
            <Dropdown
              label="Sede"
              options={venueOptions}
              value={selectedVenue}
              onChange={handleVenueChange}
              variant="secondary"
              Icon={withIconDecorator(MapPin)} // Ícono decorativo similar a EditarParticipante
            />
          </div>
        </div>

        {/* Botón Listo */}
        <div className="flex gap-4 justify-between mt-auto">
          <div className="flex gap-4">
            <Button label="Confirmar" variant="success" onClick={handleSubmit} />
            <Button label="Cancelar" variant="primary" href="/admin/gestion-usuarios/mentoras" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarMentora;