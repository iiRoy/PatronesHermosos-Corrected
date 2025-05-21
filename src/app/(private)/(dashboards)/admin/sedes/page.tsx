'use client';

import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import { MagnifyingGlass, Trash, Highlighter, X } from '@/components/icons';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Sede {
    id_venue: number;
    name: string;
    location: string; // Combinación de country y state
    address: string;
    status: string;
}

const SedesAdmin = () => {
    const [inputValue, setInputValue] = useState('');
    const [section, setSection] = useState('__All__');
    const [fadeSec, setFadeSec] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedSede, setSelectedSede] = useState<Sede | null>(null);
    const [sedesData, setSedesData] = useState<Sede[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const rowsPerPage = 5;

    useEffect(() => {
        const fetchSedes = async () => {
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await fetch('/api/venues', {
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
                    throw new Error(`Error fetching venues: ${response.status} - ${errorData.message || 'Unknown error'}`);
                }

                const data = await response.json();
                // Mapear los datos de la API a la interfaz Sede
                const formattedData = data.map((venue: any) => ({
                    id_venue: venue.id_venue,
                    name: venue.name || 'Sin nombre',
                    // Combinar country y state para location, con manejo de valores vacíos
                    location: `${venue.country || ''}${venue.country && venue.state ? ', ' : ''}${venue.state || ''}`.trim() || 'Sin ubicación',
                    address: venue.address || 'Sin dirección',
                    // Reemplazar guiones bajos por espacios en el status
                    status: venue.status ? venue.status.replace(/_/g, ' ') : 'Pendiente',
                }));
                setSedesData(formattedData);

                // Depuración: Mostrar los datos crudos en consola para inspeccionar country y state
                console.log('Datos crudos de la API:', data);
            } catch (error: any) {
                console.error('Error al obtener sedes:', error);
                setError(error.message);
            }
        };
        fetchSedes();
    }, [router]);

    const uniqueStatuses = Array.from(new Set(sedesData.map(item => item.status))).map(status => ({
        label: status,
        value: status,
    }));
    const statusOptions = [{ label: 'Todos', value: '__All__' }, ...uniqueStatuses];

    const filteredData = useMemo(() => {
        const searchTerm = inputValue.toLowerCase().trim();
        return sedesData.filter(item => {
            const matchesSearch =
                !searchTerm ||
                item.name.toLowerCase().includes(searchTerm) ||
                item.location.toLowerCase().includes(searchTerm) ||
                item.address.toLowerCase().includes(searchTerm) ||
                item.status.toLowerCase().includes(searchTerm);
            const matchesStatus = section === '__All__' || item.status === section;
            // Filtrar solo sedes con status "Registrada con participantes" o "Registrada sin participantes"
            const isValidStatus = item.status === 'Registrada con participantes' || item.status === 'Registrada sin participantes';
            return matchesSearch && matchesStatus && isValidStatus;
        });
    }, [inputValue, section, sedesData]);

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

    const handleRowClick = (sede: Sede) => {
        setSelectedSede(sede);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedSede(null);
    };

    if (error) {
        return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
            <PageTitle>Sedes</PageTitle>

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
                                labelSecciones="Status"
                                secciones={statusOptions}
                                seccionActiva={section}
                                onChangeSeccion={sectionFilterChange}
                                extraFilters={[]}
                                fade={fadeSec}
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="text-purple-800 font-bold">
                            <tr className='texto-primary-shade'>
                                <th className="p-2 text-center">Nombre</th>
                                <th className="p-2 text-center">Ubicación</th>
                                <th className="p-2 text-center">Dirección</th>
                                <th className="p-2 text-center">Status</th>
                                <th className="p-2 text-center"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {paginatedData.map((sede, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-gray-300 hover:bg-gray-300 cursor-pointer"
                                    onClick={() => handleRowClick(sede)}
                                >
                                    <td className="p-2 text-center">{sede.name}</td>
                                    <td className="p-2 text-center">{sede.location}</td>
                                    <td className="p-2 text-center">{sede.address}</td>
                                    <td className="p-2 text-center">{sede.status}</td>
                                    <td className="p-2 flex gap-2 justify-center">
                                        <Button
                                            label=''
                                            variant="error"
                                            round
                                            showLeftIcon
                                            IconLeft={Trash}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <Button
                                            label=''
                                            variant="warning"
                                            round
                                            showLeftIcon
                                            IconLeft={Highlighter}
                                            href={`sedes/editarSedes/editar${sede.id_venue}`}
                                            onClick={(e) => e.stopPropagation()}
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
                        variant="secondary-shade"
                        pageLinks={Array(totalPages).fill('#')}
                    />
                </div>

                {isPopupOpen && selectedSede && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-2xl font-bold mb-4 text-center">Detalles de la Sede</h2>
                            <div>
                                <p><strong>Nombre:</strong> {selectedSede.name}</p>
                                <p><strong>Ubicación:</strong> {selectedSede.location}</p>
                                <p><strong>Dirección:</strong> {selectedSede.address}</p>
                                <p><strong>Status:</strong> {selectedSede.status}</p>
                            </div>
                            <div className="mt-6 flex justify-center">
                                <Button
                                    label="Cerrar"
                                    variant="secondary"
                                    onClick={handleClosePopup}
                                    showLeftIcon
                                    IconLeft={X}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SedesAdmin;