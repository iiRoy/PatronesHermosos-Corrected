'use client';
import { useState, useEffect } from 'react';
import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@components/buttons_inputs/Button';
import Checkbox from '@components/buttons_inputs/Checkbox';
import withIconDecorator from '@/components/decorators/IconDecorator';
import { FlowerLotus, AddressBook, X, Send } from '@components/icons';
import { Modal, Toast } from '@/components/buttons_inputs/FormNotification';
import ParticipantGroupSelectionTable from '@/components/tables/GroupSelectionTable';
import Navbar from '@/components/headers_menu_users/navbar';

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
  participant: {
    name: string;
    paternal_name: string;
    maternal_name: string;
    email: string;
    year: string;
    education: string;
  };
  tutor: {
    name: string;
    paternal_name: string;
    maternal_name: string;
    email: string;
    phone_number: string;
  };
  participation_file: File | null;
  preferred_group: number | null;
  privacy_accepted: boolean;
}

const ParticipantRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    participant: { name: '', paternal_name: '', maternal_name: '', email: '', year: '', education: '' },
    tutor: { name: '', paternal_name: '', maternal_name: '', email: '', phone_number: '' },
    participation_file: null,
    preferred_group: null,
    privacy_accepted: false,
  });

  const [groups, setGroups] = useState<Group[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessToastOpen, setIsSuccessToastOpen] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/groups');
        const data = await response.json();
        const transformedGroups = data.map((group: any) => ({
          id_group: group.id_group,
          name: group.name,
          mode: group.mode || 'Presencial',
          sede: group.venues?.name || 'N/A',
          cupo: `${group.occupied_places || 0}/${group.max_places || 'N/A'} Personas`,
          horarios: `${group.start_hour || 'N/A'} - ${group.end_hour || 'N/A'}`,
          fechas: `${group.start_date ? new Date(group.start_date).toLocaleDateString('es-MX') : 'N/A'} - ${group.end_date ? new Date(group.end_date).toLocaleDateString('es-MX') : 'N/A'}`,
        }));
        setGroups(transformedGroups);
      } catch (err) {
        setErrors(['Error al cargar los grupos']);
        setIsErrorModalOpen(true);
      }
    };
    fetchGroups();
  }, []);

  const handleInputChange = (section: keyof FormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, participation_file: file }));
    } else {
      setErrors(['El archivo debe ser un PDF']);
      setIsErrorModalOpen(true);
    }
  };

  const handleGroupSelect = (id_group: number) => {
    setFormData(prev => ({ ...prev, preferred_group: id_group }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!formData.participant.name) newErrors.push('El nombre es obligatorio');
    if (!formData.participant.paternal_name) newErrors.push('El apellido paterno es obligatorio');
    if (!formData.participant.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.participant.email))
      newErrors.push('El correo electrónico debe ser válido');
    if (!formData.participant.year) newErrors.push('El grado es obligatorio');
    if (!formData.participant.education) newErrors.push('La escolaridad es obligatoria');
    if (!formData.participation_file) newErrors.push('El archivo de participación es obligatorio');
    if (!formData.tutor.name) newErrors.push('El nombre del tutor es obligatorio');
    if (!formData.tutor.paternal_name) newErrors.push('El apellido paterno del tutor es obligatorio');
    if (!formData.tutor.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.tutor.email))
      newErrors.push('El correo del tutor debe ser válido');
    if (!formData.tutor.phone_number) newErrors.push('El celular del tutor es obligatorio');
    if (!formData.privacy_accepted) newErrors.push('Debes aceptar el aviso de privacidad');
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsErrorModalOpen(true);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.participant.name);
    formDataToSend.append('paternal_name', formData.participant.paternal_name);
    formDataToSend.append('maternal_name', formData.participant.maternal_name);
    formDataToSend.append('email', formData.participant.email);
    formDataToSend.append('year', formData.participant.year);
    formDataToSend.append('education', formData.participant.education);
    formDataToSend.append('tutor[name]', formData.tutor.name);
    formDataToSend.append('tutor[paternal_name]', formData.tutor.paternal_name);
    formDataToSend.append('tutor[maternal_name]', formData.tutor.maternal_name);
    formDataToSend.append('tutor[email]', formData.tutor.email);
    formDataToSend.append('tutor[phone_number]', formData.tutor.phone_number);
    if (formData.preferred_group) formDataToSend.append('preferred_group', formData.preferred_group.toString());
    if (formData.participation_file) formDataToSend.append('participation_file', formData.participation_file);

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/api/participants', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 422 && data.errors) {
          const backendErrors = data.errors.map((err: any) => err.msg);
          throw new Error(backendErrors.join(', '));
        }
        throw new Error(data.message || 'Error al registrar participante');
      }
      setSuccess(data.message || 'Participante registrado exitosamente');
      setIsSuccessToastOpen(true);
      setErrors([]);
      setFormData({
        participant: { name: '', paternal_name: '', maternal_name: '', email: '', year: '', education: '' },
        tutor: { name: '', paternal_name: '', maternal_name: '', email: '', phone_number: '' },
        participation_file: null,
        preferred_group: null,
        privacy_accepted: false,
      });
    } catch (err: any) {
      setErrors([err.message]);
      setIsErrorModalOpen(true);
    }
  };

  return (
    <form className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex flex-col items-center" onSubmit={handleSubmit}>
      <Navbar />
      <div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-2 h-16 mr-4 bg-purple-600 rounded-full"></div>
            <h1 className="text-2xl">
              <span className="italic">Formulario de Registro</span><br />
              <span className="font-bold text-3xl">Participantes</span>
            </h1>
          </div>
          <Button
            label=""
            variant="error"
            round
            showLeftIcon
            IconLeft={X}
            onClick={() => console.log('Regresar clicked')}
          />
        </div>

        {/* Datos del Participante */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <FlowerLotus /> Datos del Participante
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Responde con sinceridad las siguientes preguntas. Campos con (*) son obligatorios.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InputField
            label="Nombre(s)*"
            placeholder="María José de la Rosa"
            variant="primary"
            value={formData.participant.name}
            onChangeText={(value) => handleInputChange('participant', 'name', value)}
          />
          <InputField
            label="Apellido Paterno*"
            placeholder="Hernández"
            variant="primary"
            value={formData.participant.paternal_name}
            onChangeText={(value) => handleInputChange('participant', 'paternal_name', value)}
          />
          <InputField
            label="Apellido Materno"
            placeholder="Sánchez"
            variant="primary"
            value={formData.participant.maternal_name}
            onChangeText={(value) => handleInputChange('participant', 'maternal_name', value)}
          />
          <InputField
            label="Correo Electrónico*"
            placeholder="mariajhndzsn@gmail.com"
            variant="accent"
            value={formData.participant.email}
            onChangeText={(value) => handleInputChange('participant', 'email', value)}
          />
          <Dropdown
            label="Grado*"
            options={['1º', '2º', '3º']}
            value={formData.participant.year}
            onChange={(value) => handleInputChange('participant', 'year', value)}
            variant="accent"
          />
          <Dropdown
            label="Escolaridad*"
            options={['Secundaria', 'Preparatoria']}
            value={formData.participant.education}
            onChange={(value) => handleInputChange('participant', 'education', value)}
            variant="accent"
            Icon={withIconDecorator(Grains)}
          />
        </div>

        {/* Datos del Tutor */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <FlowerLotus /> Datos del Tutor
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Pídele a tu tutor que llene esta sección. Campos con (*) son obligatorios.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InputField
            label="Nombre(s)*"
            placeholder="María de la Rosa"
            variant="primary"
            value={formData.tutor.name}
            onChangeText={(value) => handleInputChange('tutor', 'name', value)}
          />
          <InputField
            label="Apellido Paterno*"
            placeholder="Sánchez"
            variant="primary"
            value={formData.tutor.paternal_name}
            onChangeText={(value) => handleInputChange('tutor', 'paternal_name', value)}
          />
          <InputField
            label="Apellido Materno"
            placeholder="Mendoza"
            variant="primary"
            value={formData.tutor.maternal_name}
            onChangeText={(value) => handleInputChange('tutor', 'maternal_name', value)}
          />
          <InputField
            label="Correo Electrónico*"
            placeholder="mariajhndzsn@gmail.com"
            variant="accent"
            value={formData.tutor.email}
            onChangeText={(value) => handleInputChange('tutor', 'email', value)}
          />
          <InputField
            label="Celular*"
            placeholder="+52 222 123 4567"
            variant="accent"
            value={formData.tutor.phone_number}
            onChangeText={(value) => handleInputChange('tutor', 'phone_number', value)}
          />
        </div>

        {/* Selección de Grupo */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <AddressBook /> Selección de Grupo
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Selecciona el grupo que prefieres. Usa los botones para más detalles.
          </p>
        </div>
        <div className="flex justify-center items-center mx-auto w-[80%] h-[50px] rounded-t-[15px] mt-8 bg-gray-700 text-xs sm:text-base md:text-lg lg:text-xl">
          <h2 className="mx-4 font-semibold">Grupo Elegido: </h2>
          <p>{groups.find(g => g.id_group === formData.preferred_group)?.name || 'Ninguno'}</p>
        </div>
        <ParticipantGroupSelectionTable
          onSelect={handleGroupSelect}
          selectedGroupId={formData.preferred_group}
          rowsPerPage={4}
        />

        {/* Permiso de Participación */}
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <FlowerLotus /> Permiso de Participación
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Sube tu permiso firmado (PDF obligatorio).
          </p>
          <div className="p-4 bg-white text-black rounded-lg">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mt-4"
            />
            <Button
              label="Subir mi documento"
              variant="primary"
              className="mt-2"
            />
            {formData.participation_file && (
              <p className="mt-2 text-xs text-gray-600">
                Archivo seleccionado: {formData.participation_file.name}
              </p>
            )}
          </div>
        </div>

        {/* Aviso de Privacidad */}
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <FlowerLotus /> Aviso de Privacidad
          </h2>
          <p className="text-gray-400 text-sm">
            Confirma que has leído y aceptas el aviso de privacidad:
            <a href="https://tec.mx/es/aviso-privacidad-participantes-expositores-panelistas-conferencias-moderadores" className="text-purple-400 hover:underline">
              Aviso de Privacidad
            </a>
          </p>
          <div className="mt-2">
            <Checkbox
              label=""
              color="purple"
              checked={formData.privacy_accepted}
              onChange={(checked) => setFormData(prev => ({ ...prev, privacy_accepted: checked }))}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <Button
            label="Enviar Registro"
            variant="success"
            showRightIcon
            IconRight={Send}
            className="px-6 py-2 rounded-full flex items-center"
          />
        </div>
      </div>

      <Modal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Errores en el formulario"
        messages={errors}
      />
      <Toast
        isOpen={isSuccessToastOpen}
        onClose={() => setIsSuccessToastOpen(false)}
        message={success || ''}
      />
    </form>
  );
};

export default ParticipantRegistrationForm;