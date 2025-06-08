'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import { useNotification } from '@/components/buttons_inputs/Notification';

interface Sede {
    id_venue: number;
    name: string;
    country: string;
    location: string;
    state: string;
    address: string;
    status: string;
}

const EditarSede = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // Obtener el id_venue de la URL
  const { notify } = useNotification();

    const [sede, setSede] = useState<Sede | null>(null);
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
        if (!token) {
          router.push('/login');
          return;
        }

                const venueResponse = await fetch(`/api/venues/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!venueResponse.ok) {
                    const errorData = await venueResponse.json().catch(() => ({ message: 'Respuesta no válida del servidor' }));
                    if (venueResponse.status === 404) {
                        throw new Error('Sede no encontrada');
                    }
                    throw new Error(`Error fetching venue: ${venueResponse.status} - ${errorData.message || 'Unknown error'}`);
                }
                const venueData = await venueResponse.json();
                setSede(venueData);
                setName(venueData.name || '');
                setCountry(venueData.country || '');
                setState(venueData.state || '');
                setAddress(venueData.address || '');
                setLocation(venueData.location || '');
                setStatus(venueData.status || 'Pendiente');
            } catch (error: any) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
        };

    if (id) {
      fetchData();
    }
  }, [id, router]);

  const handleSubmit = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
      if (!token) {
        router.push('/login');
        return;
      }

            const updatedSede = {
                name,
                country,
                state,
                address,
                location,
                status,
            };

      console.log('Datos enviados:', updatedSede); // Depuración

      const response = await fetch(`/api/venues/basic/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedSede),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error updating venue: ${errorData.message || 'Unknown error'}`);
      }

      notify({
        color: 'green',
        title: 'Sede Actualizada',
        message: `La sede ${name} ha sido actualizada exitosamente`,
        duration: 5000,
      });

      router.push('/admin/sedes');
    } catch (error: any) {
      console.error('Error updating venue:', error);
      notify({
        color: 'red',
        title: 'Error',
        message: `No se pudo actualizar la sede: ${error.message}`,
        duration: 5000,
      });
    }
  };

  if (error) {
    return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
  }

  if (!sede) {
    return <div className="p-6 pl-14">Cargando...</div>;
  }

  return (
    <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
      <PageTitle>Editar Sede</PageTitle>

            <div className='fondo-editar-usuario flex flex-col p-6 gap-4 overflow-auto'>
                <div className='flex justify-between gap-4 items-center pb-2 mb-4'>

                    <div className='basis-1/2'>
                        <InputField
                            label='Nombre'
                            icon='Bank'
                            showDescription={false}
                            placeholder={sede.name || 'Sin nombre'}
                            showError={false}
                            variant='primary'
                            value={name}
                            onChangeText={(val) => setName(val)}
                        />
                    </div>
                    <div className='basis-1/2'>
                        <InputField
                            label='Dirección'
                            icon='MapPin'
                            showDescription={false}
                            placeholder={sede.address || 'Sin dirección'}
                            showError={false}
                            variant='primary'
                            value={address}
                            onChangeText={(val) => setAddress(val)}
                        />
                    </div>
                </div>

                <div className='flex gap-4 justify-between mb-4'>
                    <div className='basis-1/2'>
                        <InputField
                            label='País'
                            icon='Globe'
                            showDescription={false}
                            placeholder={sede.country || 'Sin país'}
                            showError={false}
                            variant='accent'
                            value={country}
                            onChangeText={(val) => setCountry(val)}
                        />
                    </div>
                    <div className='basis-1/2'>
                        <InputField
                            label='Estado'
                            icon='MapPin'
                            showDescription={false}
                            placeholder={sede.state || 'Sin estado'}
                            showError={false}
                            variant='accent'
                            value={state}
                            onChangeText={(val) => setState(val)}
                        />
                    </div>
                </div>

                <div className='flex gap-4 justify-between mb-4'>
                    <div className='basis-1/2'>
                        <InputField
                            label='Ubicación'
                            icon='MapPin'
                            showDescription={false}
                            placeholder={sede.location || 'Sin ubicación'}
                            showError={false}
                            variant='secondary'
                            value={location}
                            onChangeText={(val) => setLocation(val)}
                        />
                    </div>
                </div>

                <div className='flex gap-4 justify-between mt-auto'>
                    <div className='flex gap-4'>
                        <Button label='Confirmar' variant='success' onClick={handleSubmit} />
                        <Button label='Cancelar' variant='primary' href='/admin/sedes' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarSede;