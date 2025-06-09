'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@components/buttons_inputs/Button';
import Checkbox from '@components/buttons_inputs/Checkbox';
import withIconDecorator from '@/components/decorators/IconDecorator';
import Select from 'react-select';
import { Country, State } from 'country-state-city';
import { Modal, Toast } from '@components/buttons_inputs/FormNotification';
import Send from '@components/icons/ArrowFatRight';
import {
  FlowerLotus,
  FileJpg,
  FilePdf,
  Sparkle,
  UsersFour,
  Bank,
  Files,
  Megaphone,
  X,
  Grains,
  MapPin,
} from '@/components/icons';

interface Coordinator {
  name: string;
  lastNameP: string;
  lastNameM: string;
  email: string;
  phone: string;
}

interface GeneralCoordinator extends Coordinator {
  gender: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface Venue {
  name: string;
  country: string;
  state: string;
  address: string;
}

interface FormData {
  generalCoordinator: GeneralCoordinator;
  associatedCoordinator: Coordinator;
  staffCoordinator: Coordinator;
  participantsCoordinator: Coordinator;
  venue: Venue;
}

const VenueRegistrationForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    generalCoordinator: {
      name: '',
      lastNameP: '',
      lastNameM: '',
      email: '',
      phone: '',
      gender: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    associatedCoordinator: {
      name: '',
      lastNameP: '',
      lastNameM: '',
      email: '',
      phone: '',
    },
    staffCoordinator: {
      name: '',
      lastNameP: '',
      lastNameM: '',
      email: '',
      phone: '',
    },
    participantsCoordinator: {
      name: '',
      lastNameP: '',
      lastNameM: '',
      email: '',
      phone: '',
    },
    venue: {
      name: '',
      country: '',
      state: '',
      address: '',
    },
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [participationFile, setParticipationFile] = useState<File | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessToastOpen, setIsSuccessToastOpen] = useState(false);
  const [apiToken, setApiToken] = useState<string | null>(null);

  // Opcional: obtener token para futuras mejoras
  useMemo(() => {
    if (typeof window !== 'undefined') {
      setApiToken(localStorage.getItem('api_token'));
    }
  }, []);

  // Country and region options from country-state-city
  const countryOptions = useMemo(() => {
    const allowedCountries = ['Mexico', 'Ecuador', 'Costa Rica'];
    return Country.getAllCountries()
      .filter((country) => allowedCountries.includes(country.name))
      .map((country) => ({
        value: country.isoCode,
        label: country.name,
      }));
  }, []);
  const [regionOptions, setRegionOptions] = useState<{ value: string; label: string }[]>([]);

  type GeneralCoordinatorKeys = keyof GeneralCoordinator;
  type CoordinatorKeys = keyof Coordinator;
  type VenueKeys = keyof Venue;
  type Section = keyof FormData;
  type SubSectionMap = {
    generalCoordinator: GeneralCoordinatorKeys;
    associatedCoordinator: CoordinatorKeys;
    staffCoordinator: CoordinatorKeys;
    participantsCoordinator: CoordinatorKeys;
    venue: VenueKeys;
  };

