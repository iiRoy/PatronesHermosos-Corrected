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

interface Participante {
    id_participant: number;
    name: string;
    paternal_name: string;
    maternal_name: string;
    email: string;
    year: number;
    education: string;
    participation_file: Buffer | null;
    preferred_group: string;
    status: string;
    id_group: number;
    id_tutor: number | null;
    sede: string;
    grupo: string;
}

const EditarParticipante = () => {
    const [participante, setParticipante] = useState<Participante | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [idValue, setIdValue] = useState('');
    const [apellidoPaternoValue, setApellidoPaternoValue] = useState('');
    const [apellidoMaternoValue, setApellidoMaternoValue] = useState('');
    const [nombreValue, setNombreValue] = useState('');
    const [correoValue, setCorreoValue] = useState('');
    const [telefonoValue, setTelefonoValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [sedeValue, setSedeValue] = useState('Monterrey');
    const [grupoValue, setGrupoValue] = useState('Luna');
    const router = useRouter();
    const { id } = useParams(); // Obtener el id de la URL

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

                // Precargar los campos con la información del participante
                setIdValue(data.id_participant.toString());
                setNombreValue(data.name);
                setApellidoPaternoValue(data.paternal_name);
                setApellidoMaternoValue(data.maternal_name);
                setCorreoValue(data.email);
                setTelefonoValue(''); // Este campo no está en la base de datos, se deja vacío
                setStatusValue(data.status);
                // Los valores de sede y grupo se manejan con los estados de los Dropdown
            } catch (error: any) {
                console.error('Error al obtener participante:', error);
                setError(error.message);
            }
        };

        if (id) {
            fetchParticipante();
        }
    }, [id, router]);

    const handleConfirm = async () => {
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("api_token") : "";
            if (!token) {
                router.push('/login');
                return;
            }

            // Separar el nombre completo en name, paternal_name y maternal_name
            const nameParts = nombreValue.trim().split(' ');
            const name = nameParts[0] || '';
            const paternal_name = nameParts[1] || '';
            const maternal_name = nameParts.slice(2).join(' ') || '';

            const updatedParticipante = {
                name,
                paternal_name,
                maternal_name,
                email: correoValue,
                status: statusValue,
                sede: sedeValue,
                grupo: grupoValue,
            };

            const response = await fetch(`/api/participants/${id}`, {
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
                throw new Error('Error updating participant');
            }

            router.push('/coordinador/gestion-usuarios-coordinadora/participantes');
        } catch (error) {
            console.error('Error al actualizar participante:', error);
            setError('Error al actualizar participante');
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
                    <div className="basis-1/5">
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

                    <div className="basis-1/5">
                        <InputField
                            label="Apellido Paterno"
                            darkText={true}
                            showDescription={false}
                            placeholder={apellidoPaternoValue}
                            showError={false}
                            variant="accent"
                            value={apellidoPaternoValue}
                            onChangeText={(val) => setNombreValue(val)}
                        />
                    </div>

                    <div className="basis-1/5">
                        <InputField
                            label="Apellido Materno"
                            darkText={true}
                            showDescription={false}
                            placeholder={apellidoMaternoValue}
                            showError={false}
                            variant="accent"
                            value={apellidoMaternoValue}
                            onChangeText={(val) => setNombreValue(val)}
                        />
                    </div>

                    <div className="basis-2/5">
                        <p className='texto-filtro'>Sede</p>
                        <Dropdown
                            label=""
                            options={['Monterrey', 'Puebla', 'Guadalajara', 'Querétaro']}
                            value={sedeValue}
                            onChange={(value: string) => setSedeValue(value)}
                            variant="accent"
                            Icon={withIconDecorator(MapPin)}
                        />
                    </div>
                </div>

                <div className="flex gap-4 justify-between mb-4">
                    <div className="basis-1/2">
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
                    <div className="basis-1/2">
                        <p className='texto-filtro'>Grupo Asignado</p>
                        <Dropdown
                            label=""
                            options={['Luna', 'Sol', 'Mar', 'Montaña']}
                            value={grupoValue}
                            onChange={(value: string) => setGrupoValue(value)}
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
                            href='../'
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
                            href='/coordinador/gestion-usuarios-coordinadora/participantes'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarParticipante;