'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@components/buttons_inputs/Button';
import Checkbox from '@components/buttons_inputs/Checkbox';
import { useNotification } from '@/components/buttons_inputs/Notification';
import { Country, State } from 'country-state-city';
import Send from '@/components/icons/ArrowFatRight';
import CollapsibleSection from '@/components/buttons_inputs/CollapsibleSection';

import FlowerLotus from '@/components/icons/FlowerLotus';
import Sparkle from '@/components/icons/Sparkle';
import UsersFour from '@/components/icons/UsersFour';
import Bank from '@/components/icons/Bank';
import Files from '@/components/icons/Files';
import Megaphone from '@/components/icons/Megaphone';
import FileJpg from '@/components/icons/FileJpg';
import FilePdf from '@/components/icons/FilePdf';
import MapPin from '@/components/icons/MapPin';
import X from '@/components/icons/X';
import Grains from '@/components/icons/Grains';
import { Island } from '@/components/icons';

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
  const { notify } = useNotification();
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
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  const [sectionErrors, setSectionErrors] = useState({
    venueCoordinator: false,
    associatedCoordinator: false,
    staffCoordinator: false,
    participantsCoordinator: false,
    venue: false,
    documents: false,
    privacy: false,
  });
  const [hasRegions, setHasRegions] = useState(true);

  const validateField = <S extends Section>(
    section: S,
    field: string,
    value: string,
    subSection?: SubSectionMap[S],
    customFormData?: FormData, // <-- agregar este argumento opcional
  ): string | null => {
    const updatedSection = {
      ...(customFormData || formData)[section],
      ...(subSection
        ? {
            [subSection]: {
              ...((customFormData || formData)[section] as any)[subSection],
              [field]: value,
            },
          }
        : {
            [field]: value,
          }),
    };

    const nextFormData: FormData = {
      ...(customFormData || formData),
      [section]: updatedSection,
    };

    const { fieldErrors } = getFieldErrors(nextFormData, {
      hasRegions,
      participationFile,
      privacyAccepted,
    });

    return fieldErrors[section]?.[field] ?? null;
  };

  const countryOptions = useMemo(() => {
    const regionFormatter = new Intl.DisplayNames(['es'], { type: 'region' });

    return Country.getAllCountries()
      .map((country) => {
        const displayName = regionFormatter.of(country.isoCode);
        const isValidName =
          displayName && displayName.trim() !== '' && displayName !== country.isoCode;

        return {
          value: country.isoCode,
          label: isValidName ? displayName : country.name,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label, 'es', { sensitivity: 'base' }));
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

  const normalizePhone = (value: string) => value.replace(/\D/g, '');

  const handleInputChange = <S extends Section>(
    section: S,
    field: string,
    value: string,
    subSection?: SubSectionMap[S],
  ) => {
    let val = value;
    if (field === 'phone') {
      val = normalizePhone(value);
    }

    // PREPARA los nuevos valores para el formData actualizado
    const updatedFormData = (() => {
      if (subSection) {
        return {
          ...formData,
          [section]: {
            ...formData[section],
            [subSection]: {
              ...formData[section][subSection as keyof (typeof formData)[S]],
              [field]: val,
            },
          },
        };
      }
      return {
        ...formData,
        [section]: {
          ...formData[section],
          [field]: val,
        },
      };
    })();

    // Detecta si es campo dependiente
    let additionalFieldsToValidate: [string, string][] = [];
    if (section === 'venueCoordinator' && (field === 'password' || field === 'confirmPassword')) {
      additionalFieldsToValidate = [
        ['confirmPassword', updatedFormData.venueCoordinator.confirmPassword],
        ['password', updatedFormData.venueCoordinator.password],
      ];
    } else if (section === 'associatedCoordinator' && (field === 'name' || field === 'lastNameP' || field === 'lastNameM' || field === 'email' || field === 'phone')) {
      additionalFieldsToValidate = [
        ['name', updatedFormData.associatedCoordinator.name],
        ['lastNameP', updatedFormData.associatedCoordinator.lastNameP],
        ['lastNameM', updatedFormData.associatedCoordinator.lastNameM],
        ['email', updatedFormData.associatedCoordinator.email],
        ['phone', updatedFormData.associatedCoordinator.phone],
      ];
    } else if (section === 'staffCoordinator' && (field === 'name' || field === 'lastNameP' || field === 'lastNameM' || field === 'email' || field === 'phone')) {
      additionalFieldsToValidate = [
        ['name', updatedFormData.staffCoordinator.name],
        ['lastNameP', updatedFormData.staffCoordinator.lastNameP],
        ['lastNameM', updatedFormData.staffCoordinator.lastNameM],
        ['email', updatedFormData.staffCoordinator.email],
        ['phone', updatedFormData.staffCoordinator.phone],
      ];
    } else if (section === 'participantsCoordinator' && (field === 'name' || field === 'lastNameP' || field === 'lastNameM' || field === 'email' || field === 'phone')) {
      additionalFieldsToValidate = [
        ['name', updatedFormData.participantsCoordinator.name],
        ['lastNameP', updatedFormData.participantsCoordinator.lastNameP],
        ['lastNameM', updatedFormData.participantsCoordinator.lastNameM],
        ['email', updatedFormData.participantsCoordinator.email],
        ['phone', updatedFormData.participantsCoordinator.phone],
      ];
    }

    // Revalida solo los campos afectados
    let currentErrors: Record<string, string> = { ...inputErrors };

    // Valida campo principal
    const mainError = validateField(section, field, val, subSection, updatedFormData);
    currentErrors[`${section}.${field}`] = mainError ?? '';

    // Valida campos dependientes (ej. confirmPassword y password)
    additionalFieldsToValidate.forEach(([f, v]) => {
      const err = validateField(section, f, v, subSection, updatedFormData);
      currentErrors[`${section}.${f}`] = err ?? '';
    });

    // Calcula si la sección tiene errores (al menos 1 error en los campos de esa sección)
    const sectionHasError = Object.entries(currentErrors).some(
      ([k, msg]) => k.startsWith(section + '.') && !!msg,
    );

    // Actualiza estados juntos, y el formData
    setFormData(updatedFormData);
    setInputErrors(currentErrors);
    setSectionErrors((prev) => ({
      ...prev,
      [section]: sectionHasError,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    type: 'image' | 'pdf',
    fieldName: 'profileImage' | 'logo' | 'participationFile',
  ) => {
    const file = e.target.files?.[0];
    let errorMsg = '';
    if (!file) {
      setFile(null);
    } else if (type === 'image' && !file.type.startsWith('image/')) {
      errorMsg = 'Solo se permiten imágenes (JPG, PNG, etc.)';
      setFile(null);
    } else if (type === 'pdf' && file.type !== 'application/pdf') {
      errorMsg = 'Solo se permiten archivos PDF';
      setFile(null);
    } else {
      setFile(file);
    }

    if (fieldName === 'profileImage') {
      setInputErrors((prev) => ({
        ...prev,
        [`venueCoordinator.${fieldName}`]: errorMsg,
      }));

      setSectionErrors((prev) => {
        const venueCoordErrors = Object.entries(inputErrors)
          .filter(([k, v]) => k.startsWith('venueCoordinator.') && v)
          .map(([k, v]) => v);

        if (errorMsg) {venueCoordErrors.push(errorMsg)} else venueCoordErrors.pop();

        return {
          ...prev,
          venueCoordinator: venueCoordErrors.length > 0,
        };
      });
    } else {
      setInputErrors((prev) => ({
        ...prev,
        [`documents.${fieldName}`]: errorMsg,
      }));

      setSectionErrors((prev) => {
        const docsErrors = Object.entries(inputErrors)
          .filter(([k, v]) => k.startsWith('documents.') && v)
          .map(([k, v]) => v);

        if (errorMsg) {docsErrors.push(errorMsg)} else docsErrors.pop();

        return {
          ...prev,
          documents: docsErrors.length > 0,
        };
      });
    }
  };

const handlePrivacyChange = (checked: boolean) => {
  setPrivacyAccepted(checked);

  const { fieldErrors, sectionErrors: sErrors } = getFieldErrors(formData, {
    hasRegions,
    participationFile,
    privacyAccepted: checked,
  });

  setInputErrors((prev) => ({
    ...prev,
    'privacy.accepted': fieldErrors?.privacy?.accepted ?? '',
  }));

  setSectionErrors((prev) => ({
    ...prev,
    privacy: sErrors.privacy,
  }));
};

  const handleCountryChange = (selectedOption: { value: string; label: string } | null) => {
    const countryName = selectedOption ? selectedOption.label : '';
    const countryCode = selectedOption ? selectedOption.value : '';
    let msg = '';

    handleInputChange('venue', 'country', countryName)

    setFormData((prev) => ({
      ...prev,
      venue: {
        ...prev.venue,
        country: countryName,
        state: '',
        address: '',
      },
    }));

    setInputErrors((prev) => ({
      ...prev,
      [`venue.region`]: msg,
    }));

    setInputErrors((prev) => ({
      ...prev,
      [`venue.address`]: msg,
    }));

    setSectionErrors((prev) => {
      const venueErrors = Object.entries(inputErrors)
        .filter(([k, v]) => k.startsWith('venue.') && v)
        .map(([k, v]) => v);

      if (msg) {venueErrors.push(msg)} else venueErrors.pop();

      return {
        ...prev,
        venue: venueErrors.length > 0,
      };
    });

    if (countryCode) {
      const regions = State.getStatesOfCountry(countryCode).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }));
      setRegionOptions(regions);
      setHasRegions(regions.length > 0);
    } else {
      setRegionOptions([]);
      setHasRegions(false);
    }
  };

  // Handle region change
  const handleRegionChange = (selectedOption: { value: string; label: string } | null) => {
    const state = selectedOption ? selectedOption.label : '';
    handleInputChange('venue', 'state', state);
  };

  const flattenFieldErrors = (fieldErrors: {
    [section: string]: { [field: string]: string };
  }): Record<string, string> => {
    const flat: Record<string, string> = {};
    for (const section in fieldErrors) {
      for (const field in fieldErrors[section]) {
        flat[`${section}.${field}`] = fieldErrors[section][field];
      }
    }
    return flat;
  };

  const getFieldErrors = (
    data: FormData,
    options: { hasRegions: boolean; participationFile: File | null; privacyAccepted: boolean },
  ) => {
    const { hasRegions, participationFile, privacyAccepted } = options;

    const fieldErrors: { [section: string]: { [field: string]: string } } = {};
    const sectionErrors = {
      venueCoordinator: false,
      associatedCoordinator: false,
      staffCoordinator: false,
      participantsCoordinator: false,
      venue: false,
      documents: false,
      privacy: false,
    };

    const setError = (section: string, field: string, message: string) => {
      if (!fieldErrors[section]) fieldErrors[section] = {};
      fieldErrors[section][field] = message;
      sectionErrors[section as keyof typeof sectionErrors] = true;
    };

    // Validaciones de SEDE
    const venue = data.venue;
    if (!venue.name?.trim()) setError('venue', 'name', 'El nombre de la SEDE es obligatorio*');
    if (!venue.country?.trim()) setError('venue', 'country', 'El país de la SEDE es obligatorio*');
    if (hasRegions && !venue.state?.trim()) {
      setError('venue', 'state', 'El estado/provincia es obligatorio');
    }
    if (!venue.address?.trim()) setError('venue', 'address', 'La dirección es obligatoria*');

    // Documentos
    if (!participationFile)
      setError('documents', 'participationFile', 'El archivo de participación es obligatorio*');

    // Coordinadora de SEDE
    const vc = data.venueCoordinator;
    if (!vc.name?.trim()) setError('venueCoordinator', 'name', 'El nombre es obligatorio*');
    if (!vc.lastNameP?.trim())
      setError('venueCoordinator', 'lastNameP', 'El apellido paterno es obligatorio*');
    if (!vc.email?.trim()) {
      setError('venueCoordinator', 'email', 'El correo electrónico es obligatorio*');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vc.email)) {
      setError('venueCoordinator', 'email', 'El correo electrónico no es válido*');
    }
    if (!vc.phone?.trim()) {
      setError('venueCoordinator', 'phone', 'El celular electrónico es obligatorio*');
    } else if (vc.phone.replace(/\D/g, '').length < 10) {
      setError('venueCoordinator', 'phone', 'El celular debe tener al menos 10 dígitos*');
    }
    if (!vc.gender?.trim()) setError('venueCoordinator', 'gender', 'El género es obligatorio*');
    if (!vc.username?.trim())
      setError('venueCoordinator', 'username', 'El nombre de usuario es obligatorio*');

    if (!vc.password) {
      setError('venueCoordinator', 'password', 'La contraseña es obligatoria*');
    } else {
      if (vc.password.length < 8) {
        setError('venueCoordinator', 'password', 'Debe tener al menos 8 caracteres*');
      } else if (!/[A-Z]/.test(vc.password)) {
        setError('venueCoordinator', 'password', 'Debe contener al menos una mayúscula*');
      } else if (!/[a-z]/.test(vc.password)) {
        setError('venueCoordinator', 'password', 'Debe contener al menos una minúscula*');
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(vc.password)) {
        setError('venueCoordinator', 'password', 'Debe contener al menos un carácter especial*');
      }
    }

    if (!vc.confirmPassword) {
      setError('venueCoordinator', 'confirmPassword', 'Debes confirmar tu contraseña*');
    } else if (vc.password !== vc.confirmPassword) {
      setError('venueCoordinator', 'confirmPassword', 'Las contraseñas no coinciden*');
    }

    // Coordinadora asociada
    const assoc = data.associatedCoordinator;
    if (assoc.name?.trim() || assoc.lastNameP?.trim() || assoc.lastNameM?.trim() || assoc.email?.trim() || assoc.phone?.trim()) {
      if (!assoc.name?.trim()) {
        setError('associatedCoordinator', 'name', 'El nombre es obligatorio para el registro*');
      }

      if (!assoc.lastNameP?.trim()) {
        setError('associatedCoordinator', 'lastNameP', 'El apellido paterno es obligatorio para el registro*');
      }
      
      if (!assoc.email?.trim()) {
        setError('associatedCoordinator', 'email', 'El correo es obligatorio*');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(assoc.email)) {
        setError('associatedCoordinator', 'email', 'El correo no es válido*');
      }
      if (!assoc.phone?.trim()) {
        setError('associatedCoordinator', 'phone', 'El teléfono es obligatorio*');
      } else if (assoc.phone.replace(/\D/g, '').length < 10) {
      setError('associatedCoordinator', 'phone', 'El celular debe tener al menos 10 dígitos*');
    }
    }

    const staff = data.staffCoordinator;
    if (staff.name?.trim() || staff.lastNameP?.trim() || staff.lastNameM?.trim() || staff.email?.trim() || staff.phone?.trim()) {
      if (!staff.name?.trim()) {
        setError('staffCoordinator', 'name', 'El nombre es obligatorio para el registro*');
      }

      if (!staff.lastNameP?.trim()) {
        setError('staffCoordinator', 'lastNameP', 'El apellido paterno es obligatorio para el registro*');
      }
      
      if (!staff.email?.trim()) {
        setError('staffCoordinator', 'email', 'El correo es obligatorio*');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(staff.email)) {
        setError('staffCoordinator', 'email', 'El correo no es válido*');
      }
      if (!staff.phone?.trim()) {
        setError('staffCoordinator', 'phone', 'El teléfono es obligatorio*');
      } else if (staff.phone.replace(/\D/g, '').length < 10) {
      setError('staffCoordinator', 'phone', 'El celular debe tener al menos 10 dígitos*');
    }
    }

    const part = data.participantsCoordinator;
    if (part.name?.trim() || part.lastNameP?.trim() || part.lastNameM?.trim() || part.email?.trim() || part.phone?.trim()) {
      if (!part.name?.trim()) {
        setError('participantsCoordinator', 'name', 'El nombre es obligatorio para el registro*');
      }

      if (!part.lastNameP?.trim()) {
        setError('participantsCoordinator', 'lastNameP', 'El apellido paterno es obligatorio para el registro*');
      }
      
      if (!part.email?.trim()) {
        setError('participantsCoordinator', 'email', 'El correo es obligatorio*');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(part.email)) {
        setError('participantsCoordinator', 'email', 'El correo no es válido*');
      }
      if (!part.phone?.trim()) {
        setError('participantsCoordinator', 'phone', 'El teléfono es obligatorio*');
      } else if (part.phone.replace(/\D/g, '').length < 10) {
      setError('participantsCoordinator', 'phone', 'El celular debe tener al menos 10 dígitos*');
    }
    }

    if (!privacyAccepted) setError('privacy', 'accepted', 'Debes aceptar el aviso de privacidad*');

    return { fieldErrors, sectionErrors };
  };

  const validateForm = () => {
    return getFieldErrors(formData, {
      hasRegions,
      participationFile,
      privacyAccepted,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fieldErrors, sectionErrors } = validateForm();
    const inputErrors = flattenFieldErrors(fieldErrors);

    if (Object.keys(inputErrors).length > 0) {
      setInputErrors(inputErrors);
      setSectionErrors(sectionErrors);
      notify({
        color: 'red',
        title: 'Error en el formulario',
        message: 'Revisa los campos marcados en rojo antes de continuar.',
        iconName: 'Warning',
        variant: 'two',
      });
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Datos de la SEDE
      formDataToSend.append('name', formData.venue.name);
      formDataToSend.append('country', formData.venue.country);
      formDataToSend.append('state', formData.venue.state);
      formDataToSend.append('address', formData.venue.address);

      // Coordinadora de SEDE
      const vc = formData.venueCoordinator;
      formDataToSend.append('venueCoordinator[name]', vc.name);
      formDataToSend.append('venueCoordinator[lastNameP]', vc.lastNameP);
      formDataToSend.append('venueCoordinator[lastNameM]', vc.lastNameM);
      formDataToSend.append('venueCoordinator[email]', vc.email);
      formDataToSend.append('venueCoordinator[phone]', vc.phone);
      formDataToSend.append('venueCoordinator[gender]', vc.gender);
      formDataToSend.append('venueCoordinator[username]', vc.username);
      formDataToSend.append('venueCoordinator[password]', vc.password);

      // Coordinadoras opcionales
      const sections = [
        'associatedCoordinator',
        'staffCoordinator',
        'participantsCoordinator',
      ] as const;
      for (const key of sections) {
        const coor = formData[key];
        if (coor.name) {
          formDataToSend.append(`${key}[name]`, coor.name);
          formDataToSend.append(`${key}[lastNameP]`, coor.lastNameP);
          formDataToSend.append(`${key}[lastNameM]`, coor.lastNameM);
          formDataToSend.append(`${key}[email]`, coor.email);
          formDataToSend.append(`${key}[phone]`, coor.phone);
        }
      }

      // Archivos
      if (profileImage) formDataToSend.append('venueCoordinator.profileImage', profileImage);
      if (logo) formDataToSend.append('logo', logo);
      if (participationFile) formDataToSend.append('participation_file', participationFile);

      // Envío a la API
      const response = await fetch('http://localhost:3000/api/venues', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        const backendErrors = data?.errors?.map((err: any) => err.msg) || [
          data.message || 'Error al registrar el venue',
        ];
        throw new Error(backendErrors.join(', '));
      }

      setInputErrors({});
      setSectionErrors({
        venueCoordinator: false,
        associatedCoordinator: false,
        staffCoordinator: false,
        participantsCoordinator: false,
        venue: false,
        documents: false,
        privacy: false,
      });

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
      notify({
        color: 'red',
        title: 'Error al registrar',
        message: err.message || 'No se pudo enviar el formulario. Intenta de nuevo más tarde.',
        iconName: 'Warning',
        variant: 'two',
      });
    }
  };

  return (
    <div className='overflow-hidden pagina-formulario flex flex-col min-h-screen bg-gray-900 text-white'>
      <form onSubmit={handleSubmit}>
        <div className='info-formulario p-4 md:p-8 flex justify-center'>
          <div className='w-full max-w-6xl rounded-lg shadow-lg bg-back p-6 md:p-8'>
            {/* Header */}
            <div className='flex justify-between items-center mb-8'>
              <div className='flex items-center space-x-4'>
                <div className='flex flex-row items-center justify-center gap-5'>
                  <div className='w-2 bg-[var(--primaryColor)] h-14 md:h-16 lg:h-24 rounded-full' />
                  <div className='flex flex-col'>
                  <p className='lg:text-3xl md:text-xl text-md italic text-gray-300'>Formulario de Registro</p>
                  <h1 className='lg:text-6xl md:text-4xl text-2xl font-bold'>SEDE</h1>
                  </div>
                </div>
              </div>
              <div className='scale-[0.70] md:scale-[0.85] lg:scale-100 md:mr-10 md:mt-3'>
              <Button
                label='Regresar'
                variant='error'
                showLeftIcon
                IconLeft={X}
                onClick={() => router.back()}
              />
              </div>
            </div>

            {/* Secciones colapsables */}
            <CollapsibleSection
              title='Datos Personales'
              Icon={FlowerLotus}
              isIncorrect={sectionErrors.venueCoordinator}
              isCompleted={
                Boolean(formData.venueCoordinator.name) &&
                Boolean(formData.venueCoordinator.lastNameP) &&
                Boolean(formData.venueCoordinator.email) &&
                Boolean(formData.venueCoordinator.phone) &&
                Boolean(formData.venueCoordinator.username) &&
                Boolean(formData.venueCoordinator.password) &&
                formData.venueCoordinator.password === formData.venueCoordinator.confirmPassword
              }
              Color={'#3D1C4FFF'}
            >
              {/* Descripción */}
              <p className='text-gray-600 text-sm mb-4'>
                Responde con veracidad las siguientes preguntas acerca de tus datos personales y de
                contacto.
                <br />
                <strong>Las secciones con * son obligatorias.</strong>
              </p>

              {/* Campos en grid */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <InputField
                  label='Nombre(s)*'
                  placeholder='Nombre(s)'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.venueCoordinator.name}
                  onChangeText={(v: string) => handleInputChange('venueCoordinator', 'name', v)}
                  darkText={true}
                  error={inputErrors['venueCoordinator.name']}
                />

                <InputField
                  label='Apellido Paterno*'
                  placeholder='Apellido Paterno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.venueCoordinator.lastNameP}
                  onChangeText={(v: string) =>
                    handleInputChange('venueCoordinator', 'lastNameP', v)
                  }
                  darkText={true}
                  error={inputErrors['venueCoordinator.lastNameP']}
                />

                <InputField
                  label='Apellido Materno'
                  placeholder='Apellido Materno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.venueCoordinator.lastNameM}
                  onChangeText={(v: string) =>
                    handleInputChange('venueCoordinator', 'lastNameM', v)
                  }
                  darkText={true}
                  error={inputErrors['venueCoordinator.lastNameM']}
                />

                <InputField
                  label='Correo Electrónico*'
                  placeholder='correo1@ejemplo.com'
                  variant='accent'
                  icon='At'
                  value={formData.venueCoordinator.email}
                  onChangeText={(v: string) => handleInputChange('venueCoordinator', 'email', v)}
                  darkText={true}
                  error={inputErrors['venueCoordinator.email']}
                />

                <InputField
                  label='Celular*'
                  placeholder='+522221234567'
                  variant='accent'
                  icon='Phone'
                  value={formData.venueCoordinator.phone}
                  onChangeText={(v: string) => handleInputChange('venueCoordinator', 'phone', v)}
                  darkText={true}
                  error={inputErrors['venueCoordinator.phone']}
                />

                <Dropdown
                  label='Género*'
                  options={['Femenino', 'No binario', 'Prefiero no decir']}
                  value={formData.venueCoordinator.gender}
                  onChange={(value: string) =>
                    handleInputChange('venueCoordinator', 'gender', value)
                  }
                  variant='accent'
                  Icon={Grains}
                  darkText={true}
                  error={inputErrors['venueCoordinator.gender']}
                />

                <InputField
                  label='Nombre de Usuario*'
                  placeholder='Us3r_n4me'
                  variant='secondary'
                  icon='UserPlus'
                  value={formData.venueCoordinator.username}
                  onChangeText={(v: string) => handleInputChange('venueCoordinator', 'username', v)}
                  darkText={true}
                  error={inputErrors['venueCoordinator.username']}
                />

                <InputField
                  label='Contraseña*'
                  placeholder='********'
                  variant='secondary'
                  icon='Lock'
                  type={showPassword ? 'text' : 'password'}
                  value={formData.venueCoordinator.password}
                  onChangeText={(v: string) => handleInputChange('venueCoordinator', 'password', v)}
                  darkText={true}
                  error={inputErrors['venueCoordinator.password']}
                />

                <InputField
                  label='Confirmar Contraseña*'
                  placeholder='********'
                  variant='secondary'
                  icon='Lock'
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.venueCoordinator.confirmPassword}
                  onChangeText={(v: string) =>
                    handleInputChange('venueCoordinator', 'confirmPassword', v)
                  }
                  darkText={true}
                  error={inputErrors['venueCoordinator.confirmPassword']}
                />
              </div>

              {/* Sube tu foto */}
              <div className='mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200'>
                <div className='flex items-center mb-2 text-gray-800'>
                  <FileJpg width='1.5rem' height='1.5rem' />
                  <h4 className='ml-2 text-base font-semibold'>Sube tu foto de perfil</h4>
                </div>
                <p className='text-gray-600 text-sm mb-4'>
                  Selecciona una imagen para que te reconozcan en el sistema. No es obligatoria pero
                  sí recomendada.
                </p>

                <div>
                  <label
                    htmlFor='customFile'
                    className='inline-block px-4 py-2 rounded-full bg-[var(--primaryColor)] text-white cursor-pointer hover:bg-[var(--primary-shade)] transition font-semibold'
                  >
                    Elegir imagen
                  </label>
                  <input
                    id='customFile'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => handleFileChange(e, setLogo, 'image', 'profileImage')}
                  />
                  {inputErrors['venueCoordinator.profileImage'] && (
                    <p className='text-xs text-red-600 mt-2'>
                      {inputErrors['venueCoordinator.profileImage']}
                    </p>
                  )}
                  {logo && <p className='mt-2 text-xs text-gray-500'>{logo.name}</p>}
                </div>
              </div>
              <p className='text-gray-600 text-sm mt-2'><strong>- Tu contraseña debe de tener mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 carácter especial.</strong></p>
              <p className='text-gray-600 text-sm mt-1 mb-2'><strong>- Tu usuario debe de tener mínimo 6 caracteres, máximo 14 caracteres y solo puede usar letras, guiones bajos y números.</strong></p>
            </CollapsibleSection>

            <CollapsibleSection
              title='Datos Coordinadora Asociada'
              Icon={Sparkle}
              isCompleted={
                Boolean(formData.associatedCoordinator.name) &&
                Boolean(formData.associatedCoordinator.lastNameP) &&
                Boolean(formData.associatedCoordinator.email) &&
                Boolean(formData.associatedCoordinator.phone)
              }
              isIncorrect={sectionErrors.associatedCoordinator}
              Color={'#4E2A62FF'}
              Optional={true}
            >
              {/* Descripción */}
              <p className='text-gray-600 text-sm mb-4'>
                Responde con veracidad las siguientes preguntas acerca de los datos de tu coordinadora asociada.
                <br />
                <strong>Puedes dejar en blanco esta sección si no tienes una coordinadora asociada. Si vas a llenar esta sección, recuerda que los espacios con * son obligatorios.</strong>
              </p>
              <p className='text-gray-600 text-sm mb-4'>
                Si no se registra una coordinadora asociada, la coordinadora de SEDE asumirá los
                roles faltantes automáticamente.
              </p>

              {/* Campos en grid */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <InputField
                  label='Nombre(s)*'
                  placeholder='Nombre(s)'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.associatedCoordinator.name}
                  onChangeText={(v: string) =>
                    handleInputChange('associatedCoordinator', 'name', v)
                  }
                  darkText={true}
                  error={inputErrors['associatedCoordinator.name']}
                />

                <InputField
                  label='Apellido Paterno*'
                  placeholder='Apellido Paterno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.associatedCoordinator.lastNameP}
                  onChangeText={(v: string) =>
                    handleInputChange('associatedCoordinator', 'lastNameP', v)
                  }
                  darkText={true}
                  error={inputErrors['associatedCoordinator.lastNameP']}
                />

                <InputField
                  label='Apellido Materno'
                  placeholder='Apellido Materno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.associatedCoordinator.lastNameM}
                  onChangeText={(v: string) =>
                    handleInputChange('associatedCoordinator', 'lastNameM', v)
                  }
                  darkText={true}
                  error={inputErrors['associatedCoordinator.lastNameM']}
                />

                <InputField
                  label='Correo Electrónico*'
                  placeholder='correo1@ejemplo.com'
                  variant='accent'
                  icon='At'
                  value={formData.associatedCoordinator.email}
                  onChangeText={(v: string) =>
                    handleInputChange('associatedCoordinator', 'email', v)
                  }
                  darkText={true}
                  error={inputErrors['associatedCoordinator.email']}
                />

                <InputField
                  label='Celular*'
                  placeholder='+522221234567'
                  variant='accent'
                  icon='Phone'
                  value={formData.associatedCoordinator.phone}
                  onChangeText={(v: string) =>
                    handleInputChange('associatedCoordinator', 'phone', v)
                  }
                  darkText={true}
                  error={inputErrors['associatedCoordinator.phone']}
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title='Datos Coordinadora de Informes (Colaboradores)'
              Icon={UsersFour}
              isCompleted={
                Boolean(formData.staffCoordinator.name) &&
                Boolean(formData.staffCoordinator.lastNameP) &&
                Boolean(formData.staffCoordinator.email) &&
                Boolean(formData.staffCoordinator.phone)
              }
              isIncorrect={sectionErrors.staffCoordinator}
              Color={'#633F76FF'}
              Optional={true}
            >
              {/* Descripción */}
              <p className='text-gray-600 text-sm mb-4'>
                Responde con veracidad las siguientes preguntas acerca de los datos de tu coordinadora de informes.
                <br />
                <strong>Puedes dejar en blanco esta sección si no tienes una coordinadora de informes. Si vas a llenar esta sección, recuerda que los espacios con * son obligatorios.</strong>
              </p>
              <p className='text-gray-600 text-sm mb-4'>
                Si no se registra una coordinadora de informes para los colaboradores, la coordinadora de SEDE asumirá los
                roles faltantes automáticamente.
              </p>

              {/* Campos en grid */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <InputField
                  label='Nombre(s)*'
                  placeholder='Nombre(s)'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.staffCoordinator.name}
                  onChangeText={(v: string) => handleInputChange('staffCoordinator', 'name', v)}
                  darkText={true}
                  error={inputErrors['staffCoordinator.name']}
                />

                <InputField
                  label='Apellido Paterno*'
                  placeholder='Apellido Paterno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.staffCoordinator.lastNameP}
                  onChangeText={(v: string) =>
                    handleInputChange('staffCoordinator', 'lastNameP', v)
                  }
                  darkText={true}
                  error={inputErrors['staffCoordinator.lastNameP']}
                />

                <InputField
                  label='Apellido Materno'
                  placeholder='Apellido Materno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.staffCoordinator.lastNameM}
                  onChangeText={(v: string) =>
                    handleInputChange('staffCoordinator', 'lastNameM', v)
                  }
                  darkText={true}
                  error={inputErrors['staffCoordinator.lastNameM']}
                />

                <InputField
                  label='Correo Electrónico*'
                  placeholder='correo1@ejemplo.com'
                  variant='accent'
                  icon='At'
                  value={formData.staffCoordinator.email}
                  onChangeText={(v: string) => handleInputChange('staffCoordinator', 'email', v)}
                  darkText={true}
                  error={inputErrors['staffCoordinator.email']}
                />

                <InputField
                  label='Celular*'
                  placeholder='+522221234567'
                  variant='accent'
                  icon='Phone'
                  value={formData.staffCoordinator.phone}
                  onChangeText={(v: string) => handleInputChange('staffCoordinator', 'phone', v)}
                  darkText={true}
                  error={inputErrors['staffCoordinator.phone']}
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title='Datos Coordinadora de Informes (Participantes)'
              Icon={UsersFour}
              isCompleted={
                Boolean(formData.participantsCoordinator.name) &&
                Boolean(formData.participantsCoordinator.lastNameP) &&
                Boolean(formData.participantsCoordinator.email) &&
                Boolean(formData.participantsCoordinator.phone)
              }
              isIncorrect={sectionErrors.participantsCoordinator}
              Color={'#7F5C92FF'}
              Optional={true}
            >
              {/* Descripción */}
                            <p className='text-gray-600 text-sm mb-4'>
                Responde con veracidad las siguientes preguntas acerca de los datos de tu coordinadora de informes.
                <br />
                <strong>Puedes dejar en blanco esta sección si no tienes una coordinadora de informes. Si vas a llenar esta sección, recuerda que los espacios con * son obligatorios.</strong>
              </p>
              <p className='text-gray-600 text-sm mb-4'>
                Si no se registra una coordinadora de informes para los participantes, la coordinadora de SEDE asumirá los
                roles faltantes automáticamente.
              </p>

              {/* Campos en grid */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <InputField
                  label='Nombre(s)*'
                  placeholder='Nombre(s)'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.participantsCoordinator.name}
                  onChangeText={(v: string) =>
                    handleInputChange('participantsCoordinator', 'name', v)
                  }
                  darkText={true}
                  error={inputErrors['participantsCoordinator.name']}
                />

                <InputField
                  label='Apellido Paterno*'
                  placeholder='Apellido Paterno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.participantsCoordinator.lastNameP}
                  onChangeText={(v: string) =>
                    handleInputChange('participantsCoordinator', 'lastNameP', v)
                  }
                  darkText={true}
                  error={inputErrors['participantsCoordinator.lastNameP']}
                />

                <InputField
                  label='Apellido Materno'
                  placeholder='Apellido Materno'
                  variant='primary'
                  icon='Fingerprint'
                  value={formData.participantsCoordinator.lastNameM}
                  onChangeText={(v: string) =>
                    handleInputChange('participantsCoordinator', 'lastNameM', v)
                  }
                  darkText={true}
                  error={inputErrors['participantsCoordinator.lastNameM']}
                />

                <InputField
                  label='Correo Electrónico*'
                  placeholder='correo1@ejemplo.com'
                  variant='accent'
                  icon='At'
                  value={formData.participantsCoordinator.email}
                  onChangeText={(v: string) =>
                    handleInputChange('participantsCoordinator', 'email', v)
                  }
                  darkText={true}
                  error={inputErrors['participantsCoordinator.email']}
                />

                <InputField
                  label='Celular*'
                  placeholder='+522221234567'
                  variant='accent'
                  icon='Phone'
                  value={formData.participantsCoordinator.phone}
                  onChangeText={(v: string) =>
                    handleInputChange('participantsCoordinator', 'phone', v)
                  }
                  darkText={true}
                  error={inputErrors['participantsCoordinator.phone']}
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title='Datos SEDE'
              Icon={Bank}
              isCompleted={
                Boolean(formData.venue.name) &&
                Boolean(formData.venue.country) &&
                (Boolean(formData.venue.state) || !hasRegions) &&
                Boolean(formData.venue.address)
              }
              isIncorrect={sectionErrors.venue}
              Color={'#876898FF'}
            >
              {/* Descripción */}
              <p className='text-gray-600 text-sm mb-4'>
                Responde con veracidad las siguientes preguntas acerca de los datos de tu SEDE.
                <br />
                <strong>Los espacios con * son obligatorios.</strong>
              </p>

              {/* Campos en grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <InputField
                  label='Nombre de la SEDE*'
                  placeholder='ITESM Puebla'
                  variant='primary'
                  icon='GraduationCap'
                  value={formData.venue.name}
                  onChangeText={(v: string) => handleInputChange('venue', 'name', v)}
                  darkText={true}
                  error={inputErrors['venue.name']}
                />

                <Dropdown
                  label='País*'
                  options={countryOptions.map((c) => c.label)}
                  value={formData.venue.country}
                  onChange={(value: string) => {
                    const selectedCountry = countryOptions.find((c) => c.label === value);
                    handleCountryChange(selectedCountry ? selectedCountry : null);
                  }}
                  variant='accent'
                  Icon={MapPin}
                  darkText={true}
                  error={inputErrors['venue.country']}
                />

                <div className='flex flex-col'>
                  <Dropdown
                    label='Estado*'
                    options={regionOptions.map((r) => r.label)}
                    value={formData.venue.state}
                    onChange={(value: string) => {
                      const selectedRegion = regionOptions.find((r) => r.label === value);
                      handleRegionChange(selectedRegion ? selectedRegion : null);
                    }}
                    variant={!formData.venue.country || !hasRegions ? 'accent-disabled' : 'accent'}
                    Icon={Island}
                    darkText={true}
                    error={inputErrors['venue.state']}
                    dim={!formData.venue.country}
                    disabled={formData.venue.country === '' || !formData.venue.country || !hasRegions}
                  />

                  {!hasRegions && formData.venue.country && (
                    <p className='text-sm text-gray-400 mt-1 ml-1'>
                      Este país no tiene estados o regiones para seleccionar.
                    </p>
                  )}
                </div>

                <InputField
                  label='Dirección*'
                  placeholder='Dirección 123'
                  variant={!formData.venue.state && hasRegions ? 'accent-disabled' : 'accent'}
                  icon='Flag'
                  value={formData.venue.address}
                  onChangeText={(v: string) => handleInputChange('venue', 'address', v)}
                  darkText={true}
                  error={inputErrors['venue.address']}
                  disabled={formData.venue.state === '' || !formData.venue.state && hasRegions}
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title='Logo y Convocatoria'
              Icon={Files}
              isCompleted={Boolean(participationFile)}
              isIncorrect={sectionErrors.documents}
              Color={'#9577A6FF'}
            >
              {/* Sube tu logo */}
              <p className='text-gray-600 text-sm mb-4'>
                Sube los documentos que consideras que son indispensable para tu SEDE.
                <br />
                <strong>Los espacios con * son obligatorios.</strong>
              </p>
              <div className='mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
                <div className='flex items-center mb-2 text-gray-800'>
                  <FileJpg width='1.5rem' height='1.5rem' />
                  <h4 className='ml-2 text-base font-semibold'>Sube tu logo</h4>
                </div>
                <p className='text-gray-600 text-sm mb-4'>
                  Selecciona una imagen que represente a tu SEDE. No es obligatorio, pero sí
                  recomendado.
                </p>

                <div>
                  <label
                    htmlFor='customLogo'
                    className='inline-block px-4 py-2 rounded-full bg-[var(--primaryColor)] text-white cursor-pointer hover:bg-[var(--primary-shade)] transition font-semibold'
                  >
                    Elegir Imagen
                  </label>
                  <input
                    id='customLogo'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => handleFileChange(e, setLogo, 'image', 'logo')}
                  />
                  {inputErrors['documents.logo'] && (
                    <p className='text-xs text-red-600 mt-2'>{inputErrors['documents.logo']}</p>
                  )}
                  {logo && <p className='mt-2 text-xs text-gray-500'>{logo.name}</p>}
                </div>
              </div>

              {/* Convocatoria SEDE */}
              <div className='mt-6'>
                <div className='flex items-center mb-2 text-gray-800'>
                  <Files width='1.5rem' height='1.5rem' />
                  <h4 className='ml-2 text-base font-semibold'>Convocatoria SEDE *</h4>
                </div>
                <p className='text-gray-600 text-sm mb-4'>
                  Debes subir tu permiso de participación firmado por un representante legal de la
                  institución.
                </p>
                <a
                  href='/ConvocatoriaSEDES-PH2025.pdf'
                  download
                  className='inline-flex items-center px-4 py-2 bg-[var(--secondaryColor)] text-white rounded hover:bg-[var(--secondary-shade)] transition'
                >
                  Descargar Convocatoria
                </a>
              </div>

              {/* Sube tu convocatoria */}
              <div className='mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
                <div className='flex items-center mb-2 text-gray-800'>
                  <FilePdf width='1.5rem' height='1.5rem' />
                  <h4 className='ml-2 text-base font-semibold'>Sube tu convocatoria firmada *</h4>
                </div>
                <p className='text-gray-600 text-sm mb-4'>
                  Selecciona el documento PDF de tu convocatoria. Verifica que se suba
                  correctamente.
                </p>

                <div>
                  <label
                    htmlFor='customPDF'
                    className='inline-block px-4 py-2 rounded-full bg-[var(--primaryColor)] text-white cursor-pointer hover:bg-[var(--primary-shade)] transition font-semibold'
                  >
                    Elegir Archivo
                  </label>
                  <input
                    id='customPDF'
                    type='file'
                    accept='.pdf'
                    className='hidden'
                    onChange={(e) => handleFileChange(e, setParticipationFile, 'pdf', 'participationFile')}
                  />
                  {inputErrors['documents.participationFile'] && (
                    <p className='text-xs text-red-600 mt-2'>
                      {inputErrors['documents.participationFile']}
                    </p>
                  )}
                  {participationFile && (
                    <p className='mt-2 text-xs text-gray-500'>{participationFile.name}</p>
                  )}
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title='Aviso de Privacidad'
              Icon={Megaphone}
              isCompleted={privacyAccepted}
              isIncorrect={sectionErrors.privacy}
              Color={'#A185B1FF'}
            >
              {/* Texto de enlace al aviso */}
              <p className='text-gray-600 text-sm mb-4'>
                Confirmo que he leído, entendido y acepto el&nbsp;
                <a
                  href='https://tec.mx/es/aviso-privacidad-participantes-expositores-panelistas-conferencias-moderadores'
                  className='text-purple-600 hover:underline'
                >
                Aviso de Privacidad
                </a>
                &nbsp;para poder participar en Patrones Hermosos como una SEDE oficial del evento.
              </p>

              {/* Checkbox de aceptación */}
              <div className='mt-2'>
                <Checkbox
                  label='Acepto el aviso de privacidad'
                  checked={privacyAccepted}
                  onChange={handlePrivacyChange}
                />
              </div>
              {inputErrors['privacy.accepted'] && (
                <p className='text-xs text-red-600 mt-2'>{inputErrors['privacy.accepted']}</p>
              )}
            </CollapsibleSection>

            {/* Botón de envío */}
            <div className='mt-6 flex justify-end'>
              <Button
                label='Enviar Registro'
                variant='success'
                showRightIcon
                type='submit'
                IconRight={Send}
                className='px-6 py-2 rounded-full flex items-center text-white'
                disabled={Object.values(inputErrors).some((msg) => !!msg)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VenueRegistrationForm;
