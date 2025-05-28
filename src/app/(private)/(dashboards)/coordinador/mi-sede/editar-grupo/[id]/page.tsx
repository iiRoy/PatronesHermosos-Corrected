'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import InputField from '@/components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@/components/buttons_inputs/Button';
import withIconDecorator from '@/components/decorators/IconDecorator';
import { Users } from '@/components/icons';
import { useNotification } from '@/components/buttons_inputs/Notification';
import { jwtDecode } from 'jwt-decode';

// Definir el tipo DropdownOption localmente
interface DropdownOption {
    label: string;
    value: string;
}

interface DecodedToken {
    userId: number;
    email: string;
    username: string;
    role: string;
    tokenVersion: number;
    id_venue: number;
}

interface Group {
    id_group: number;
    name: string;
    max_places: number;
    occupied_places: number;
    location: string;
    start_date: string;
    end_date: string;
    start_hour: string;
    end_hour: string;
    id_mentor: number | null;
    language: string;
    level: string;
    mode: string;
    id_venue: number;
}

interface Mentor {
    id_mentor: number;
    name: string;
    email: string;
    phone_number: string;
    venue: string;
    id_venue: number;
}

const EditarGrupo = () => {
    const [nameValue, setNameValue] = useState('');
    const [maxPlacesValue, setMaxPlacesValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [startDateValue, setStartDateValue] = useState('');
    const [endDateValue, setEndDateValue] = useState('');
    const [startHourValue, setStartHourValue] = useState('');
    const [endHourValue, setEndHourValue] = useState('');
    const [mentorNameValue, setMentorNameValue] = useState<string>('');
    const [mentorMap, setMentorMap] = useState<{ [key: string]: number }>({});
    const [languageValue, setLanguageValue] = useState('Español');
    const [levelValue, setLevelValue] = useState('Básico');
    const [modeValue, setModeValue] = useState('Presencial');
    const [idVenue, setIdVenue] = useState<number | null>(null);
    const [mentors, setMentors] = useState<DropdownOption[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { notify } = useNotification();
    const params = useParams();
    const groupId = params.id;

    useEffect(() => {
        const fetchCoordinatorVenue = () => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : null;
            if (token) {
                try {
                    const decoded: DecodedToken = jwtDecode(token);
                    if (decoded.role !== 'venue_coordinator') {
                        setError('Este formulario es solo para coordinadores de sede');
                        router.push('/login');
                        return;
                    }
                    if (!decoded.id_venue) {
                        setError('La coordinadora no está asociada a una sede (venue)');
                        router.push('/login');
                        return;
                    }
                    setIdVenue(decoded.id_venue);
                } catch (err) {
                    console.error('Error al decodificar el token:', err);
                    setError('Token inválido');
                    router.push('/login');
                }
            } else {
                setError('No se encontró el token, por favor inicia sesión');
                router.push('/login');
            }
        };

        const fetchGroupData = async () => {
            if (!groupId || isNaN(parseInt(groupId as string))) {
                setError('ID de grupo inválido');
                router.push('/coordinador/mi-sede');
                return;
            }

            try {
                const response = await fetch('/api/groups', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
                });
                const data = await response.json();
                console.log('Groups data:', data);
                if (response.ok && Array.isArray(data)) {
                    const group = data.find((g: Group) => g.id_group === parseInt(groupId as string));
                    if (group) {
                        setNameValue(group.name || '');
                        setMaxPlacesValue(group.max_places ? group.max_places.toString() : '');
                        setLocationValue(group.location || '');
                        setStartDateValue(group.start_date ? group.start_date.split('T')[0] : '');
                        setEndDateValue(group.end_date ? group.end_date.split('T')[0] : '');
                        setStartHourValue(group.start_hour ? group.start_hour.split('T')[1]?.slice(0, 5) || '' : '');
                        setEndHourValue(group.end_hour ? group.end_hour.split('T')[1]?.slice(0, 5) || '' : '');
                        setLanguageValue(group.language || 'Español');
                        setLevelValue(group.level || 'Básico');
                        setModeValue(group.mode || 'Presencial');

                        if (group.id_mentor) {
                            const mentorResponse = await fetch(`/api/mentors/${group.id_mentor}`, {
                                headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
                            });
                            const mentorData = await mentorResponse.json();
                            console.log('Mentor data for group:', mentorData); // Depuración
                            if (mentorResponse.ok && mentorData.success) {
                                setMentorNameValue(mentorData.data.name);
                            } else {
                                console.log('Error or no mentor found:', mentorData.message);
                                setMentorNameValue('Mentor no encontrado'); // Establecer null si no se encuentra
                            }
                        } else {
                            setMentorNameValue('Sin mentor asignado'); // Sin mentor asignado
                        }
                    } else {
                        setError('Grupo no encontrado');
                        router.push('/coordinador/mi-sede');
                    }
                } else {
                    setError(`Error al cargar datos del grupo: ${data.message || 'Datos no disponibles'}`);
                }
            } catch (error) {
                console.error('Error fetching group data:', error);
                setError('Error al cargar datos del grupo');
            }
        };

        const fetchMentors = async () => {
            if (!idVenue) return;
            try {
                const response = await fetch('/api/mentors', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('api_token')}` },
                });
                const data = await response.json();
                console.log('Mentors data:', data);
                if (data.success && Array.isArray(data.data)) {
                    const filteredMentors = data.data.filter((m: Mentor) => m.id_venue === idVenue);
                    const mentorMapTemp: { [key: string]: number } = {};
                    const mentorOptions: DropdownOption[] = filteredMentors.map((m: Mentor) => {
                        mentorMapTemp[m.name] = m.id_mentor;
                        return {
                            label: m.name,
                            value: m.name,
                        };
                    });
                    setMentorMap(mentorMapTemp);
                    setMentors(mentorOptions);
                    console.log('Mentor map:', mentorMapTemp); // Depuración
                } else {
                    setError(`Error al cargar mentoras: ${data.message || 'Datos no disponibles'}`);
                }
            } catch (error) {
                console.error('Error fetching mentors:', error);
                setError('Error al cargar mentoras');
            }
        };

        fetchCoordinatorVenue();
        if (idVenue !== null) {
            fetchGroupData();
            fetchMentors();
        }
    }, [router, notify, groupId, idVenue]);

    const handleConfirm = async () => {
        try {
            const token = localStorage.getItem('api_token');
            if (!token) {
                router.push('/login');
                return;
            }

            if (!idVenue) {
                throw new Error('No se ha identificado la sede (venue) para este usuario');
            }

            // Validar que todos los campos estén completos
            const missingFields = [];
            if (!nameValue.trim()) missingFields.push('Nombre del Grupo');
            if (!maxPlacesValue.trim()) missingFields.push('Lugares Máximos');
            if (!locationValue.trim()) missingFields.push('Ubicación');
            if (!startDateValue.trim()) missingFields.push('Fecha de Inicio');
            if (!endDateValue.trim()) missingFields.push('Fecha de Fin');
            if (!startHourValue.trim()) missingFields.push('Hora de Inicio');
            if (!endHourValue.trim()) missingFields.push('Hora de Fin');
            if (!mentorNameValue) missingFields.push('Mentora');

            if (missingFields.length > 0) {
                throw new Error(`Por favor, completa los siguientes campos: ${missingFields.join(', ')}`);
            }

            // Validar formatos
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            const timeRegex = /^\d{2}:\d{2}$/;
            if (!dateRegex.test(startDateValue) || !dateRegex.test(endDateValue)) {
                throw new Error('Las fechas deben estar en formato AAAA-MM-DD');
            }
            if (!timeRegex.test(startHourValue) || !timeRegex.test(endHourValue)) {
                throw new Error('Las horas deben estar en formato HH:MM');
            }

            // Validar y convertir números
            const maxPlaces = parseInt(maxPlacesValue);
            if (isNaN(maxPlaces)) {
                throw new Error('Los campos de lugares máximos deben ser números válidos');
            }

            // Obtener el id_mentor correspondiente al nombre seleccionado
            const idMentor = mentorNameValue ? mentorMap[mentorNameValue] : null;
            if (mentorNameValue && !idMentor) {
                throw new Error('No se pudo mapear la mentora seleccionada a un ID válido');
            }
            console.log('Selected mentor name:', mentorNameValue, 'Mapped ID:', idMentor); // Depuración

            const updatedGroup = {
                name: nameValue.trim(),
                max_places: maxPlaces,
                location: locationValue.trim(),
                start_date: startDateValue,
                end_date: endDateValue,
                start_hour: startHourValue,
                end_hour: endHourValue,
                id_mentor: idMentor,
                language: languageValue,
                level: levelValue,
                mode: modeValue,
                id_venue: idVenue,
            };

            console.log('Datos enviados al servidor:', updatedGroup);
            const response = await fetch(`/api/groups/${groupId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedGroup),
            });

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('api_token');
                    router.push('/login');
                    return;
                }
                throw new Error(responseData.message || 'Error desconocido al actualizar el grupo');
            }

            notify({
                color: 'green',
                title: 'Grupo Actualizado',
                message: responseData.message || `El grupo ${nameValue} ha sido actualizado exitosamente`,
                duration: 5000,
            });

            router.push('/coordinador/mi-sede');
        } catch (error: any) {
            console.error('Error al actualizar grupo:', error);
            notify({
                color: 'red',
                title: 'Error',
                message: `No se pudo actualizar el grupo: ${error.message}`,
                duration: 5000,
            });
        }
    };

    if (error) {
        return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
            <PageTitle>Editar Grupo</PageTitle>

            <div className="fondo-sedes flex flex-col p-6 gap-4 overflow-auto">
                <div className="flex justify-between gap-4 items-center pb-2 mb-4">
                    <div className="basis-1/3">
                        <InputField
                            label="Nombre del Grupo"
                            darkText={true}
                            showDescription={false}
                            placeholder="Ingresa el nombre"
                            showError={false}
                            variant="accent"
                            value={nameValue}
                            onChangeText={(val) => setNameValue(val)}
                        />
                    </div>

                    <div className="basis-1/3">
                        <InputField
                            label="Lugares Máximos"
                            darkText={true}
                            showDescription={false}
                            placeholder="Ingresa el número"
                            showError={false}
                            variant="accent"
                            value={maxPlacesValue}
                            onChangeText={(val) => setMaxPlacesValue(val)}
                        />
                    </div>
                </div>

                <div className="flex gap-4 justify-between mb-4">
                    <div className="basis-1/3">
                        <InputField
                            label="Ubicación"
                            darkText={true}
                            showDescription={false}
                            placeholder="Ingresa la ubicación"
                            showError={false}
                            variant="accent"
                            value={locationValue}
                            onChangeText={(val) => setLocationValue(val)}
                        />
                    </div>

                    <div className="basis-1/3">
                        <InputField
                            label="Fecha de Inicio"
                            darkText={true}
                            showDescription={false}
                            placeholder="AAAA-MM-DD"
                            showError={false}
                            variant="accent"
                            value={startDateValue}
                            onChangeText={(val) => setStartDateValue(val)}
                        />
                    </div>

                    <div className="basis-1/3">
                        <InputField
                            label="Fecha de Fin"
                            darkText={true}
                            showDescription={false}
                            placeholder="AAAA-MM-DD"
                            showError={false}
                            variant="accent"
                            value={endDateValue}
                            onChangeText={(val) => setEndDateValue(val)}
                        />
                    </div>
                </div>

                <div className="flex gap-4 justify-between mb-4">
                    <div className="basis-1/3">
                        <InputField
                            label="Hora de Inicio"
                            darkText={true}
                            showDescription={false}
                            placeholder="HH:MM"
                            showError={false}
                            variant="accent"
                            value={startHourValue}
                            onChangeText={(val) => setStartHourValue(val)}
                        />
                    </div>

                    <div className="basis-1/3">
                        <InputField
                            label="Hora de Fin"
                            darkText={true}
                            showDescription={false}
                            placeholder="HH:MM"
                            showError={false}
                            variant="accent"
                            value={endHourValue}
                            onChangeText={(val) => setEndHourValue(val)}
                        />
                    </div>

                    <div className="basis-1/3">
                        <Dropdown
                            label="Mentora"
                            options={mentors}
                            value={mentorNameValue}
                            onChange={(val) => setMentorNameValue(val)}
                            variant="accent"
                            Icon={withIconDecorator(Users)}
                        />
                    </div>
                </div>

                <div className="flex gap-4 justify-between mb-4">
                    <div className="basis-1/3">
                        <Dropdown
                            label="Idioma"
                            options={[
                                { label: 'Español', value: 'Español' },
                                { label: 'Inglés', value: 'Inglés' },
                            ]}
                            value={languageValue}
                            onChange={(val) => setLanguageValue(val)}
                            variant="accent"
                            Icon={withIconDecorator(Users)}
                        />
                    </div>

                    <div className="basis-1/3">
                        <Dropdown
                            label="Nivel"
                            options={[
                                { label: 'Básico', value: 'Básico' },
                                { label: 'Avanzado', value: 'Avanzado' },
                            ]}
                            value={levelValue}
                            onChange={(val) => setLevelValue(val)}
                            variant="accent"
                            Icon={withIconDecorator(Users)}
                        />
                    </div>

                    <div className="basis-1/3">
                        <Dropdown
                            label="Modo"
                            options={[
                                { label: 'Presencial', value: 'Presencial' },
                                { label: 'En línea', value: 'En línea' },
                            ]}
                            value={modeValue}
                            onChange={(val) => setModeValue(val)}
                            variant="accent"
                            Icon={withIconDecorator(Users)}
                        />
                    </div>
                </div>

                <div className="flex gap-4 justify-between mt-auto">
                    <div className='flex gap-4'>
                        <Button
                            label="Confirmar"
                            variant="primary"
                            onClick={handleConfirm}
                        />
                        <Button
                            label="Cancelar"
                            variant="secondary"
                            href='/coordinador/mi-sede'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarGrupo;