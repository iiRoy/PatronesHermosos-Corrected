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
  id_group: number | null;
}

interface GroupOption {
  id_group: number;
  name: string;
  available_places: number;
  role_availability: {
    Instructora: number;
    Facilitadora: number;
    Staff: number;
  };
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
  const [gender, setGender] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [availableGroups, setAvailableGroups] = useState<GroupOption[]>([]);
  const [venueName, setVenueName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Opciones para los select
  const roleOptions = ['Instructora', 'Facilitadora', 'Staff'];
  const genderOptions = ['Masculino', 'Femenino', 'Otro'];

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
        setGender(collab.gender || '');
        setSelectedRole(collab.role || 'Instructora');
        setSelectedGroupId(collab.id_group || null);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, router]);

  // Fetch available groups
  useEffect(() => {
    const fetchAvailableGroups = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch(`/api/collaborators/${id}/available-groups`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener grupos disponibles');
        }

        const data = await response.json();
        setAvailableGroups(data.groups || []);
        setVenueName(data.collaborator?.venue || 'No asignado');
        // Set default group if current group is in available groups
        const currentGroupId = collaborator?.id_group;
        const defaultGroup = data.groups.find((g: GroupOption) => g.id_group === currentGroupId);
        setSelectedGroupId(defaultGroup ? defaultGroup.id_group : data.groups[0]?.id_group || null);
      } catch (error: any) {
        console.error('Error fetching available groups:', error);
        setValidationErrors([`No se pudieron cargar los grupos disponibles: ${error.message}`]);
      }
    };

    if (collaborator) {
      fetchAvailableGroups();
    }
  }, [collaborator, id, router]);

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
    } else if (!genderOptions.includes(gender)) {
      errors.push('El género seleccionado no es válido');
    }

    if (college && college.length > 255) {
      errors.push('La universidad no debe exceder 255 caracteres');
    }

    if (degree && degree.length > 255) {
      errors.push('La carrera no debe exceder 255 caracteres');
    }

    if (semester && !/^\d{1,2}$/.test(semester)) {
      errors.push('El semestre debe ser un número entre 1 y 99');
    }

    if (!selectedRole || !roleOptions.includes(selectedRole)) {
      errors.push('Debe seleccionar un rol válido');
    }

    if (!selectedGroupId && availableGroups.length > 0) {
      errors.push('Debe seleccionar un grupo');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async () => {
    setValidationErrors([]); // Limpiamos errores previos

    if (!validateForm()) {
      return;
    }

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : '';
      if (!token) {
        setValidationErrors(['No se encontró el token, redirigiendo al login']);
        router.push('/login');
        return;
      }

      // Update personal information
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

      const personalInfoResponse = await fetch(`/api/collaborators/basic/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCollaborator),
      });

      if (!personalInfoResponse.ok) {
        const errorData = await personalInfoResponse.json();
        throw new Error(`Error al actualizar información personal: ${errorData.message || 'Error desconocido'}`);
      }

      // Update role and group assignment
      if (selectedRole && selectedGroupId) {
        const assignmentResponse = await fetch(`/api/collaborators/${id}/update-assignment`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            role: selectedRole,
            groupId: selectedGroupId,
          }),
        });

        if (!assignmentResponse.ok) {
          const errorData = await assignmentResponse.json();
          throw new Error(`Error al actualizar asignación: ${errorData.message || 'Error desconocido'}`);
        }
      }

      notify({
        color: 'green',
        title: 'Colaborador Actualizado',
        message: `El colaborador ${name} ha sido actualizado exitosamente`,
        duration: 5000,
      });

      router.push('/coordinador/gestion-usuarios-coordinadora/staff');
    } catch (error: any) {
      console.error('Error al actualizar colaborador:', error);
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
    <div className="p-6 pl-14 flex gap-4 flex-col text-primaryShade pagina-sedes">
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

      <div className="fondo-sedes flex flex-col p-6 gap-4 overflow-auto">
        {/* Primera fila: Nombre, Apellidos */}
        <div className="flex justify-between gap-4 items-center pb-2 mb-4">
          <div className="basis-1/3">
            <InputField
              label="Nombre"
              darkText={true}
              showDescription={false}
              placeholder={collaborator.name}
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
              placeholder={collaborator.email}
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

        {/* Cuarta fila: Rol, Grupo */}
        <div className="flex gap-4 justify-between mb-4">
          <div className="basis-1/3">
            <Dropdown
              label="Rol"
              options={roleOptions.map((option) => ({ label: option, value: option }))}
              value={selectedRole}
              onChange={setSelectedRole}
              variant="accent"
              darkText
            />
          </div>
          <div className="basis-2/3">
            <div className="flex flex-col gap-2">
              {availableGroups.length === 0 ? (
                <div className="mt-1 block w-full border rounded-md p-2 bg-gray-100 text-gray-500 cursor-not-allowed">
                  No hay grupos disponibles
                </div>
              ) : (
                <Dropdown
                  label="Grupo"
                  options={availableGroups.map((group) => ({
                    label: group.name,
                    value: group.id_group.toString(),
                  }))}
                  value={selectedGroupId?.toString() || ''}
                  onChange={(val) => setSelectedGroupId(val ? parseInt(val) : null)}
                  variant="accent"
                  darkText
                />
              )}
              {selectedGroupId && availableGroups.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>
                    <strong>Sede:</strong> {venueName}
                  </p>
                  <p>
                    <strong>Cupo disponible:</strong>{' '}
                    {availableGroups.find((g) => g.id_group === selectedGroupId)?.available_places || 0}
                  </p>
                  <p className="mt-1">
                    <strong>Disponibilidad por rol:</strong>
                  </p>
                  {Object.entries(
                    availableGroups.find((g) => g.id_group === selectedGroupId)?.role_availability || {}
                  ).map(([role, count]) => (
                    <p key={role} className="ml-4">
                      {role}: {count}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-4 justify-between mt-auto">
          <div className="flex gap-4">
            <Button label="Confirmar" variant="primary" onClick={handleSubmit} />
            <Button label="Cancelar" variant="secondary" href="/coordinador/gestion-usuarios-coordinadora/staff" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarApoyo;