'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@components/buttons_inputs/Button';
import Checkbox from '@components/buttons_inputs/Checkbox';
import withIconDecorator from '@/components/decorators/IconDecorator';
import { Modal, Toast } from '@components/buttons_inputs/FormNotification';
import { FlowerLotus, AddressBook, X, User, Phone, Envelope, GraduationCap, Flag, SealWarning, Heart, Megaphone, BookOpenText } from '@components/icons';
import Send from '@components/icons/ArrowFatRight';
import ParticipantGroupSelectionTable from '@components/tables/GroupSelectionTable';
import { FilePdfIcon } from '@phosphor-icons/react';

interface Group {
  id_group: number;
  name: string;
  mode: string;
  sede: string;
  cupo: string;
  horarios: string;
  fechas: string;
}

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

interface FormData {
  participant: ParticipantData;
  tutor: TutorData;
  participation_file: File | null;
  preferred_group: number | null;
  privacy_accepted: boolean;
}

// Define sections that are objects for handleInputChange
type ObjectSections = 'participant' | 'tutor';
type ObjectSectionData = ParticipantData | TutorData;
type ObjectSectionKeys = keyof ParticipantData | keyof TutorData;

const ParticipantRegistrationForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
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
  });

  const [groups, setGroups] = useState<Group[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessToastOpen, setIsSuccessToastOpen] = useState(false);

  // Fetch groups from API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/groups');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Expected an array of groups, but received: ' + JSON.stringify(data));
        }
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
        console.error('Error fetching groups:', err);
        setErrors(['Error al cargar los grupos: ' + (err instanceof Error ? err.message : 'Unknown error')]);
        setIsErrorModalOpen(true);
      }
    };
    fetchGroups();
  }, []);

  const handleInputChange = <T extends ObjectSections>(
    section: T,
    field: ObjectSectionKeys,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData((prev) => ({ ...prev, participation_file: file }));
    } else {
      setErrors(['El archivo debe ser un PDF']);
      setIsErrorModalOpen(true);
    }
  };

  const handleGroupSelect = (id_group: number) => {
    setFormData((prev) => ({ ...prev, preferred_group: id_group }));
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
      setSuccess(null);
      setIsSuccessToastOpen(false);
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
    if (formData.preferred_group) {
      formDataToSend.append('preferred_group', formData.preferred_group.toString());
    }
    if (formData.participation_file) {
      formDataToSend.append('participation_file', formData.participation_file);
    }

    // Debug FormData
    console.log('FormData contents:');
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await fetch('http://localhost:3000/api/participants', {
        method: 'POST',
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
      setIsErrorModalOpen(false);
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
      setSuccess(null);
      setIsSuccessToastOpen(false);
    }
  };

  return (
    <form className="pagina-formulario overflow-x-auto min-h-screen bg-gray-900 text-white flex flex-col items-center custom-scrollbar-tabla mt-8" onSubmit={handleSubmit}>

      <div className="info-formulario overflow-x-auto w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 custom-scrollbar-tabla">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-2 h-16 mr-4 bg-[#683756] rounded-full"></div>
            <h1 className="text-2xl">
              <span className="italic">Formulario de Registro</span><br />
              <span className="font-bold text-3xl">Participantes</span>
            </h1>
          </div>
          <Button
            label="Regresar"
            variant="error"
            showLeftIcon
            IconLeft={X}
            href='/'
            className="px-4 py-2 rounded-full flex items-center"
          />
        </div>
        {/* Datos del Participante */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <span className="mr-2">
              <FlowerLotus
                width='1.5rem'
                height='1.5rem'
                fillColor='#ebe6eb'
                strokeWidth={0}
              />
            </span>
            Datos del Participante
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Responde con sinceridad las siguientes preguntas acerca de tus datos personales y de contacto.
            Las secciones que contienen un asterisco (*) deben de responderse de manera obligatoria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InputField
            label="Nombre(s)*"
            placeholder="Nombre(s)"
            variant="primary"
            icon="FingerprintSimple"
            value={formData.participant.name}
            onChangeText={(value) => handleInputChange('participant', 'name', value)}
          />
          <InputField
            label="Apellido Paterno*"
            placeholder="Apellido Paterno"
            variant="primary"
            icon="FingerprintSimple"
            value={formData.participant.paternal_name}
            onChangeText={(value) => handleInputChange('participant', 'paternal_name', value)}
          />
          <InputField
            label="Apellido Materno"
            placeholder="Apellido Materno"
            variant="primary"
            icon="FingerprintSimple"
            value={formData.participant.maternal_name}
            onChangeText={(value) => handleInputChange('participant', 'maternal_name', value)}
          />
          <InputField
            label="Correo Electrónico*"
            placeholder="correo1@ejemplo.com"
            variant="accent"
            icon="At"
            value={formData.participant.email}
            onChangeText={(value) => handleInputChange('participant', 'email', value)}
          />
          <Dropdown
            label="Grado*"
            options={['1º', '2º', '3º']}
            value={formData.participant.year}
            onChange={(value) => handleInputChange('participant', 'year', value)}
            variant="accent"
            Icon={withIconDecorator(GraduationCap)}
          />
          <Dropdown
            label="Escolaridad*"
            options={['Secundaria', 'Preparatoria']}
            value={formData.participant.education}
            onChange={(value) => handleInputChange('participant', 'education', value)}
            variant="accent"
            Icon={withIconDecorator(BookOpenText)}
          />
        </div>

        {/* Datos del Tutor */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <span className="mr-2"><SealWarning
              width='1.5rem'
              height='1.5rem'
              fillColor='#ebe6eb'
              strokeWidth={0} /></span> Datos del Tutor
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Pídele a tu tutor que llene esta sección. Campos con (*) son obligatorios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InputField
            label="Nombre(s)*"
            placeholder="Nombre(s)"
            variant="primary"
            icon="FingerprintSimple"
            value={formData.tutor.name}
            onChangeText={(value) => handleInputChange('tutor', 'name', value)}
          />
          <InputField
            label="Apellido Paterno*"
            placeholder="Apellido Paterno"
            variant="primary"
            icon="FingerprintSimple"
            value={formData.tutor.paternal_name}
            onChangeText={(value) => handleInputChange('tutor', 'paternal_name', value)}
          />
          <InputField
            label="Apellido Materno"
            placeholder="Apellido Materno"
            variant="primary"
            icon="FingerprintSimple"
            value={formData.tutor.maternal_name}
            onChangeText={(value) => handleInputChange('tutor', 'maternal_name', value)}
          />
          <InputField
            label="Correo Electrónico*"
            placeholder="correo1@ejemplo.com"
            variant="accent"
            icon="At"
            value={formData.tutor.email}
            onChangeText={(value) => handleInputChange('tutor', 'email', value)}
          />
          <InputField
            label="Celular*"
            placeholder="+522221234567"
            variant="accent"
            icon="Phone"
            value={formData.tutor.phone_number}
            onChangeText={(value) => handleInputChange('tutor', 'phone_number', value)}
          />
        </div>

        {/* Permiso de Participación */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <span className="mr-2"><Heart
              width='1.5rem'
              height='1.5rem'
              fillColor='#ebe6eb'
              strokeWidth={0} /></span> Permiso de Participación
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Dentro de esta sección tendrás que subir tu permiso de participación, la cual deberá de estar firmada por tu tutor.
            Esta sección es obligatoria.
          </p>

          {/* Download Section */}
        <div className="mb-6 flex items-center gap-4">
          <p className="text-lg text-gray-400">
            Descarga la convocatoria para psrticipantes:
          </p>
          <a
            href="/ConvocatoriaParticipantes-PH2025.pdf"
            download="ConvocatoriaParticipantes-PH2025.pdf"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            role="button"
            aria-label="Descargar Convocatoria"
          >
            Descargar Convocatoria
          </a>
        </div>
          <div className="tarjeta-archivo p-4 bg-white text-black rounded-lg">
            <div className='flex items-center gap-4'>
              <div className='icono-tarjeta-archivo'>
                <FilePdfIcon
                  width='2rem'
                  height='2rem'
                  strokeWidth={0}
                />
              </div>
              <div className='titulo-tarjeta-archivo text-xl font-semibold'>
                <h3>Sube tu permiso firmado (PDF obligatorio).</h3>
              </div>
            </div>
            <p className='text-gray-700 my-8'>Selecciona un documento para subir.  Ten cuidado al subir tus documentos y verifica dos veces que se suba correctamente.</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mt-4"
            />
            {formData.participation_file && (
              <p className="mt-2 text-xs text-gray-600">
                Archivo seleccionado: {formData.participation_file.name}
              </p>
            )}
          </div>
        </div>

        {/* Selección de Grupo */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <span className="mr-2"><AddressBook
              width='1.5rem'
              height='1.5rem'
              fillColor='#ebe6eb'
              strokeWidth={0} /></span> Selección de Grupo
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Selecciona el grupo que prefieres. Usa los botones para más detalles.
          </p>
        </div>

        <div className="flex justify-center items-center mx-auto w-[80%] h-[50px] rounded-t-[15px] mt-8 text-xs sm:text-base md:text-lg lg:text-xl bg-[#683756] gap-12">
          <div className='flex'>
            <h2 className="mx-4 font-semibold">Grupo Elegido: </h2>
            <p>{groups.find(g => g.id_group === formData.preferred_group)?.name || 'Ninguno'}</p>
          </div>
          <div className='flex'>
            <h2 className="mx-4 font-semibold">Sede: </h2>
            <p>{groups.find(g => g.id_group === formData.preferred_group)?.sede || 'Ninguna'}</p>
          </div>
        </div>
        <ParticipantGroupSelectionTable
          onSelect={(id_group) => {
            handleGroupSelect(id_group);
          }}
          selectedGroupId={formData.preferred_group ?? undefined}
          rowsPerPage={4}
        />

        {/* Aviso de Privacidad */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <span className="mr-2"><Megaphone
              width='1.5rem'
              height='1.5rem'
              fillColor='#ebe6eb'
              strokeWidth={0} /></span> Aviso de Privacidad
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
              variant='primary'
              checked={formData.privacy_accepted}
              onChange={(checked) => setFormData((prev) => ({ ...prev, privacy_accepted: checked }))}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <Button
            label="Enviar Registro"
            variant="success"
            showRightIcon
            type='submit'
            IconRight={withIconDecorator(Send)}
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