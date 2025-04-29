'use client';
import { useState } from 'react';
import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@components/buttons_inputs/Button';
import Checkbox from '@components/buttons_inputs/Checkbox';
import withIconDecorator from '@/components/decorators/IconDecorator';

// Import icons using the specified path (placeholders)
import User from '@components/icons/User'; // For name fields
import Phone from '@components/icons/Phone'; // For phone fields
import Location from '@components/icons/Gps'; // For localización field
import Lock from '@components/icons/Lock'; // For contraseña fields
import School from '@components/icons/GraduationCap'; // For escolaridad field
import Send from '@components/icons/ArrowFatRight'; // For submit button
import Email from '@components/icons/Envelope';
import Image from '@components/icons/Image'; // For image upload buttons
import Document from '@components/icons/File'; // For document upload button

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
  location: string;
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
const [formData, setFormData] = useState<FormData>({
  generalCoordinator: {
    name: '',
    lastNameP: '',
    lastNameM: '',
    email: '',
    phone: '',
    gender: 'Mujer',
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
    location: 'Puebla',
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

  // Handle input changes
  type GeneralCoordinatorKeys = keyof GeneralCoordinator; // 'name' | 'lastNameP' | 'lastNameM' | 'email' | 'phone' | 'gender' | 'username' | 'password' | 'confirmPassword'
  type CoordinatorKeys = keyof Coordinator; // 'name' | 'lastNameP' | 'lastNameM' | 'email' | 'phone'
  type VenueKeys = keyof Venue; // 'name' | 'location' | 'address'

  type Section = keyof FormData; // 'generalCoordinator' | 'associatedCoordinator' | 'staffCoordinator' | 'participantsCoordinator' | 'venue'

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
    subSection?: SubSectionMap[S]
  ) => {
    setFormData((prev: FormData) => {
      if (subSection) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [subSection]: {
              ...prev[section][subSection as keyof typeof prev[S]], // Type assertion for subSection
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

  // Handle file uploads
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]; // Remove the "data:..." prefix
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors: string[] = [];

    // Venue validation
    if (!formData.venue.name) newErrors.push('El nombre de la SEDE es obligatorio');
    if (!formData.venue.location) newErrors.push('La localización de la SEDE es obligatoria');
    if (!formData.venue.address) newErrors.push('La dirección de la SEDE es obligatoria');
    if (!participationFile) newErrors.push('El archivo de participación es obligatorio');

    // General Coordinator validation
    if (!formData.generalCoordinator.name)
      newErrors.push('El nombre de la coordinadora general es obligatorio');
    if (!formData.generalCoordinator.lastNameP)
      newErrors.push('El apellido paterno de la coordinadora general es obligatorio');
    if (!formData.generalCoordinator.email)
      newErrors.push('El correo electrónico de la coordinadora general es obligatorio');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.generalCoordinator.email))
      newErrors.push('El correo electrónico de la coordinadora general debe ser válido');
    if (!formData.generalCoordinator.phone)
      newErrors.push('El celular de la coordinadora general es obligatorio');
    if (!formData.generalCoordinator.gender)
      newErrors.push('El sexo de la coordinadora general es obligatorio');
    if (!formData.generalCoordinator.username)
      newErrors.push('El nombre de usuario de la coordinadora general es obligatorio');
    if (!formData.generalCoordinator.password)
      newErrors.push('La contraseña de la coordinadora general es obligatoria');
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

    // Associated Coordinator validation
    if (formData.associatedCoordinator.name) {
      if (!formData.associatedCoordinator.email)
        newErrors.push('El correo electrónico de la coordinadora asociada es obligatorio');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.associatedCoordinator.email))
        newErrors.push('El correo electrónico de la coordinadora asociada debe ser válido');
      if (!formData.associatedCoordinator.phone)
        newErrors.push('El celular de la coordinadora asociada es obligatorio');
    }

    // Staff Report Coordinator validation
    if (formData.staffCoordinator.name) {
      if (!formData.staffCoordinator.email)
        newErrors.push('El correo electrónico de la coordinadora de informes (staff) es obligatorio');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.staffCoordinator.email))
        newErrors.push('El correo electrónico de la coordinadora de informes (staff) debe ser válido');
      if (!formData.staffCoordinator.phone)
        newErrors.push('El celular de la coordinadora de informes (staff) es obligatorio');
    }

    // Participants Report Coordinator validation
    if (formData.participantsCoordinator.name) {
      if (!formData.participantsCoordinator.email)
        newErrors.push('El correo electrónico de la coordinadora de informes (participantes) es obligatorio');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.participantsCoordinator.email))
        newErrors.push('El correo electrónico de la coordinadora de informes (participantes) debe ser válido');
      if (!formData.participantsCoordinator.phone)
        newErrors.push('El celular de la coordinadora de informes (participantes) es obligatorio');
    }

    // Privacy notice
    if (!privacyAccepted) newErrors.push('Debes aceptar el aviso de privacidad');

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Run client-side validation
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setSuccess(null);
      return;
    }

    try {
      // Convert files to base64
      const profileImageBase64 = profileImage ? await fileToBase64(profileImage) : null;
      const logoBase64 = logo ? await fileToBase64(logo) : null;
      const participationFileBase64 = await fileToBase64(participationFile!);

      // Prepare request body
      const body = {
        name: formData.venue.name,
        location: formData.venue.location,
        address: formData.venue.address,
        logo: logoBase64,
        participation_file: participationFileBase64,
        generalCoordinator: {
          ...formData.generalCoordinator,
          profileImage: profileImageBase64,
        },
        associatedCoordinator: formData.associatedCoordinator,
        staffCoordinator: formData.staffCoordinator,
        participantsCoordinator: formData.participantsCoordinator,
      };

      // Get auth token (assuming it's stored in localStorage)
      const token = localStorage.getItem('token');

      // Make API request
      const response = await fetch('http://localhost:3000/api/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422 && data.errors) {
          // Handle validation errors from the backend
          const backendErrors = data.errors.map((err: any) => err.msg);
          throw new Error(backendErrors.join(', '));
        }
        throw new Error(data.message || 'Error al registrar el venue');
      }

      setSuccess(data.message || 'Venue registrado exitosamente');
      setErrors([]);

      // Reset form
      setFormData({
        generalCoordinator: {
          name: '',
          lastNameP: '',
          lastNameM: '',
          email: '',
          phone: '',
          gender: 'Mujer',
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
          location: 'Puebla',
          address: '',
        },
      });
      setProfileImage(null);
      setLogo(null);
      setParticipationFile(null);
      setPrivacyAccepted(false);
    } catch (err: any) {
      setErrors([err.message]);
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex justify-center items-center">
        <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
          {/* Error/Success Messages */}
          {errors.length > 0 && (
            <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-500 text-white rounded-lg">
              {success}
            </div>
          )}

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-2 h-12 bg-purple-600 mr-4"></div>
              <h1 className="text-2xl md:text-3xl font-bold">Formulario de Registro<br />SEDE</h1>
            </div>
            <Button
              label="Regresar"
              variant="error"
              showRightIcon
              IconRight={() => <span className="text-white">✕</span>}
              onClick={() => console.log('Regresar clicked')}
              className="px-4 py-2 rounded-full flex items-center"
            />
          </div>

          {/* Section: Datos Coordinadora General */}
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
              <span className="text-purple-400 mr-2">❀</span> Datos Coordinadora General
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-4">
              Responde con veracidad las siguientes preguntas acerca de tus datos personales y de contacto.<br />
              Las secciones que contengan un asterisco (*) deberán responderse de manera obligatoria.
            </p>
            <p className="text-gray-400 text-sm italic">
              Si no se crean coordinadoras asociadas o de informes, la coordinadora general asumirá los roles faltantes automáticamente.
            </p>
          </div>

          {/* Form Fields: Datos Coordinadora General */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <InputField
              label="Nombre(s)*"
              placeholder="Edna"
              variant="accent"
              Icon={withIconDecorator(User)}
              value={formData.generalCoordinator.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('generalCoordinator', 'name', e.target.value)
              }
            />

            {/* Apellido Paterno */}
            <InputField
              label="Apellido Paterno*"
              placeholder="Moda"
              variant="accent"
              Icon={withIconDecorator(User)}
              value={formData.generalCoordinator.lastNameP}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('generalCoordinator', 'lastNameP', e.target.value)
              }
            />

            {/* Apellido Materno */}
            <InputField
              label="Apellido Materno"
              placeholder="Apellido Materno"
              variant="accent"
              Icon={withIconDecorator(User)}
              value={formData.generalCoordinator.lastNameM}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('generalCoordinator', 'lastNameM', e.target.value)
              }
            />

            {/* Correo Electrónico */}
            <InputField
              label="Correo Electrónico*"
              placeholder="ednamoda@disney.com"
              variant="accent"
              Icon={withIconDecorator(Email)}
              value={formData.generalCoordinator.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('generalCoordinator', 'email', e.target.value)
              }
            />

            {/* Celular */}
            <InputField
              label="Celular*"
              placeholder="+52 222 123 4567"
              variant="accent"
              Icon={withIconDecorator(Phone)}
              value={formData.generalCoordinator.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('generalCoordinator', 'phone', e.target.value)
              }
            />

            {/* Sexo */}
            <Dropdown
              label="Sexo*"
              options={['Mujer', 'Hombre', 'Otro']}
              value={formData.generalCoordinator.gender}
              onChange={(value: string) =>
                handleInputChange('generalCoordinator', 'gender', value)
              }
              variant="accent"
              Icon={withIconDecorator(User)}
            />

            {/* Nombre de Usuario */}
            <InputField
              label="Nombre de Usuario*"
              description="El nombre de usuario solo puede contener letras, números y guiones bajos."
              placeholder="edna_moda"
              variant="accent"
              Icon={withIconDecorator(User)}
              value={formData.generalCoordinator.username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('generalCoordinator', 'username', e.target.value)
              }
            />

            {/* Contraseña */}
            <div>
              <InputField
                label="Contraseña*"
                description="Tu contraseña deberá de ser un mínimo de 8 caracteres, contener una mayúscula, una minúscula y un carácter especial."
                placeholder="********"
                variant="accent"
                Icon={withIconDecorator(Lock)}
                value={formData.generalCoordinator.password}
                type={showPassword ? 'text' : 'password'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('generalCoordinator', 'password', e.target.value)
                }
              />
              <div className="flex items-center mt-2">
                <Checkbox
                  label="Mostrar Contraseña"
                  color="purple"
                  checked={showPassword}
                  onChange={setShowPassword}
                />
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <InputField
                label="Confirmar Contraseña*"
                placeholder="********"
                variant="accent"
                Icon={withIconDecorator(Lock)}
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.generalCoordinator.confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('generalCoordinator', 'confirmPassword', e.target.value)
                }
              />
              <div className="flex items-center mt-2">
                <Checkbox
                  label="Mostrar Contraseña"
                  color="purple"
                  checked={showConfirmPassword}
                  onChange={setShowConfirmPassword}
                />
              </div>
            </div>
          </div>

          {/* Sube tu foto de perfil */}
          <div className="mt-6 p-4 bg-white text-black rounded-lg">
            <div className="flex items-center">
              <span className="text-purple-600 text-2xl mr-2">🖼</span>
              <h3 className="text-lg font-semibold">Sube tu foto de perfil</h3>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Selecciona una foto de perfil con la cual las personas sean capaces de reconocerte dentro del sistema. No es obligatorio subir una imagen, sin embargo lo recomendamos.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setProfileImage)}
              className="mt-4"
            />
            {profileImage && (
              <p className="mt-2 text-sm text-gray-600">
                Archivo seleccionado: {profileImage.name}
              </p>
            )}
          </div>

          {/* Section: Datos Coordinadora Asociada */}
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
              <span className="text-purple-400 mr-2">✨</span> Datos Coordinadora Asociada
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-4">
              Responde con sinceridad las siguientes preguntas acerca de los datos de contacto de tu equipo de trabajo.<br />
              Las secciones que contengan un asterisco (*) deberán responderse de manera obligatoria.
            </p>
          </div>

          {/* Form Fields: Datos Coordinadora Asociada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <InputField
              label="Nombre(s)*"
              placeholder="Juana"
              variant="accent"
              Icon={withIconDecorator(User)}
              value={formData.associatedCoordinator.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('associatedCoordinator', 'name', e.target.value)
              }
            />

            {/* Apellido Paterno */}
            <InputField
              label="Apellido Paterno*"
              placeholder="De Arco"
              variant="accent"
              Icon={withIconDecorator(User)}
              value={formData.associatedCoordinator.lastNameP}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('associatedCoordinator', 'lastNameP', e.target.value)
              }
            />

            {/* Apellido Materno */}
            <InputField
              label="Apellido Materno"
              placeholder="Ramírez"
              variant="accent"
              Icon={withIconDecorator(User)}
              value={formData.associatedCoordinator.lastNameM}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('associatedCoordinator', 'lastNameM', e.target.value)
              }
            />

            {/* Correo Electrónico */}
            <InputField
              label="Correo Electrónico*"
              placeholder="juanadearco@disney.com"
              variant="accent"
              Icon={withIconDecorator(Email)}
              value={formData.associatedCoordinator.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('associatedCoordinator', 'email', e.target.value)
              }
            />

            {/* Celular */}
            <InputField
              label="Celular*"
              placeholder="+52 222 123 4567"
              variant="accent"
              Icon={withIconDecorator(Phone)}
              value={formData.associatedCoordinator.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('associatedCoordinator', 'phone', e.target.value)
              }
            />
          </div>

          {/* Section: Datos Coordinadora de Informes (Staff) */}
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
              <span className="text-purple-400 mr-2">🏫</span> Datos Coordinadora de Informes (Staff)
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-4">
              Responde con sinceridad las siguientes preguntas acerca de los datos de contacto de tu equipo de trabajo.<br />
              Las secciones que contengan un asterisco (*) deberán responderse de manera obligatoria.
            </p>
          </div>

          {/* Form Fields: Datos Coordinadora de Informes (Staff) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <InputField
              label="Nombre(s)*"
              placeholder="Juana"
              variant="accent"
              Icon={withIconDecorator(User)}
              value={formData.staffCoordinator.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('staffCoordinator', 'name', e.target.value)
              }
            />

            {/* Apellido Paterno */}
            <InputField
              label="Apellido Paterno*"
              placeholder="De Arco"
              variant="accent"
              Icon={withIconDecorator(User)}
              value={formData.staffCoordinator.lastNameP}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('staffCoordinator', 'lastNameP', e.target.value)
              }
            />

            {/* Apellido Materno */}
            <InputField
              label="Apellido Materno"
              placeholder="Ramírez"
              variant="accent"
              Icon={withIconDecorator(User)}
              value={formData.staffCoordinator.lastNameM}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('staffCoordinator', 'lastNameM', e.target.value)
              }
            />

            {/* Correo Electrónico */}
            <InputField
              label="Correo Electrónico*"
              placeholder="juanadearco@disney.com"
              variant="accent"
              Icon={withIconDecorator(Email)}
              value={formData.staffCoordinator.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('staffCoordinator', 'email', e.target.value)
              }
            />

            {/* Celular */}
            <InputField
              label="Celular*"
              placeholder="+52 222 123 4567"
              variant="accent"
              Icon={withIconDecorator(Phone)}
              value={formData.staffCoordinator.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('staffCoordinator', 'phone', e.target.value)
              }
            />
          </div>

          {/* Section: Datos Coordinadora de Informes (Participantes) */}
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
              <span className="text-purple-400 mr-2">👥</span> Datos Coordinadora de Informes (Participantes)
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-4">
              Responde con sinceridad las siguientes preguntas acerca de los datos de contacto de tu equipo de trabajo.<br />
              Las secciones que contengan un asterisco (*) deberán responderse de manera obligatoria.
            </p>
          </div>

          {/* Form Fields: Datos Coordinadora de Informes (Participantes) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <InputField
              label="Nombre(s)*"
              placeholder="Juana"
              variant="accent"
              Icon={withIconDecorator(User)}
              value={formData.participantsCoordinator.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('participantsCoordinator', 'name', e.target.value)
              }
            />

            {/* Apellido Paterno */}
            <InputField
              label="Apellido Paterno*"
              placeholder="De Arco"
              variant="accent"
              Icon={withIconDecorator(User)}
              value={formData.participantsCoordinator.lastNameP}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('participantsCoordinator', 'lastNameP', e.target.value)
              }
            />

            {/* Apellido Materno */}
            <InputField
              label="Apellido Materno"
              placeholder="Ramírez"
              variant="accent"
              Icon={withIconDecorator(User)}
              value={formData.participantsCoordinator.lastNameM}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('participantsCoordinator', 'lastNameM', e.target.value)
              }
            />

            {/* Correo Electrónico */}
            <InputField
              label="Correo Electrónico*"
              placeholder="juanadearco@disney.com"
              variant="accent"
              Icon={withIconDecorator(Email)}
              value={formData.participantsCoordinator.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('participantsCoordinator', 'email', e.target.value)
              }
            />

            {/* Celular */}
            <InputField
              label="Celular*"
              placeholder="+52 222 123 4567"
              variant="accent"
              Icon={withIconDecorator(Phone)}
              value={formData.participantsCoordinator.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('participantsCoordinator', 'phone', e.target.value)
              }
            />
          </div>

          {/* Section: Datos SEDE */}
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
              <span className="text-purple-400 mr-2">🧪</span> Datos SEDE
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-4">
              Responde con sinceridad las siguientes preguntas acerca de los datos de tu SEDE.<br />
              Las secciones que contengan un asterisco (*) deberán responderse de manera obligatoria.
            </p>
          </div>

          {/* Form Fields: Datos SEDE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre de la SEDE */}
            <InputField
              label="Nombre de la SEDE*"
              placeholder="Instituto Oriente"
              variant="accent"
              Icon={withIconDecorator(School)}
              value={formData.venue.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('venue', 'name', e.target.value)
              }
            />

            {/* Localización */}
            <Dropdown
              label="Localización*"
              options={['Puebla', 'Ciudad de México', 'Guadalajara']}
              value={formData.venue.location}
              onChange={(value: string) =>
                handleInputChange('venue', 'location', value)
              }
              variant="accent"
              Icon={withIconDecorator(Location)}
            />

            {/* Dirección */}
            <div className="md:col-span-2">
              <InputField
                label="Dirección*"
                placeholder="P. Sherman Calle Wallaby 42 Sidney"
                variant="accent"
                Icon={withIconDecorator(Location)}
                value={formData.venue.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('venue', 'address', e.target.value)
                }
              />
            </div>
          </div>

          {/* Sube tu logo */}
          <div className="mt-6 p-4 bg-white text-black rounded-lg">
            <div className="flex items-center">
              <span className="text-purple-600 text-2xl mr-2">🖼</span>
              <h3 className="text-lg font-semibold">Sube tu logo</h3>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Selecciona una imagen que represente a tu SEDE, la cual se presentará a los usuarios para su fácil reconocimiento. No es obligatorio subir una imagen, sin embargo lo recomendamos.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setLogo)}
              className="mt-4"
            />
            {logo && (
              <p className="mt-2 text-sm text-gray-600">
                Archivo seleccionado: {logo.name}
              </p>
            )}
          </div>

          {/* Convocatoria SEDE */}
          <div className="mt-6 p-4 bg-white text-black rounded-lg">
            <div className="flex items-center">
              <span className="text-purple-600 text-2xl mr-2">📄</span>
              <h3 className="text-lg font-semibold">Convocatoria SEDE</h3>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Dentro de esta sección tendrás que subir el permiso de participación, la cual deberá de estar firmado por un representante legal de la institución.<br />
              Esta sección es obligatoria.
            </p>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, setParticipationFile)}
              className="mt-4"
            />
            {participationFile && (
              <p className="mt-2 text-sm text-gray-600">
                Archivo seleccionado: {participationFile.name}
              </p>
            )}
          </div>

          {/* Aviso de Privacidad */}
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
              <span className="text-purple-400 mr-2">🔒</span> Aviso de Privacidad
            </h2>
            <p className="text-gray-400 text-sm">
              Confirma que he leído, entendido y acepto el Aviso de Privacidad disponible en:<br />
              <a href="https://tec.mx/es/aviso-privacidad-participantes-expositores-panelistas-conferencias-moderadores" className="text-purple-400 hover:underline">
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
  );
};

export default VenueRegistrationForm;