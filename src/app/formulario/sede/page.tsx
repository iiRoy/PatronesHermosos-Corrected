'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import InputField from '@components/buttons_inputs/InputField';
import Dropdown   from '@components/buttons_inputs/Dropdown';
import Button     from '@components/buttons_inputs/Button';
import Checkbox   from '@components/buttons_inputs/Checkbox';
import { Modal, Toast } from '@components/buttons_inputs/FormNotification';
import Select     from 'react-select';
import { Country, State } from 'country-state-city';
import withIconDecorator from '@/components/decorators/IconDecorator';
import Send       from '@/components/icons/ArrowFatRight';
import CollapsibleSection from '@/components/buttons_inputs/CollapsibleSection';

import FlowerLotus from '@/components/icons/FlowerLotus';
import Sparkle     from '@/components/icons/Sparkle';
import UsersFour   from '@/components/icons/UsersFour';
import Bank        from '@/components/icons/Bank';
import Files       from '@/components/icons/Files';
import Megaphone   from '@/components/icons/Megaphone';
import FileJpg     from '@/components/icons/FileJpg';
import FilePdf     from '@/components/icons/FilePdf';
import MapPin      from '@/components/icons/MapPin';
import X           from '@/components/icons/X';
import Grains      from '@/components/icons/Grains';

interface Coordinator {
  name: string;
  lastNameP: string;
  lastNameM: string;
  email: string;
  phone: string;
}

interface venueCoordinator extends Coordinator {
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
  venueCoordinator: venueCoordinator;
  associatedCoordinator: Coordinator;
  staffCoordinator: Coordinator;
  participantsCoordinator: Coordinator;
  venue: Venue;
}

const VenueRegistrationForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    venueCoordinator: {
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

  type venueCoordinatorKeys = keyof venueCoordinator;
  type CoordinatorKeys = keyof Coordinator;
  type VenueKeys = keyof Venue;
  type Section = keyof FormData;
  type SubSectionMap = {
    venueCoordinator: venueCoordinatorKeys;
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

    if (!formData.venueCoordinator.name)
      newErrors.push('El nombre de la Coordinadora de Sede es obligatorio');
    if (!formData.venueCoordinator.lastNameP)
      newErrors.push('El apellido paterno de la Coordinadora de Sede es obligatorio');
    if (!formData.venueCoordinator.email)
      newErrors.push('El correo electrónico de la Coordinadora de Sede es obligatorio');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.venueCoordinator.email))
      newErrors.push('El correo electrónico de la Coordinadora de Sede debe ser válido');
    if (!formData.venueCoordinator.phone)
      newErrors.push('El celular de la Coordinadora de Sede es obligatorio');
    if (!formData.venueCoordinator.gender)
      newErrors.push('El sexo de la Coordinadora de Sede es obligatorio');
    if (!formData.venueCoordinator.username)
      newErrors.push('El nombre de usuario de la Coordinadora de Sede es obligatorio');
    if (!formData.venueCoordinator.password)
      newErrors.push('La contraseña de la Coordinadora de Sede es obligatorio');
    else {
      if (formData.venueCoordinator.password.length < 8)
        newErrors.push('La contraseña debe tener al menos 8 caracteres');
      if (!/[A-Z]/.test(formData.venueCoordinator.password))
        newErrors.push('La contraseña debe contener al menos una mayúscula');
      if (!/[a-z]/.test(formData.venueCoordinator.password))
        newErrors.push('La contraseña debe contener al menos una minúscula');
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.venueCoordinator.password))
        newErrors.push('La contraseña debe contener al menos un carácter especial');
    }
    if (formData.venueCoordinator.password !== formData.venueCoordinator.confirmPassword)
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
      formDataToSend.append('venueCoordinator[name]', formData.venueCoordinator.name);
      formDataToSend.append('venueCoordinator[lastNameP]', formData.venueCoordinator.lastNameP);
      formDataToSend.append('venueCoordinator[lastNameM]', formData.venueCoordinator.lastNameM);
      formDataToSend.append('venueCoordinator[email]', formData.venueCoordinator.email);
      formDataToSend.append('venueCoordinator[phone]', formData.venueCoordinator.phone);
      formDataToSend.append('venueCoordinator[gender]', formData.venueCoordinator.gender);
      formDataToSend.append('venueCoordinator[username]', formData.venueCoordinator.username);
      formDataToSend.append('venueCoordinator[password]', formData.venueCoordinator.password);

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
        formDataToSend.append('venueCoordinator.profileImage', profileImage);
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
        venueCoordinator: {
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
    <div className="pagina-formulario flex flex-col min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit}>
        <div className="info-formulario p-4 md:p-8 flex justify-center">
          <div className="w-full max-w-6xl rounded-lg shadow-lg bg-back p-6 md:p-8">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-1 bg-purple-500 h-12 rounded-full" />
                <div>
                  <p className="italic text-gray-300">Formulario de Registro</p>
                  <h1 className="text-3xl font-bold">Colaborador</h1>
                </div>
              </div>
              <Button
                label="Regresar"
                variant="error"
                showLeftIcon
                IconLeft={X}
                onClick={() => router.back()}
              />
            </div>
            
            {/* Secciones colapsables */}
<CollapsibleSection
  title="Datos Personales"
  Icon={FlowerLotus}
  isCompleted={
    Boolean(formData.venueCoordinator.name) &&
    Boolean(formData.venueCoordinator.lastNameP) &&
    Boolean(formData.venueCoordinator.email) &&
    Boolean(formData.venueCoordinator.phone) &&
    Boolean(formData.venueCoordinator.username) &&
    Boolean(formData.venueCoordinator.password) &&
    formData.venueCoordinator.password === formData.venueCoordinator.confirmPassword
  }
>
  {/* Descripción */}
  <p className="text-gray-600 text-sm mb-4">
    Responde con veracidad las siguientes preguntas acerca de tus datos personales y de contacto.
    <br />
    Las secciones con * son obligatorias.
  </p>

  {/* Campos en grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <InputField
      label="Nombre(s)*"
      placeholder="Nombre(s)"
      variant="primary"
      icon="Fingerprint"
      value={formData.venueCoordinator.name}
      onChangeText={(v: string) =>
        handleInputChange('venueCoordinator', 'name', v)
      }
    />

    <InputField
      label="Apellido Paterno*"
      placeholder="Apellido Paterno"
      variant="primary"
      icon="Fingerprint"
      value={formData.venueCoordinator.lastNameP}
      onChangeText={(v: string) =>
        handleInputChange('venueCoordinator', 'lastNameP', v)
      }
    />

    <InputField
      label="Apellido Materno"
      placeholder="Apellido Materno"
      variant="primary"
      icon="Fingerprint"
      value={formData.venueCoordinator.lastNameM}
      onChangeText={(v: string) =>
        handleInputChange('venueCoordinator', 'lastNameM', v)
      }
    />

    <InputField
      label="Correo Electrónico*"
      placeholder="correo1@ejemplo.com"
      variant="accent"
      icon="At"
      value={formData.venueCoordinator.email}
      onChangeText={(v: string) =>
        handleInputChange('venueCoordinator', 'email', v)
      }
    />

    <InputField
      label="Celular*"
      placeholder="+522221234567"
      variant="accent"
      icon="Phone"
      value={formData.venueCoordinator.phone}
      onChangeText={(v: string) =>
        handleInputChange('venueCoordinator', 'phone', v)
      }
    />

    <InputField
      label="Nombre de Usuario*"
      description="Sólo letras, números y guiones bajos."
      placeholder="Us3r_n4me"
      variant="secondary"
      icon="UserPlus"
      value={formData.venueCoordinator.username}
      onChangeText={(v: string) =>
        handleInputChange('venueCoordinator', 'username', v)
      }
    />

                    <Dropdown
                  label='Género*'
                  options={['Femenino', 'No binario', 'Prefiero no decir']}
                  value={formData.venueCoordinator.gender}
                  onChange={(value: string) =>
                    handleInputChange('venueCoordinator', 'gender', value)
                  }
                  variant='accent'
                  Icon={withIconDecorator(Grains)}
                />

    <InputField
      label="Contraseña*"
      description="Mín. 8 caracteres, 1 mayúscula, 1 minúscula y 1 carácter especial."
      placeholder="********"
      variant="secondary"
      icon="Lock"
      type={showPassword ? 'text' : 'password'}
      value={formData.venueCoordinator.password}
      onChangeText={(v: string) =>
        handleInputChange('venueCoordinator', 'password', v)
      }
    />

    <InputField
      label="Confirmar Contraseña*"
      description="Debe coincidir con la contraseña anterior."
      placeholder="********"
      variant="secondary"
      icon="Lock"
      type={showConfirmPassword ? 'text' : 'password'}
      value={formData.venueCoordinator.confirmPassword}
      onChangeText={(v: string) =>
        handleInputChange('venueCoordinator', 'confirmPassword', v)
      }
    />
  </div>

  {/* Upload de foto */}
  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
    <h4 className="text-base font-semibold mb-2">Sube tu foto de perfil</h4>
    <p className="text-gray-600 text-sm mb-4">
      Selecciona una imagen para que te reconozcan en el sistema. No es obligatoria pero sí recomendada.
    </p>
    <input
      type="file"
      accept="image/*"
      onChange={e => handleFileChange(e, setProfileImage)}
      className="block"
    />
    {profileImage && (
      <p className="mt-2 text-xs text-gray-500">
        Archivo: {profileImage.name}
      </p>
    )}
  </div>
</CollapsibleSection>
            
<CollapsibleSection
  title="Datos Coordinadora Asociada"
  Icon={Sparkle}
  isCompleted={
    Boolean(formData.associatedCoordinator.name) &&
    Boolean(formData.associatedCoordinator.lastNameP) &&
    Boolean(formData.associatedCoordinator.email) &&
    Boolean(formData.associatedCoordinator.phone)
  }
>
  {/* Descripción */}
  <p className="text-gray-600 text-sm mb-4">
    Si no se registra una coordinadora asociada, la coordinadora de sede asumirá los roles faltantes automáticamente.
  </p>

  {/* Campos en grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <InputField
      label="Nombre(s)*"
      placeholder="Nombre(s)"
      variant="primary"
      icon="Fingerprint"
      value={formData.associatedCoordinator.name}
      onChangeText={(v: string) =>
        handleInputChange('associatedCoordinator', 'name', v)
      }
    />

    <InputField
      label="Apellido Paterno*"
      placeholder="Apellido Paterno"
      variant="primary"
      icon="Fingerprint"
      value={formData.associatedCoordinator.lastNameP}
      onChangeText={(v: string) =>
        handleInputChange('associatedCoordinator', 'lastNameP', v)
      }
    />

    <InputField
      label="Apellido Materno"
      placeholder="Apellido Materno"
      variant="primary"
      icon="Fingerprint"
      value={formData.associatedCoordinator.lastNameM}
      onChangeText={(v: string) =>
        handleInputChange('associatedCoordinator', 'lastNameM', v)
      }
    />

    <InputField
      label="Correo Electrónico*"
      placeholder="correo1@ejemplo.com"
      variant="accent"
      icon="At"
      value={formData.associatedCoordinator.email}
      onChangeText={(v: string) =>
        handleInputChange('associatedCoordinator', 'email', v)
      }
    />

    <InputField
      label="Celular*"
      placeholder="+522221234567"
      variant="accent"
      icon="Phone"
      value={formData.associatedCoordinator.phone}
      onChangeText={(v: string) =>
        handleInputChange('associatedCoordinator', 'phone', v)
      }
    />
  </div>
</CollapsibleSection>

            
<CollapsibleSection
  title="Datos Coordinadora de Informes (Staff)"
  Icon={UsersFour}
  isCompleted={
    Boolean(formData.staffCoordinator.name) &&
    Boolean(formData.staffCoordinator.lastNameP) &&
    Boolean(formData.staffCoordinator.email) &&
    Boolean(formData.staffCoordinator.phone)
  }
>
  {/* Descripción */}
  <p className="text-gray-600 text-sm mb-4">
    Si no se registra una coordinadora de informe, la coordinadora de sede asumirá los roles faltantes automáticamente.
  </p>

  {/* Campos en grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <InputField
      label="Nombre(s)*"
      placeholder="Nombre(s)"
      variant="primary"
      icon="Fingerprint"
      value={formData.staffCoordinator.name}
      onChangeText={(v: string) =>
        handleInputChange('staffCoordinator', 'name', v)
      }
    />

    <InputField
      label="Apellido Paterno*"
      placeholder="Apellido Paterno"
      variant="primary"
      icon="Fingerprint"
      value={formData.staffCoordinator.lastNameP}
      onChangeText={(v: string) =>
        handleInputChange('staffCoordinator', 'lastNameP', v)
      }
    />

    <InputField
      label="Apellido Materno"
      placeholder="Apellido Materno"
      variant="primary"
      icon="Fingerprint"
      value={formData.staffCoordinator.lastNameM}
      onChangeText={(v: string) =>
        handleInputChange('staffCoordinator', 'lastNameM', v)
      }
    />

    <InputField
      label="Correo Electrónico*"
      placeholder="correo1@ejemplo.com"
      variant="accent"
      icon="At"
      value={formData.staffCoordinator.email}
      onChangeText={(v: string) =>
        handleInputChange('staffCoordinator', 'email', v)
      }
    />

    <InputField
      label="Celular*"
      placeholder="+522221234567"
      variant="accent"
      icon="Phone"
      value={formData.staffCoordinator.phone}
      onChangeText={(v: string) =>
        handleInputChange('staffCoordinator', 'phone', v)
      }
    />
  </div>
</CollapsibleSection>

            
<CollapsibleSection
  title="Datos Coordinadora de Informes (Participantes)"
  Icon={UsersFour}
  isCompleted={
    Boolean(formData.participantsCoordinator.name) &&
    Boolean(formData.participantsCoordinator.lastNameP) &&
    Boolean(formData.participantsCoordinator.email) &&
    Boolean(formData.participantsCoordinator.phone)
  }
>
  {/* Descripción */}
  <p className="text-gray-600 text-sm mb-4">
    Si no se registra una coordinadora de informe, la coordinadora de sede asumirá los roles faltantes automáticamente.
  </p>

  {/* Campos en grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <InputField
      label="Nombre(s)*"
      placeholder="Nombre(s)"
      variant="primary"
      icon="Fingerprint"
      value={formData.participantsCoordinator.name}
      onChangeText={(v: string) =>
        handleInputChange('participantsCoordinator', 'name', v)
      }
    />

    <InputField
      label="Apellido Paterno*"
      placeholder="Apellido Paterno"
      variant="primary"
      icon="Fingerprint"
      value={formData.participantsCoordinator.lastNameP}
      onChangeText={(v: string) =>
        handleInputChange('participantsCoordinator', 'lastNameP', v)
      }
    />

    <InputField
      label="Apellido Materno"
      placeholder="Apellido Materno"
      variant="primary"
      icon="Fingerprint"
      value={formData.participantsCoordinator.lastNameM}
      onChangeText={(v: string) =>
        handleInputChange('participantsCoordinator', 'lastNameM', v)
      }
    />

    <InputField
      label="Correo Electrónico*"
      placeholder="correo1@ejemplo.com"
      variant="accent"
      icon="At"
      value={formData.participantsCoordinator.email}
      onChangeText={(v: string) =>
        handleInputChange('participantsCoordinator', 'email', v)
      }
    />

    <InputField
      label="Celular*"
      placeholder="+522221234567"
      variant="accent"
      icon="Phone"
      value={formData.participantsCoordinator.phone}
      onChangeText={(v: string) =>
        handleInputChange('participantsCoordinator', 'phone', v)
      }
    />
  </div>
</CollapsibleSection>

            
<CollapsibleSection
  title="Datos SEDE"
  Icon={Bank}
  isCompleted={
    Boolean(formData.venue.name) &&
    Boolean(formData.venue.country) &&
    Boolean(formData.venue.state) &&
    Boolean(formData.venue.address)
  }
>
  {/* Descripción */}
  <p className="text-gray-600 text-sm mb-4">
    Responde con sinceridad los datos de tu SEDE.
    <br />
    Las secciones con * son obligatorias.
  </p>

  {/* Campos en grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <InputField
      label="Nombre de la SEDE*"
      placeholder="ITESM Puebla"
      variant="primary"
      icon="GraduationCap"
      value={formData.venue.name}
      onChangeText={(v: string) =>
        handleInputChange('venue', 'name', v)
      }
    />

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        País*
      </label>
      <Select
        options={countryOptions}
        value={
          countryOptions.find(o => o.label === formData.venue.country) || null
        }
        onChange={handleCountryChange}
        placeholder="Selecciona un país"
        styles={selectStyles}
        isClearable
        components={{
          DropdownIndicator: () => (
            <MapPin
              width="1.25rem"
              height="1.25rem"
              fillColor="#4a4a4a"
              strokeWidth={0}
            />
          ),
        }}
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Estado/Provincia*
      </label>
      <Select
        options={regionOptions}
        value={
          regionOptions.find(o => o.label === formData.venue.state) || null
        }
        onChange={handleRegionChange}
        placeholder="Selecciona un estado/provincia"
        styles={selectStyles}
        isClearable
        isDisabled={!formData.venue.country}
        components={{
          DropdownIndicator: () => (
            <MapPin
              width="1.25rem"
              height="1.25rem"
              fillColor="#4a4a4a"
              strokeWidth={0}
            />
          ),
        }}
      />
    </div>

    <InputField
      label="Dirección*"
      placeholder="Dirección 123"
      variant="accent"
      icon="Flag"
      value={formData.venue.address}
      onChangeText={(v: string) =>
        handleInputChange('venue', 'address', v)
      }
    />
  </div>
</CollapsibleSection>
            
<CollapsibleSection
  title="Logo y Convocatoria"
  Icon={Files}
  isCompleted={Boolean(logo) && Boolean(participationFile)}
>
  {/* Sube tu logo */}
  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
    <div className="flex items-center mb-2 text-gray-800">
      <FileJpg width="1.5rem" height="1.5rem" />
      <h4 className="ml-2 text-base font-semibold">Sube tu logo</h4>
    </div>
    <p className="text-gray-600 text-sm mb-4">
      Selecciona una imagen que represente a tu SEDE. No es obligatorio, pero sí recomendado.
    </p>
    <input
      type="file"
      accept="image/*"
      onChange={e => handleFileChange(e, setLogo)}
      className="block"
    />
    {logo && (
      <p className="mt-2 text-xs text-gray-500">
        Archivo: {logo.name}
      </p>
    )}
  </div>

  {/* Convocatoria SEDE */}
  <div className="mt-6">
    <div className="flex items-center mb-2 text-gray-800">
      <Files width="1.5rem" height="1.5rem" />
      <h4 className="ml-2 text-base font-semibold">Convocatoria SEDE</h4>
    </div>
    <p className="text-gray-600 text-sm mb-4">
      Debes subir tu permiso de participación firmado por un representante legal de la institución.
    </p>
    <a
      href="/ConvocatoriaSEDES-PH2025.pdf"
      download
      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition"
    >
      Descargar Convocatoria
    </a>
  </div>

  {/* Sube tu convocatoria */}
  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
    <div className="flex items-center mb-2 text-gray-800">
      <FilePdf width="1.5rem" height="1.5rem" />
      <h4 className="ml-2 text-base font-semibold">Sube tu convocatoria</h4>
    </div>
    <p className="text-gray-600 text-sm mb-4">
      Selecciona el documento PDF de tu convocatoria. Verifica que se suba correctamente.
    </p>
    <input
      type="file"
      accept=".pdf"
      onChange={e => handleFileChange(e, setParticipationFile)}
      className="block"
    />
    {participationFile && (
      <p className="mt-2 text-xs text-gray-500">
        Archivo: {participationFile.name}
      </p>
    )}
  </div>
</CollapsibleSection>
            
<CollapsibleSection
  title="Aviso de Privacidad"
  Icon={Megaphone}
  isCompleted={privacyAccepted}
>
  {/* Texto de enlace al aviso */}
  <p className="text-gray-600 text-sm mb-4">
    Confirmo que he leído, entendido y acepto el Aviso de Privacidad disponible en:  
    <br />
    <a
      href="https://tec.mx/es/aviso-privacidad-participantes-expositores-panelistas-conferencias-moderadores"
      className="text-purple-600 hover:underline"
    >
      https://tec.mx/es/aviso-privacidad-participantes-expositores-panelistas-conferencias-moderadores
    </a>
  </p>

  {/* Checkbox de aceptación */}
  <div className="mt-2">
    <Checkbox
      label="He leído y acepto el Aviso de Privacidad"
      checked={privacyAccepted}
      onChange={setPrivacyAccepted}
    />
  </div>
</CollapsibleSection>
            
            {/* Botón de envío */}
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
      </form>
    </div>
  );
}

export default VenueRegistrationForm;