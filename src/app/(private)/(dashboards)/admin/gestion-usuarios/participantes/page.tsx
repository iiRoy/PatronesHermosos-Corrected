'use client';

import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import { MagnifyingGlass, Trash, Highlighter } from '@/components/icons';
import { useState, useMemo } from 'react';

const GestionParticipantes = () => {
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

    const participantesData = [
        { id: '01', nombre: 'Ana García', sede: 'Puebla', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '02', nombre: 'Beatriz López', sede: 'Querétaro', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '03', nombre: 'Clara Martínez', sede: 'Monterrey', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '04', nombre: 'Diana Pérez', sede: 'Hidalgo', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '05', nombre: 'Elena Rodríguez', sede: 'Guadalajara', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '06', nombre: 'Fabiola Sánchez', sede: 'Saltillo', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '07', nombre: 'Gabriela Torres', sede: 'Ciudad de México', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '08', nombre: 'Hilda Vargas', sede: 'Toluca', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '09', nombre: 'Isabel Ramírez', sede: 'León', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '10', nombre: 'Julia Gómez', sede: 'Chihuahua', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '11', nombre: 'Karla Díaz', sede: 'Culiacán', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '12', nombre: 'Laura Fernández', sede: 'San Luis Potosí', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '13', nombre: 'María Morales', sede: 'Aguascalientes', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '14', nombre: 'Nadia Ortiz', sede: 'Saltillo', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '15', nombre: 'Olivia Castro', sede: 'Ciudad de México', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '16', nombre: 'Paula Mendoza', sede: 'Toluca', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '17', nombre: 'Raquel Silva', sede: 'León', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '18', nombre: 'Sofía Rojas', sede: 'Chihuahua', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '19', nombre: 'Tania Navarro', sede: 'Culiacán', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '20', nombre: 'Valeria Luna', sede: 'San Luis Potosí', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '21', nombre: 'Wendy Salazar', sede: 'Aguascalientes', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '22', nombre: 'Ximena Campos', sede: 'Guadalajara', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '23', nombre: 'Yolanda Vega', sede: 'Saltillo', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '24', nombre: 'Zoe Herrera', sede: 'Ciudad de México', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '25', nombre: 'Alma Rivas', sede: 'Toluca', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '26', nombre: 'Berta Guzmán', sede: 'León', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '27', nombre: 'Carmen Flores', sede: 'Chihuahua', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '28', nombre: 'Delia Cruz', sede: 'Culiacán', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '29', nombre: 'Esther Paredes', sede: 'San Luis Potosí', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '30', nombre: 'Fernanda Meza', sede: 'Aguascalientes', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '31', nombre: 'Gloria Esparza', sede: 'Saltillo', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '32', nombre: 'Helena Soto', sede: 'Ciudad de México', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '33', nombre: 'Inés Salazar', sede: 'Toluca', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '34', nombre: 'Jazmín Ríos', sede: 'León', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '35', nombre: 'Kenia Prado', sede: 'Chihuahua', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '36', nombre: 'Lilia Estrada', sede: 'Culiacán', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '37', nombre: 'Mónica Tapia', sede: 'San Luis Potosí', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
        { id: '38', nombre: 'Natalia Cordero', sede: 'Aguascalientes', grupo: '5', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    ];

    // Filtrar los datos según el valor de búsqueda (solo por la columna "Nombre")
    const filteredData = useMemo(() => {
        const searchTerm = inputValue.toLowerCase().trim();
        if (!searchTerm) {
            return participantesData;
        }

        return participantesData.filter(item =>
            item.nombre.toLowerCase().includes(searchTerm)
        );
    }, [inputValue]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    return (
        <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
            <PageTitle>Gestión de Participantes</PageTitle>

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
                                <th className="p-2 text-center">Nombre</th>
                                <th className="p-2 text-center">Sede</th>
                                <th className="p-2 text-center">Grupo</th>
                                <th className="p-2 text-center">Correo</th>
                                <th className="p-2 text-center">Teléfono</th>
                                <th className="p-2 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {paginatedData.map((participante, index) => (
                                <tr key={index} className="border-t border-gray-300">
                                    <td className="p-2 text-center">{participante.id}</td>
                                    <td className="p-2 text-center">{participante.nombre}</td>
                                    <td className="p-2 text-center">{participante.sede}</td>
                                    <td className="p-2 text-center">{participante.grupo}</td>
                                    <td className="p-2 text-center">{participante.correo}</td>
                                    <td className="p-2 text-center">{participante.telefono}</td>
                                    <td className="p-2 flex gap-2 justify-center">
                                        <Button label='' variant="error" round showLeftIcon IconLeft={Trash} />
                                        <Button label='' variant="warning" round showLeftIcon IconLeft={Highlighter} />
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

export default GestionParticipantes;