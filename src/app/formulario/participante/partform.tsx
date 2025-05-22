'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@components/buttons_inputs/Button';
import Checkbox from '@components/buttons_inputs/Checkbox';
import withIconDecorator from '@/components/decorators/IconDecorator';
import { Modal, Toast } from '@/components/buttons_inputs/FormNotification';
import GroupSelectionTable from '@/components/tables/VenueSelectionTable';
import { FlowerLotus, AddressBook, SketchLogo, Megaphone, X, UserSound, ChatTeardropText, Grains, Student } from '@components/icons';
import Send from '@components/icons/ArrowFatRight';
import Navbar from '@/components/headers_menu_users/navbar';

interface Group {
  id_group: number;
  name: string;
  mode: string;
  sede: string; // Adjusted to match participant context (venue name as sede)
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
  const [inputValue, setInputValue] = useState('');
  const [section, setSection] = useState('__All__');
  const [currentPage, setCurrentPage] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);

  const rowsPerPage = 10;

  // Fetch groups from API
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
      }
    };
    fetchGroups();
  }, []);

  const uniqueModalidades = Array.from(new Set(groups.map(g => g.mode))).sort();
  const modalidadesOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueModalidades.map(mode => ({ label: mode, value: mode })),
  ];

  const filteredData = groups.filter(group => {
    const searchTerm = inputValue.toLowerCase().trim();
    const matchesSearch = !searchTerm || group.sede.toLowerCase().includes(searchTerm) || group.name.toLowerCase().includes(searchTerm);
    const matchesMode = section === '__All__' ? true : group.mode === section;
    return matchesSearch && matchesMode;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) setCurrentPage(totalPages - 1);
    else if (totalPages === 0) setCurrentPage(0);
  }, [filteredData.length, currentPage, totalPages]);

  const sectionFilterChange = (value: string) => {
    setSection(value);
    setInputValue('');
    setCurrentPage(0);
  };

  const handleSelectClick = (group: Group) => {
    setFormData(prev => ({ ...prev, preferred_group: group.id_group }));
  };

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
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!formData.participant.name) newErrors.push('El nombre es obligatorio');
    if (!formData.participant.paternal_name) newErrors.push('El apellido paterno es obligatorio');
    if (!formData.participant.email) newErrors.push('El correo electrónico es obligatorio');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.participant.email))
      newErrors.push('El correo electrónico debe ser válido');
    if (!formData.participant.year) newErrors.push('El grado es obligatorio');
    if (!formData.participant.education) newErrors.push('La escolaridad es obligatoria');
    if (!formData.participation_file) newErrors.push('El archivo de participación es obligatorio');
    if (!formData.tutor.name) newErrors.push('El nombre del tutor es obligatorio');
    if (!formData.tutor.paternal_name) newErrors.push('El apellido paterno del tutor es obligatorio');
    if (!formData.tutor.email) newErrors.push('El correo del tutor es obligatorio');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.tutor.email))
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
      setSuccess(null);
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

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/api/participants', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      setSuccess(null);
    }
  };

  return (
    <form className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex flex-col items-center" onSubmit={handleSubmit}>
      <Navbar />
      <div className="w-full max-w-6xl rounded-lg shadow-lg p-6 md:p-8"></div>
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

        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            Datos del Participante
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Responde con sinceridad las siguientes preguntas. Campos con (*) son obligatorios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InputField
            label="Nombre(s)*"
            placeholder="Edna"
            variant="primary"
            value={formData.participant.name}
            onChangeText={(value) => handleInputChange('participant', 'name', value)}
          />
          <InputField
            label="Apellido Paterno*"
            placeholder="Moda"
            variant="primary"
            value={formData.participant.paternal_name}
            onChangeText={(value) => handleInputChange('participant', 'paternal_name', value)}
          />
          <InputField
            label="Apellido Materno"
            placeholder="Apellido"
            variant="primary"
            value={formData.participant.maternal_name}
            onChangeText={(value) => handleInputChange('participant', 'maternal_name', value)}
          />
          <InputField
            label="Correo Electrónico*"
            placeholder="ednamoda@disney.com"
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
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            Datos del Tutor
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Pídele a tu tutor que llene esta sección. Campos con (*) son obligatorios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InputField
            label="Nombre(s)*"
            placeholder="Roberto"
            variant="primary"
            value={formData.tutor.name}
            onChangeText={(value) => handleInputChange('tutor', 'name', value)}
          />
          <InputField
            label="Apellido Paterno*"
            placeholder="López"
            variant="primary"
            value={formData.tutor.paternal_name}
            onChangeText={(value) => handleInputChange('tutor', 'paternal_name', value)}
          />
          <InputField
            label="Apellido Materno"
            placeholder="Juárez"
            variant="primary"
            value={formData.tutor.maternal_name}
            onChangeText={(value) => handleInputChange('tutor', 'maternal_name', value)}
          />
          <InputField
            label="Correo Electrónico*"
            placeholder="tutor@example.com"
            variant="accent"
            value={formData.tutor.email}
            onChangeText={(value) => handleInputChange('tutor', 'email', value)}
          />
          <InputField
            label="Celular*"
            placeholder="+522221234567"
            variant="accent"
            value={formData.tutor.phone_number}
            onChangeText={(value) => handleInputChange('tutor', 'phone_number', value)}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            Selección de Grupo
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Selecciona el grupo que prefieres. Usa los botones para más detalles.
          </p>
        </div>

        <div className="flex justify-center items-center mx-auto w-[80%] h-[50px] rounded-t-[15px] mt-8 input-secondary text-xs sm:text-base md:text-lg lg:text-xl">
          <h2 className="mx-4 font-semibold">Grupo Elegido: </h2>
          <p>{groups.find(g => g.id_group === formData.preferred_group)?.name || 'Ninguno'}</p>
        </div>
        <div className="fondo-tabla-forms flex flex-col p-6 gap-4 overflow-auto h-[50vh] sm:h-[75vh]">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex flex-1 gap-4 top-0">
              <InputField
                label=""
                showDescription={false}
                placeholder="Search"
                variant="primary"
                value={inputValue}
                onChangeText={(val) => setInputValue(val)}
              />
              <Dropdown
                label="Modalidad"
                options={modalidadesOptions}
                value={section}
                onChange={sectionFilterChange}
                variant="primary"
              />
            </div>
          </div>

          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-2 text-center">Grupo</th>
                <th className="p-2 text-center">Modalidad</th>
                <th className="p-2 text-center">Sede</th>
                <th className="p-2 text-center">Cupo</th>
                <th className="p-2 text-center">Horarios</th>
                <th className="p-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {paginatedData.map((group, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="p-2 text-center">{group.name}</td>
                  <td className="p-2 text-center">{group.mode}</td>
                  <td className="p-2 text-center">{group.sede}</td>
                  <td className="p-2 text-center">{group.cupo}</td>
                  <td className="p-2 text-center">{group.horarios}<br />{group.fechas}</td>
                  <td className="p-2 flex gap-2 justify-center">
                    <Button label='' variant="success" round showLeftIcon IconLeft={Check} onClick={() => handleSelectClick(group)} />
                    <Button label='' variant="primary" round showLeftIcon IconLeft={Eye} />
                    <Button label='' variant="warning" round showLeftIcon IconLeft={Star} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <Button
              label={`Página ${currentPage + 1} de ${totalPages}`}
              variant="secondary"
              onClick={() => setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))}
              disabled={currentPage === 0}
            />
            <Button
              label="Siguiente"
              variant="secondary"
              onClick={() => setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))}
              disabled={currentPage === totalPages - 1}
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            Permiso de Participación
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
            {formData.participation_file && (
              <p className="mt-2 text-xs text-gray-600">
                Archivo seleccionado: {formData.participation_file.name}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            Aviso de Privacidad
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

        <div className="mt-6 flex justify-end">
              <Button
                label="Enviar Registro"
                variant="success"
                showRightIcon
                IconRight={withIconDecorator(Send)}
                className="px-6 py-2 rounded-full flex items-center"
              />

        {errors.length > 0 && <div className="mt-4 text-red-500">{errors.join(', ')}</div>}
        {success && <div className="mt-4 text-green-500">{success}</div>}
      </div>
    </form>
  );
};

export default ParticipantRegistrationForm;