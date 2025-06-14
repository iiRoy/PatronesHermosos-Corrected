'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@components/buttons_inputs/Button';
import Checkbox from '@components/buttons_inputs/Checkbox';
import { useNotification } from '@/components/buttons_inputs/Notification';
import CollapsibleSection from '@components/buttons_inputs/CollapsibleSection';

import FlowerLotus from '@/components/icons/FlowerLotus';
import SealWarning from '@/components/icons/SealWarning';
import Heart from '@/components/icons/Heart';
import Megaphone from '@/components/icons/Megaphone';
import AddressBook from '@/components/icons/AddressBook';
import X from '@/components/icons/X';
import Send from '@/components/icons/ArrowFatRight';
import GraduationCap from '@/components/icons/GraduationCap';
import BookOpenText from '@/components/icons/BookOpenText';

import ParticipantGroupSelectionTable from '@components/tables/GroupSelectionTable';
import { Files, FilePdf } from '@/components/icons';

interface ParticipantData {
  name: string;
  paternal_name: string;
  maternal_name: string;
  email: string;
  year: string;
  education: string;
}

interface TutorData {
  name: string;
  paternal_name: string;
  maternal_name: string;
  email: string;
  phone_number: string;
}

interface Group {
  id_group: number;
  name: string;
  mode: string;
  sede: string;
  cupo: string;
  horarios: string;
  fechas: string;
}

interface FormData {
  participant: ParticipantData;
  tutor: TutorData;
  participation_file: File | null;
  preferred_group: number | null;
  privacy_accepted: boolean;
}

const initialFormData: FormData = {
  participant: {
    name: '',
    paternal_name: '',
    maternal_name: '',
    email: '',
    year: '',
    education: '',
  },
  tutor: {
    name: '',
    paternal_name: '',
    maternal_name: '',
    email: '',
    phone_number: '',
  },
  participation_file: null,
  preferred_group: null,
  privacy_accepted: false,
};

type Section = keyof FormData;

