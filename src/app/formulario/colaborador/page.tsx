'use client';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@components/buttons_inputs/InputField';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import Dropdown from '@components/buttons_inputs/Dropdown';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import Button from '@components/buttons_inputs/Button';
import Pagination from '@/components/buttons_inputs/Pagination';
import Checkbox from '@components/buttons_inputs/Checkbox';
import { Modal, Toast } from '@/components//buttons_inputs/FormNotification';
import withIconDecorator from '@/components/decorators/IconDecorator';
import { FlowerLotus, User, AddressBook, SketchLogo, Check, Eye, Star, Megaphone, X, UserSound, ChatTeardropText, Grains, Student } from '@/components/icons';
import Navbar from '@/components/headers_menu_users/navbar';
import Send from '@components/icons/ArrowFatRight'; // For submit button

interface Collaborator {
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
  preferred_group?: number;
}

interface Venue {
  id_venue: number;
  name: string;
  modality: string;
  groups: number;
  coordinator: string;
  dates: string;
}

const CollaboratorRegistrationForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Collaborator>({
    name: '',
    paternal_name: '',
    maternal_name: '',
    email: '',
    phone_number: '',
    gender: 'Femenino',
    college: '',
    degree: '',
    semester: '',
    preferred_role: 'Instructora',
    preferred_language: 'Español',
    preferred_level: 'Básico',
    preferred_group: undefined,
  });

  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessToastOpen, setIsSuccessToastOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [section, setSection] = useState('__All__');
  const [currentPage, setCurrentPage] = useState(0);
  const [venues, setVenues] = useState<Venue[]>([]);

  const rowsPerPage = 10;

  // Fetch venues
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/venues');
        const data = await response.json();
        // Transform venue data to match table format
        const transformedVenues = data.map((venue: any) => ({
          id_venue: venue.id_venue,
          name: venue.name,
          modality: venue.mode || 'Presencial', // Adjust based on your API
          groups: venue.groups?.length || 0,
          coordinator: venue.venue_coordinators?.[0]?.name || 'N/A',
          dates: 'DD/MM - DD/MM', // Adjust based on actual group dates
        }));
        setVenues(transformedVenues);
      } catch (err) {
        setErrors(['Error al cargar las sedes']);
        setIsErrorModalOpen(true);
      }
    };
    fetchVenues();
  }, []);

  // Get unique modalities
  const uniqueModalidades = Array.from(new Set(venues.map(venue => venue.modality))).sort();
  const modalidadesOptions = [
    { label: 'Todas', value: '__All__' },
    ...uniqueModalidades.map(modality => ({ label: modality, value: modality })),
  ];

  // Filter venues
  const filteredData = useMemo(() => {
    const searchTerm = inputValue.toLowerCase().trim();
    return venues.filter(venue => {
      const matchesSearch = !searchTerm || venue.name.toLowerCase().includes(searchTerm);
      const matchesSede = section === '__All__' ? true : venue.modality === section;
      return matchesSearch && matchesSede;
    });
  }, [inputValue, section, venues]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  // Reset currentPage when filteredData changes
  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    } else if (totalPages === 0) {
      setCurrentPage(0);
    }
  }, [filteredData.length, currentPage, totalPages]);

  const sectionFilterChange = (value: string) => {
    setSection(value);
    setInputValue('');
    setCurrentPage(0);
  };

  // Handle venue selection
  const handleVenueSelect = (venue: Venue) => {
    setFormData(prev => ({ ...prev, preferred_group: venue.id_venue }));
  };

  // Handle input changes
  const handleInputChange = (field: keyof Collaborator, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.name) newErrors.push('El nombre es obligatorio');
    if (!formData.paternal_name) newErrors.push('El apellido paterno es obligatorio');
    if (!formData.email) newErrors.push('El correo electrónico es obligatorio');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.push('El correo electrónico debe ser válido');
    if (!formData.phone_number) newErrors.push('El celular es obligatorio');
    if (!formData.gender) newErrors.push('El sexo es obligatorio');
    if (!formData.college) newErrors.push('La institución académica es obligatoria');
    if (!formData.degree) newErrors.push('La carrera es obligatoria');
    if (!formData.semester) newErrors.push('El semestre es obligatorio');
    if (!formData.preferred_role) newErrors.push('El rol preferido es obligatorio');
    if (!formData.preferred_language) newErrors.push('El idioma preferido es obligatorio');
    if (!formData.preferred_level) newErrors.push('La dificultad preferida es obligatoria');
    if (!privacyAccepted) newErrors.push('Debes aceptar el aviso de privacidad');

    return newErrors;
  };

  // Handle form submission
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

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('paternal_name', formData.paternal_name);
      formDataToSend.append('maternal_name', formData.maternal_name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone_number', formData.phone_number);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('college', formData.college);
      formDataToSend.append('degree', formData.degree);
      formDataToSend.append('semester', formData.semester);
      formDataToSend.append('preferred_role', formData.preferred_role);
      formDataToSend.append('preferred_language', formData.preferred_language);
      formDataToSend.append('preferred_level', formData.preferred_level);
      if (formData.preferred_group) {
        formDataToSend.append('preferred_group', formData.preferred_group.toString());
      }

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/collaborators', {
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
          setErrors(backendErrors);
          setIsErrorModalOpen(true);
          throw new Error(backendErrors.join(', '));
        }
        setErrors([data.message || 'Error al registrar el colaborador']);
        setIsErrorModalOpen(true);
        throw new Error(data.message || 'Error al registrar el colaborador');
      }

      setSuccess(data.message || 'Colaborador registrado exitosamente');
      setIsSuccessToastOpen(true);
      setErrors([]);
      setIsErrorModalOpen(false);

      // Reset form
      setFormData({
        name: '',
        paternal_name: '',
        maternal_name: '',
        email: '',
        phone_number: '',
        gender: 'Femenino',
        college: '',
        degree: '',
        semester: '',
        preferred_role: 'Instructora',
        preferred_language: 'Español',
        preferred_level: 'Básico',
        preferred_group: undefined,
      });
      setPrivacyAccepted(false);
    } catch (err: any) {
      setErrors([err.message]);
      setIsErrorModalOpen(true);
      setSuccess(null);
      setIsSuccessToastOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <form className="pagina-formulario" onSubmit={handleSubmit}>
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex flex-col justify-center items-center">
          <div className="info-formulario w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-2 rounded-full h-16 mr-4 notification-icon-purple"></div>
                <h1 className="text-2xl">
                  <span className="italic">Formulario de Registro</span><br />
                  <span className="font-bold text-3xl">Colaborador</span>
                </h1>
              </div>
              <Button
                label=""
                variant="error"
                showLeftIcon
                round
                IconLeft={X}
                onClick={() => router.push('/')}
                className="px-4 py-2 rounded-full flex items-center"
              />
            </div>

            {/* Section: Datos Personales */}
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
                <span className="mr-2"><FlowerLotus /></span> Datos Personales
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-4">
                Responde con veracidad las siguientes preguntas acerca de tus datos personales y de contacto.<br />
                Las secciones que contengan un asterisco (*) deberán responderse de manera obligatoria.
              </p>
              <p className="text-gray-400 text-sm italic">
                Es importante resaltar que solamente personas estudiando una carrera universitaria podrán participar en el equipo de apoyo & staff. Mujeres estudiando una carrera universitaria en relación al área de STEAM podrán aplicar para el rol de instructoras o facilitadoras.
              </p>
            </div>

            {/* Form Fields: Datos Personales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Nombre(s)*"
                placeholder="Nombre(s)"
                variant="primary"
                icon="Fingerprint"
                value={formData.name}
                onChangeText={(value: string) => handleInputChange('name', value)}
              />
              <InputField
                label="Apellido Paterno*"
                placeholder="Apellido Paterno"
                variant="primary"
                icon="Fingerprint"
                value={formData.paternal_name}
                onChangeText={(value: string) => handleInputChange('paternal_name', value)}
              />
              <InputField
                label="Apellido Materno"
                placeholder="Apellido Materno"
                variant="primary"
                icon="Fingerprint"
                value={formData.maternal_name}
                onChangeText={(value: string) => handleInputChange('maternal_name', value)}
              />
              <InputField
                label="Correo Electrónico*"
                placeholder="correo1@ejemplo.com"
                variant="accent"
                icon="At"
                value={formData.email}
                onChangeText={(value: string) => handleInputChange('email', value)}
              />
              <InputField
                label="Celular*"
                placeholder="+522221234567"
                variant="accent"
                icon="Phone"
                value={formData.phone_number}
                onChangeText={(value: string) => handleInputChange('phone_number', value)}
              />
              <Dropdown
                label="Sexo*"
                options={['Femenino', 'Masculino', 'No binario', 'Prefiero no decir', 'Otro']}
                value={formData.gender}
                onChange={(value: string) => handleInputChange('gender', value)}
                variant="accent"
                Icon={withIconDecorator(Grains)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Institución Académica*"
                description="Escribe el nombre completo de la institución académica a la cual actualmente estás asistiendo."
                placeholder="Tec de Monterrey"
                variant="secondary"
                icon="Student"
                value={formData.college}
                onChangeText={(value: string) => handleInputChange('college', value)}
              />
              <InputField
                label="Carrera*"
                description="Escribe el nombre completo de la carrera la cual estás estudiando actualmente."
                placeholder="Ingeniería en Mecatrónica"
                variant="secondary"
                icon="Books"
                value={formData.degree}
                onChangeText={(value: string) => handleInputChange('degree', value)}
              />
              <InputField
                label="Semestre Cursando*"
                placeholder="6º Semestre"
                variant="secondary"
                icon="Medal"
                value={formData.semester}
                onChangeText={(value: string) => handleInputChange('semester', value)}
              />
              <InputField
                label="Locación*"
                placeholder="Puebla"
                variant="secondary"
                icon="MapPin"
                value={formData.semester} // Temporarily reusing semester; should be a separate field if needed
                onChangeText={(value: string) => handleInputChange('semester', value)}
              />
            </div>

            {/* Section: Selección de Sede */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
                <span className="mr-2"><AddressBook /></span> Selección de Sede
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-4">
                Selecciona la SEDE que más te llame la atención para apoyar.<br />
                Puedes ver los detalles del grupo usando los botones del lado derecho.
              </p>
            </div>

            <div className="flex justify-center items-center mx-auto w-[80%] h-[50px] rounded-t-[15px] mt-8 input-secondary text-xs sm:text-base md:text-lg lg:text-xl">
              <Student />
              <h2 className="mx-4 font-semibold">SEDE Elegida: </h2>
              <p>{venues.find(v => v.id_venue === formData.preferred_group)?.name || 'Ninguna'}</p>
            </div>
            <div className="fondo-tabla-forms flex flex-col p-6 gap-4 overflow-auto h-[50vh] sm:h-[75vh]">
              <div className="flex flex-wrap justify-between gap-4">
                <div className="flex flex-1 gap-4 top-0">
                  <div className="basis-2/3">
                    <InputField
                      label=""
                      showDescription={false}
                      placeholder="Search"
                      showError={false}
                      variant="primary"
                      icon="MagnifyingGlass"
                      value={inputValue}
                      onChangeText={(val) => setInputValue(val)}
                    />
                  </div>
                  <div className="basis-1/3">
                    <FiltroEvento
                      disableCheckboxes
                      label="Modalidad"
                      showSecciones
                      labelSecciones="Seleccionar"
                      secciones={modalidadesOptions}
                      seccionActiva={section}
                      onChangeSeccion={sectionFilterChange}
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="sticky top-0 fondo-titulos-tabla text-purple-800 font-bold">
                    <tr className="texto-primary-shade">
                      <th className="p-2 text-center">Sede</th>
                      <th className="p-2 text-center">Modalidad</th>
                      <th className="p-2 text-center">Grupos</th>
                      <th className="p-2 text-center">Coordinadora</th>
                      <th className="p-2 text-center">Fechas</th>
                      <th className="p-2 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {paginatedData.map((venue, index) => (
                      <tr key={index} className="border-t border-gray-300">
                        <td className="p-2 text-center">{venue.name}</td>
                        <td className="p-2 text-center">{venue.modality}</td>
                        <td className="p-2 text-center">{venue.groups}</td>
                        <td className="p-2 text-center">{venue.coordinator}</td>
                        <td className="p-2 text-center">{venue.dates}</td>
                        <td className="p-2 flex gap-2 justify-center">
                          <Button
                            label=""
                            variant="success"
                            round
                            showLeftIcon
                            IconLeft={Check}
                            onClick={() => handleVenueSelect(venue)}
                          />
                          <Button label="" variant="primary" round showLeftIcon IconLeft={Eye} />
                          <Button label="" variant="warning" round showLeftIcon IconLeft={Star} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
            </div>

            {/* Section: Preferencias */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
                <span className="mr-2"><SketchLogo /></span> Preferencias
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-4">
                Responde con sinceridad sobre tus preferencias durante la participación del taller.<br />
                Las secciones que contienen un asterisco (*) deben de responderse de manera obligatoria.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Dropdown
                label="Rol Preferido*"
                options={['Instructora', 'Facilitadora', 'Staff']}
                value={formData.preferred_role}
                onChange={(value: string) => handleInputChange('preferred_role', value)}
                variant="primary"
                Icon={withIconDecorator(UserSound)}
              />
              <Dropdown
                label="Idioma Preferido*"
                options={['Español', 'Inglés']}
                value={formData.preferred_language}
                onChange={(value: string) => handleInputChange('preferred_language', value)}
                variant="primary"
                Icon={withIconDecorator(ChatTeardropText)}
              />
              <Dropdown
                label="Dificultad preferida*"
                options={['Básico', 'Intermedio', 'Avanzado']}
                value={formData.preferred_level}
                onChange={(value: string) => handleInputChange('preferred_level', value)}
                variant="primary"
                Icon={withIconDecorator(ChatTeardropText)}
              />
            </div>

            {/* Aviso de Privacidad */}
            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
                <span className="mr-2"><Megaphone /></span> Aviso de Privacidad
              </h2>
              <p className="text-gray-400 text-sm">
                Confirma que he leído, entendido y acepto el Aviso de Privacidad disponible en:<br />
                <a
                  href="https://tec.mx/es/aviso-privacidad-participantes-expositores-panelistas-conferencias-moderadores"
                  className="text-purple-400 hover:underline"
                >
                  https://tec.mx/es/aviso-privacidad-participantes-expositores-panelistas-conferencias-moderadores
                </a>
              </p>
              <div className="mt-2">
                <Checkbox
                  label=""
                  color="purple"
                  checked={privacyAccepted}
                  onChange={setPrivacyAccepted}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <Button
                label="Enviar Registro"
                variant="success"
                showRightIcon
                IconRight={withIconDecorator(Send)}
                className="px-6 py-2 rounded-full flex items-center"
              />
            </div>
          </div>
        </div>
      </form>

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
    </div>
  );
};

export default CollaboratorRegistrationForm;