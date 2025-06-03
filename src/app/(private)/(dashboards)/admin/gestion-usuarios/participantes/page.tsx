'use client';

import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import { MagnifyingGlass, Trash, Highlighter } from '@/components/icons';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/components/buttons_inputs/Notification';

// Interfaz ajustada para reflejar el formato devuelto por el backend
interface Participante {
    id: number; // Corresponde a id_participant
    nombre: string; // Nombre completo ya formateado
    sede: string; // groups.venues.name
    grupo: string; // groups.name
    correo: string; // email
    status: string; // status
}

const GestionParticipantes = () => {
    const [inputValue, setInputValue] = useState('');
    const [section, setSection] = useState('__All__');
    const [filterActivaExtra, setFilterActivaExtra] = useState({ grupo: '__All__' });
    const [currentPage, setCurrentPage] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
    const [selectedParticipante, setSelectedParticipante] = useState<Participante | null>(null);
    const [participantesData, setParticipantesData] = useState<Participante[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { notify } = useNotification();

    const rowsPerPage = 10;

    useEffect(() => {
        const fetchParticipantes = async () => {
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
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
                setParticipantesData(data.data); // Usar data.data, que es formattedParticipants
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
        setCurrentPage(0);
    };

    const uniqueSedes = Array.from(new Set(participantesData.map((participante) => participante.sede || 'No asignado'))).sort();
    const uniqueGrupos = Array.from(new Set(participantesData.map((participante) => participante.grupo || 'No asignado'))).sort();

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
            const matchesSearch = !searchTerm || participante.nombre.toLowerCase().includes(searchTerm);
            const sede = participante.sede || 'No asignado';
            const grupo = participante.grupo || 'No asignado';
            const matchesSede = section === '__All__' ? true : sede === section;
            const selectedGrupo = filterActivaExtra['grupo'];
            const matchesGrupo = selectedGrupo === '__All__' ? true : grupo === selectedGrupo;
            const isNotCancelled = participante.status?.toLowerCase() !== 'cancelada';
            const isApproved = participante.status?.toLowerCase() === 'aprobada';
            return matchesSearch && matchesSede && matchesGrupo && isNotCancelled && isApproved;
        });
    }, [inputValue, section, filterActivaExtra, participantesData]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    useEffect(() => {
        if (currentPage >= totalPages && totalPages > 0) {
            setCurrentPage(totalPages - 1);
        } else if (totalPages === 0) {
            setCurrentPage(0);
        }
    }, [filteredData.length, currentPage, totalPages]);

    const sectionFilterChange = (value: string) => {
        setSection(value);
        setInputValue('');
        setCurrentPage(0);
    };

    const handleDeleteClick = (participante: Participante) => {
        setSelectedParticipante(participante);
        setIsPopupOpen(true);
    };

    const handleEditClick = (participante: Participante) => {
        router.push(`/admin/gestion-usuarios/participantes/editarParticipante/${participante.id}`);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedParticipante(null);
    };

    const handleConfirmDelete = async () => {
        if (selectedParticipante) {
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await fetch(`/api/participants/${selectedParticipante.id}/reject`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Error rejecting participant: ${errorData.message || 'Unknown error'}`);
                }

                // Actualizar el estado local para reflejar el cambio
                setParticipantesData((prev) =>
                    prev.filter((p) => p.id !== selectedParticipante.id) // Remover de la lista, ya que filteredData excluye Cancelada
                );

                notify({
                    color: 'green',
                    title: 'Usuario Eliminado',
                    message: `El usuario ${selectedParticipante.nombre} ha sido eliminado correctamente`,
                    duration: 5000,
                });

                handleClosePopup();
            } catch (error: any) {
                console.error('Error al rechazar participante:', error);
                notify({
                    color: 'red',
                    title: 'Error',
                    message: `No se pudo rechazar al usuario ${selectedParticipante.nombre}: ${error.message}`,
                    duration: 5000,
                });
                handleClosePopup();
            }
        }
    };

    const handleRowClick = (participante: Participante, event: React.MouseEvent<HTMLTableRowElement>) => {
        const isButtonClick = (event.target as HTMLElement).closest('button');
        if (!isButtonClick) {
            setSelectedParticipante(participante);
            setIsDetailsPopupOpen(true);
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

                <div className="overflow-x-auto custom-scrollbar-tabla">
                    <table className="min-w-full text-left text-sm">
                        <thead className="text-purple-800 font-bold sticky top-0 bg-[#ebe6eb]">
                            <tr className="texto-primary-shade">
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
                                <tr
                                    key={index}
                                    className="border-t border-gray-300 hover:bg-gray-300 cursor-pointer"
                                    onClick={(event) => handleRowClick(participante, event)}
                                >
                                    <td className="p-2 text-center">{participante.nombre}</td>
                                    <td className="p-2 text-center">{participante.sede || 'No asignado'}</td>
                                    <td className="p-2 text-center">{participante.grupo || 'No asignado'}</td>
                                    <td className="p-2 text-center">{participante.correo}</td>
                                    <td className="p-2 text-center">{participante.status}</td>
                                    <td className="p-2 flex gap-2 justify-center">
                                        <Button
                                            label=""
                                            variant="error"
                                            round
                                            showLeftIcon
                                            IconLeft={Trash}
                                            onClick={() => handleDeleteClick(participante)}
                                        />
                                        <Button
                                            label=""
                                            variant="warning"
                                            round
                                            showLeftIcon
                                            IconLeft={Highlighter}
                                            onClick={() => handleEditClick(participante)}
                                        />
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
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-gray-800">
                            <h2 className="text-3xl font-bold mb-4 text-center">Confirmar Eliminación</h2>
                            <p className="mt-12 mb-12">
                                ¿Estás segura de que quieres eliminar a la participante{' '}
                                {selectedParticipante.nombre}?
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button label="Eliminar" variant="error" onClick={handleConfirmDelete} />
                                <Button label="Cerrar" variant="secondary" onClick={handleClosePopup} />
                            </div>
                        </div>
                    </div>
                )}

                {isDetailsPopupOpen && selectedParticipante && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto text-gray-800">
                            <h2 className="text-3xl font-bold mb-4 text-center">Detalles del Participante</h2>
                            <div className="pt-6 pb-6">
                                <p><strong>Nombre Completo:</strong> {selectedParticipante.nombre}</p>
                                <p><strong>Correo:</strong> {selectedParticipante.correo}</p>
                                <p><strong>Sede:</strong> {selectedParticipante.sede || 'No asignado'}</p>
                                <p><strong>Grupo:</strong> {selectedParticipante.grupo || 'No asignado'}</p>
                                <p><strong>Estado:</strong> {selectedParticipante.status}</p>
                            </div>
                            <div className="mt-4 flex justify-center">
                                <Button label="Cerrar" variant="primary" onClick={() => setIsDetailsPopupOpen(false)} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GestionParticipantes;