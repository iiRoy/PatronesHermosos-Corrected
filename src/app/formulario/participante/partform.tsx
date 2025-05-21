'use client';
import { useState, useMemo, useEffect } from 'react';
import InputField from '@components/buttons_inputs/InputField';
import FiltroEvento from '@/components/headers_menu_users/FiltroEvento';
import Dropdown from '@components/buttons_inputs/Dropdown';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import Button from '@components/buttons_inputs/Button';
import Pagination from '@/components/buttons_inputs/Pagination';
import Checkbox from '@components/buttons_inputs/Checkbox';
import withIconDecorator from '@/components/decorators/IconDecorator';
import { FlowerLotus, User, AddressBook, SketchLogo, Check, Eye, Star, Megaphone, X, UserSound, ChatTeardropText, Grains, Student, GraduationCap, BookOpenText, SealWarning, Heart, FilePdf, BookmarksSimple } from '@/components/icons';

// Import icons using the specified path (placeholders)
import Location from '@components/icons/Gps'; // For localización field
import Send from '@components/icons/ArrowFatRight'; // For submit button
import Navbar from '@/components/headers_menu_users/navbar';

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

interface Grupos {
    grupo: string;
    modalidad: string;
    sede: string;
    cupo: string;
    horarios: string;
    fechas: string;
}

interface FormData {
    generalCoordinator: GeneralCoordinator;
    associatedCoordinator: Coordinator;
    staffCoordinator: Coordinator;
    participantsCoordinator: Coordinator;
    venue: Venue;
}

const ParticipantRegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        generalCoordinator: {
            name: '',
            lastNameP: '',
            lastNameM: '',
            email: '',
            phone: '',
            gender: 'Femenino',
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
    const [inputValue, setInputValue] = useState('');
    const [section, setSection] = useState('__All__'); // Inicializar con "Todas"
    const [currentPage, setCurrentPage] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para controlar el popup
    const [selectedSede, setSelectedSede] = useState<Grupos | null>(null); // Sede seleccionada para eliminar
    const [chosenSede, setChosenSede] = useState<string | null>(null); // Nueva state para la sede elegida

    const [chosenGrupo, setChosenGrupo] = useState<string | null>(null); // Nueva state para la sede elegida

    const DecoratedFlowerLotus = withIconDecorator(FlowerLotus);
    const DecoratedSealWarning = withIconDecorator(SealWarning);
    const DecoratedAddressBook = withIconDecorator(AddressBook);
    const DecoratedStudent = withIconDecorator(Student);
    const DecoratedBookmarksSimple = withIconDecorator(BookmarksSimple);
    const DecoratedHeart = withIconDecorator(Heart);
    const DecoratedFilePdf = withIconDecorator(FilePdf);
    const DecoratedMegaphone = withIconDecorator(Megaphone);

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

    const rowsPerPage = 10;

    const gruposData: Grupos[] = [
        { sede: 'ITESM Monterrey', modalidad: 'Presencial', grupo: 'Sol', cupo: '10 Personas', fechas: 'DD/MM - DD/MM', horarios: 'HH:MM - HH:MM' },
        { sede: 'ITESM Puebla', modalidad: 'Presencial', grupo: 'Luna', cupo: '12 Personas', fechas: 'DD/MM - DD/MM', horarios: 'HH:MM - HH:MM' },
        { sede: 'ITESM Guadalajara', modalidad: 'En línea', grupo: 'Montaña', cupo: '8 Personas', fechas: 'DD/MM - DD/MM', horarios: 'HH:MM - HH:MM' },
        { sede: 'ITESM Toluca', modalidad: 'Presencial', grupo: 'Mar', cupo: 'Ximena 11', fechas: 'DD/MM - DD/MM', horarios: 'HH:MM - HH:MM' },
        { sede: 'ITESM Querétaro', modalidad: 'En línea', grupo: 'Sol', cupo: '2 Personas', fechas: 'DD/MM - DD/MM', horarios: 'HH:MM - HH:MM' },
        { sede: 'ITESM Cuernavaca', modalidad: 'Presencial', grupo: 'Luna', cupo: '10 Personas', fechas: 'DD/MM - DD/MM', horarios: 'HH:MM - HH:MM' },
        { sede: 'ITESM Hidalgo', modalidad: 'Presencial', grupo: 'Montaña', cupo: '7 Personas', fechas: 'DD/MM - DD/MM', horarios: 'HH:MM - HH:MM' },
    ];

    // Obtener modalidades únicas
    const uniqueModalidades = Array.from(new Set(gruposData.map(sedes => sedes.modalidad))).sort();
    const modalidadesOptions = [
        { label: 'Todas', value: '__All__' },
        ...uniqueModalidades.map(modalidad => ({ label: modalidad, value: modalidad })),
    ];

    // Filtrar los datos según el valor de búsqueda y sede
    const filteredData = useMemo(() => {
        const searchTerm = inputValue.toLowerCase().trim();
        return gruposData.filter(sedes => {
            // Filtro por nombre de Sede
            const matchesSearch = !searchTerm || sedes.sede.toLowerCase().includes(searchTerm);

            // Filtro por sede
            const matchesSede = section === '__All__' ? true : sedes.modalidad === section;

            return matchesSearch && matchesSede;
        });
    }, [inputValue, section]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    // Añadimos un useEffect para reiniciar currentPage cuando filteredData cambie
    useEffect(() => {
        // Si la página actual es mayor o igual al número total de páginas después del filtrado,
        // ajustamos currentPage para que no exceda el rango válido
        if (currentPage >= totalPages && totalPages > 0) {
            setCurrentPage(totalPages - 1);
        } else if (totalPages === 0) {
            setCurrentPage(0);
        }
    }, [filteredData.length, currentPage, totalPages]);

    const sectionFilterChange = (value: string) => {
        setSection(value);
        setInputValue(''); // Resetear búsqueda al cambiar de sección
        setCurrentPage(0); // Resetear página al cambiar de filtro
    };

    // Función para abrir el popup de confirmación y seleccionar sede
    const handleSelectClick = (sedes: Grupos) => {
        setSelectedSede(sedes);
        setChosenSede(sedes.sede); // Actualizar la sede elegida al hacer click en "Check"
        setChosenGrupo(sedes.grupo); // Actualizar la sede elegida al hacer click en "Check"
        setIsPopupOpen(true);
    };

    // Función para cerrar el popup
    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedSede(null);
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
            setChosenSede(null); // Reset chosenSede on successful submission
            setChosenGrupo(null); // Reset chosenSede on successful submission
        } catch (err: any) {
            setErrors([err.message]);
            setSuccess(null);
        }
    };

    return (
        <form className='pagina-formulario' onSubmit={handleSubmit}>
            <Navbar />
            <div className="pagina-formulario min-h-screen bg-gray-900 text-white p-4 md:p-8 flex flex-col justify-center items-center">

                <div className="info-formulario w-full max-w-6xl rounded-lg shadow-lg p-6 md:p-8">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <div className="w-2 rounded-full h-16 mr-4 notification-icon-purple"></div>
                            <h1 className="text-2xl"><span className='italic'>Formulario de Registro</span><br /><span className='font-bold text-3xl'>Participantes</span></h1>
                        </div>
                        <Button
                            label=""
                            variant="error"
                            showLeftIcon
                            round
                            IconLeft={X}
                            onClick={() => console.log('Regresar clicked')}
                            className="px-4 py-2 rounded-full flex items-center"
                        />
                    </div>

                    {/* Section: Datos Personales */}
                    <div className="mb-6">
                        <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
                            <span className=" mr-2"><DecoratedFlowerLotus width={25} height={25} strokeWidth={0} /></span> Datos del Participante
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base mb-4">
                            Responde con sinceridad las siguientes preguntas acerca de tus datos personales y de contacto. <br />
                            Las secciones que contienen un asterisco (*) deben de responderse de manera obligatoria.
                        </p>
                        <p className="text-gray-400 text-sm italic">
                            Es importante resaltar que este programa va dirigido a mujeres en secundaria o preparatoria / bachillerato interesadas en aprender y desarrollarse en áreas relacionadas con STEAM.
                        </p>
                    </div>

                    {/* Form Fields: Datos Personales */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Nombre */}
                        <InputField
                            label="Nombre(s)*"
                            placeholder="Edna"
                            variant="primary"
                            icon={"Fingerprint"}
                            value={formData.generalCoordinator.name}
                            onChangeText={(value: string) =>
                                handleInputChange('generalCoordinator', 'name', value)
                            }
                        />

                        {/* Apellido Paterno */}
                        <InputField
                            label="Apellido Paterno*"
                            placeholder="Moda"
                            variant="primary"
                            icon={"Fingerprint"}
                            value={formData.generalCoordinator.lastNameP}
                            onChangeText={(value: string) =>
                                handleInputChange('generalCoordinator', 'lastNameP', value)
                            }
                        />

                        {/* Apellido Materno */}
                        <InputField
                            label="Apellido Materno"
                            placeholder="Apellido Materno"
                            variant="primary"
                            icon={"Fingerprint"}
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
                            icon={"At"}
                            value={formData.generalCoordinator.email}
                            onChangeText={(value: string) =>
                                handleInputChange('generalCoordinator', 'email', value)
                            }
                        />

                        {/* Celular */}
                        <Dropdown
                            label="Grado*"
                            options={['1º', '2º', '3º']}
                            value={formData.generalCoordinator.gender}
                            onChange={(value: string) =>
                                handleInputChange('generalCoordinator', 'gender', value)
                            }
                            variant="accent"
                            Icon={withIconDecorator(GraduationCap)}
                        />

                        {/* Sexo */}
                        <Dropdown
                            label="Escolaridad*"
                            options={['Secundaria', 'Preparatoria']}
                            value={formData.generalCoordinator.gender}
                            onChange={(value: string) =>
                                handleInputChange('generalCoordinator', 'gender', value)
                            }
                            variant="accent"
                            Icon={withIconDecorator(BookOpenText)}
                        />
                    </div>

                    <div className="my-12">
                        <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
                            <span className=" mr-2"><DecoratedSealWarning width={25} height={25} strokeWidth={0} /></span> Datos del Tutor
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base mb-4">
                            Pídele a tu tutor que llene la siguiente parte del formulario con sus datos personales. <br />
                            Las secciones que contienen un asterisco (*) deben de responderse de manera obligatoria.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* Institución Académica */}
                        <InputField
                            label="Nombre(s)*"
                            placeholder="Roberto"
                            variant="primary"
                            icon={"Fingerprint"}
                            onChangeText={(value: string) =>
                                handleInputChange('generalCoordinator', 'username', value)
                            }
                        />

                        {/* Carrera */}
                        <InputField
                            label="Apellido Paterno*"
                            placeholder="López"
                            variant="primary"
                            icon={"Fingerprint"}
                            onChangeText={(value: string) =>
                                handleInputChange('generalCoordinator', 'username', value)
                            }
                        />

                        {/* Semestre */}
                        <InputField
                            label="Apellido Materno*"
                            placeholder="Juárez"
                            variant="primary"
                            icon={"Fingerprint"}
                            onChangeText={(value: string) =>
                                handleInputChange('generalCoordinator', 'username', value)
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Locación */}
                        <InputField
                            label="Correo Electrónico*"
                            placeholder="ejemplo@correo.com"
                            variant="accent"
                            icon={"At"}
                            onChangeText={(value: string) =>
                                handleInputChange('generalCoordinator', 'username', value)
                            }
                        />

                        <InputField
                            label="Celular*"
                            placeholder="Puebla"
                            variant="accent"
                            icon={"Phone"}
                            onChangeText={(value: string) =>
                                handleInputChange('generalCoordinator', 'username', value)
                            }
                        />

                    </div>

                    {/* Section: Datos Coordinadora Asociada */}
                    <div className="mt-8">
                        <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
                            <span className="mr-2"><DecoratedAddressBook width={25} height={25} strokeWidth={0} /></span> Selección de Grupo
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base mb-4">
                            Selecciona el grupo que más te llame la atención. <br />
                            Puedes ver los detalles del grupo usando los botones del lado derecho.
                        </p>
                    </div>

                    <div className='flex flex-col gap:4 lg:flex-row lg:gap-24 justify-center items-center mx-auto w-[80%] h-[65px] md:h-[50px] rounded-t-[15px] mt-8 input-secondary text-xs sm:text-base lg:text-xl'>
                        <div className='flex'>
                            <DecoratedStudent width={25} height={25} strokeWidth={0} />
                            <h2 className='mx-4 font-semibold'>SEDE Elegida: </h2>
                            <p>{chosenSede || 'Ninguna'}</p>
                        </div>

                        <div className='flex'>
                            <DecoratedBookmarksSimple width={25} height={25} strokeWidth={0} />
                            <h2 className='mx-4 font-semibold'>Grupo Elegido: </h2>
                            <p>{chosenGrupo || 'Ninguno'}</p>
                        </div>
                    </div>
                    <div className="fondo-tabla-forms flex flex-col p-6 gap-4 overflow-auto h-[50vh] sm:h-[75vh]">

                        {/* Fila de búsqueda, filtro y botón */}
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

                        {/* Tabla */}
                        <div className="overflow-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className=" sticky top-0 fondo-titulos-tabla text-purple-800 font-bold">
                                    <tr className='texto-primary-shade'>
                                        <th className="p-2 text-center">Grupo</th>
                                        <th className="p-2 text-center">Modalidad</th>
                                        <th className="p-2 text-center">Sede</th>
                                        <th className="p-2 text-center">Cupo</th>
                                        <th className="p-2 text-center">Horarios</th>
                                        <th className="p-2 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {paginatedData.map((grupo, index) => (
                                        <tr key={index} className="border-t border-gray-300">
                                            <td className="p-2 text-center">{grupo.grupo}</td>
                                            <td className="p-2 text-center">{grupo.modalidad}</td>
                                            <td className="p-2 text-center">{grupo.sede}</td>
                                            <td className="p-2 text-center">{grupo.cupo}</td>
                                            <td className="p-2 text-center">
                                                {grupo.horarios} <br />
                                                {grupo.fechas}
                                            </td>
                                            <td className="p-2 flex gap-2 justify-center">
                                                <Button label='' variant="success" round showLeftIcon IconLeft={Check} onClick={() => handleSelectClick(grupo)} />
                                                <Button label='' variant="primary" round showLeftIcon IconLeft={Eye} />
                                                <Button label='' variant="warning" round showLeftIcon IconLeft={Star} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Paginación */}
                    </div>

                    {/* Section: Datos Coordinadora de Informes (Staff) */}
                    <div className="mt-8">
                        <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
                            <span className="mr-2"><DecoratedHeart width={25} height={25} strokeWidth={0} /></span> Permiso de participación
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base mb-4">
                            Dentro de esta sección tendrás que subir tu permiso de participación, la cual deberá de estar firmado por tu tutor. <br />
                            Esta sección es obligatoria.
                        </p>
                    </div>

                    <div className="mt-6 p-4 bg-white text-black rounded-lg tarjeta-archivo">
                        <div className="flex items-center titulo-tarjeta-archivo">
                            <span className=" text-2xl mr-2 icono-tarjeta-archivo"><DecoratedFilePdf width={25} height={25} strokeWidth={0} /></span>
                            <h3 className="text-lg font-semibold">Sube tu permiso firmado</h3>
                        </div>
                        <p className="text-sm my-6">
                            Selecciona un documento para subir.  Ten cuidado al subir tus documentos y verifica dos veces que se suba correctamente.
                        </p>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileChange(e, setParticipationFile)}
                            className="mt-4"
                        />
                        {participationFile && (
                            <p className="mt-2 text-xs text-gray-600">
                                Archivo seleccionado: {participationFile.name}
                            </p>
                        )}
                    </div>

                    {/* Aviso de Privacidad */}
                    <div className="mt-8">
                        <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
                            <span className="mr-2"><DecoratedMegaphone width={25} height={25} strokeWidth={0} /></span> Aviso de Privacidad
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

export default ParticipantRegistrationForm;