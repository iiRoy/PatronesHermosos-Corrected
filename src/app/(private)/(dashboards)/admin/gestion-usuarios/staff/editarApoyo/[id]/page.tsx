'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import InputField from '@/components/buttons_inputs/InputField';
import Button from '@/components/buttons_inputs/Button';
import { useNotification } from '@/components/buttons_inputs/Notification';

interface Collaborator {
  id_collaborator: number;
  name: string;
  paternal_name: string;
  maternal_name: string;
  email: string;
  phone_number: string;
  college: string;
  degree: string;
  semester: string;
  preferred_role: string;
  preferred_language: string;
  preferred_level: string;
  gender: string;
  role: string;
  status: string;
  level: string;
  language: string;
  preferred_group: number | null;
}

const EditarApoyo = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { notify } = useNotification();

  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [name, setName] = useState('');
  const [paternalName, setPaternalName] = useState('');
  const [maternalName, setMaternalName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('');
  const [semester, setSemester] = useState('');
  const [preferredRole, setPreferredRole] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [preferredLevel, setPreferredLevel] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
        if (!token) {
          router.push('/login');
          return;
        }

        const collaboratorResponse = await fetch(`/api/collaborators/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!collaboratorResponse.ok) {
          const errorData = await collaboratorResponse.json().catch(() => ({ message: 'Respuesta no válida del servidor' }));
          if (collaboratorResponse.status === 404) {
            throw new Error('Colaborador no encontrado');
          }
          throw new Error(`Error fetching collaborator: ${collaboratorResponse.status} - ${errorData.message || 'Unknown error'}`);
        }
        const collaboratorData = await collaboratorResponse.json();
        const collab = collaboratorData.data;
        setCollaborator(collab);
        setName(collab.name || '');
        setPaternalName(collab.paternal_name || '');
        setMaternalName(collab.maternal_name || '');
        setEmail(collab.email || '');
        setPhoneNumber(collab.phone_number || '');
        setCollege(collab.college || '');
        setDegree(collab.degree || '');
        setSemester(collab.semester || '');
        setPreferredRole(collab.preferred_role || '');
        setPreferredLanguage(collab.preferred_language || '');
        setPreferredLevel(collab.preferred_level || '');
        setGender(collab.gender || '');
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, router]);

  const validateForm = () => {
    const errors: string[] = [];

    if (!name.trim()) {
      errors.push('El nombre es obligatorio');
    }

    if (!email.trim()) {
      errors.push('El correo es obligatorio');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('El correo no tiene un formato válido');
    }

    if (phoneNumber && !/^\+?\d{10,15}$/.test(phoneNumber)) {
      errors.push('El número de teléfono debe contener entre 10 y 15 dígitos');
    }

    if (!gender.trim()) {
      errors.push('El género es obligatorio');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async () => {
    setValidationErrors([]); // Limpiar errores previos

    if (!validateForm()) {
      return;
    }

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
      if (!token) {
        router.push('/login');
        return;
      }

      const updatedCollaborator = {
        name: name.trim(),
        paternal_name: paternalName.trim() || null,
        maternal_name: maternalName.trim() || null,
        email: email.trim(),
        phone_number: phoneNumber.trim() || null,

      };

      const response = await fetch(`/api/collaborators/basic/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCollaborator),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error updating collaborator: ${errorData.message || 'Unknown error'}`);
      }

      notify({
        color: 'green',
        title: 'Colaborador Actualizado',
        message: `El colaborador ${name} ha sido actualizado exitosamente`,
        duration: 5000,
      });

      router.push('/admin/gestion-usuarios/staff');
    } catch (error: any) {
      console.error('Error updating collaborator:', error);
      notify({
        color: 'red',
        title: 'Error',
        message: `No se pudo actualizar el colaborador: ${error.message}`,
        duration: 5000,
      });
    }
  };

  if (error) {
    return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
  }

  if (!collaborator) {
    return <div className="p-6 pl-14">Cargando...</div>;
  }

  return (
    <div className='p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes'>
      <PageTitle>Editar Colaborador</PageTitle>

      {validationErrors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Errores de validación:</strong>
          <ul className="list-disc list-inside">
            {validationErrors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className='fondo-sedes flex flex-col p-6 gap-4 overflow-auto'>
        {/* Primera fila: ID, Nombre, Apellidos */}
        <div className='flex justify-between gap-4 items-center pb-2 mb-4'>
          <div className='basis-1/5'>
            <InputField
              label='ID'
              darkText={true}
              showDescription={false}
              placeholder={collaborator.id_collaborator.toString()}
              showError={false}
              variant='accent'
              value={collaborator.id_collaborator.toString()}
              disabled
            />
          </div>

          <div className='basis-2/5'>
            <InputField
              label='Nombre'
              darkText={true}
              showDescription={false}
              placeholder={collaborator.name}
              showError={false}
              variant='accent'
              value={name}
              onChangeText={(val) => setName(val)}
            />
          </div>

          <div className='basis-2/5 flex gap-2'>
            <div className='basis-1/2'>
              <InputField
                label='Apellido Paterno'
                darkText={true}
                showDescription={false}
                placeholder={collaborator.paternal_name || 'Sin apellido paterno'}
                showError={false}
                variant='accent'
                value={paternalName}
                onChangeText={(val) => setPaternalName(val)}
              />
            </div>
            <div className='basis-1/2'>
              <InputField
                label='Apellido Materno'
                darkText={true}
                showDescription={false}
                placeholder={collaborator.maternal_name || 'Sin apellido materno'}
                showError={false}
                variant='accent'
                value={maternalName}
                onChangeText={(val) => setMaternalName(val)}
              />
            </div>
          </div>
        </div>

        {/* Segunda fila: Correo, Teléfono, Género */}
        <div className='flex gap-4 justify-between mb-4'>
          <div className='basis-1/3'>
            <InputField
              label='Correo'
              darkText={true}
              showDescription={false}
              placeholder={collaborator.email}
              showError={false}
              variant='accent'
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
          </div>
          <div className='basis-1/3'>
            <InputField
              label='Teléfono'
              darkText={true}
              showDescription={false}
              placeholder={collaborator.phone_number || 'Sin teléfono'}
              showError={false}
              variant='accent'
              value={phoneNumber}
              onChangeText={(val) => setPhoneNumber(val)}
            />
          </div>
          <div className='basis-1/3'>
            <InputField
              label='Género'
              darkText={true}
              showDescription={false}
              placeholder={collaborator.gender || 'Sin género'}
              showError={false}
              variant='accent'
              value={gender}
              onChangeText={(val) => setGender(val)}
            />
          </div>
        </div>

        {/* Tercera fila: Universidad, Carrera, Semestre */}
        <div className='flex gap-4 justify-between mb-4'>
          <div className='basis-1/3'>
            <InputField
              label='Universidad'
              darkText={true}
              showDescription={false}
              placeholder={collaborator.college || 'Sin universidad'}
              showError={false}
              variant='accent'
              value={college}
              onChangeText={(val) => setCollege(val)}
            />
          </div>
          <div className='basis-1/3'>
            <InputField
              label='Carrera'
              darkText={true}
              showDescription={false}
              placeholder={collaborator.degree || 'Sin carrera'}
              showError={false}
              variant='accent'
              value={degree}
              onChangeText={(val) => setDegree(val)}
            />
          </div>
          <div className='basis-1/3'>
            <InputField
              label='Semestre'
              darkText={true}
              showDescription={false}
              placeholder={collaborator.semester || 'Sin semestre'}
              showError={false}
              variant='accent'
              value={semester}
              onChangeText={(val) => setSemester(val)}
            />
          </div>
        </div>

        {/* Cuarta fila: Rol Preferido, Idioma Preferido, Nivel Preferido */}
        <div className='flex gap-4 justify-between mb-4'>
          <div className='basis-1/3'>
            <InputField
              label='Rol Preferido'
              darkText={true}
              showDescription={false}
              placeholder={collaborator.preferred_role || 'Sin rol preferido'}
              showError={false}
              variant='accent'
              value={preferredRole}
              onChangeText={(val) => setPreferredRole(val)}
            />
          </div>
          <div className='basis-1/3'>
            <InputField
              label='Idioma Preferido'
              darkText={true}
              showDescription={false}
              placeholder={collaborator.preferred_language || 'Sin idioma preferido'}
              showError={false}
              variant='accent'
              value={preferredLanguage}
              onChangeText={(val) => setPreferredLanguage(val)}
            />
          </div>
          <div className='basis-1/3'>
            <InputField
              label='Nivel Preferido'
              darkText={true}
              showDescription={false}
              placeholder={collaborator.preferred_level || 'Sin nivel preferido'}
              showError={false}
              variant='accent'
              value={preferredLevel}
              onChangeText={(val) => setPreferredLevel(val)}
            />
          </div>
        </div>

        {/* Botones */}
        <div className='flex gap-4 justify-between mt-auto'>
          <div className='flex gap-4'>
            <Button label='Confirmar' variant='primary' onClick={handleSubmit} />
            <Button label='Cancelar' variant='secondary' href='/admin/gestion-usuarios/staff' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarApoyo;