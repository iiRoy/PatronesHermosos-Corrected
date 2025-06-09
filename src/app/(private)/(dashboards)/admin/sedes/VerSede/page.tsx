'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import InputField from '@/components/buttons_inputs/InputField';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import Button from '@/components/buttons_inputs/Button';

interface Participante {
  id: string | number;
  nombre: string;
  usuario: string;
  correo: string;
  telefono: string;
  grupo: string;
}

const VerSede = () => {
  const [inputValue, setInputValue] = useState('');
  const [section, setSection] = useState('__All__');
  const [students, setStudents] = useState<Participante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : null;
        if (!token) {
          router.push('/login');
          return;
        }
        // Cambia la URL si tu endpoint es diferente
        const res = await fetch(`/api/venues/${id}/participants`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('No se pudieron cargar los participantes');
        }
        const data = await res.json();
        // Ajusta el mapeo según la estructura real de tu API
        const participantes = (data.data || data).map((p: any) => ({
          id: p.id_participant || p.id || '',
          nombre: `${p.name} ${p.paternal_name || ''} ${p.maternal_name || ''}`.trim(),
          usuario: p.username || p.usuario || '',
          correo: p.email || '',
          telefono: p.tutors?.phone_number || p.telefono || '',
          grupo: p.groups?.name || p.grupo || 'Sin grupo',
        }));
        setStudents(participantes);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id, router]);

  // Obtener grupos únicos para el filtro
  const grupos = Array.from(new Set(students.map((s) => s.grupo))).filter(Boolean);
  const secciones = [
    { label: 'Todos', value: '__All__' },
    ...grupos.map((g) => ({ label: g, value: g })),
  ];

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.nombre.toLowerCase().includes(inputValue.toLowerCase()) ||
      s.usuario.toLowerCase().includes(inputValue.toLowerCase());
    const matchesGroup = section === '__All__' ? true : s.grupo === section;
    return matchesSearch && matchesGroup;
  });

  const sectionFilterChange = (value: string) => {
    setSection(value);
    setInputValue('');
  };

  if (loading) {
    return <div className='p-6 pl-14'>Cargando...</div>;
  }

  if (error) {
    return <div className='p-6 pl-14 text-red-500'>Error: {error}</div>;
  }

  return (
    <div className='p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes'>
      <PageTitle>Sede ITESM Monterrey</PageTitle>

      <div className='fondo-sedes flex flex-col p-6 gap-4 overflow-auto'>
        {/* Encabezado */}
        <div className='flex justify-between items-center border-b border-gray-300 pb-2 mb-4'>
          <div>
            <p className='text-lg font-semibold text-[#2A2A2A]'>Sofía Sánchez</p>
            <p className='text-sm text-gray-500'>sofiaszs@tec.mx</p>
          </div>
          <p className='text-lg font-medium text-gray-700'>Coordinadora</p>
        </div>

        {/* Filtros */}
        <div className='flex gap-4 justify-between mb-4'>
          <div className='basis-2/3'>
            <InputField
              label=''
              showDescription={false}
              placeholder='Buscar participante'
              showError={false}
              variant='primary'
              icon='MagnifyingGlass'
              value={inputValue}
              onChangeText={(val) => setInputValue(val)}
            />
          </div>

          <div className='basis-1/3'>
            <FiltroEvento
              disableCheckboxes
              label='Filtrar por grupo'
              showSecciones
              labelSecciones='Seleccionar Grupo'
              secciones={secciones}
              seccionActiva={section}
              onChangeSeccion={sectionFilterChange}
            />
          </div>
        </div>

        {/* Tabla */}
        <div className='overflow-x-auto bg-white rounded-xl p-4 shadow flex-1'>
          <table className='w-full text-left'>
            <thead className='text-gray-400 text-sm border-b'>
              <tr>
                <th className='pb-2 text-center'>ID</th>
                <th className='pb-2 text-center'>Nombre</th>
                <th className='pb-2 text-center'>Nombre de usuario</th>
                <th className='pb-2 text-center'>Correo electrónico</th>
                <th className='pb-2 text-center'>Número telefónico</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {filteredStudents.map((s) => (
                <tr key={s.id} className='border-b last:border-none'>
                  <td className='py-2 text-center'>{s.id}</td>
                  <td className='py-2 text-center'>{s.nombre}</td>
                  <td className='py-2 text-center'>{s.usuario}</td>
                  <td className='py-2 text-center'>{s.correo}</td>
                  <td className='py-2 text-center'>{s.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botón Listo */}
        <div className='mt-6 self-start'>
          <Button label='Volver' variant='primary' href='../' />
        </div>
      </div>
    </div>
  );
};

export default VerSede;
