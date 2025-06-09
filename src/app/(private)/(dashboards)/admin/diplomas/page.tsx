// page.tsx (DiplomasPage)
'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/buttons_inputs/Button';
import InputField from '@/components/buttons_inputs/InputField';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import Pagination from '@/components/buttons_inputs/Pagination';
import Checkbox from '@/components/buttons_inputs/Checkbox';
import MessageCard from '@/components/buttons_inputs/MessageCard';
import { Download, EnvelopeOpen } from '@/components/icons';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNotification } from '@/components/buttons_inputs/Notification';

type UsuarioDiploma = {
  id: string;
  name: string;
  paternal_name: string;
  campus: string;
  role: string;
  start_date?: string;
  end_date?: string;
  email?: string;
};

const DiplomasPage = () => {
  const [users, setUsers] = useState<UsuarioDiploma[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [filterSede, setFilterSede] = useState('all');
  const [filterRol, setFilterRol] = useState('all');
  const [search, setSearch] = useState('');
  const [opcionesSede, setOpcionesSede] = useState<{ label: string; value: string }[]>([]);
  const [opcionesRol, setOpcionesRol] = useState<{ label: string; value: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Estados para valores de localStorage
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [apiToken, setApiToken] = useState<string | null>(null);

  // --- Nuevos estados para MessageCard ---
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [includeCopy, setIncludeCopy] = useState(false);
  const [showRecipients, setShowRecipients] = useState(false);
  // -----------------------------------------

  const { notify } = useNotification();

  // Cargar valores de localStorage SOLO en cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserId(localStorage.getItem('user_id') || '');
      setUserRole(localStorage.getItem('user_role') || '');
      setApiToken(localStorage.getItem('api_token'));
    }
  }, []);

  // Computar destinatarios con nombre + correo
  const recipientsInfo = users
    .filter((u) => selected.includes(`${u.id}-${u.role}`))
    .map((u) => ({
      name: `${u.name} ${u.paternal_name}`,
      email: u.email || '—',
    }));

  // Paginación
  const rowsPerPage = 4;
  const totalPages = Math.ceil(users.length / rowsPerPage);
  const paginatedData = users.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  // IDs visibles y estado de "todos seleccionados"
  const allIds = users.map((u) => `${u.id}-${u.role}`);
  const allSelected = allIds.length > 0 && allIds.every((id) => selected.includes(id));

  // Cargar filtros
  useEffect(() => {
    async function fetchFiltros() {
      try {
        const res = await fetch(`/api/diplomas/filtros?user_id=${userId}&user_role=${userRole}`);
        const data = await res.json();
        setOpcionesSede([
          { label: 'Todas las SEDES', value: 'all' },
          ...data.sedes.map((s: string) => ({ label: s, value: s })),
        ]);
        setOpcionesRol([
          { label: 'Todos los roles', value: 'all' },
          ...data.roles.map((r: string) => ({
            label: r.charAt(0).toUpperCase() + r.slice(1),
            value: r,
          })),
        ]);
      } catch {
        toast.error('Error cargando filtros');
      }
    }
    if (userId && userRole) fetchFiltros();
  }, [userId, userRole]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!apiToken) {
          throw new Error('No hay token de autenticación');
        }

        const res = await axios.get('/api/data/getprofile', {
          headers: { Authorization: `Bearer ${apiToken}` },
        });

        const { name, paternal_name, maternal_name } = res.data;
        setSenderName(`${name} ${paternal_name} ${maternal_name}`);
        setEmailSubject('¡Felicidades por tu logro!');
      } catch (error: any) {
        console.error('🚨 fetchProfile error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        toast.error('No se pudo cargar tu perfil');
      }
    };

    if (apiToken) fetchProfile();
  }, [apiToken]);

  // Cargar usuarios
  useEffect(() => {
    async function fetchUsers() {
      try {
        const sedeParam = filterSede === 'all' ? '' : filterSede;
        const rolParam = filterRol === 'all' ? '' : filterRol;
        const res = await fetch(
          `/api/diplomas/users?search=${encodeURIComponent(search)}&sede=${encodeURIComponent(
            sedeParam,
          )}&role=${encodeURIComponent(rolParam)}&user_id=${userId}&user_role=${userRole}`,
        );
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error ${res.status}: ${text}`);
        }
        const data: UsuarioDiploma[] = await res.json();
        setUsers(data);
        setCurrentPage(0);
      } catch (error: any) {
        console.error(error);
        toast.error('Error al obtener usuarios para diplomas.');
        setUsers([]);
      }
    }
    if (userId && userRole) fetchUsers();
  }, [search, filterSede, filterRol, userId, userRole]);

  // Seleccionar/deseleccionar visibles
  const toggleSelectAll = () => {
    if (allSelected) {
      deselectAllUsers();
    } else {
      selectAllUsers();
    }
  };

  // Seleccionar/deseleccionar individual
  const toggleSelect = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // Seleccionar/deseleccionar todos los usuarios
  const selectAllUsers = () => {
    setSelected(allIds);
  };
  const deselectAllUsers = () => {
    setSelected([]);
  };

  // Descarga individual
  const downloadIndividual = async (user: UsuarioDiploma) => {
    if (typeof window === 'undefined') return;
    try {
      const res = await axios.post(
        '/api/diplomas/generate',
        { users: [user] },
        { responseType: 'blob' },
      );
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${user.name} ${user.paternal_name}.pdf`;
      a.click();
      a.remove();
      notify({
        color: 'green',
        title: 'Descarga de diplomas Exitosa',
        message: `Se ha descargado correctamente el diploma de ${user.name} ${user.paternal_name}.`,
        iconName: 'CheckCircle',
        variant: 'two',
        duration: 5000,
      });
    } catch {
      toast.error('Error al descargar diploma');
      notify({
        color: 'red',
        title: 'Error en Descarga',
        message: `Los diplomas no se han descargado debido a un error del sistema. Intenta nuevamente más tarde.`,
        iconName: 'SealWarning',
        variant: 'two',
        duration: 5000,
      });
    }
  };

  // Descarga ZIP
  const downloadZIP = async () => {
    if (typeof window === 'undefined') return;
    try {
      const usersSelected = users.filter((u) => selected.includes(`${u.id}-${u.role}`));
      if (usersSelected.length === 0) {
        toast.error('Seleccione al menos un usuario para generar ZIP');
        return;
      }
      const res = await axios.post(
        '/api/diplomas/generate',
        { users: usersSelected },
        { responseType: 'blob' },
      );
      const blob = new Blob([res.data], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diplomas.zip`;
      a.click();
      a.remove();
      notify({
        color: 'green',
        title: 'Descarga ZIP Exitosa',
        message: `Se han descargado ${usersSelected.length} diplomas exitosamente.`,
        iconName: 'CheckCircle',
        variant: 'two',
        duration: 5000,
      });
    } catch {
      toast.error('Error generando ZIP');
      notify({
        color: 'red',
        title: 'Error en Descarga',
        message: `Los diplomas no se han descargado debido a un error del sistema. Intenta nuevamente más tarde.`,
        iconName: 'SealWarning',
        variant: 'two',
        duration: 5000,
      });
    }
  };

  // Envío por correo ahora incluye asunto y copia
  const openEmailForm = () => {
    if (!selected.length) {
      toast.error('Seleccione al menos un usuario para enviar por correo');
      return;
    }
    setShowEmailForm(true);
  };
  const cancelEmailForm = () => {
    setShowEmailForm(false);
    setCustomMessage('');
    setIncludeCopy(false);
  };
  const sendByEmail = async () => {
    cancelEmailForm();
    notify({
      color: 'purple',
      title: 'Envió de Correos Pendiente',
      message: `Se ha iniciado la solicitud de envío de correos. Revisa tus notificaciones para saber el estado de envío.`,
      iconName: 'Warning',
      variant: 'two',
      duration: 5000,
    });
    try {
      const usersSelected = users
        .filter((u) => selected.includes(`${u.id}-${u.role}`))
        .filter((u) => u.email);
      if (!usersSelected.length) {
        toast.error('No hay correos válidos entre los seleccionados');
        return;
      }
      if (!apiToken) {
        toast.error('No hay token de autenticación');
        return;
      }
      await axios.post(
        '/api/diplomas/email',
        {
          users: usersSelected,
          senderName,
          subject: emailSubject,
          message: customMessage,
          includeCopy,
        },
        {
          headers: { Authorization: `Bearer ${apiToken}` },
        },
      );
      toast.success('Diplomas enviados por correo correctamente');
      notify({
        color: 'green',
        title: 'Envío Exitoso',
        message: `Los diplomas han sido enviados a ${usersSelected.length} destinatarios.`,
        iconName: 'CheckCircle',
        variant: 'two',
        duration: 5000,
      });
    } catch {
      toast.error('Error al enviar diplomas por correo');
      notify({
        color: 'red',
        title: 'Error en Envío',
        message: `Los diplomas no se han enviado debido a un error del sistema. Intenta nuevamente más tarde.`,
        iconName: 'SealWarning',
        variant: 'two',
        duration: 5000,
      });
    }
  };

  return (
    <div className='p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes'>
      <PageTitle>Generar Diplomas</PageTitle>

      <div className='fondo-sedes flex flex-col p-6 gap-4'>
        {/* FILTROS Y BÚSQUEDA */}
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-1 gap-4'>
            <div className='basis-2/3'>
              <InputField
                label=''
                placeholder='Buscar por nombre'
                value={search}
                onChangeText={setSearch}
                icon='MagnifyingGlass'
              />
            </div>
            <div className='basis-1/3'>
              <FiltroEvento
                disableCheckboxes
                label='Filtros'
                showSecciones
                labelSecciones='SEDE'
                secciones={opcionesSede}
                seccionActiva={filterSede}
                onChangeSeccion={setFilterSede}
                extraFilters={[
                  {
                    label: 'Rol',
                    key: 'rol',
                    options: opcionesRol,
                  },
                ]}
                filterActiva={{ rol: filterRol }}
                onExtraFilterChange={(key, val) => setFilterRol(val)}
              />
            </div>
          </div>
        </div>

        {/* TABLA */}
        <div className='overflow-auto custom-scrollbar-tabla'>
          <table className='min-w-full text-left text-sm table-fixed max-w-full '>
            <thead className='text-[var(--secondaryColor)] font-bold'>
              <tr>
                <th className='p-2 text-center justify-center items-center w-[10%]'>
                  <div className='flex flex-center w-full justify-center'>
                    <Checkbox checked={allSelected} onChange={toggleSelectAll} variant={'accent'} />
                  </div>
                </th>
                <th className='p-2 text-center w-[18%]'>Nombre</th>
                <th className='p-2 text-center w-[20%]'>Rol</th>
                <th className='p-2 text-center w-[21%]'>Sede</th>
                <th className='p-2 text-center w-[11%]'>Acción</th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {paginatedData.map((user, index) => {
                const uid = `${user.id}-${user.role}`;
                return (
                  <tr key={uid} className='border-t border-gray-300'>
                    <td className='p-2 text-center justify-center flex flex-center'>
                      <Checkbox
                        checked={selected.includes(uid)}
                        onChange={() => toggleSelect(uid)}
                        variant={index % 2 === 0 ? 'primary' : 'secondary'}
                      />
                    </td>
                    <td className='p-2 text-center'>
                      {user.name} {user.paternal_name}
                    </td>
                    <td className='p-2 text-center capitalize'>{user.role}</td>
                    <td className='p-2 text-center'>{user.campus}</td>
                    <td className='p-2 flex gap-2 justify-center'>
                      <Button
                        label=''
                        variant='primary'
                        round
                        showLeftIcon
                        IconLeft={Download}
                        onClick={() => downloadIndividual(user)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className='flex gap-4 justify-start mt-4'>
          <Button
            label='Descargar Seleccionados'
            variant='primary'
            showLeftIcon
            IconLeft={Download}
            onClick={
              selected.length === 1
                ? () => {
                    const user = users.find((u) => `${u.id}-${u.role}` === selected[0]);
                    if (user) downloadIndividual(user);
                  }
                : downloadZIP
            }
            disabled={selected.length === 0}
          />
          <Button
            label='Enviar por Correo'
            variant='secondary'
            showLeftIcon
            IconLeft={EnvelopeOpen}
            onClick={openEmailForm}
            disabled={selected.length === 0}
          />
        </div>

        {/* OVERLAY + FORMULARIO + MENÚ DE DESTINATARIOS */}
        {showEmailForm && (
          <>
            {/* Overlay que cubre todo */}
            <div className='fixed inset-0 bg-black/50 z-40' />

            {/* Contenedor centrado */}
            <div className='fixed inset-0 flex items-center justify-center z-50'>
              <div className='relative inline-flex'>
                {/* PANEL DETRÁS DEL CARD */}
                <div
                  className={`
        absolute top-0 left-7 bottom-0 w-[20vw] border-r bg-[var(--background)] pt-6 px-2
        rounded-l-3xl
        transition-transform duration-300 ease-in-out
        ${showRecipients ? '-translate-x-full' : 'translate-x-0'}
      `}
                  style={{ zIndex: 10 }}
                >
                  <div className='overflow-auto'>
                    <h3 className='text-2xl font-semibold mb-2 text-center pr-2 text-[var(--text-color)]'>
                      Destinatarios
                    </h3>
                  </div>
                  <div className='p-4 h-[31vh] overflow-auto bg-white rounded-3xl'>
                    <ul className='space-y-4'>
                      {recipientsInfo.length > 0 ? (
                        recipientsInfo.map((r) => (
                          <li key={r.email}>
                            <div className='font-medium text-gray-800'>{r.name}</div>
                            <div className='text-sm text-gray-500'>{r.email}</div>
                          </li>
                        ))
                      ) : (
                        <li className='text-gray-500'>Ningún destinatario</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* CARD PRINCIPAL ENCIMA */}

                {/* CARD PRINCIPAL: encima del panel (z-20) */}
                <div className='relative z-20 shadow-custom-dark rounded-3xl justify-center'>
                  <MessageCard
                    color='purple'
                    icon={'EnvelopeOpen'}
                    title='Envío de Diplomas'
                    description={
                      <textarea
                        className='w-full border border-gray-300 rounded-md p-2 text-sm'
                        placeholder='Escribe un mensaje opcional para incluir en el correo...'
                        rows={4}
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                      />
                    }
                    checkboxLabel='Enviar copia a mi correo'
                    checkboxChecked={includeCopy}
                    onCheckboxChange={setIncludeCopy}
                    showToggle
                    toggleLabel='Destinatarios'
                    onToggle={() => setShowRecipients((v) => !v)}
                    showAccept
                    acceptLabel='Enviar'
                    onAccept={() => {
                      sendByEmail();
                    }}
                    showDecline
                    declineLabel='Cancelar'
                    onDecline={cancelEmailForm}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* PAGINACIÓN */}
        <div className='mt-4 flex justify-center'>
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            variant='secondary-shade'
            pageLinks={Array(totalPages).fill('#')}
          />
        </div>
      </div>
    </div>
  );
};

export default DiplomasPage;