  const handleInputChange = <S extends Section>(
    section: S,
    field: string,
    value: string,
    subSection?: SubSectionMap[S],
  ) => {
    setFormData((prev: FormData) => {
      if (subSection) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [subSection]: {
              ...prev[section][subSection as keyof (typeof prev)[S]],
              [field]: value,
            },
          },
        };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  // Handle country change
  const handleCountryChange = (selectedOption: { value: string; label: string } | null) => {
    const country = selectedOption ? selectedOption.label : '';
    handleInputChange('venue', 'country', country);
    handleInputChange('venue', 'state', ''); // Reset state
    if (selectedOption) {
      const regions = State.getStatesOfCountry(selectedOption.value).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }));
      setRegionOptions(regions);
    } else {
      setRegionOptions([]);
    }
  };

  // Handle region change
  const handleRegionChange = (selectedOption: { value: string; label: string } | null) => {
    const state = selectedOption ? selectedOption.label : '';
    handleInputChange('venue', 'state', state);
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.venue.name) newErrors.push('El nombre de la SEDE es obligatorio');
    if (!formData.venue.country) newErrors.push('El país de la SEDE es obligatorio');
    if (!formData.venue.state) newErrors.push('El estado/provincia de la SEDE es obligatorio');
    if (!formData.venue.address) newErrors.push('La dirección de la SEDE es obligatoria');
    if (!participationFile) newErrors.push('El archivo de participación es obligatorio');

    if (!formData.generalCoordinator.name)
      newErrors.push('El nombre de la Coordinadora de Sede es obligatorio');
    if (!formData.generalCoordinator.lastNameP)
      newErrors.push('El apellido paterno de la Coordinadora de Sede es obligatorio');
    if (!formData.generalCoordinator.email)
      newErrors.push('El correo electrónico de la Coordinadora de Sede es obligatorio');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.generalCoordinator.email))
      newErrors.push('El correo electrónico de la Coordinadora de Sede debe ser válido');
    if (!formData.generalCoordinator.phone)
      newErrors.push('El celular de la Coordinadora de Sede es obligatorio');
    if (!formData.generalCoordinator.gender)
      newErrors.push('El sexo de la Coordinadora de Sede es obligatorio');
    if (!formData.generalCoordinator.username)
      newErrors.push('El nombre de usuario de la Coordinadora de Sede es obligatorio');
    if (!formData.generalCoordinator.password)
      newErrors.push('La contraseña de la Coordinadora de Sede es obligatorio');
    else {
      if (formData.generalCoordinator.password.length < 8)
        newErrors.push('La contraseña debe tener al menos 8 caracteres');
      if (!/[A-Z]/.test(formData.generalCoordinator.password))
        newErrors.push('La contraseña debe contener al menos una mayúscula');
      if (!/[a-z]/.test(formData.generalCoordinator.password))
        newErrors.push('La contraseña debe contener al menos una minúscula');
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.generalCoordinator.password))
        newErrors.push('La contraseña debe contener al menos un carácter especial');
    }
    if (formData.generalCoordinator.password !== formData.generalCoordinator.confirmPassword)
      newErrors.push('Las contraseñas no coinciden');

    if (formData.associatedCoordinator.name) {
      if (!formData.associatedCoordinator.email)
        newErrors.push('El correo electrónico de la coordinadora asociada es obligatorio');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.associatedCoordinator.email))
        newErrors.push('El correo electrónico de la coordinadora asociada debe ser válido');
      if (!formData.associatedCoordinator.phone)
        newErrors.push('El celular de la coordinadora asociada es obligatorio');
    }

    if (formData.staffCoordinator.name) {
      if (!formData.staffCoordinator.email)
        newErrors.push(
          'El correo electrónico de la coordinadora de informes (staff) es obligatorio',
        );
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.staffCoordinator.email))
        newErrors.push(
          'El correo electrónico de la coordinadora de informes (staff) debe ser válido',
        );
      if (!formData.staffCoordinator.phone)
        newErrors.push('El celular de la coordinadora de informes (staff) es obligatorio');
    }

    if (formData.participantsCoordinator.name) {
      if (!formData.participantsCoordinator.email)
        newErrors.push(
          'El correo electrónico de la coordinadora de informes (participantes) es obligatorio',
        );
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.participantsCoordinator.email))
        newErrors.push(
          'El correo electrónico de la coordinadora de informes (participantes) debe ser válido',
        );
      if (!formData.participantsCoordinator.phone)
        newErrors.push('El celular de la coordinadora de informes (participantes) es obligatorio');
    }

    if (!privacyAccepted) newErrors.push('Debes aceptar el aviso de privacidad');

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

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.venue.name);
      formDataToSend.append('country', formData.venue.country);
      formDataToSend.append('state', formData.venue.state);
      formDataToSend.append('address', formData.venue.address);
      formDataToSend.append('generalCoordinator[name]', formData.generalCoordinator.name);
      formDataToSend.append('generalCoordinator[lastNameP]', formData.generalCoordinator.lastNameP);
      formDataToSend.append('generalCoordinator[lastNameM]', formData.generalCoordinator.lastNameM);
      formDataToSend.append('generalCoordinator[email]', formData.generalCoordinator.email);
      formDataToSend.append('generalCoordinator[phone]', formData.generalCoordinator.phone);
      formDataToSend.append('generalCoordinator[gender]', formData.generalCoordinator.gender);
      formDataToSend.append('generalCoordinator[username]', formData.generalCoordinator.username);
      formDataToSend.append('generalCoordinator[password]', formData.generalCoordinator.password);

      if (formData.associatedCoordinator.name) {
        formDataToSend.append('associatedCoordinator[name]', formData.associatedCoordinator.name);
        formDataToSend.append(
          'associatedCoordinator[lastNameP]',
          formData.associatedCoordinator.lastNameP,
        );
        formDataToSend.append(
          'associatedCoordinator[lastNameM]',
          formData.associatedCoordinator.lastNameM,
        );
        formDataToSend.append('associatedCoordinator[email]', formData.associatedCoordinator.email);
        formDataToSend.append('associatedCoordinator[phone]', formData.associatedCoordinator.phone);
      }

      if (formData.staffCoordinator.name) {
        formDataToSend.append('staffCoordinator[name]', formData.staffCoordinator.name);
        formDataToSend.append('staffCoordinator[lastNameP]', formData.staffCoordinator.lastNameP);
        formDataToSend.append('staffCoordinator[lastNameM]', formData.staffCoordinator.lastNameM);
        formDataToSend.append('staffCoordinator[email]', formData.staffCoordinator.email);
        formDataToSend.append('staffCoordinator[phone]', formData.staffCoordinator.phone);
      }

      if (formData.participantsCoordinator.name) {
        formDataToSend.append(
          'participantsCoordinator[name]',
          formData.participantsCoordinator.name,
        );
        formDataToSend.append(
          'participantsCoordinator[lastNameP]',
          formData.participantsCoordinator.lastNameP,
        );
        formDataToSend.append(
          'participantsCoordinator[lastNameM]',
          formData.participantsCoordinator.lastNameM,
        );
        formDataToSend.append(
          'participantsCoordinator[email]',
          formData.participantsCoordinator.email,
        );
        formDataToSend.append(
          'participantsCoordinator[phone]',
          formData.participantsCoordinator.phone,
        );
      }

      if (profileImage) {
        formDataToSend.append('generalCoordinator.profileImage', profileImage);
      }
      if (logo) {
        formDataToSend.append('logo', logo);
      }
      if (participationFile) {
        formDataToSend.append('participation_file', participationFile);
      }

      const response = await fetch('http://localhost:3000/api/venues', {
        method: 'POST',
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
        setErrors([data.message || 'Error al registrar el venue']);
        setIsErrorModalOpen(true);
        throw new Error(data.message || 'Error al registrar el venue');
      }

      let successMessage = data.message;
      if (data.files) {
        successMessage += '<br>Archivos disponibles:';
        if (data.files.participation_file) {
          successMessage += ` <a href="/api/venues/files/${data.files.participation_file}" target="_blank" class="text-purple-400 hover:underline">Convocatoria</a>`;
        }
        if (data.files.logo) {
          successMessage += `, <a href="/api/venues/files/${data.files.logo}" target="_blank" class="text-purple-400 hover:underline">Logo</a>`;
        }
        if (data.files.profile_image) {
          successMessage += `, <a href="/api/venues/files/${data.files.profile_image}" target="_blank" class="text-purple-400 hover:underline">Foto de Perfil</a>`;
        }
      }
      setSuccess(successMessage);
      setIsSuccessToastOpen(true);
      setErrors([]);
      setIsErrorModalOpen(false);

      setFormData({
        generalCoordinator: {
          name: '',
          lastNameP: '',
          lastNameM: '',
          email: '',
          phone: '',
          gender: '',
          username: '',
          password: '',
          confirmPassword: '',
        },
        associatedCoordinator: {
          name: '',
          lastNameP: '',
          lastNameM: '',
          email: '',
          phone: '',
        },
        staffCoordinator: {
          name: '',
          lastNameP: '',
          lastNameM: '',
          email: '',
          phone: '',
        },
        participantsCoordinator: {
          name: '',
          lastNameP: '',
          lastNameM: '',
          email: '',
          phone: '',
        },
        venue: {
          name: '',
          country: '',
          state: '',
          address: '',
        },
      });
      setProfileImage(null);
      setLogo(null);
      setParticipationFile(null);
      setPrivacyAccepted(false);
    } catch (err: any) {
      setErrors([err.message]);
      setIsErrorModalOpen(true);
      setSuccess(null);
      setIsSuccessToastOpen(false);
    }
  };

  // Custom styles for react-select to match Dropdown
  const selectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: '#1a1a2e', // match dark bg
      borderColor: state.isFocused ? '#a259e6' : '#4a4a6a',
      borderRadius: '0.5rem',
      minHeight: '2.5rem',
      boxShadow: state.isFocused ? '0 0 0 2px #a259e6' : 'none',
      color: '#ebe6eb',
      '&:hover': { borderColor: '#a259e6' },
      fontSize: '1rem',
    }),
    option: (provided: any, state: { isSelected: boolean; isFocused: boolean }) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a259e6' : state.isFocused ? '#2d2d44' : '#1a1a2e',
      color: state.isSelected ? '#fff' : '#ebe6eb',
      fontSize: '1rem',
      cursor: 'pointer',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#ebe6eb',
      fontWeight: 500,
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#1a1a2e',
      borderRadius: '0.5rem',
      zIndex: 1000,
      color: '#ebe6eb',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#a3a3c2',
      fontStyle: 'italic',
    }),
    input: (provided: any) => ({
      ...provided,
      color: '#ebe6eb',
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? '#a259e6' : '#ebe6eb',
      '&:hover': { color: '#a259e6' },
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: '#4a4a6a',
    }),
    menuList: (provided: any) => ({
      ...provided,
      backgroundColor: '#1a1a2e',
      borderRadius: '0.5rem',
      color: '#ebe6eb',
    }),
  };

  return (
    <div className='pagina-formulario flex flex-col min-h-screen text-white'>
      <div className='pagina-formulario flex flex-col min-h-screen bg-gray-900 text-white'>
        <form onSubmit={handleSubmit}>
          <div className='info-formulario min-h-screen text-white p-4 md:p-8 flex justify-center items-center'>
            <div className='w-full max-w-6xl rounded-lg shadow-lg p-6 md:p-8'>
              {/* Header */}
              <div className='flex justify-between items-center mb-6'>
                <div className='flex items-center'>
                  <div className='w-2 rounded-full h-16 mr-4 bg-[#683756]'></div>
                  <h1 className='text-2xl'>
                    <span className='italic'>Formulario de Registro</span>
                    <br />
                    <span className='font-bold text-3xl'>Sede</span>
                  </h1>
                </div>
                <Button
                  label='Regresar'
                  variant='error'
                  showLeftIcon
                  type='button'
                  IconLeft={X}
                  href='/'
                  className='px-4 py-2 rounded-full flex items-center'
                />
              </div>
              {/* Section: Datos Coordinadora de Sede */}
              <div className='mb-6'>
                <h2 className='text-xl md:text-2xl font-semibold flex items-center mb-2'>
                  <span className='mr-2'>
                    <FlowerLotus
                      width='1.5rem'
                      height='1.5rem'
                      fillColor='#ebe6eb'
                      strokeWidth={0}
                    />
                  </span>{' '}
                  Datos Coordinadora de Sede
                </h2>
                <p className='text-gray-400 text-sm md:text-base mb-4'>
                  Responde con veracidad las siguientes preguntas acerca de tus datos personales y
                  de contacto.
                  <br />
                  Las secciones que contengan un asterisco (*) deberán responderse de manera
                  obligatoria.
                </p>
              </div>

              {/* Form Fields: Datos Coordinadora de Sede */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <InputField
                  label='Nombre(s)*'
                  placeholder='Nombre(s)'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.generalCoordinator.name}
                  onChangeText={(value: string) =>
                    handleInputChange('generalCoordinator', 'name', value)
                  }
                />
                <InputField
                  label='Apellido Paterno*'
                  placeholder='Apellido Paterno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.generalCoordinator.lastNameP}
                  onChangeText={(value: string) =>
                    handleInputChange('generalCoordinator', 'lastNameP', value)
                  }
                />
                <InputField
                  label='Apellido Materno'
                  placeholder='Apellido Materno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.generalCoordinator.lastNameM}
                  onChangeText={(value: string) =>
                    handleInputChange('generalCoordinator', 'lastNameM', value)
                  }
                />
                <InputField
                  label='Correo Electrónico*'
                  placeholder='correo1@ejemplo.com'
                  variant='accent'
                  icon='At'
                  value={formData.generalCoordinator.email}
                  onChangeText={(value: string) =>
                    handleInputChange('generalCoordinator', 'email', value)
                  }
                />
                <InputField
                  label='Celular*'
                  placeholder='+522221234567'
                  variant='accent'
                  icon='Phone'
                  value={formData.generalCoordinator.phone}
                  onChangeText={(value: string) =>
                    handleInputChange('generalCoordinator', 'phone', value)
                  }
                />
                <Dropdown
                  label='Sexo*'
                  options={['Femenino', 'Masculino', 'No binario', 'Prefiero no decir']}
                  value={formData.generalCoordinator.gender}
                  onChange={(value: string) =>
                    handleInputChange('generalCoordinator', 'gender', value)
                  }
                  variant='accent'
                  Icon={withIconDecorator(Grains)}
                />
                <InputField
                  label='Nombre de Usuario*'
                  description='El nombre de usuario solo puede contener letras, números y guiones bajos.'
                  placeholder='Us3r_n4me'
                  variant='secondary'
                  icon='UserPlus'
                  value={formData.generalCoordinator.username}
                  onChangeText={(value: string) =>
                    handleInputChange('generalCoordinator', 'username', value)
                  }
                />
                <div>
                  <InputField
                    label='Contraseña*'
                    description='Debe tener un mínimo de 8 caracteres, contener una mayúscula, una minúscula y un carácter especial.'
                    placeholder='********'
                    variant='secondary'
                    icon='Lock'
                    value={formData.generalCoordinator.password}
                    type={showPassword ? 'text' : 'password'}
                    onChangeText={(value: string) =>
                      handleInputChange('generalCoordinator', 'password', value)
                    }
                  />
                  <div className='flex items-center mt-2'>
                    <Checkbox
                      label='Mostrar Contraseña'
                      checked={showPassword}
                      onChange={setShowPassword}
                    />
                  </div>
                </div>
                <div>
                  <InputField
                    label='Confirmar Contraseña*'
                    description='Confirma de manera correcta e identica la contraseña previamente registrada.'
                    placeholder='********'
                    variant='secondary'
                    icon='Lock'
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.generalCoordinator.confirmPassword}
                    onChangeText={(value: string) =>
                      handleInputChange('generalCoordinator', 'confirmPassword', value)
                    }
                  />
                  <div className='flex items-center mt-2'>
                    <Checkbox
                      label='Mostrar Contraseña'
                      checked={showConfirmPassword}
                      onChange={setShowConfirmPassword}
                    />
                  </div>
                </div>
              </div>

              {/* Sube tu foto de perfil */}
              <div className='mt-6 p-4 bg-white text-black rounded-lg tarjeta-archivo-amarilla'>
                <div className='flex items-center titulo-tarjeta-archivo-amarilla'>
                  <span className='text-purple-600 text-2xl mr-2 icono-tarjeta-archivo-amarilla'>
                    <FileJpg width='2rem' height='2rem' fillColor='#ebe6eb' strokeWidth={0} />
                  </span>
                  <h3 className='text-lg font-semibold'>Sube tu foto de perfil</h3>
                </div>
                <p className='text-sm my-6'>
                  Selecciona una foto de perfil con la cual las personas sean capaces de reconocerte
                  dentro del sistema. No es obligatorio subir una imagen, sin embargo lo
                  recomendamos.
                </p>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleFileChange(e, setProfileImage)}
                  className='mt-4'
                />
                {profileImage && (
                  <p className='mt-2 text-xs text-gray-600'>
                    Archivo seleccionado: {profileImage.name}
                  </p>
                )}
              </div>

              {/* Section: Datos Coordinadora Asociada */}
              <div className='mt-8'>
                <h2 className='text-xl md:text-2xl font-semibold flex items-center mb-2'>
                  <span className='mr-2'>
                    <Sparkle width='1.5rem' height='1.5rem' fillColor='#ebe6eb' strokeWidth={0} />
                  </span>{' '}
                  Datos Coordinadora Asociada
                </h2>
                <p className='text-gray-400 text-sm md:text-base mb-4'>
                  Responde con veracidad las siguientes preguntas acerca de los datos de contacto de
                  tu equipo de trabajo.
                  <br />
                  Las secciones que contengan un asterisco (*) deberán responderse de manera
                  obligatoria.
                </p>
                <p className='text-gray-400 text-sm italic'>
                  Si no se registra una coordinadora asociada, la coordinadora de sede asumirá los
                  roles faltantes automáticamente.
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                <InputField
                  label='Nombre(s)*'
                  placeholder='Nombre(s)'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.associatedCoordinator.name}
                  onChangeText={(value: string) =>
                    handleInputChange('associatedCoordinator', 'name', value)
                  }
                />
                <InputField
                  label='Apellido Paterno*'
                  placeholder='Apellido Paterno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.associatedCoordinator.lastNameP}
                  onChangeText={(value: string) =>
                    handleInputChange('associatedCoordinator', 'lastNameP', value)
                  }
                />
                <InputField
                  label='Apellido Materno'
                  placeholder='Apellido Materno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.associatedCoordinator.lastNameM}
                  onChangeText={(value: string) =>
                    handleInputChange('associatedCoordinator', 'lastNameM', value)
                  }
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <InputField
                  label='Correo Electrónico*'
                  placeholder='correo1@ejemplo.com'
                  variant='accent'
                  icon='At'
                  value={formData.associatedCoordinator.email}
                  onChangeText={(value: string) =>
                    handleInputChange('associatedCoordinator', 'email', value)
                  }
                />
                <InputField
                  label='Celular*'
                  placeholder='+522221234567'
                  variant='accent'
                  icon='Phone'
                  value={formData.associatedCoordinator.phone}
                  onChangeText={(value: string) =>
                    handleInputChange('associatedCoordinator', 'phone', value)
                  }
                />
              </div>

              {/* Section: Datos Coordinadora de Informes (Staff) */}
              <div className='mt-8'>
                <h2 className='text-xl md:text-2xl font-semibold flex items-center mb-2'>
                  <span className='mr-2'>
                    <UsersFour width='1.5rem' height='1.5rem' fillColor='#ebe6eb' strokeWidth={0} />
                  </span>{' '}
                  Datos Coordinadora de Informes (Staff)
                </h2>
                <p className='text-gray-400 text-sm md:text-base mb-4'>
                  Responde con sinceridad las siguientes preguntas acerca de los datos de contacto
                  de tu equipo de trabajo.
                  <br />
                  Las secciones que contengan un asterisco (*) deberán responderse de manera
                  obligatoria.
                </p>
                <p className='text-gray-400 text-sm italic'>
                  Si no se registra una coordinadora de informes, la coordinadora de sede asumirá
                  los roles faltantes automáticamente.
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <InputField
                  label='Nombre(s)*'
                  placeholder='Nombre(s)'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.staffCoordinator.name}
                  onChangeText={(value: string) =>
                    handleInputChange('staffCoordinator', 'name', value)
                  }
                />
                <InputField
                  label='Apellido Paterno*'
                  placeholder='Apellido Paterno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.staffCoordinator.lastNameP}
                  onChangeText={(value: string) =>
                    handleInputChange('staffCoordinator', 'lastNameP', value)
                  }
                />
                <InputField
                  label='Apellido Materno'
                  placeholder='Apellido Materno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.staffCoordinator.lastNameM}
                  onChangeText={(value: string) =>
                    handleInputChange('staffCoordinator', 'lastNameM', value)
                  }
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <InputField
                  label='Correo Electrónico*'
                  placeholder='correo1@ejemplo.com'
                  variant='accent'
                  icon='At'
                  value={formData.staffCoordinator.email}
                  onChangeText={(value: string) =>
                    handleInputChange('staffCoordinator', 'email', value)
                  }
                />
                <InputField
                  label='Celular*'
                  placeholder='+522221234567'
                  variant='accent'
                  icon='Phone'
                  value={formData.staffCoordinator.phone}
                  onChangeText={(value: string) =>
                    handleInputChange('staffCoordinator', 'phone', value)
                  }
                />
              </div>

              {/* Section: Datos Coordinadora de Informes (Participantes) */}
              <div className='mt-8'>
                <h2 className='text-xl md:text-2xl font-semibold flex items-center mb-2'>
                  <span className='mr-2'>
                    <UsersFour width='1.5rem' height='1.5rem' fillColor='#ebe6eb' strokeWidth={0} />
                  </span>{' '}
                  Datos Coordinadora de Informes (Participantes)
                </h2>
                <p className='text-gray-400 text-sm md:text-base mb-4'>
                  Responde con sinceridad las siguientes preguntas acerca de los datos de contacto
                  de tu equipo de trabajo.
                  <br />
                  Las secciones que contengan un asterisco (*) deberán responderse de manera
                  obligatoria.
                </p>
                <p className='text-gray-400 text-sm italic'>
                  Si no se registra una coordinadora de informe, la coordinadora de sede asumirá los
                  roles faltantes automáticamente.
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <InputField
                  label='Nombre(s)*'
                  placeholder='Nombre(s)'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.participantsCoordinator.name}
                  onChangeText={(value: string) =>
                    handleInputChange('participantsCoordinator', 'name', value)
                  }
                />
                <InputField
                  label='Apellido Paterno*'
                  placeholder='Apellido Paterno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.participantsCoordinator.lastNameP}
                  onChangeText={(value: string) =>
                    handleInputChange('participantsCoordinator', 'lastNameP', value)
                  }
                />
                <InputField
                  label='Apellido Materno'
                  placeholder='Apellido Materno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.participantsCoordinator.lastNameM}
                  onChangeText={(value: string) =>
                    handleInputChange('participantsCoordinator', 'lastNameM', value)
                  }
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <InputField
                  label='Correo Electrónico*'
                  placeholder='correo1@ejemplo.com'
                  variant='accent'
                  icon='At'
                  value={formData.participantsCoordinator.email}
                  onChangeText={(value: string) =>
                    handleInputChange('participantsCoordinator', 'email', value)
                  }
                />
                <InputField
                  label='Celular*'
                  placeholder='+522221234567'
                  variant='accent'
                  icon='Phone'
                  value={formData.participantsCoordinator.phone}
                  onChangeText={(value: string) =>
                    handleInputChange('participantsCoordinator', 'phone', value)
                  }
                />
              </div>

              {/* Section: Datos SEDE */}
              <div className='mt-8'>
                <h2 className='text-xl md:text-2xl font-semibold flex items-center mb-2'>
                  <span className='mr-2'>
                    <Bank width='1.5rem' height='1.5rem' fillColor='#ebe6eb' strokeWidth={0} />
                  </span>{' '}
                  Datos SEDE
                </h2>
                <p className='text-gray-400 text-sm md:text-base mb-4'>
                  Responde con sinceridad las siguientes preguntas acerca de los datos de tu SEDE.
                  <br />
                  Las secciones que contengan un asterisco (*) deberán responderse de manera
                  obligatoria.
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <InputField
                  label='Nombre de la SEDE*'
                  placeholder='ITESM Puebla'
                  variant='primary'
                  icon='GraduationCap'
                  value={formData.venue.name}
                  onChangeText={(value: string) => handleInputChange('venue', 'name', value)}
                />
                <div>
                  <label className='block text-sm font-medium text-gray-400 mb-1'>País*</label>
                  <Select
                    options={countryOptions}
                    value={
                      countryOptions.find((option) => option.label === formData.venue.country) ||
                      null
                    }
                    onChange={handleCountryChange}
                    placeholder='Selecciona un país'
                    styles={selectStyles}
                    isClearable
                    components={{
                      DropdownIndicator: () => (
                        <MapPin
                          width='1.5rem'
                          height='1.5rem'
                          fillColor='#ebe6eb'
                          strokeWidth={0}
                        />
                      ),
                    }}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-400 mb-1'>
                    Estado/Provincia*
                  </label>
                  <Select
                    options={regionOptions}
                    value={
                      regionOptions.find((option) => option.label === formData.venue.state) || null
                    }
                    onChange={handleRegionChange}
                    placeholder='Selecciona un estado/provincia'
                    styles={selectStyles}
                    isClearable
                    isDisabled={!formData.venue.country}
                    components={{
                      DropdownIndicator: () => (
                        <MapPin
                          width='1.5rem'
                          height='1.5rem'
                          fillColor='#ebe6eb'
                          strokeWidth={0}
                        />
                      ),
                    }}
                  />
                </div>
                <InputField
                  label='Dirección*'
                  placeholder='Dirección 123'
                  variant='accent'
                  icon='Flag'
                  value={formData.venue.address}
                  onChangeText={(value: string) => handleInputChange('venue', 'address', value)}
                />
              </div>

              {/* Sube tu logo */}
              <div className='mt-6 p-4 bg-white text-black rounded-lg tarjeta-archivo'>
                <div className='flex items-center titulo-tarjeta-archivo'>
                  <span className='text-2xl mr-2 icono-tarjeta-archivo'>
                    <FileJpg width='2rem' height='2rem' fillColor='#ebe6eb' strokeWidth={0} />
                  </span>
                  <h3 className='text-lg font-semibold'>Sube tu logo</h3>
                </div>
                <p className='text-sm my-6'>
                  Selecciona una imagen que represente a tu SEDE, la cual se presentará a los
                  usuarios para su fácil reconocimiento. No es obligatorio subir una imagen, sin
                  embargo lo recomendamos.
                </p>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleFileChange(e, setLogo)}
                  className='mt-4'
                />
                {logo && (
                  <p className='mt-2 text-xs text-gray-600'>Archivo seleccionado: {logo.name}</p>
                )}
              </div>

              {/* Convocatoria SEDE */}
              <div className='mt-8'>
                <h2 className='text-xl md:text-2xl font-semibold flex items-center mb-2'>
                  <span className='mr-2'>
                    <Files width='1.5rem' height='1.5rem' fillColor='#ebe6eb' strokeWidth={0} />
                  </span>{' '}
                  Convocatoria SEDE
                </h2>
                <p className='text-gray-400 text-sm md:text-base mb-4'>
                  Dentro de esta sección tendrás que subir tu permiso de participación, la cual
                  deberá de estar firmado por un representante legal de la institución participante.
                  <br />
                  Esta sección es obligatoria.
                </p>
              </div>

              {/* Download Section */}
              <div className='mb-6 flex items-center gap-4'>
                <p className='text-lg text-gray-400'>Descarga la convocatoria para sedes:</p>
                <a
                  href='/ConvocatoriaSEDES-PH2025.pdf'
                  download='ConvocatoriaSEDES-PH2025.pdf'
                  className='inline-flex items-center px-4 py-2 bg-[#97639c] text-white rounded hover:bg-[#6e2d75] ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500'
                  role='button'
                  aria-label='Descargar Convocatoria'
                >
                  Descargar Convocatoria
                </a>
              </div>

              <div className='mt-6 p-4 bg-white text-black rounded-lg tarjeta-archivo'>
                <div className='flex items-center titulo-tarjeta-archivo'>
                  <span className='text-2xl mr-2 icono-tarjeta-archivo'>
                    <FilePdf width='2rem' height='2rem' fillColor='#ebe6eb' strokeWidth={0} />
                  </span>
                  <h3 className='text-lg font-semibold'>Sube tu convocatoria</h3>
                </div>
                <p className='text-gray-600 text-sm my-6'>
                  Selecciona un documento para subir. Ten cuidado al subir tus documentos y verifica
                  dos veces que se suba correctamente.
                </p>
                <input
                  type='file'
                  accept='.pdf'
                  onChange={(e) => handleFileChange(e, setParticipationFile)}
                  className='mt-4'
                />
                {participationFile && (
                  <p className='mt-2 text-xs'>Archivo seleccionado: {participationFile.name}</p>
                )}
              </div>

              {/* Aviso de Privacidad */}
              <div className='mt-8'>
                <h2 className='text-xl md:text-2xl font-semibold flex items-center mb-2'>
                  <span className='mr-2'>
                    <Megaphone width='1.5rem' height='1.5rem' fillColor='#ebe6eb' strokeWidth={0} />
                  </span>{' '}
                  Aviso de Privacidad
                </h2>
                <p className='text-gray-400 text-sm'>
                  Confirma que he leído, entendido y acepto el Aviso de Privacidad disponible en:
                  <br />
                  <a
                    href='https://tec.mx/es/aviso-privacidad-participantes-expositores-panelistas-conferencias-moderadores'
                    className='text-purple-400 hover:underline'
                  >
                    https://tec.mx/es/aviso-privacidad-participantes-expositores-panelistas-conferencias-moderadores
                  </a>
                </p>
                <div className='mt-2'>
                  <Checkbox label='' checked={privacyAccepted} onChange={setPrivacyAccepted} />
                </div>
              </div>

              {/* Submit Button */}
              <div className='mt-6 flex justify-end'>
                <Button
                  label='Enviar Registro'
                  variant='success'
                  showRightIcon
                  type='submit'
                  IconRight={withIconDecorator(Send)}
                  className='px-6 py-2 rounded-full flex items-center text-white'
                />
              </div>
            </div>
          </div>
        </form>

        <Modal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          title='Errores en el formulario'
          messages={errors}
        />

        <Toast
          isOpen={isSuccessToastOpen}
          onClose={() => setIsSuccessToastOpen(false)}
          message={success || ''}
        />
      </div>
    </div>
  );
};

export default VenueRegistrationForm;