const ParticipantRegistrationForm: React.FC = () => {
  const router = useRouter();
  const { notify } = useNotification();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [groups, setGroups] = useState<Group[]>([]);
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  const [sectionErrors, setSectionErrors] = useState({
    participant: false,
    tutor: false,
    participation_file: false,
    preferred_group: false,
    privacy_accepted: false,
  });

  // --- Carga de grupos para tabla ---
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/groups');
        if (!response.ok) throw new Error('Error al cargar los grupos');
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Formato inválido en la respuesta');
        const transformedGroups = data.map((group: any) => ({
          id_group: group.id_group,
          name: group.name,
          mode: group.mode || 'Presencial',
          sede: group.venues?.name || 'N/A',
          cupo: `${group.occupied_places || 0}/${group.max_places || 'N/A'} Personas`,
          horarios: `${group.start_hour || 'N/A'} - ${group.end_hour || 'N/A'}`,
          fechas: `${
            group.start_date ? new Date(group.start_date).toLocaleDateString('es-MX') : 'N/A'
          } - ${group.end_date ? new Date(group.end_date).toLocaleDateString('es-MX') : 'N/A'}`,
        }));
        setGroups(transformedGroups);
      } catch (err: any) {
        notify({
          color: 'red',
          title: 'Error',
          message: err.message || 'No se pudieron cargar los grupos.',
          iconName: 'Warning',
          variant: 'two',
        });
      }
    };
    fetchGroups();
  }, [notify]);

  // Utilidad para aplanar errores anidados
  const flattenFieldErrors = (fieldErrors: {
    [section: string]: { [field: string]: string };
  }): Record<string, string> => {
    const flat: Record<string, string> = {};
    for (const section in fieldErrors) {
      for (const field in fieldErrors[section]) {
        flat[`${section}.${field}`] = fieldErrors[section][field];
      }
    }
    return flat;
  };

  // Validación completa del formulario
  const getFieldErrors = (data: FormData) => {
    const fieldErrors: { [section: string]: { [field: string]: string } } = {};
    const sectionErrors = {
      participant: false,
      tutor: false,
      participation_file: false,
      preferred_group: false,
      privacy_accepted: false,
    };

    const setError = (section: string, field: string, message: string) => {
      if (!fieldErrors[section]) fieldErrors[section] = {};
      fieldErrors[section][field] = message;
      sectionErrors[section as keyof typeof sectionErrors] = true;
    };

    // Participante
    const p = data.participant;
    if (!p.name.trim()) setError('participant', 'name', 'El nombre es obligatorio*');
    if (!p.paternal_name.trim())
      setError('participant', 'paternal_name', 'El apellido paterno es obligatorio*');
    if (!p.email.trim()) setError('participant', 'email', 'El correo electrónico es obligatorio*');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email))
      setError('participant', 'email', 'El correo electrónico no es válido*');
    if (!p.year.trim()) setError('participant', 'year', 'El grado es obligatorio*');
    if (!p.education.trim()) setError('participant', 'education', 'La escolaridad es obligatoria*');

    // Tutor
    const t = data.tutor;
    if (!t.name.trim()) setError('tutor', 'name', 'El nombre del tutor es obligatorio*');
    if (!t.paternal_name.trim())
      setError('tutor', 'paternal_name', 'El apellido paterno del tutor es obligatorio*');
    if (!t.email.trim())
      setError('tutor', 'email', 'El correo electrónico del tutor es obligatorio*');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email))
      setError('tutor', 'email', 'El correo electrónico del tutor no es válido*');
    if (!t.phone_number.trim())
      setError('tutor', 'phone_number', 'El celular del tutor es obligatorio*');
    else if (!/^\d+$/.test(t.phone_number.trim()))
      setError('tutor', 'phone_number', 'El celular debe contener solo números*');
    else if (t.phone_number.replace(/\D/g, '').length < 10)
      setError('tutor', 'phone_number', 'El celular debe tener al menos 10 dígitos*');

    // Archivo
    if (!data.participation_file)
      setError(
        'participation_file',
        'participation_file',
        'El archivo de participación es obligatorio*',
      );

    // Grupo (opcional, pero puedes descomentar para hacerlo obligatorio)
    if (!data.preferred_group)
      setError('preferred_group', 'preferred_group', 'Debes seleccionar un grupo*');

    // Privacidad
    if (!data.privacy_accepted)
      setError('privacy_accepted', 'privacy_accepted', 'Debes aceptar el aviso de privacidad*');

    return { fieldErrors, sectionErrors };
  };

  // Validación de campo individual
  const validateField = (
    section: Section,
    field: string,
    value: string | File | null,
    customFormData?: FormData,
  ): string | null => {
    const baseFormData = customFormData || formData;
    const updatedFormData = {
      ...baseFormData,
      [section]:
        section === 'participation_file'
          ? value
          : typeof baseFormData[section] === 'object' && baseFormData[section] !== null
            ? { ...(baseFormData[section] as object), [field]: value }
            : { [field]: value },
    };

    const { fieldErrors } = getFieldErrors(updatedFormData as FormData);
    return fieldErrors[section]?.[field] ?? null;
  };

  // Manejo de cambios en campos anidados
  const handleInputChange = (section: keyof FormData, field: string, value: string) => {
    if (section === 'participant' || section === 'tutor') {
      const updatedFormData = {
        ...formData,
        [section]: { ...formData[section], [field]: value },
      };
      setFormData(updatedFormData);

      const errorMsg = validateField(section, field, value, updatedFormData);
      setInputErrors((prev) => ({
        ...prev,
        [`${section}.${field}`]: errorMsg ?? '',
      }));
      const sectionHasError = Object.entries({
        ...inputErrors,
        [`${section}.${field}`]: errorMsg ?? '',
      }).some(([k, v]) => k.startsWith(section + '.') && !!v);
      setSectionErrors((prev) => ({
        ...prev,
        [section]: sectionHasError,
      }));
    }
  };

  // Manejo de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    let errorMsg = '';

    if (file && file.type !== 'application/pdf') {
      errorMsg = 'Solo se permiten archivos PDF';
      setFormData((prev) => ({ ...prev, participation_file: null }));
    } else {
      setFormData((prev) => ({ ...prev, participation_file: file }));
    }

    if (!errorMsg) {
      errorMsg =
        validateField('participation_file', 'participation_file', file, {
          ...formData,
          participation_file: file,
        }) ?? '';
    }

    setInputErrors((prev) => ({
      ...prev,
      ['participation_file.participation_file']: errorMsg,
    }));
    setSectionErrors((prev) => ({
      ...prev,
      participation_file: !!errorMsg,
    }));
  };

  // Checkbox privacidad
  const handlePrivacyChange = (checked: boolean) => {
    const updatedFormData = { ...formData, privacy_accepted: checked };
    setFormData(updatedFormData);

    // Solo valida el campo de privacidad, no todo el formulario
    const errorMsg = !checked ? 'Debes aceptar el aviso de privacidad*' : '';
    setInputErrors((prev) => ({
      ...prev,
      ['privacy_accepted.privacy_accepted']: errorMsg,
    }));
    setSectionErrors((prev) => ({
      ...prev,
      privacy_accepted: !!errorMsg,
    }));
  };

  // Selección de grupo
  const handleGroupSelect = (id_group: number) => {
    const updatedFormData = { ...formData, preferred_group: id_group };
    setFormData(updatedFormData);

    // Solo valida el campo de grupo, no todo el formulario
    const errorMsg = !id_group ? 'Debes seleccionar un grupo*' : '';
    setInputErrors((prev) => ({
      ...prev,
      ['preferred_group.preferred_group']: errorMsg,
    }));
    setSectionErrors((prev) => ({
      ...prev,
      preferred_group: !!errorMsg,
    }));
  };

  // VALIDAR Y ENVIAR
  const validateForm = () => {
    return getFieldErrors(formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fieldErrors, sectionErrors: sectionErrs } = validateForm();
    const flatErrors = flattenFieldErrors(fieldErrors);

    setInputErrors(flatErrors);
    setSectionErrors(sectionErrs);

    if (Object.keys(flatErrors).length > 0) {
      notify({
        color: 'red',
        title: 'Error en el formulario',
        message: 'Revisa los campos marcados en rojo antes de continuar.',
        iconName: 'Warning',
        variant: 'two',
      });
      return;
    }

    try {
      const formDataToSend = new FormData();
      // Datos participante
      formDataToSend.append('name', formData.participant.name);
      formDataToSend.append('paternal_name', formData.participant.paternal_name);
      formDataToSend.append('maternal_name', formData.participant.maternal_name);
      formDataToSend.append('email', formData.participant.email);
      formDataToSend.append('year', formData.participant.year);
      formDataToSend.append('education', formData.participant.education);

      // Tutor
      formDataToSend.append('tutor[name]', formData.tutor.name);
      formDataToSend.append('tutor[paternal_name]', formData.tutor.paternal_name);
      formDataToSend.append('tutor[maternal_name]', formData.tutor.maternal_name);
      formDataToSend.append('tutor[email]', formData.tutor.email);
      formDataToSend.append('tutor[phone_number]', formData.tutor.phone_number);

      // Grupo (opcional)
      if (formData.preferred_group) {
        formDataToSend.append('preferred_group', formData.preferred_group.toString());
      }
      // Archivo
      if (formData.participation_file) {
        formDataToSend.append('participation_file', formData.participation_file);
      }

      // Enviar a API
      const response = await fetch('http://localhost:3000/api/participants', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        const backendErrors = data?.errors?.map((err: any) => err.msg) || [
          data.message || 'Error al registrar participante',
        ];
        throw new Error(backendErrors.join(', '));
      }

      // Éxito
      setInputErrors({});
      setSectionErrors({
        participant: false,
        tutor: false,
        participation_file: false,
        preferred_group: false,
        privacy_accepted: false,
      });
      setFormData(initialFormData);

      notify({
        color: 'green',
        title: '¡Registro exitoso!',
        message: data.message || 'Participante registrado exitosamente.',
        iconName: 'Check',
        variant: 'one',
      });
    } catch (err: any) {
      notify({
        color: 'red',
        title: 'Error al registrar',
        message: err.message || 'No se pudo enviar el formulario. Intenta de nuevo más tarde.',
        iconName: 'Warning',
        variant: 'two',
      });
    }
  };

  return (
    <div className='overflow-hidden pagina-formulario flex flex-col min-h-screen bg-gray-900 text-white'>
      <form onSubmit={handleSubmit}>
        <div className='info-formulario p-4 md:p-8 flex justify-center'>
          <div className='w-full max-w-6xl rounded-lg shadow-lg bg-back p-6 md:p-8'>
            {/* Header */}
            <div className='flex justify-between items-center mb-8'>
              <div className='flex items-center space-x-4'>
                <div className='flex flex-row items-center justify-center gap-5'>
                  <div className='w-2 bg-[var(--primaryColor)] h-14 md:h-16 lg:h-24 rounded-full' />
                  <div className='flex flex-col'>
                    <p className='lg:text-3xl md:text-xl text-md italic text-gray-300'>
                      Formulario de Registro
                    </p>
                    <h1 className='lg:text-6xl md:text-4xl text-2xl font-bold'>Participantes</h1>
                  </div>
                </div>
              </div>
              <div className='scale-[0.70] md:scale-[0.85] lg:scale-100 md:mr-10 md:mt-3'>
                <Button
                  label='Regresar'
                  variant='error'
                  showLeftIcon
                  IconLeft={X}
                  onClick={() => router.push('/')}
                />
              </div>
            </div>

            {/* SECCIÓN 1: Datos Personales */}
            <CollapsibleSection
              title='Datos Personales'
              Icon={FlowerLotus}
              isIncorrect={sectionErrors.participant}
              isCompleted={
                !!formData.participant.name &&
                !!formData.participant.paternal_name &&
                !!formData.participant.email &&
                !!formData.participant.year &&
                !!formData.participant.education
              }
              Color='#3D1C4FFF'
            >
              <p className='text-gray-600 text-sm mb-4'>
                Responde con veracidad las siguientes preguntas acerca de tus datos personales y de
                contacto.
                <br />
                <strong>Las secciones con * son obligatorias.</strong>
              </p>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <InputField
                  label='Nombre(s)*'
                  placeholder='Nombre(s)'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.participant.name}
                  onChangeText={(v) => handleInputChange('participant', 'name', v)}
                  darkText={true}
                  error={inputErrors['participant.name']}
                />
                <InputField
                  label='Apellido Paterno*'
                  placeholder='Apellido Paterno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.participant.paternal_name}
                  onChangeText={(v) => handleInputChange('participant', 'paternal_name', v)}
                  darkText={true}
                  error={inputErrors['participant.paternal_name']}
                />
                <InputField
                  label='Apellido Materno'
                  placeholder='Apellido Materno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.participant.maternal_name}
                  onChangeText={(v) => handleInputChange('participant', 'maternal_name', v)}
                  darkText={true}
                  error={inputErrors['participant.maternal_name']}
                />
                <InputField
                  label='Correo Electrónico*'
                  placeholder='correo1@ejemplo.com'
                  variant='accent'
                  icon='At'
                  value={formData.participant.email}
                  onChangeText={(v) => handleInputChange('participant', 'email', v)}
                  darkText={true}
                  error={inputErrors['participant.email']}
                />
                <Dropdown
                  label='Grado*'
                  options={['1º', '2º', '3º']}
                  value={formData.participant.year}
                  onChange={(v) => handleInputChange('participant', 'year', v)}
                  variant='accent'
                  Icon={GraduationCap}
                  darkText={true}
                  error={inputErrors['participant.year']}
                />
                <Dropdown
                  label='Escolaridad*'
                  options={['Secundaria', 'Preparatoria']}
                  value={formData.participant.education}
                  onChange={(v) => handleInputChange('participant', 'education', v)}
                  variant='accent'
                  Icon={BookOpenText}
                  darkText={true}
                  error={inputErrors['participant.education']}
                />
              </div>
            </CollapsibleSection>
            {/* SECCIÓN 2: Datos del Tutor */}
            <CollapsibleSection
              title='Datos del Tutor'
              Icon={SealWarning}
              isIncorrect={sectionErrors.tutor}
              isCompleted={
                !!formData.tutor.name &&
                !!formData.tutor.paternal_name &&
                !!formData.tutor.email &&
                !!formData.tutor.phone_number
              }
              Color='#4E2A62FF'
            >
              <p className='text-gray-600 text-sm mb-4'>
                Pídele a tu tutor que llene esta sección. Campos con * son obligatorios.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <InputField
                  label='Nombre(s)*'
                  placeholder='Nombre(s)'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.tutor.name}
                  onChangeText={(v) => handleInputChange('tutor', 'name', v)}
                  darkText={true}
                  error={inputErrors['tutor.name']}
                />
                <InputField
                  label='Apellido Paterno*'
                  placeholder='Apellido Paterno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.tutor.paternal_name}
                  onChangeText={(v) => handleInputChange('tutor', 'paternal_name', v)}
                  darkText={true}
                  error={inputErrors['tutor.paternal_name']}
                />
                <InputField
                  label='Apellido Materno'
                  placeholder='Apellido Materno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.tutor.maternal_name}
                  onChangeText={(v) => handleInputChange('tutor', 'maternal_name', v)}
                  darkText={true}
                  error={inputErrors['tutor.maternal_name']}
                />
                <InputField
                  label='Correo Electrónico*'
                  placeholder='correo1@ejemplo.com'
                  variant='accent'
                  icon='At'
                  value={formData.tutor.email}
                  onChangeText={(v) => handleInputChange('tutor', 'email', v)}
                  darkText={true}
                  error={inputErrors['tutor.email']}
                />
                <InputField
                  label='Celular*'
                  placeholder='+522221234567'
                  variant='accent'
                  icon='Phone'
                  value={formData.tutor.phone_number}
                  onChangeText={(v) => handleInputChange('tutor', 'phone_number', v)}
                  darkText={true}
                  error={inputErrors['tutor.phone_number']}
                />
              </div>
            </CollapsibleSection>
            {/* SECCIÓN 3: Permiso de Participación */}
            <CollapsibleSection
              title='Permiso de Participación'
              Icon={Heart}
              isIncorrect={sectionErrors.participation_file}
              isCompleted={!!formData.participation_file}
              Color='#633F76FF'
            >
              <p className='text-gray-600 text-sm mb-4'>
                Sube tu permiso de participación firmado por tu tutor. Este archivo es obligatorio.
              </p>

              {/* Descarga de convocatoria (estilo SEDEs) */}
              <div className='mt-6'>
                <div className='flex items-center mb-2 text-gray-800'>
                  <Files width='1.5rem' height='1.5rem' />
                  <h4 className='ml-2 text-base font-semibold'>
                    Formato de Permiso de Participación *
                  </h4>
                </div>
                <p className='text-gray-600 text-sm mb-4'>
                  Debes subir tu permiso de participación firmado por tu tutor/a. Descarga el
                  formato, imprímelo, fírmalo y súbelo en PDF.
                </p>
                <a
                  href='/ConvocatoriaParticipantes-PH2025.pdf'
                  download
                  className='inline-flex items-center px-4 py-2 bg-[var(--secondaryColor)] text-white rounded hover:bg-[var(--secondary-shade)] transition'
                >
                  Descargar Formato
                </a>
              </div>

              {/* Subida de archivo */}
              <div className='mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
                <div className='flex items-center mb-2 text-gray-800'>
                  <FilePdf width='1.5rem' height='1.5rem' />
                  <h4 className='ml-2 text-base font-semibold'>
                    Sube tu permiso firmado (PDF obligatorio).
                  </h4>
                </div>
                <p className='text-gray-600 text-sm mb-4'>
                  Selecciona un documento PDF para subir. Verifica que se suba correctamente.
                </p>
                <label
                  htmlFor='participationFile'
                  className='inline-block px-4 py-2 rounded-full bg-[var(--primaryColor)] text-white cursor-pointer hover:bg-[var(--primary-shade)] transition font-semibold'
                >
                  Elegir Archivo
                </label>
                <input
                  id='participationFile'
                  type='file'
                  accept='application/pdf'
                  className='hidden'
                  onChange={handleFileChange}
                />
                {inputErrors['participation_file.participation_file'] && (
                  <p className='text-xs text-red-600 mt-2'>
                    {inputErrors['participation_file.participation_file']}
                  </p>
                )}
                {formData.participation_file && (
                  <p className='mt-2 text-xs text-gray-500'>{formData.participation_file.name}</p>
                )}
              </div>
            </CollapsibleSection>
            {/* SECCIÓN 4: Selección de Grupo */}
            <CollapsibleSection
              title='Selección de Grupo'
              Icon={AddressBook}
              isIncorrect={sectionErrors.preferred_group}
              isCompleted={!!formData.preferred_group}
              Color='#876898FF'
            >
              <p className='text-gray-600 text-sm mb-4'>
                Selecciona el grupo que prefieres. Usa los botones para más detalles.
              </p>
              {/* Resumen del grupo elegido */}
              <div className='flex justify-center items-center mx-auto w-[80%] h-[50px] rounded-t-[15px] mt-8 text-xs sm:text-base md:text-lg lg:text-xl text-[var(--text-color)] bg-[#683756] gap-12'>
                <div className='flex'>
                  <h2 className='mx-4 font-semibold'>Grupo Elegido: </h2>
                  <p>
                    {groups.find((g) => g.id_group === formData.preferred_group)?.name || 'Ninguno'}
                  </p>
                </div>
                <div className='flex'>
                  <h2 className='mx-4 font-semibold'>Sede: </h2>
                  <p>
                    {groups.find((g) => g.id_group === formData.preferred_group)?.sede || 'Ninguna'}
                  </p>
                </div>
              </div>
              {/* Tabla de selección */}
              <ParticipantGroupSelectionTable
                onSelect={handleGroupSelect}
                selectedGroupId={formData.preferred_group ?? undefined}
                rowsPerPage={4}
              />
              {inputErrors['preferred_group.preferred_group'] && (
                <p className='text-xs text-red-600 mt-2'>
                  {inputErrors['preferred_group.preferred_group']}
                </p>
              )}
            </CollapsibleSection>
            {/* SECCIÓN 5: Aviso de Privacidad */}
            <CollapsibleSection
              title='Aviso de Privacidad'
              Icon={Megaphone}
              isCompleted={formData.privacy_accepted}
              isIncorrect={sectionErrors.privacy_accepted}
              Color='#A185B1FF'
            >
              <p className='text-gray-600 text-sm mb-4'>
                Confirmo que he leído, entendido y acepto el&nbsp;
                <a
                  href='https://tec.mx/es/aviso-privacidad-participantes-expositores-panelistas-conferencias-moderadores'
                  className='text-purple-600 hover:underline'
                >
                  Aviso de Privacidad
                </a>
                &nbsp;para poder participar como participante oficial del evento.
              </p>
              <div className='mt-2'>
                <Checkbox
                  label='Acepto el aviso de privacidad'
                  checked={formData.privacy_accepted}
                  onChange={handlePrivacyChange}
                />
              </div>
              {inputErrors['privacy_accepted.privacy_accepted'] && (
                <p className='text-xs text-red-600 mt-2'>
                  {inputErrors['privacy_accepted.privacy_accepted']}
                </p>
              )}
            </CollapsibleSection>

            {/* BOTÓN DE ENVÍO */}
            <div className='mt-6 flex justify-end'>
              <Button
                label='Enviar Registro'
                variant='success'
                showRightIcon
                type='submit'
                IconRight={Send}
                className='px-6 py-2 rounded-full flex items-center text-white'
                disabled={Object.values(inputErrors).some((msg) => !!msg)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ParticipantRegistrationForm;
