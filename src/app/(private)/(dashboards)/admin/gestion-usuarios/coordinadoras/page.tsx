'use client';

import Pagination from '@/components/buttons_inputs/Pagination';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import { Trash, Highlighter } from '@/components/icons';
import { useState, useMemo, useEffect } from 'react'; // Añadimos useEffect

// Definir el tipo Coordinadora
interface Coordinadora {
  id: string;
  nombre: string;
  sede: string;
  correo: string;
  telefono: string;
}

const GestionCoordinadoras = () => {
  const [inputValue, setInputValue] = useState('');
  const [section, setSection] = useState('__All__'); // Inicializar con "Todas"
  const [currentPage, setCurrentPage] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para controlar el popup
  const [selectedCoordinadora, setSelectedCoordinadora] = useState<Coordinadora | null>(null); // Coordinadora seleccionada para eliminar

  const rowsPerPage = 5;

  const coordinadorasData: Coordinadora[] = [
    { id: '01', nombre: 'Ana García', sede: 'Puebla', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    { id: '02', nombre: 'Beatriz López', sede: 'Querétaro', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    { id: '03', nombre: 'Clara Martínez', sede: 'Monterrey', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    { id: '04', nombre: 'Diana Pérez', sede: 'Hidalgo', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    { id: '05', nombre: 'Elena Rodríguez', sede: 'Guadalajara', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    { id: '06', nombre: 'Fabiola Sánchez', sede: 'Saltillo', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    { id: '07', nombre: 'Gabriela Torres', sede: 'Ciudad de México', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    { id: '08', nombre: 'Hilda Vargas', sede: 'Toluca', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    { id: '09', nombre: 'Isabel Ramírez', sede: 'León', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    { id: '10', nombre: 'Julia Gómez', sede: 'Chihuahua', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    { id: '11', nombre: 'Karla Díaz', sede: 'Culiacán', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    { id: '12', nombre: 'Laura Fernández', sede: 'San Luis Potosí', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    { id: '13', nombre: 'María Morales', sede: 'Aguascalientes', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    { id: '14', nombre: 'Nadia Ortiz', sede: 'Tijuana', correo: 'ejemplo@correo.com', telefono: '2222222222' },
    { id: '15', nombre: 'Olivia Castro', sede: 'Zacatecas', correo: 'ejemplo@correo.com', telefono: '2222222222' },
  ];

  // Obtener sedes únicas
  const uniqueSedes = Array.from(new Set(coordinadorasData.map(coordinadora => coordinadora.sede))).sort();
  const sedeOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueSedes.map(sede => ({ label: sede, value: sede })),
  ];

  // Filtrar los datos según el valor de búsqueda y sede
  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return coordinadorasData.filter(coordinadora => {
      // Filtro por nombre
      const matchesSearch = !searchTerm || coordinadora.nombre.toLowerCase().includes(searchTerm);

      // Filtro por sede
      const matchesSede = section === '__All__' ? true : coordinadora.sede === section;

      return matchesSearch && matchesSede;
    });
  }, [inputValue, section]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  // Añadimos un useEffect para reiniciar currentPage cuando filteredData cambie
  useEffect(() => {
    // Si la página actual es mayor o igual al número total de páginas después del filtrado,
    // ajustamos currentPage para que no exceda el rango válido
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    } else if (totalPages === 0) {
      setCurrentPage(0);
    }
  }, [filteredData.length, currentPage, totalPages]);

  const sectionFilterChange = (value: string) => {
    setSection(value);
    setInputValue(''); // Resetear búsqueda al cambiar de sección
    setCurrentPage(0); // Resetear página al cambiar de filtro
  };

  // Función para abrir el popup de confirmación
  const handleDeleteClick = (coordinadora: Coordinadora) => {
    setSelectedCoordinadora(coordinadora);
    setIsPopupOpen(true);
  };

  // Función para cerrar el popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCoordinadora(null);
  };

  // Función para confirmar la eliminación
  const handleConfirmDelete = () => {
    if (selectedCoordinadora) {
      alert(`Eliminando a ${selectedCoordinadora.nombre}`); // Placeholder para la lógica real de eliminación
      handleClosePopup();
    }
  };

  return (
    <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
      <PageTitle>Coordinadoras de Sede</PageTitle>

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
                labelSecciones="Sedes"
                secciones={sedeOptions}
                seccionActiva={section}
                onChangeSeccion={sectionFilterChange}
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
                <th className="p-2 text-center">Correo</th>
                <th className="p-2 text-center">Teléfono</th>
                <th className="p-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {paginatedData.map((coordinadora, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="p-2 text-center">{coordinadora.id}</td>
                  <td className="p-2 text-center">{coordinadora.nombre}</td>
                  <td className="p-2 text-center">{coordinadora.sede}</td>
                  <td className="p-2 text-center">{coordinadora.correo}</td>
                  <td className="p-2 text-center">{coordinadora.telefono}</td>
                  <td className="p-2 flex gap-2 justify-center">
                    <Button label='' variant="error" round showLeftIcon IconLeft={Trash} onClick={() => handleDeleteClick(coordinadora)} />
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
            variant="primary"
            pageLinks={Array(totalPages).fill('#')}
          />
        </div>

        {/* Popup de confirmación */}
        {isPopupOpen && selectedCoordinadora && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-3xl font-bold mb-4 text-center">Confirmar Eliminación</h2>
              <p className="my-12">¿Estás seguro de que quieres eliminar a la coordinadora {selectedCoordinadora.nombre}?</p>
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

export default GestionCoordinadoras;