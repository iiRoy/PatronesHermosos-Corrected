'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@components/buttons_inputs/Button';
import Checkbox from '@components/buttons_inputs/Checkbox';
import { useNotification } from '@/components/buttons_inputs/Notification';
import CollapsibleSection from '@components/buttons_inputs/CollapsibleSection';
import GroupSelectionTable from '@components/tables/GroupSelectionTable';

import FlowerLotus from '@/components/icons/FlowerLotus';
import AddressBook from '@/components/icons/AddressBook';
import X from '@/components/icons/X';
import UserSound from '@/components/icons/UserSound';
import ChatTeardropText from '@/components/icons/ChatTeardropText';
import Grains from '@/components/icons/Grains';
import Student from '@/components/icons/Student';
import Megaphone from '@/components/icons/Megaphone';
import Send from '@components/icons/ArrowFatRight';

interface CollaboratorData {
  name: string;
  paternal_name: string;
  maternal_name: string;
  email: string;
  phone_number: string;
  gender: string;
  college: string;
  degree: string;
  semester: string;
  preferred_role: string;
  preferred_language: string;
  preferred_level: string;
  preferred_group: number | null;
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

const initialFormData: CollaboratorData = {
  name: '',
  paternal_name: '',
  maternal_name: '',
  email: '',
  phone_number: '',
  gender: '',
  college: '',
  degree: '',
  semester: '',
  preferred_role: '',
  preferred_language: '',
  preferred_level: '',
  preferred_group: null,
};

const CollaboratorRegistrationForm: React.FC = () => {
  const router = useRouter();
  const { notify } = useNotification();

  const [formData, setFormData] = useState<CollaboratorData>(initialFormData);
  const [groups, setGroups] = useState<Group[]>([]);
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  const [sectionErrors, setSectionErrors] = useState({
    personal: false,
    preferences: false,
    group: false,
    privacy: false,
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  // Cargar grupos
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

  // Validación
  const getFieldErrors = (
    data: CollaboratorData,
    privacy: boolean,
    onlyTouched: boolean = false,
    touched: Record<string, boolean> = {},
  ) => {
    const fieldErrors: Record<string, string> = {};
    const sectionErrors = {
      personal: false,
      preferences: false,
      group: false,
      privacy: false,
    };

    // Helper para saber si validar el campo
    const shouldValidate = (field: string) => !onlyTouched || touched[field];

    // Datos personales
    if (shouldValidate('name') && !data.name.trim()) {
      fieldErrors['name'] = 'El nombre es obligatorio*';
      sectionErrors.personal = true;
    }
    if (shouldValidate('paternal_name') && !data.paternal_name.trim()) {
      fieldErrors['paternal_name'] = 'El apellido paterno es obligatorio*';
      sectionErrors.personal = true;
    }
    if (shouldValidate('email')) {
      if (!data.email.trim()) {
        fieldErrors['email'] = 'El correo electrónico es obligatorio*';
        sectionErrors.personal = true;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        fieldErrors['email'] = 'El correo electrónico no es válido*';
        sectionErrors.personal = true;
      }
    }
    if (shouldValidate('phone_number')) {
      if (!data.phone_number.trim()) {
        fieldErrors['phone_number'] = 'El celular es obligatorio*';
        sectionErrors.personal = true;
      } else if (!/^\d+$/.test(data.phone_number.trim())) {
        fieldErrors['phone_number'] = 'El celular debe contener solo números*';
        sectionErrors.personal = true;
      } else if (data.phone_number.replace(/\D/g, '').length < 10) {
        fieldErrors['phone_number'] = 'El celular debe tener al menos 10 dígitos*';
        sectionErrors.personal = true;
      }
    }
    // Cambia "sexo" a "género"
    if (shouldValidate('gender') && !data.gender.trim()) {
      fieldErrors['gender'] = 'El género es obligatorio*';
      sectionErrors.personal = true;
    }
    if (shouldValidate('college') && !data.college.trim()) {
      fieldErrors['college'] = 'La institución académica es obligatoria*';
      sectionErrors.personal = true;
    }
    if (shouldValidate('degree') && !data.degree.trim()) {
      fieldErrors['degree'] = 'La carrera es obligatoria*';
      sectionErrors.personal = true;
    }
    if (shouldValidate('semester') && !data.semester.trim()) {
      fieldErrors['semester'] = 'El semestre es obligatorio*';
      sectionErrors.personal = true;
    }

    // Preferencias
    if (shouldValidate('preferred_role') && !data.preferred_role.trim()) {
      fieldErrors['preferred_role'] = 'El rol preferido es obligatorio*';
      sectionErrors.preferences = true;
    }
    if (shouldValidate('preferred_language') && !data.preferred_language.trim()) {
      fieldErrors['preferred_language'] = 'El idioma preferido es obligatorio*';
      sectionErrors.preferences = true;
    }
    if (shouldValidate('preferred_level') && !data.preferred_level.trim()) {
      fieldErrors['preferred_level'] = 'La dificultad preferida es obligatoria*';
      sectionErrors.preferences = true;
    }

    // Validación cruzada: género masculino y rol no permitido
    const isMale = data.gender === 'Masculino';
    const isInvalidRole =
      data.preferred_role === 'Instructora' || data.preferred_role === 'Facilitadora';
    if (isMale && isInvalidRole) {
      if (shouldValidate('gender')) {
        fieldErrors['gender'] = 'Los hombres solo pueden ser Staff.';
        sectionErrors.personal = true;
      }
      if (shouldValidate('preferred_role')) {
        fieldErrors['preferred_role'] = 'Los hombres solo pueden ser Staff.';
        sectionErrors.preferences = true;
      }
    }

    // Grupo
    if (shouldValidate('preferred_group') && !data.preferred_group) {
      fieldErrors['preferred_group'] = 'Debes seleccionar un grupo*';
      sectionErrors.group = true;
    }

    // Privacidad
    if (shouldValidate('privacy') && !privacy) {
      fieldErrors['privacy'] = 'Debes aceptar el aviso de privacidad*';
      sectionErrors.privacy = true;
    }

    return { fieldErrors, sectionErrors };
  };

  // Manejo de cambios
  const handleInputChange = (field: keyof CollaboratorData, value: string | number) => {
    const updatedFormData = { ...formData, [field]: value };

    // Si se edita género o rol, marcar ambos como tocados y validar ambos
    if (field === 'gender' || field === 'preferred_role') {
      setFormData(updatedFormData);
      setTouchedFields((prev) => ({
        ...prev,
        gender: true,
        preferred_role: true,
        [field]: true,
      }));
      const { fieldErrors, sectionErrors: sErrors } = getFieldErrors(
        updatedFormData,
        privacyAccepted,
        true,
        { ...touchedFields, gender: true, preferred_role: true, [field]: true },
      );
      setInputErrors(fieldErrors);
      setSectionErrors(sErrors);
      return;
    }

    setFormData(updatedFormData);
    setTouchedFields((prev) => ({ ...prev, [field]: true }));

    // Solo validar los campos tocados
    const { fieldErrors, sectionErrors: sErrors } = getFieldErrors(
      updatedFormData,
      privacyAccepted,
      true,
      { ...touchedFields, [field]: true },
    );
    setInputErrors(fieldErrors);
    setSectionErrors(sErrors);
  };

  const handleGroupSelect = (id_group: number) => {
    handleInputChange('preferred_group', id_group);
  };

  const handlePrivacyChange = (checked: boolean) => {
    setPrivacyAccepted(checked);
    setTouchedFields((prev) => ({ ...prev, privacy: true }));
    const { fieldErrors, sectionErrors: sErrors } = getFieldErrors(formData, checked, true, {
      ...touchedFields,
      privacy: true,
    });
    setInputErrors(fieldErrors);
    setSectionErrors(sErrors);
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar todos los campos (no solo los tocados)
    const { fieldErrors, sectionErrors: sErrors } = getFieldErrors(
      formData,
      privacyAccepted,
      false,
    );
    setInputErrors(fieldErrors);
    setSectionErrors(sErrors);

    // Marcar todos los campos como tocados para mostrar errores
    setTouchedFields({
      name: true,
      paternal_name: true,
      maternal_name: true,
      email: true,
      phone_number: true,
      gender: true,
      college: true,
      degree: true,
      semester: true,
      preferred_role: true,
      preferred_language: true,
      preferred_level: true,
      preferred_group: true,
      privacy: true,
    });

    if (Object.keys(fieldErrors).length > 0) {
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
      const response = await fetch('http://localhost:3000/api/collaborators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        const backendErrors = data?.errors?.map((err: any) => err.msg) || [
          data.message || 'Error al registrar colaborador',
        ];
        throw new Error(backendErrors.join(', '));
      }

      setInputErrors({});
      setSectionErrors({
        personal: false,
        preferences: false,
        group: false,
        privacy: false,
      });
      setFormData(initialFormData);
      setPrivacyAccepted(false);

      notify({
        color: 'green',
        title: '¡Registro exitoso!',
        message: data.message || 'Colaborador registrado exitosamente.',
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
                    <h1 className='lg:text-6xl md:text-4xl text-2xl font-bold'>Colaboradores</h1>
                  </div>
                </div>
              </div>
              <div className='scale-[0.70] md:scale-[0.85] lg:scale-100 md:mr-10 md:mt-3'>
                <Button
                  label='Regresar'
                  variant='error'
                  showLeftIcon
                  IconLeft={X}
                  onClick={() => router.back()}
                />
              </div>
            </div>

            {/* SECCIÓN 1: Datos Personales */}
            <CollapsibleSection
              title='Datos Personales'
              Icon={FlowerLotus}
              isIncorrect={sectionErrors.personal}
              isCompleted={
                !!formData.name &&
                !!formData.paternal_name &&
                !!formData.email &&
                !!formData.phone_number &&
                !!formData.gender &&
                !!formData.college &&
                !!formData.degree &&
                !!formData.semester
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
                  value={formData.name}
                  onChangeText={(v) => handleInputChange('name', v)}
                  darkText={true}
                  error={touchedFields['name'] ? inputErrors['name'] : undefined}
                />
                <InputField
                  label='Apellido Paterno*'
                  placeholder='Apellido Paterno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.paternal_name}
                  onChangeText={(v) => handleInputChange('paternal_name', v)}
                  darkText={true}
                  error={touchedFields['paternal_name'] ? inputErrors['paternal_name'] : undefined}
                />
                <InputField
                  label='Apellido Materno'
                  placeholder='Apellido Materno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.maternal_name}
                  onChangeText={(v) => handleInputChange('maternal_name', v)}
                  darkText={true}
                  error={touchedFields['maternal_name'] ? inputErrors['maternal_name'] : undefined}
                />
                <InputField
                  label='Correo Electrónico*'
                  placeholder='correo1@ejemplo.com'
                  variant='accent'
                  icon='At'
                  value={formData.email}
                  onChangeText={(v) => handleInputChange('email', v)}
                  darkText={true}
                  error={touchedFields['email'] ? inputErrors['email'] : undefined}
                />
                <InputField
                  label='Celular*'
                  placeholder='+522221234567'
                  variant='accent'
                  icon='Phone'
                  value={formData.phone_number}
                  onChangeText={(v) => handleInputChange('phone_number', v)}
                  darkText={true}
                  error={touchedFields['phone_number'] ? inputErrors['phone_number'] : undefined}
                />
                <Dropdown
                  label='Género*'
                  options={['Femenino', 'Masculino', 'No binario', 'Prefiero no decir', 'Otro']}
                  value={formData.gender}
                  onChange={(v) => handleInputChange('gender', v)}
                  variant='accent'
                  Icon={Grains}
                  darkText={true}
                  error={touchedFields['gender'] ? inputErrors['gender'] : undefined}
                />
                <InputField
                  label='Institución Académica*'
                  placeholder='Tec de Monterrey'
                  variant='secondary'
                  icon='Student'
                  value={formData.college}
                  onChangeText={(v) => handleInputChange('college', v)}
                  darkText={true}
                  error={touchedFields['college'] ? inputErrors['college'] : undefined}
                />
                <InputField
                  label='Carrera*'
                  placeholder='Ingeniería en Mecatrónica'
                  variant='secondary'
                  icon='Books'
                  value={formData.degree}
                  onChangeText={(v) => handleInputChange('degree', v)}
                  darkText={true}
                  error={touchedFields['degree'] ? inputErrors['degree'] : undefined}
                />
                <Dropdown
                  label='Semestre Cursando*'
                  options={[
                    '1°',
                    '2°',
                    '3°',
                    '4°',
                    '5°',
                    '6°',
                    '7°',
                    '8°',
                    '9°',
                    '10°',
                    '11°',
                    '12°',
                  ]}
                  value={formData.semester}
                  onChange={(v) => handleInputChange('semester', v)}
                  variant='secondary'
                  Icon={Student}
                  darkText={true}
                  error={touchedFields['semester'] ? inputErrors['semester'] : undefined}
                />
              </div>
            </CollapsibleSection>

            {/* SECCIÓN 2: Preferencias */}
            <CollapsibleSection
              title='Preferencias'
              Icon={Student}
              isIncorrect={sectionErrors.preferences}
              isCompleted={
                !!formData.preferred_role &&
                !!formData.preferred_language &&
                !!formData.preferred_level
              }
              Color='#4E2A62FF'
            >
              <p className='text-gray-600 text-sm mb-4'>
                Responde con sinceridad sobre tus preferencias durante la participación del taller.
                <br />
                <strong>Las secciones con * son obligatorias.</strong>
              </p>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <Dropdown
                  label='Rol Preferido*'
                  options={['Instructora', 'Facilitadora', 'Staff']}
                  value={formData.preferred_role}
                  onChange={(v) => handleInputChange('preferred_role', v)}
                  variant='primary'
                  Icon={UserSound}
                  darkText={true}
                  error={
                    touchedFields['preferred_role'] ? inputErrors['preferred_role'] : undefined
                  }
                />
                <Dropdown
                  label='Idioma Preferido*'
                  options={['Español', 'Inglés']}
                  value={formData.preferred_language}
                  onChange={(v) => handleInputChange('preferred_language', v)}
                  variant='primary'
                  Icon={ChatTeardropText}
                  darkText={true}
                  error={
                    touchedFields['preferred_language']
                      ? inputErrors['preferred_language']
                      : undefined
                  }
                />
                <Dropdown
                  label='Dificultad preferida*'
                  options={['Básico', 'Avanzado']}
                  value={formData.preferred_level}
                  onChange={(v) => handleInputChange('preferred_level', v)}
                  variant='primary'
                  Icon={ChatTeardropText}
                  darkText={true}
                  error={
                    touchedFields['preferred_level'] ? inputErrors['preferred_level'] : undefined
                  }
                />
              </div>
            </CollapsibleSection>

            {/* SECCIÓN 3: Selección de Grupo */}
            <CollapsibleSection
              title='Selección de Grupo'
              Icon={AddressBook}
              isIncorrect={sectionErrors.group}
              isCompleted={!!formData.preferred_group}
              Color='#876898FF'
            >
              <p className='text-gray-600 text-sm mb-4'>
                Selecciona el grupo que prefieres para apoyar. Usa los botones para más detalles.
              </p>
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
              <GroupSelectionTable
                onSelect={handleGroupSelect}
                selectedGroupId={formData.preferred_group ?? undefined}
                rowsPerPage={4}
              />
              {touchedFields['preferred_group'] && inputErrors['preferred_group'] && (
                <p className='text-xs text-red-600 mt-2'>{inputErrors['preferred_group']}</p>
              )}
            </CollapsibleSection>

            {/* SECCIÓN 4: Aviso de Privacidad */}
            <CollapsibleSection
              title='Aviso de Privacidad'
              Icon={Megaphone}
              isCompleted={privacyAccepted}
              isIncorrect={sectionErrors.privacy}
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
                &nbsp;para poder participar como colaborador oficial del evento.
              </p>
              <div className='mt-2'>
                <Checkbox
                  label='Acepto el aviso de privacidad'
                  checked={privacyAccepted}
                  onChange={handlePrivacyChange}
                />
              </div>
              {touchedFields['privacy'] && inputErrors['privacy'] && (
                <p className='text-xs text-red-600 mt-2'>{inputErrors['privacy']}</p>
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

export default CollaboratorRegistrationForm;
