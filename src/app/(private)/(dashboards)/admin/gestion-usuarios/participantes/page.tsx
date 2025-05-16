'use client';

import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import { MagnifyingGlass, Trash, Highlighter } from '@/components/icons';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

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

const GestionParticipantes = () => {
    const [inputValue, setInputValue] = useState('');
    const [section, setSection] = useState('__All__');
    const [filterActivaExtra, setFilterActivaExtra] = useState({ grupo: '__All__' });
    const [currentPage, setCurrentPage] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedParticipante, setSelectedParticipante] = useState<Participante | null>(null);
    const [participantesData, setParticipantesData] = useState<Participante[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const rowsPerPage = 10;

    useEffect(() => {
        const fetchParticipantes = async () => {
            try {
                const token = typeof window !== "undefined" ? localStorage.getItem("api_token") : "";
                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await fetch('/api/participants', {
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
                    throw new Error(`Error fetching participants: ${response.status} - ${errorData.message || 'Unknown error'}`);
                }

                const data = await response.json();
                setParticipantesData(data);
            } catch (error: any) {
                console.error('Error al obtener participantes:', error);
                setError(error.message);
            }
        };
        fetchParticipantes();
    }, [router]);

    const extraHandleFilterChange = (key: string, value: string) => {
        setFilterActivaExtra((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const uniqueSedes = Array.from(new Set(participantesData.map((participante) => participante.sede))).sort();
    const uniqueGrupos = Array.from(new Set(participantesData.map((participante) => participante.grupo))).sort();

    const sedeOptions = [
        { label: 'Todas', value: '__All__' },
        ...uniqueSedes.map((sede) => ({ label: sede, value: sede })),
    ];

    const grupoOptions = [
        { label: 'Todas', value: '__All__' },
        ...uniqueGrupos.map((grupo) => ({ label: grupo, value: grupo })),
    ];

    const filteredData = useMemo(() => {
        const searchTerm = inputValue.toLowerCase().trim();
        return participantesData.filter((participante) => {
            const fullName = `${participante.name} ${participante.paternal_name} ${participante.maternal_name}`.toLowerCase();
            const matchesSearch = !searchTerm || fullName.includes(searchTerm);
            const matchesSede = section === '__All__' ? true : participante.sede === section;
            const selectedGrupo = filterActivaExtra['grupo'];
            const matchesGrupo = selectedGrupo === '__All__' ? true : participante.grupo === selectedGrupo;
            return matchesSearch && matchesSede && matchesGrupo;
        });
    }, [inputValue, section, filterActivaExtra, participantesData]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    const sectionFilterChange = (value: string) => {
        setSection(value);
        setInputValue('');
        setCurrentPage(0);
    };

    const handleDeleteClick = (participante: Participante) => {
        setSelectedParticipante(participante);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedParticipante(null);
    };

    const handleConfirmDelete = async () => {
        if (selectedParticipante) {
            try {
                const token = typeof window !== "undefined" ? localStorage.getItem("api_token") : "";
                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await fetch(`/api/participants/${selectedParticipante.id_participant}`, {
                    method: 'DELETE',
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
                    throw new Error('Error deleting participant');
                }

                setParticipantesData(participantesData.filter((p) => p.id_participant !== selectedParticipante.id_participant));
                handleClosePopup();
            } catch (error) {
                console.error('Error al eliminar participante:', error);
            }
        }
    };

    if (error) {
        return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
            <PageTitle>Gestión de Participantes</PageTitle>

            <div className="fondo-sedes flex flex-col p-6 gap-4 overflow-auto">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-1 gap-4">
                        <div className="basis-2/3">
                            <InputField
                                label=""
                                showDescription={false}
                                placeholder="Search"
                                showError={false}
                                variant="primary"
                                icon="MagnifyingGlass"
                                value={inputValue}
                                onChangeText={(val) => setInputValue(val)}
                            />
                        </div>

                        <div className="basis-1/3">
                            <FiltroEvento
                                disableCheckboxes
                                label="Filtros"
                                showSecciones
                                labelSecciones="Sedes"
                                secciones={sedeOptions}
                                seccionActiva={section}
                                onChangeSeccion={sectionFilterChange}
                                extraFilters={[
                                    {
                                        label: 'Grupos',
                                        key: 'grupo',
                                        options: grupoOptions,
                                    },
                                ]}
                                filterActiva={filterActivaExtra}
                                onExtraFilterChange={extraHandleFilterChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="text-purple-800 font-bold">
                            <tr className="texto-primary-shade">
                                <th className="p-2 text-center">ID</th>
                                <th className="p-2 text-center">Nombre</th>
                                <th className="p-2 text-center">Sede</th>
                                <th className="p-2 text-center">Grupo</th>
                                <th className="p-2 text-center">Correo</th>
                                <th className="p-2 text-center">Estatus</th>
                                <th className="p-2 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {paginatedData.map((participante, index) => (
                                <tr key={index} className="border-t border-gray-300">
                                    <td className="p-2 text-center">{participante.id_participant}</td>
                                    <td className="p-2 text-center">
                                        {`${participante.name} ${participante.paternal_name} ${participante.maternal_name}`}
                                    </td>
                                    <td className="p-2 text-center">{participante.sede}</td>
                                    <td className="p-2 text-center">{participante.grupo}</td>
                                    <td className="p-2 text-center">{participante.email}</td>
                                    <td className="p-2 text-center">{participante.status}</td>
                                    <td className="p-2 flex gap-2 justify-center">
                                        <Button label="" variant="error" round showLeftIcon IconLeft={Trash} onClick={() => handleDeleteClick(participante)} />
                                        <Button label="" variant="warning" round showLeftIcon IconLeft={Highlighter} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-auto pt-4 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        variant="primary"
                        pageLinks={Array(totalPages).fill('#')}
                    />
                </div>

                {isPopupOpen && selectedParticipante && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-3xl font-bold mb-4 text-center">Confirmar Eliminación</h2>
                            <p className="mt-12 mb-12">
                                ¿Estás segura de que quieres eliminar a la participante{' '}
                                {`${selectedParticipante.name} ${selectedParticipante.paternal_name} ${selectedParticipante.maternal_name}`}?
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button label="Eliminar" variant="error" onClick={handleConfirmDelete} />
                                <Button label="Cancelar" variant="secondary" onClick={handleClosePopup} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GestionParticipantes;