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
  const { id } = params;
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
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [apiToken, setApiToken] = useState<string | null>(null);

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

        const mentorResponse = await fetch(`/api/mentors/${id}`, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });
        if (!mentorResponse.ok) {
          const errorData = await mentorResponse
            .json()
            .catch(() => ({ message: 'Respuesta no válida del servidor' }));
          if (mentorResponse.status === 404) {
            throw new Error('Mentora no encontrada');
          }
          throw new Error(
            `Error fetching mentor: ${mentorResponse.status} - ${
              errorData.message || 'Unknown error'
            }`,
          );
        }
        const mentorData = await mentorResponse.json();
        const mentor = mentorData.data;
        setMentora(mentor);
        setName(mentor.name || '');
        setPaternalName(mentor.paternal_name || '');
        setMaternalName(mentor.maternal_name || '');
        setEmail(mentor.email || '');
        setPhoneNumber(mentor.phone_number || '');

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

        const venue = venuesData.find((v: Venue) => v.id_venue === mentor.id_venue);
        setSelectedVenue(venue ? venue.name : '');
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    if (id && apiToken) {
      fetchData();
    }
  }, [id, router, apiToken]);

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

      const updatedMentora = {
        name,
        paternal_name: paternalName || null,
        maternal_name: maternalName || null,
        email,
        phone_number: phoneNumber || null,
        id_venue: selectedVenueData.id_venue,
      };

      const response = await fetch(`/api/mentors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`,
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
    return <div className='p-6 pl-14 text-red-500'>Error: {error}</div>;
  }

  if (!mentora) {
    return <div className='p-6 pl-14'>Cargando...</div>;
  }

  return (
    <div className='p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes'>
      <PageTitle>Editar Mentora</PageTitle>

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
        <div className='flex justify-between gap-4 items-center pb-2 mb-4'>
          <div className='basis-1/3'>
            <InputField
              label='Nombre'
              icon='Fingerprint'
              showDescription={false}
              placeholder={mentora.name}
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
              placeholder={mentora.paternal_name || 'Sin apellido paterno'}
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
              placeholder={mentora.maternal_name || 'Sin apellido materno'}
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
              label='Correo'
              icon='At'
              showDescription={false}
              placeholder={mentora.email}
              showError={false}
              variant='accent'
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
          </div>
          <div className='basis-1/2'>
            <InputField
              label='Teléfono'
              icon='Phone'
              showDescription={false}
              placeholder={mentora.phone_number}
              showError={false}
              variant='accent'
              value={phoneNumber}
              onChangeText={(val) => setPhoneNumber(val)}
            />
          </div>
        </div>

        <div className='flex gap-4 justify-between mb-4'>
          <div className='basis-1/2'>
            <Dropdown
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
            <Button label='Cancelar' variant='primary' href='/admin/gestion-usuarios/mentoras' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarMentora;
