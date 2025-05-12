'use client';
import { useState } from 'react';
import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@components/buttons_inputs/Button';
import Checkbox from '@components/buttons_inputs/Checkbox';
import withIconDecorator from '@/components/decorators/IconDecorator';

// Import icons using the specified path (placeholders)
import User from '@components/icons/User'; // For name fields
import Location from '@components/icons/Gps'; // For localización field
import Send from '@components/icons/ArrowFatRight'; // For submit button

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
      newErrors.push('La contraseña de la Coordinadora de Sede es obligatoria');
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
    // Create FormData object
    const formDataToSend = new FormData();

    // Append venue fields
    formDataToSend.append('name', formData.venue.name);
    formDataToSend.append('location', formData.venue.location);
    formDataToSend.append('address', formData.venue.address);

    // Append general coordinator fields
    formDataToSend.append('generalCoordinator[name]', formData.generalCoordinator.name);
    formDataToSend.append('generalCoordinator[lastNameP]', formData.generalCoordinator.lastNameP);
    formDataToSend.append('generalCoordinator[lastNameM]', formData.generalCoordinator.lastNameM);
    formDataToSend.append('generalCoordinator[email]', formData.generalCoordinator.email);
    formDataToSend.append('generalCoordinator[phone]', formData.generalCoordinator.phone);
    formDataToSend.append('generalCoordinator[gender]', formData.generalCoordinator.gender);
    formDataToSend.append('generalCoordinator[username]', formData.generalCoordinator.username);
    formDataToSend.append('generalCoordinator[password]', formData.generalCoordinator.password);

    // Append associated coordinator fields (if provided)
    if (formData.associatedCoordinator.name) {
      formDataToSend.append('associatedCoordinator[name]', formData.associatedCoordinator.name);
      formDataToSend.append('associatedCoordinator[lastNameP]', formData.associatedCoordinator.lastNameP);
      formDataToSend.append('associatedCoordinator[lastNameM]', formData.associatedCoordinator.lastNameM);
      formDataToSend.append('associatedCoordinator[email]', formData.associatedCoordinator.email);
      formDataToSend.append('associatedCoordinator[phone]', formData.associatedCoordinator.phone);
    }

    // Append staff coordinator fields (if provided)
    if (formData.staffCoordinator.name) {
      formDataToSend.append('staffCoordinator[name]', formData.staffCoordinator.name);
      formDataToSend.append('staffCoordinator[lastNameP]', formData.staffCoordinator.lastNameP);
      formDataToSend.append('staffCoordinator[lastNameM]', formData.staffCoordinator.lastNameM);
      formDataToSend.append('staffCoordinator[email]', formData.staffCoordinator.email);
      formDataToSend.append('staffCoordinator[phone]', formData.staffCoordinator.phone);
    }

    // Append participants coordinator fields (if provided)
    if (formData.participantsCoordinator.name) {
      formDataToSend.append('participantsCoordinator[name]', formData.participantsCoordinator.name);
      formDataToSend.append('participantsCoordinator[lastNameP]', formData.participantsCoordinator.lastNameP);
      formDataToSend.append('participantsCoordinator[lastNameM]', formData.participantsCoordinator.lastNameM);
      formDataToSend.append('participantsCoordinator[email]', formData.participantsCoordinator.email);
      formDataToSend.append('participantsCoordinator[phone]', formData.participantsCoordinator.phone);
    }

    // Append files
    if (profileImage) {
      formDataToSend.append('generalCoordinator.profileImage', profileImage);
    }
    if (logo) {
      formDataToSend.append('logo', logo);
    }
    if (participationFile) {
      formDataToSend.append('participation_file', participationFile);
    }

    // Make API request
    const response = await fetch('http://localhost:3000/api/venues', {
      method: 'POST',
      body: formDataToSend,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 422 && data.errors) {
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

          {/* Section: Datos Coordinadora de Sede */}
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
              <span className="text-purple-400 mr-2">❀</span> Datos Coordinadora de Sede
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-4">
              Responde con veracidad las siguientes preguntas acerca de tus datos personales y de contacto.<br />
              Las secciones que contengan un asterisco (*) deberán responderse de manera obligatoria.
            </p>
            <p className="text-gray-400 text-sm italic">
              Si no se crean coordinadoras asociadas o de informes, la Coordinadora de Sede asumirá los roles faltantes automáticamente.
            </p>
          </div>

          {/* Form Fields: Datos Coordinadora de Sede */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <InputField
              label="Nombre(s)*"
              placeholder="Edna"
              variant="accent"
              icon={"User"}
              value={formData.generalCoordinator.name}
              onChangeText={(value: string) =>
                handleInputChange('generalCoordinator', 'name', value)
              }              
            />

            {/* Apellido Paterno */}
            <InputField
              label="Apellido Paterno*"
              placeholder="Moda"
              variant="accent"
              icon={"User"}
              value={formData.generalCoordinator.lastNameP}
              onChangeText={(value: string) =>
                handleInputChange('generalCoordinator', 'lastNameP', value)
              }              
            />

            {/* Apellido Materno */}
            <InputField
              label="Apellido Materno"
              placeholder="Apellido Materno"
              variant="accent"
              icon={"User"}
              value={formData.generalCoordinator.lastNameM}
              onChangeText={(value: string) =>
                handleInputChange('generalCoordinator', 'lastNameM', value)
              }              
            />

            {/* Correo Electrónico */}
            <InputField
              label="Correo Electrónico*"
              placeholder="ednamoda@disney.com"
              variant="accent"
              icon={"Envelope"}
              value={formData.generalCoordinator.email}
              onChangeText={(value: string) =>
                handleInputChange('generalCoordinator', 'email', value)
              }              
            />

            {/* Celular */}
            <InputField
              label="Celular*"
              placeholder="+52 222 123 4567"
              variant="accent"
              icon={"Phone"}
              value={formData.generalCoordinator.phone}
              onChangeText={(value: string) =>
                handleInputChange('generalCoordinator', 'phone', value)
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
              icon={"User"}
              value={formData.generalCoordinator.username}
              onChangeText={(value: string) =>
                handleInputChange('generalCoordinator', 'username', value)
              }              
            />

            {/* Contraseña */}
            <div>
              <InputField
                label="Contraseña*"
                description="Tu contraseña deberá de ser un mínimo de 8 caracteres, contener una mayúscula, una minúscula y un carácter especial."
                placeholder="********"
                variant="accent"
                icon={"Lock"}
                value={formData.generalCoordinator.password}
                type={showPassword ? 'text' : 'password'}
                onChangeText={(value: string) =>
                  handleInputChange('generalCoordinator', 'password', value)
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
                icon={"Lock"}
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.generalCoordinator.confirmPassword}
                onChangeText={(value: string) =>
                  handleInputChange('generalCoordinator', 'confirmPassword', value)
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
              icon={"User"}
              value={formData.associatedCoordinator.name}
              onChangeText={(value: string) =>
                handleInputChange('associatedCoordinator', 'name', value)
              }
            />

            {/* Apellido Paterno */}
            <InputField
              label="Apellido Paterno*"
              placeholder="De Arco"
              variant="accent"
              icon={"User"}
              value={formData.associatedCoordinator.lastNameP}
              onChangeText={(value: string) =>
                handleInputChange('associatedCoordinator', 'lastNameP', value)
              }
            />

            {/* Apellido Materno */}
            <InputField
              label="Apellido Materno"
              placeholder="Ramírez"
              variant="accent"
              icon={"User"}
              value={formData.associatedCoordinator.lastNameM}
              onChangeText={(value: string) =>
                handleInputChange('associatedCoordinator', 'lastNameM', value)
              }
            />

            {/* Correo Electrónico */}
            <InputField
              label="Correo Electrónico*"
              placeholder="juanadearco@disney.com"
              variant="accent"
              icon={"Envelope"}
              value={formData.associatedCoordinator.email}
              onChangeText={(value: string) =>
                handleInputChange('associatedCoordinator', 'email', value)
              }
            />

            {/* Celular */}
            <InputField
              label="Celular*"
              placeholder="+52 222 123 4567"
              variant="accent"
              icon={"Phone"}
              value={formData.associatedCoordinator.phone}
              onChangeText={(value: string) =>
                handleInputChange('associatedCoordinator', 'phone', value)
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
              icon={"User"}
              value={formData.staffCoordinator.name}
              onChangeText={(value: string) =>
                handleInputChange('staffCoordinator', 'name', value)
              }
            />

            {/* Apellido Paterno */}
            <InputField
              label="Apellido Paterno*"
              placeholder="De Arco"
              variant="accent"
              icon={"User"}
              value={formData.staffCoordinator.lastNameP}
              onChangeText={(value: string) =>
                handleInputChange('staffCoordinator', 'lastNameP', value)
              }
            />

            {/* Apellido Materno */}
            <InputField
              label="Apellido Materno"
              placeholder="Ramírez"
              variant="accent"
              icon={"User"}
              value={formData.staffCoordinator.lastNameM}
              onChangeText={(value: string) =>
                handleInputChange('staffCoordinator', 'lastNameM', value)
              }
            />

            {/* Correo Electrónico */}
            <InputField
              label="Correo Electrónico*"
              placeholder="juanadearco@disney.com"
              variant="accent"
              icon={"Envelope"}
              value={formData.staffCoordinator.email}
              onChangeText={(value: string) =>
                handleInputChange('staffCoordinator', 'email', value)
              }
            />

            {/* Celular */}
            <InputField
              label="Celular*"
              placeholder="+52 222 123 4567"
              variant="accent"
              icon={"Phone"}
              value={formData.staffCoordinator.phone}
              onChangeText={(value: string) =>
                handleInputChange('staffCoordinator', 'phone', value)
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
              icon={"User"}
              value={formData.participantsCoordinator.name}
              onChangeText={(value: string) =>
                handleInputChange('participantsCoordinator', 'name', value)
              }
            />

            {/* Apellido Paterno */}
            <InputField
              label="Apellido Paterno*"
              placeholder="De Arco"
              variant="accent"
              icon={"User"}
              value={formData.participantsCoordinator.lastNameP}
              onChangeText={(value: string) =>
                handleInputChange('participantsCoordinator', 'lastNameP', value)
              }
            />

            {/* Apellido Materno */}
            <InputField
              label="Apellido Materno"
              placeholder="Ramírez"
              variant="accent"
              icon={"User"}
              value={formData.participantsCoordinator.lastNameM}
              onChangeText={(value: string) =>
                handleInputChange('participantsCoordinator', 'lastNameM', value)
              }
            />

            {/* Correo Electrónico */}
            <InputField
              label="Correo Electrónico*"
              placeholder="juanadearco@disney.com"
              variant="accent"
              icon={"Envelope"}
              value={formData.participantsCoordinator.email}
              onChangeText={(value: string) =>
                handleInputChange('participantsCoordinator', 'email', value)
              }
            />

            {/* Celular */}
            <InputField
              label="Celular*"
              placeholder="+52 222 123 4567"
              variant="accent"
              icon={"Phone"}
              value={formData.participantsCoordinator.phone}
              onChangeText={(value: string) =>
                handleInputChange('participantsCoordinator', 'phone', value)
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
              icon={"GraduationCap"}
              value={formData.venue.name}
              onChangeText={(value: string) =>
                handleInputChange('venue', 'name', value)
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
                icon={"Flag"}
                value={formData.venue.address}
                onChangeText={(value: string) =>
                  handleInputChange('venue', 'address', value)
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