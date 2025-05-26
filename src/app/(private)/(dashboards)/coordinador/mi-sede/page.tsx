'use client';

import { useState, useEffect } from 'react';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import InputField from '@/components/buttons_inputs/InputField';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import Button from '@/components/buttons_inputs/Button';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface Participant {
    id: number;
    nombre: string;
    sede: string;
    id_venue: number | null; // Añadido para el filtrado
    grupo: string;
    correo: string;
    status: string;
}

interface DecodedToken {
    userId: number;
    email: string;
    username: string;
    role: string;
    tokenVersion: number;
}

interface Group {
    id_group: number;
    name: string;
    id_venue: number;
    venues: {
        name: string;
    };
}

const verSede = () => {
    const [inputValue, setInputValue] = useState('');
    const [section, setSection] = useState('__All__');
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [venueName, setVenueName] = useState('Cargando...');
    const [venueId, setVenueId] = useState<number | null>(null); // Añadido para almacenar id_venue
    const [groupOptions, setGroupOptions] = useState([{ label: 'Todos', value: '__All__' }]);
    const [error, setError] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<{ email: string; username: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : null;
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                if (decoded.role === 'venue_coordinator') {
                    setUserInfo({ email: decoded.email, username: decoded.username });
                    fetchVenueData(decoded.userId);
                    fetchGroups(decoded.userId);
                    fetchParticipants(decoded.userId);
                } else {
                    setError('Este dashboard es solo para coordinadores de sede');
                    router.push('/login');
                }
            } catch (err) {
                console.error('Error al decodificar el token:', err);
                setError('Token inválido');
                router.push('/login');
            }
        } else {
            setError('No se encontró el token, por favor inicia sesión');
            router.push('/login');
        }
    }, [router]);

    const fetchVenueData = async (venueId: number) => {
        try {
            const response = await fetch(`/api/venues/${venueId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
            });
            const data = await response.json();
            console.log('Venue data:', data);
            if (response.ok) {
                setVenueName(data.name || 'Sede no encontrada');
                setVenueId(data.id_venue || null); // Almacenar id_venue
            } else {
                setVenueName('Sede no encontrada');
                setVenueId(null);
                setError(`Error al cargar datos de la sede: ${data.message}`);
            }
        } catch (error) {
            console.error('Error fetching venue:', error);
            setVenueName('Sede no encontrada');
            setVenueId(null);
            setError('Error al cargar datos de la sede');
        }
    };

    const fetchGroups = async (venueId: number) => {
        try {
            const response = await fetch('/api/groups', {
                headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
            });
            const data = await response.json();
            console.log('Groups data:', data);
            if (response.ok && Array.isArray(data)) {
                const filteredGroups = data.filter((group: Group) => group.id_venue === venueId);
                console.log('Filtered groups:', filteredGroups);
                setGroupOptions([
                    { label: 'Todos', value: '__All__' },
                    ...filteredGroups.map((group: Group) => ({ label: group.name, value: group.name })),
                ]);
            } else {
                setError(`Error al cargar grupos: ${data.message || 'Datos no disponibles'}`);
            }
        } catch (error) {
            console.error('Error fetching groups:', error);
            setError('Error al cargar grupos');
        }
    };

    const fetchParticipants = async (venueId: number) => {
        try {
            const response = await fetch('/api/participants', {
                headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
            });
            const data = await response.json();
            console.log('Participants data:', data);
            if (response.ok && data.data) {
                const filteredParticipants = data.data.filter((p: Participant) => {
                    console.log(`Participant ${p.id}: id_venue=${p.id_venue}, venueId=${venueId}`);
                    return p.id_venue === venueId; // Filtrar por id_venue
                });
                console.log('Filtered participants:', filteredParticipants);
                setParticipants(filteredParticipants);
            } else {
                setError(`Error al cargar participantes: ${data.message || 'Datos no disponibles'}`);
            }
        } catch (error) {
            console.error('Error fetching participants:', error);
            setError('Error al cargar participantes');
        }
    };

    const filteredParticipants = participants.filter((p) => {
        const matchesSearch = p.nombre.toLowerCase().includes(inputValue.toLowerCase()) || p.correo.toLowerCase().includes(inputValue.toLowerCase());
        const matchesGroup = section === '__All__' ? true : p.grupo === section;
        return matchesSearch && matchesGroup;
    });

    const sectionFilterChange = (value: string) => {
        setSection(value);
        setInputValue('');
    };

    if (error) {
        return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
    }

    return (
        <div className='p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes'>
            <PageTitle>{venueName}</PageTitle>

            <div className='fondo-sedes flex flex-col p-6 gap-4 overflow-auto'>
                {/* Encabezado */}
                <div className='flex justify-between items-center border-b border-gray-300 pb-2 mb-4'>
                    <div>
                        <p className='text-lg font-semibold text-[#2A2A2A]'>{userInfo?.username || 'Coordinadora'}</p>
                        <p className='text-sm text-gray-500'>{userInfo?.email || 'correo@tec.mx'}</p>
                    </div>
                    <p className='text-lg font-medium text-gray-700'>Coordinadora</p>
                </div>

                {/* Filtros */}
                <div className='flex gap-4 justify-between mb-4'>
                    <div className='basis-2/3'>
                        <InputField
                            label=''
                            showDescription={false}
                            placeholder='Buscar participante'
                            showError={false}
                            variant='primary'
                            icon='MagnifyingGlass'
                            value={inputValue}
                            onChangeText={(val) => setInputValue(val)}
                        />
                    </div>

                    <div className='basis-1/3'>
                        <FiltroEvento
                            disableCheckboxes
                            label='Filtrar por grupo'
                            showSecciones
                            labelSecciones='Seleccionar Grupo'
                            secciones={groupOptions}
                            seccionActiva={section}
                            onChangeSeccion={sectionFilterChange}
                        />
                    </div>
                </div>

                {/* Tabla */}
                <div className='overflow-x-auto bg-white rounded-xl p-4 shadow flex-1'>
                    <table className='w-full text-left'>
                        <thead className='text-gray-400 text-sm border-b'>
                            <tr>
                                <th className='pb-2 text-center'>Nombre</th>
                                <th className='pb-2 text-center'>Sede</th>
                                <th className='pb-2 text-center'>Grupo</th>
                                <th className='pb-2 text-center'>Correo</th>
                                <th className='pb-2 text-center'>Status</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-800'>
                            {filteredParticipants.map((p) => (
                                <tr key={p.id} className='border-b last:border-none'>
                                    <td className='py-2 text-center'>{p.nombre}</td>
                                    <td className='py-2 text-center'>{p.sede}</td>
                                    <td className='py-2 text-center'>{p.grupo}</td>
                                    <td className='py-2 text-center'>{p.correo}</td>
                                    <td className='py-2 text-center'>{p.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Botón Listo */}
                <div className='mt-6 self-start'>
                    <Button label='Volver' variant='primary' href='../' />
                </div>
            </div>
        </div>
    );
};

export default verSede;