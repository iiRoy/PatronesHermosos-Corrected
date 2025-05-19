'use client';

import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import { MagnifyingGlass, Trash, Highlighter, X } from '@/components/icons';
import { useState, useMemo, useEffect } from 'react';

interface Sede {
    id: string;
    nombre: string;
    lugar: string;
    status: string;
    grupos: string;
    estudiantes: string;
}

const SedesAdmin = () => {
    const [inputValue, setInputValue] = useState('');
    const [section, setSection] = useState('__All__');
    const [fadeSec, setFadeSec] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedSede, setSelectedSede] = useState<Sede | null>(null);

    const rowsPerPage = 5;

    const sedes = [
        { label: 'Puebla', value: 'Puebla' },
        { label: 'Querétaro', value: 'Querétaro' },
        { label: 'Monterrey', value: 'Monterrey' },
        { label: 'Hidalgo', value: 'Hidalgo' },
        { label: 'Guadalajara', value: 'Guadalajara' },
    ];

    const sedesData = [
        { id: '01', nombre: 'ITESM Puebla', lugar: 'Puebla', status: 'Registrada con participantes', grupos: '07', estudiantes: '63' },
        { id: '02', nombre: 'ITESM Querétaro', lugar: 'Querétaro', status: 'Registrada con participantes', grupos: '06', estudiantes: '55' },
        { id: '03', nombre: 'ITESM Monterrey', lugar: 'Monterrey', status: 'Registrada con participantes', grupos: '11', estudiantes: '103' },
        { id: '04', nombre: 'ITESM Hidalgo', lugar: 'Hidalgo', status: 'Pendiente', grupos: '04', estudiantes: '39' },
        { id: '05', nombre: 'ITESM Guadalajara', lugar: 'Guadalajara', status: 'Registrada con participantes', grupos: '09', estudiantes: '87' },
        { id: '06', nombre: 'ITESM Saltillo', lugar: 'Saltillo', status: 'Pendiente', grupos: '08', estudiantes: '72' },
        { id: '07', nombre: 'ITESM Cuernavaca', lugar: 'Cuernavaca', status: 'Registrada con participantes', grupos: '10', estudiantes: '95' },
    ];

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
                item.id.toLowerCase().includes(searchTerm) ||
                item.nombre.toLowerCase().includes(searchTerm) ||
                item.lugar.toLowerCase().includes(searchTerm) ||
                item.status.toLowerCase().includes(searchTerm);
            const matchesStatus = section === '__All__' || item.status === section;
            return matchesSearch && matchesStatus;
        });
    }, [inputValue, section]);

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
                                <th className="p-2 text-center">ID</th>
                                <th className="p-2 text-center">Nombre</th>
                                <th className="p-2 text-center">Lugar</th>
                                <th className="p-2 text-center">Status</th>
                                <th className="p-2 text-center">No. de Grupos</th>
                                <th className="p-2 text-center">No. de Estudiantes</th>
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
                                    <td className="p-2 text-center">{sede.id}</td>
                                    <td className="p-2 text-center">{sede.nombre}</td>
                                    <td className="p-2 text-center">{sede.lugar}</td>
                                    <td className="p-2 text-center">{sede.status}</td>
                                    <td className="p-2 text-center">{sede.grupos}</td>
                                    <td className="p-2 text-center">{sede.estudiantes}</td>
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
                                            href={`sedes/editarSedes/editar${sede.lugar}`}
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
                                <p><strong>ID:</strong> {selectedSede.id}</p>
                                <p><strong>Nombre:</strong> {selectedSede.nombre}</p>
                                <p><strong>Lugar:</strong> {selectedSede.lugar}</p>
                                <p><strong>Status:</strong> {selectedSede.status}</p>
                                <p><strong>No. de Grupos:</strong> {selectedSede.grupos}</p>
                                <p><strong>No. de Estudiantes:</strong> {selectedSede.estudiantes}</p>
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