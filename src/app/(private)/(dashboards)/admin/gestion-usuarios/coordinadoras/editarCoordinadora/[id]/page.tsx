'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import InputField from '@/components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@/components/buttons_inputs/Button';
import { MapPin } from '@/components/icons'; // Ícono para la sede
import withIconDecorator from '@/components/decorators/IconDecorator';
import { useNotification } from '@/components/buttons_inputs/Notification';

interface Coordinadora {
  id_venue_coord: number;
  name: string;
  paternal_name: string;
  maternal_name: string;
  email: string;
  phone_number: string;
  username: string;
  id_venue: number;
}

interface Venue {
  id_venue: number;
  name: string;
}

const EditarCoordinadora = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // Obtener el id_venue_coord de la URL
  const { notify } = useNotification();

  const [coordinadora, setCoordinadora] = useState<Coordinadora | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [name, setName] = useState('');
  const [paternalName, setPaternalName] = useState('');
  const [maternalName, setMaternalName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
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

        // Obtener datos de la coordinadora
        const coordResponse = await fetch(`/api/venue-coordinators/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!coordResponse.ok) {
          const errorData = await coordResponse.json().catch(() => ({ message: 'Respuesta no válida del servidor' }));
          if (coordResponse.status === 404) {
            throw new Error('Coordinadora no encontrada');
          }
          throw new Error(`Error fetching coordinator: ${coordResponse.status} - ${errorData.message || 'Unknown error'}`);
        }
        const coordData = await coordResponse.json();
        setCoordinadora(coordData);
        setName(coordData.name || '');
        setPaternalName(coordData.paternal_name || '');
        setMaternalName(coordData.maternal_name || '');
        setEmail(coordData.email || '');
        setPhoneNumber(coordData.phone_number || '');
        setUsername(coordData.username || '');

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
        const venue = venuesData.find((v: Venue) => v.id_venue === coordData.id_venue);
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

      // Enviar solo los campos editados, pero incluir los requeridos por la API
      const updatedCoordinadora = {
        name,
        paternal_name: paternalName,
        maternal_name: maternalName,
        email,
        phone_number: phoneNumber,
        username,
        id_venue: selectedVenueData.id_venue,
      };

      const response = await fetch(`/api/venue-coordinators/specific/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCoordinadora),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error updating coordinator: ${errorData.message || 'Unknown error'}`);
      }

      notify({
        color: 'green',
        title: 'Coordinadora Actualizada',
        message: `La coordinadora ${name} ha sido actualizada exitosamente`,
        duration: 5000,
      });

      router.push('/admin/gestion-usuarios/coordinadoras');
    } catch (error: any) {
      console.error('Error updating coordinator:', error);
      notify({
        color: 'red',
        title: 'Error',
        message: `No se pudo actualizar la coordinadora: ${error.message}`,
        duration: 5000,
      });
    }
  };

  if (error) {
    return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
  }

  if (!coordinadora) {
    return <div className="p-6 pl-14">Cargando...</div>;
  }

  return (
    <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
      <PageTitle>Editar Coordinadora</PageTitle>

      <div className="fondo-sedes flex flex-col p-6 gap-4 overflow-auto">
        <div className="flex justify-between gap-4  pb-2 mb-4">

          <div className="basis-1/3">
            <InputField
              label="Nombre"
              darkText={true}
              showDescription={false}
              placeholder={coordinadora.name}
              showError={false}
              variant="accent"
              value={name}
              onChangeText={(val) => setName(val)}
            />
          </div>

          <div className="basis-1/3">
            <InputField
              label="Apellido Paterno"
              darkText={true}
              showDescription={false}
              placeholder={coordinadora.paternal_name || 'Sin apellido paterno'}
              showError={false}
              variant="accent"
              value={paternalName}
              onChangeText={(val) => setPaternalName(val)}
            />
          </div>
          <div className="basis-1/3">
            <InputField
              label="Apellido Materno"
              darkText={true}
              showDescription={false}
              placeholder={coordinadora.maternal_name || 'Sin apellido materno'}
              showError={false}
              variant="accent"
              value={maternalName}
              onChangeText={(val) => setMaternalName(val)}
            />
          </div>

        </div>

        <div className="flex gap-4 justify-between mb-4">

          <div className="basis-1/2">
            <InputField
              label="Username"
              darkText={true}
              showDescription={false}
              placeholder={coordinadora.username}
              showError={false}
              variant="accent"
              value={username}
              onChangeText={(val) => setUsername(val)}
            />
          </div>

          <div className="basis-1/2">
            <InputField
              label="Correo"
              darkText={true}
              showDescription={false}
              placeholder={coordinadora.email}
              showError={false}
              variant="accent"
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-between mb-4">
          <div className="basis-1/2">
            <InputField
              label="Teléfono"
              darkText={true}
              showDescription={false}
              placeholder={coordinadora.phone_number}
              showError={false}
              variant="accent"
              value={phoneNumber}
              onChangeText={(val) => setPhoneNumber(val)}
            />
          </div>

          <div className="basis-1/2">
            <Dropdown
              label="Sede"
              options={venueOptions}
              value={selectedVenue}
              onChange={handleVenueChange}
              variant="accent"
              darkText
              Icon={withIconDecorator(MapPin)} // Ícono decorativo para la sede
            />
          </div>
        </div>

        {/* Botón Listo */}
        <div className="flex gap-4 justify-between mt-auto">
          <div className="flex gap-4">
            <Button label="Confirmar" variant="primary" onClick={handleSubmit} />
            <Button label="Cancelar" variant="secondary" href="/admin/gestion-usuarios/coordinadoras" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarCoordinadora;