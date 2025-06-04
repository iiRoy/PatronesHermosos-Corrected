'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import InputField from '@/components/buttons_inputs/InputField';
import Dropdown from '@/components/buttons_inputs/Dropdown';
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
  gender: string;
  role: string;
  status: string;
  level: string;
  language: string;
  preferred_group: number | null;
  groups: {
    name: string;
    venues: { name: string };
  } | null;
}

interface GroupOption {
  id_group: number;
  name: string;
  level: string;
  mode: string;
  language: string;
  available_places: number;
  role_availability: {
    Instructora: number;
    Facilitadora: number;
    Staff: number;
  };
}

const EditarStaff = () => {
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
  const [gender, setGender] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [availableGroups, setAvailableGroups] = useState<GroupOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const roleOptions = ['Staff', 'Instructora', 'Facilitadora'];
  const genderOptions = ['Masculino', 'Femenino', 'Otro'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
        if (!token) {
          notify({
            color: 'red',
            title: 'Error',
            message: 'Sesión no iniciada. Redirigiendo al login.',
            duration: 5000,
          });
          router.push('/login');
          return;
        }

        // Fetch collaborator data
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
          throw new Error(`Error al obtener colaborador: ${errorData.message || 'Error desconocido'}`);
        }
        const collaboratorData = await collaboratorResponse.json();
        const collab = collaboratorData.data;
        console.log('Colaborador recibido:', collab);

        setCollaborator(collab);
        setName(collab.name || '');
        setPaternalName(collab.paternal_name || '');
        setMaternalName(collab.maternal_name || '');
        setEmail(collab.email || '');
        setPhoneNumber(collab.phone_number || '');
        setCollege(collab.college || '');
        setDegree(collab.degree || '');
        setSemester(collab.semester || '');
        setGender(collab.gender || '');
        setSelectedRole(collab.role || '');
        setSelectedGroup(collab.preferred_group?.toString() || '');

        // Fetch available groups
        const groupsResponse = await fetch(`/api/collaborators/${id}/available-groups`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!groupsResponse.ok) {
          const errorData = await groupsResponse.json().catch(() => ({ message: 'Respuesta no válida del servidor' }));
          throw new Error(`Error al obtener grupos: ${errorData.message || 'Error desconocido'}`);
        }
        const groupsData = await groupsResponse.json();
        console.log('Grupos disponibles:', groupsData.groups);
        setAvailableGroups(groupsData.groups || []);
      } catch (error: any) {
        console.error('Error al obtener datos:', error);
        setError(error.message);
        notify({
          color: 'red',
          title: 'Error',
          message: error.message,
          duration: 5000,
        });
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, router, notify]);

  const validateBasicInfo = () => {
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
    } else if (!genderOptions.includes(gender)) {
      errors.push('El género seleccionado no es válido');
    }

    if (college && college.length > 255) {
      errors.push('La universidad no debe exceder 255 caracteres');
    }

    if (degree && college.length > 255) {
      errors.push('La carrera no debe exceder 255 caracteres');
    }

    if (semester && !/^\d{1,2}$/.test(semester)) {
      errors.push('El semestre debe ser un número entre 1 y 99');
    }

    return errors;
  };

  const validateAssignment = () => {
    const errors: string[] = [];

    if (!selectedRole) {
      errors.push('El rol es obligatorio');
    } else if (!roleOptions.includes(selectedRole)) {
      errors.push('El rol seleccionado no es válido');
    }

    if (!selectedGroup) {
      errors.push('El grupo es obligatorio');
    } else if (!availableGroups.some(group => group.id_group.toString() === selectedGroup)) {
      errors.push('El grupo seleccionado no es válido');
    }

    return errors;
  };

  const handleUpdateBasicInfo = async () => {
    setValidationErrors([]);
    const errors = validateBasicInfo();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
      if (!token) {
        setValidationErrors(['No se encontró el token, redirigiendo al login']);
        router.push('/login');
        return;
      }

      const updatedCollaborator = {
        name: name.trim() || null,
        paternal_name: paternalName.trim() || null,
        maternal_name: maternalName.trim() || null,
        email: email.trim() || null,
        phone_number: phoneNumber.trim() || null,
        college: college.trim() || null,
        degree: degree.trim() || null,
        semester: semester.trim() || null,
        gender: gender.trim() || null,
      };

      console.log('Actualizando info básica:', updatedCollaborator);

      const response = await fetch(`/api/collaborators/basic/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCollaborator),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al actualizar colaborador: ${errorData.message || 'Error desconocido'}`);
      }

      notify({
        color: 'green',
        title: 'Éxito',
        message: `La información básica de ${name} ha sido actualizada`,
        duration: 5000,
      });
    } catch (error: any) {
      console.error('Error al actualizar info básica:', error);
      notify({
        color: 'red',
        title: 'Error',
        message: `No se pudo actualizar la información: ${error.message}`,
        duration: 5000,
      });
      setValidationErrors([error.message]);
    }
  };

  const handleUpdateAssignment = async () => {
    setValidationErrors([]);
    const errors = validateAssignment();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
      if (!token) {
        setValidationErrors(['No se encontró el token, redirigiendo al login']);
        router.push('/login');
        return;
      }

      const assignmentData = {
        role: selectedRole,
        groupId: parseInt(selectedGroup),
      };

      console.log('Actualizando asignación:', assignmentData);

      const response = await fetch(`/api/collaborators/assignment/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(assignmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al actualizar asignación: ${errorData.message || 'Error desconocido'}`);
      }

      notify({
        color: 'green',
        title: 'Éxito',
        message: `La asignación de ${name} ha sido actualizada`,
        duration: 5000,
      });

      router.push('/admin/gestion-usuarios/staff');
    } catch (error: any) {
      console.error('Error al actualizar asignación:', error);
      notify({
        color: 'red',
        title: 'Error',
        message: `No se pudo actualizar la asignación: ${error.message}`,
        duration: 5000,
      });
      setValidationErrors([error.message]);
    }
  };

  const handleSubmit = async () => {
    await handleUpdateBasicInfo();
    if (selectedRole && selectedGroup) {
      await handleUpdateAssignment();
    }
  };

  if (error) {
    return <div className="p-6 pl-14 text-red-500">Error: {error}</div>;
  }

  if (!collaborator) {
    return <div className="p-6 pl-14">Cargando...</div>;
  }

  return (
    <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
      <PageTitle>Editar Staff</PageTitle>

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

      <div className="fondo-sedes flex flex-col p-6 gap-4 overflow-auto">
        {/* Primera fila: Nombre, Apellidos */}
        <div className="flex justify-between gap-4 items-center pb-2 mb-4">
          <div className="basis-1/3">
            <InputField
              label="Nombre"
              darkText={true}
              showDescription={false}
              placeholder={collaborator.name || 'Sin nombre'}
              showError={false}
              variant="accent"
              value={name}
              onChangeText={(val) => setName(val)}
            />
          </div>
          <div className="basis-1/3">
            <InputField
              label="Apellido Paterno"
              darkText={true}
              showDescription={false}
              placeholder={collaborator.paternal_name || 'Sin apellido paterno'}
              showError={false}
              variant="accent"
              value={paternalName}
              onChangeText={(val) => setPaternalName(val)}
            />
          </div>
          <div className="basis-1/3">
            <InputField
              label="Apellido Materno"
              darkText={true}
              showDescription={false}
              placeholder={collaborator.maternal_name || 'Sin apellido materno'}
              showError={false}
              variant="accent"
              value={maternalName}
              onChangeText={(val) => setMaternalName(val)}
            />
          </div>
        </div>

        {/* Segunda fila: Correo, Teléfono, Género */}
        <div className="flex gap-4 justify-between mb-4">
          <div className="basis-1/3">
            <InputField
              label="Correo"
              darkText={true}
              showDescription={false}
              placeholder={collaborator.email || 'Sin correo'}
              showError={false}
              variant="accent"
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
          </div>
          <div className="basis-1/3">
            <InputField
              label="Teléfono"
              darkText={true}
              showDescription={false}
              placeholder={collaborator.phone_number || 'Sin teléfono'}
              showError={false}
              variant="accent"
              value={phoneNumber}
              onChangeText={(val) => setPhoneNumber(val)}
            />
          </div>
          <div className="basis-1/3">
            <Dropdown
              label="Género"
              options={genderOptions.map((option) => ({ label: option, value: option }))}
              value={gender}
              onChange={setGender}
              variant="accent"
              darkText
            />
          </div>
        </div>

        {/* Tercera fila: Universidad, Carrera, Semestre */}
        <div className="flex gap-4 justify-between mb-4">
          <div className="basis-1/3">
            <InputField
              label="Universidad"
              darkText={true}
              showDescription={false}
              placeholder={collaborator.college || 'Sin universidad'}
              showError={false}
              variant="accent"
              value={college}
              onChangeText={(val) => setCollege(val)}
            />
          </div>
          <div className="basis-1/3">
            <InputField
              label="Carrera"
              darkText={true}
              showDescription={false}
              placeholder={collaborator.degree || 'Sin carrera'}
              showError={false}
              variant="accent"
              value={degree}
              onChangeText={(val) => setDegree(val)}
            />
          </div>
          <div className="basis-1/3">
            <InputField
              label="Semestre"
              darkText={true}
              showDescription={false}
              placeholder={collaborator.semester || 'Sin semestre'}
              showError={false}
              variant="accent"
              value={semester}
              onChangeText={(val) => setSemester(val)}
            />
          </div>
        </div>

        {/* Cuarta fila: Asignación de Rol y Grupo */}
        <div className="flex gap-4 justify-between mb-4">
          <div className="basis-1/2">
            <Dropdown
              label="Rol Asignado"
              options={roleOptions.map((option) => ({ label: option, value: option }))}
              value={selectedRole}
              onChange={setSelectedRole}
              variant="accent"
              darkText
            />
          </div>
          <div className="basis-1/2">
            <Dropdown
              label="Grupo Asignado"
              options={availableGroups.map((group) => ({
                label: `${group.name} (${group.level}, ${group.language})`,
                value: group.id_group.toString(),
              }))}
              value={selectedGroup}
              onChange={setSelectedGroup}
              variant="accent"
              darkText
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-4 justify-between mt-auto">
          <div className="flex gap-4">
            <Button label="Confirmar" variant="primary" onClick={handleSubmit} />
            <Button label="Cancelar" variant="secondary" href="/admin/gestion-usuarios/staff" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarStaff;