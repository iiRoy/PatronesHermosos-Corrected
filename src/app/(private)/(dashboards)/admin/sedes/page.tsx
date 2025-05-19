'use client';

import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import { MagnifyingGlass, Trash, Highlighter } from '@/components/icons';
import { useState, useMemo, useEffect } from 'react';

const SedesAdmin = () => {
    const [inputValue, setInputValue] = useState('');
    const [section, setSection] = useState('SEDES');
    const [filterActivaExtra, setFilterActivaExtra] = useState({});
    const [fadeSec, setFadeSec] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const rowsPerPage = 5;

    const extraHandleFilterChange = (key: string, value: string) => {
        setFilterActivaExtra((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const sedesData = [
        { id: '01', nombre: 'ITESM Puebla', lugar: 'Puebla', status: 'Registrada con participantes', grupos: '07', estudiantes: '63' },
        { id: '02', nombre: 'ITESM Querétaro', lugar: 'Querétaro', status: 'Registrada con participantes', grupos: '06', estudiantes: '55' },
        { id: '03', nombre: 'ITESM Monterrey', lugar: 'Monterrey', status: 'Registrada con participantes', grupos: '11', estudiantes: '103' },
        { id: '04', nombre: 'ITESM Hidalgo', lugar: 'Hidalgo', status: 'Pendiente', grupos: '04', estudiantes: '39' },
        { id: '05', nombre: 'ITESM Guadalajara', lugar: 'Guadalajara', status: 'Registrada con participantes', grupos: '09', estudiantes: '87' },
        { id: '06', nombre: 'ITESM Saltillo', lugar: 'Saltillo', status: 'Pendiente', grupos: '08', estudiantes: '72' },
        { id: '07', nombre: 'ITESM Cuernavaca', lugar: 'Cuernavaca', status: 'Registrada con participantes', grupos: '10', estudiantes: '95' },
    ];

    // Filtrar los datos según el valor de búsqueda (solo por las columnas "Universidad" y "Campus")
    const filteredData = useMemo(() => {
        const searchTerm = inputValue.toLowerCase().trim();
        if (!searchTerm) {
            return sedesData;
        }

        return sedesData.filter(item =>
            item.id.toLowerCase().includes(searchTerm) ||
            item.nombre.toLowerCase().includes(searchTerm) ||
            item.lugar.toLowerCase().includes(searchTerm) ||
            item.status.toLowerCase().includes(searchTerm)
        );
    }, [inputValue]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    // Añadimos un useEffect para reiniciar currentPage cuando filteredData cambie
    useEffect(() => {
        if (currentPage >= totalPages && totalPages > 0) {
            setCurrentPage(totalPages - 1);
        } else if (totalPages === 0) {
            setCurrentPage(0);
        }
    }, [filteredData.length, currentPage, totalPages]);

    return (
        <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
            <PageTitle>Sedes</PageTitle>

            <div className="fondo-sedes flex flex-col p-6 gap-4 overflow-auto">
                {/* Fila de búsqueda, filtro y botón */}
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
                                labelSecciones="Secciones"
                                secciones={[
                                    { label: 'ITESM Puebla', value: 'Participantes' },
                                    { label: 'ITESM Monterrey', value: 'Colaboradoras' },
                                ]}
                                seccionActiva={section}
                                extraFilters={[]}
                                filterActiva={filterActivaExtra}
                                onExtraFilterChange={extraHandleFilterChange}
                                fade={fadeSec}
                            />
                        </div>
                    </div>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="text-purple-800 font-bold">
                            <tr className='texto-primary-shade'>
                                <th className="p-2 text-center">ID</th>
                                <th className="p-2 text-center">Universidad</th>
                                <th className="p-2 text-center">Campus</th>
                                <th className="p-2 text-center">Status</th>
                                <th className="p-2 text-center">No. de Grupos</th>
                                <th className="p-2 text-center">No. de Estudiantes</th>
                                <th className="p-2 text-center"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {paginatedData.map((sede, index) => (
                                <tr key={index} className="border-t border-gray-300">
                                    <td className="p-2 text-center">{sede.id}</td>
                                    <td className="p-2 text-center">{sede.nombre}</td>
                                    <td className="p-2 text-center">{sede.lugar}</td>
                                    <td className="p-2 text-center">{sede.status}</td>
                                    <td className="p-2 text-center">{sede.grupos}</td>
                                    <td className="p-2 text-center">{sede.estudiantes}</td>
                                    <td className="p-2 flex gap-2 justify-center">
                                        <Button label='' variant="error" round showLeftIcon IconLeft={Trash} />
                                        <Button
                                            label=''
                                            variant="warning"
                                            round
                                            showLeftIcon
                                            IconLeft={Highlighter}
                                            href={`sedes/editarSedes/editar${sede.lugar}`}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                <div className="mt-auto pt-4 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        variant="secondary-shade"
                        pageLinks={Array(totalPages).fill('#')}
                    />
                </div>
            </div>
        </div>
    );
};

export default SedesAdmin;