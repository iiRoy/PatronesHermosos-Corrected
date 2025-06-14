'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import InputField from '@/components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@/components/buttons_inputs/Button';
import { MapPin } from '@/components/icons';
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
  const { id } = params;
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
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Obtener token solo en cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setApiToken(localStorage.getItem('api_token'));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!apiToken) {
          router.push('/login');
          return;
        }

        const coordResponse = await fetch(`/api/venue-coordinators/${id}`, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });
        if (!coordResponse.ok) {
          const errorData = await coordResponse
            .json()
            .catch(() => ({ message: 'Respuesta no válida del servidor' }));
          if (coordResponse.status === 404) {
            throw new Error('Coordinadora no encontrada');
          }
          throw new Error(
            `Error fetching coordinator: ${coordResponse.status} - ${
              errorData.message || 'Unknown error'
            }`,
          );
        }
        const coordData = await coordResponse.json();
        setCoordinadora(coordData);
        if (!isInitialized) {
          setName(coordData.name || '');
          setPaternalName(coordData.paternal_name || '');
          setMaternalName(coordData.maternal_name || '');
          setEmail(coordData.email || '');
          setPhoneNumber(coordData.phone_number || '');
          setUsername(coordData.username || '');
          setIsInitialized(true);
        }

        const venuesResponse = await fetch('/api/venues', {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });
        if (!venuesResponse.ok) {
          const errorData = await venuesResponse.json();
          throw new Error(
            `Error fetching venues: ${venuesResponse.status} - ${
              errorData.message || 'Unknown error'
            }`,
          );
        }
        const venuesData = await venuesResponse.json();
        setVenues(venuesData);

        const venue = venuesData.find((v: Venue) => v.id_venue === coordData.id_venue);
        setSelectedVenue(venue ? venue.name : '');
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    if (id && apiToken) {
      fetchData();
    }
  }, [id, router, apiToken, isInitialized]);

  const venueOptions = venues.map((venue) => ({
    label: venue.name,
    value: venue.name,
  }));

  const handleVenueChange = (value: string) => {
    setSelectedVenue(value);
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!email.trim()) {
      errors.push('El correo es obligatorio');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('El correo no tiene un formato válido');
    }

    if (phoneNumber && !/^\+?\d{10,15}$/.test(phoneNumber)) {
      errors.push('El número de teléfono debe contener entre 10 y 15 dígitos');
    }

    // Log temporal para depuración en test
    // eslint-disable-next-line no-console
    console.log('validateForm: errores', errors);

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async () => {
    setValidationErrors([]);

    if (!validateForm()) {
      return;
    }

    try {
      if (!apiToken) {
        router.push('/login');
        return;
      }

      const selectedVenueData = venues.find((v) => v.name === selectedVenue);
      if (!selectedVenueData) {
        throw new Error('Sede seleccionada no encontrada');
      }

      const updatedCoordinadora = {
        name,
        paternal_name: paternalName || null,
        maternal_name: maternalName || null,
        email,
        phone_number: phoneNumber || null,
        username,
        id_venue: selectedVenueData.id_venue,
      };

      const response = await fetch(`/api/venue-coordinators/specific/${id}`, {
        method: 'PUT',
        headers:
          {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
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
    return <div className='p-6 pl-14 text-red-500'>Error: {error}</div>;
  }

  if (!coordinadora) {
    return <div className='p-6 pl-14'>Cargando...</div>;
  }

  // Log temporal fuera del JSX para depuración
  if (validationErrors.length > 0) {
    // eslint-disable-next-line no-console
    console.log('render validationErrors', validationErrors);
  }

  return (
    <div className='p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes'>
      <PageTitle>Editar Coordinadora</PageTitle>

      {validationErrors.length > 0 && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
          <strong className='font-bold'>Errores de validación:</strong>
          <ul className='list-disc list-inside'>
            {validationErrors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className='fondo-editar-usuario flex flex-col p-6 gap-4 overflow-auto'>
        <div className='flex justify-between gap-4 pb-2 mb-4'>
          <div className='basis-1/3'>
            <InputField
              label='Nombre'
              icon='Fingerprint'
              showDescription={false}
              placeholder={coordinadora.name}
              showError={false}
              variant='primary'
              value={name}
              onChangeText={(val) => setName(val)}
            />
          </div>
          <div className='basis-1/3'>
            <InputField
              label='Apellido Paterno'
              icon='Fingerprint'
              showDescription={false}
              placeholder={coordinadora.paternal_name || 'Sin apellido paterno'}
              showError={false}
              variant='primary'
              value={paternalName}
              onChangeText={(val) => setPaternalName(val)}
            />
          </div>
          <div className='basis-1/3'>
            <InputField
              label='Apellido Materno'
              icon='Fingerprint'
              showDescription={false}
              placeholder={coordinadora.maternal_name || 'Sin apellido materno'}
              showError={false}
              variant='primary'
              value={maternalName}
              onChangeText={(val) => setMaternalName(val)}
            />
          </div>
        </div>

        <div className='flex gap-4 justify-between mb-4'>
          <div className='basis-1/2'>
            <InputField
              label='Username'
              icon='User'
              showDescription={false}
              placeholder={coordinadora.username}
              showError={false}
              variant='accent'
              value={username}
              onChangeText={(val) => setUsername(val)}
            />
          </div>
          <div className='basis-1/2'>
            <InputField
              label='Correo'
              icon='At'
              showDescription={false}
              placeholder={coordinadora.email}
              showError={false}
              variant='accent'
              value={email}
              onChangeText={setEmail}
            />
          </div>
        </div>

        <div className='flex gap-4 justify-between mb-4'>
          <div className='basis-1/2'>
            <InputField
              label='Teléfono'
              icon='Phone'
              showDescription={false}
              placeholder={coordinadora.phone_number}
              showError={false}
              variant='secondary'
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </div>
          <div className='basis-1/2'>
            <Dropdown
              id='dropdown-sede'
              label='Sede'
              options={venueOptions}
              value={selectedVenue}
              onChange={handleVenueChange}
              variant='secondary'
              Icon={withIconDecorator(MapPin)}
            />
          </div>
        </div>

        <div className='flex gap-4 justify-between mt-auto'>
          <div className='flex gap-4'>
            <Button label='Confirmar' variant='success' onClick={handleSubmit} />
            <Button
              label='Cancelar'
              variant='primary'
              href='/admin/gestion-usuarios/coordinadoras'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarCoordinadora;
