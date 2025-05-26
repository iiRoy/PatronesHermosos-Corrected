'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import InputField from '@/components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@/components/buttons_inputs/Button';
import { FileText } from 'lucide-react';
import withIconDecorator from '@/components/decorators/IconDecorator';
import { MapPin, Users } from '@/components/icons';
import { useNotification } from '@/components/buttons_inputs/Notification';

interface GroupOption {
    id_group: number;
    name: string;
    available_places: number;
}

interface Participante {
    id_participant: number;
    name: string;
    paternal_name: string;
    maternal_name: string;
    email: string;
    year: number;
    education: string;
    participation_file: Buffer | null;
    preferred_group: number | null;
    status: string;
    id_group: number | null;
    id_tutor: number | null;
    groups?: {
        name: string;
        venues?: { name: string };
    } | null;
}

const EditarParticipante = () => {
    const [participante, setParticipante] = useState<Participante | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [idValue, setIdValue] = useState('');
    const [nombreValue, setNombreValue] = useState('');
    const [apellidoPaternoValue, setApellidoPaternoValue] = useState('');
    const [apellidoMaternoValue, setApellidoMaternoValue] = useState('');
    const [correoValue, setCorreoValue] = useState('');
    const [telefonoValue, setTelefonoValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [sedeValue, setSedeValue] = useState('');
    const [grupoValue, setGrupoValue] = useState<number | null>(null);
    const [availableGroups, setAvailableGroups] = useState<GroupOption[]>([]);
    const router = useRouter();
    const { id } = useParams();
    const { notify } = useNotification();

    useEffect(() => {
        const fetchParticipante = async () => {
            try {
                const token = typeof window !== "undefined" ? localStorage.getItem("api_token") : "";
                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await fetch(`/api/participants/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    if (response.status === 403) {
                        localStorage.removeItem('api_token');
                        router.push('/login');
                        return;
                    }
                    throw new Error(`Error fetching participant: ${response.status} - ${errorData.message || 'Unknown error'}`);
                }

                const data = await response.json();
                setParticipante(data);
                setIdValue(data.id_participant.toString());
                setNombreValue(data.name);
                setApellidoPaternoValue(data.paternal_name);
                setApellidoMaternoValue(data.maternal_name);
                setCorreoValue(data.email);
                setTelefonoValue(data.tutors?.phone_number || ''); // Prellenar con el número de teléfono del tutor
                setStatusValue(data.status);
                setGrupoValue(data.id_group || null);
                setSedeValue(data.groups?.venues?.name || 'No asignado');
            } catch (error: any) {
                console.error('Error al obtener participante:', error);
                setError(error.message);
            }
        };

        const fetchAvailableGroups = async () => {
            try {
                const token = typeof window !== "undefined" ? localStorage.getItem("api_token") : "";
                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await fetch(`/api/participants/${id}/available-groups`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Error fetching available groups: ${response.status} - ${errorData.message || 'Unknown error'}`);
                }

                const data = await response.json();
                setAvailableGroups(data.groups);
                if (data.groups.length > 0 && !grupoValue) {
                    const currentGroup = data.groups.find((group: GroupOption) => group.id_group === participante?.id_group);
                    if (currentGroup) {
                        setGrupoValue(currentGroup.id_group);
                    } else {
                        setGrupoValue(data.groups[0].id_group);
                    }
                }
            } catch (error: any) {
                console.error('Error al obtener grupos disponibles:', error);
                setError(error.message);
            }
        };

        if (id) {
            fetchParticipante().then(() => fetchAvailableGroups());
        }
    }, [id, router, participante?.id_group]);

    const handleConfirm = async () => {
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("api_token") : "";
            if (!token) {
                router.push('/login');
                return;
            }

            const updatedParticipante = {
                name: nombreValue,
                paternal_name: apellidoPaternoValue,
                maternal_name: apellidoMaternoValue,
                email: correoValue,
                id_group: grupoValue,
                phone_number: telefonoValue, // Incluir el número de teléfono
            };

            const response = await fetch(`/api/participants/${id}/basic-info`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedParticipante),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 403) {
                    localStorage.removeItem('api_token');
                    router.push('/login');
                    return;
                }
                throw new Error(`Error updating participant: ${errorData.message || 'Unknown error'}`);
            }

            notify({
                color: 'green',
                title: 'Participante Actualizado',
                message: `El participante ${nombreValue} ha sido actualizado exitosamente`,
                duration: 5000,
            });

            router.push('/admin/gestion-usuarios/participantes');
        } catch (error: any) {
            console.error('Error al actualizar participante:', error);
            notify({
                color: 'red',
                title: 'Error',
                message: `No se pudo actualizar al participante: ${error.message}`,
                duration: 5000,
            });
        }
    };

    if (error) {
        return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
    }

    if (!participante) {
        return <div className="p-6 pl-14">Cargando...</div>;
    }

    return (
        <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
            <PageTitle>Editar Participante</PageTitle>

            <div className="fondo-sedes flex flex-col p-6 gap-4 overflow-auto">
                <div className="flex justify-between gap-4 items-center pb-2 mb-4">
                    <div className="basis-1/3">
                        <InputField
                            label="Nombre"
                            darkText={true}
                            showDescription={false}
                            placeholder={nombreValue}
                            showError={false}
                            variant="accent"
                            value={nombreValue}
                            onChangeText={(val) => setNombreValue(val)}
                        />
                    </div>

                    <div className="basis-1/3">
                        <InputField
                            label="Apellido Paterno"
                            darkText={true}
                            showDescription={false}
                            placeholder={apellidoPaternoValue}
                            showError={false}
                            variant="accent"
                            value={apellidoPaternoValue}
                            onChangeText={(val) => setApellidoPaternoValue(val)}
                        />
                    </div>

                    <div className="basis-1/3">
                        <InputField
                            label="Apellido Materno"
                            darkText={true}
                            showDescription={false}
                            placeholder={apellidoMaternoValue}
                            showError={false}
                            variant="accent"
                            value={apellidoMaternoValue}
                            onChangeText={(val) => setApellidoMaternoValue(val)}
                        />
                    </div>
                </div>

                <div className="flex gap-4 justify-between mb-4">
                    <div className="basis-1/3">
                        <InputField
                            label="Correo"
                            darkText={true}
                            showDescription={false}
                            placeholder={correoValue}
                            showError={false}
                            variant="accent"
                            value={correoValue}
                            onChangeText={(val) => setCorreoValue(val)}
                        />
                    </div>
                    <div className="basis-1/3">
                        <InputField
                            label="Teléfono del tutor"
                            darkText={true}
                            showDescription={false}
                            placeholder={telefonoValue}
                            showError={false}
                            variant="accent"
                            value={telefonoValue}
                            onChangeText={(val) => setTelefonoValue(val)}
                        />
                    </div>
                    <div className="basis-1/3">
                        <Dropdown
                            label="Grupo Asignado"
                            options={availableGroups.map(group => ({
                                label: `${group.name} (${group.available_places} lugares disponibles)`,
                                value: group.id_group.toString(),
                            }))}
                            value={grupoValue?.toString() || ''}
                            onChange={(value: string) => setGrupoValue(parseInt(value))}
                            variant="accent"
                            Icon={withIconDecorator(Users)}
                        />
                    </div>
                </div>

                <div className="flex justify-between gap-4 items-center pb-2 mb-4">
                    <div>
                        <p className='texto-filtro'>Carta Firmada</p>
                        <Button
                            label=""
                            round
                            variant="primary"
                            showLeftIcon
                            IconLeft={FileText}
                            href={participante.participation_file ? `/api/files/${participante.participation_file}` : '#'}
                            disabled={!participante.participation_file}
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
                            href='/admin/gestion-usuarios/participantes'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarParticipante;