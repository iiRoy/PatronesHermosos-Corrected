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
import { FlowerLotus, User, AddressBook, SketchLogo, Check, Eye, Star, Megaphone, X, UserSound, ChatTeardropText, Grains, Student } from '@/components/icons';

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

interface Sedes {
    sede: string;
    modalidad: string;
    grupos: string;
    coordinadora: string;
    fechas: string;
}

interface FormData {
    generalCoordinator: GeneralCoordinator;
    associatedCoordinator: Coordinator;
    staffCoordinator: Coordinator;
    participantsCoordinator: Coordinator;
    venue: Venue;
}

const CollaboratorRegistrationForm: React.FC = () => {
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
    const [inputValue, setInputValue] = useState('');
    const [section, setSection] = useState('__All__'); // Inicializar con "Todas"
    const [currentPage, setCurrentPage] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para controlar el popup
    const [selectedSede, setSelectedSede] = useState<Sedes | null>(null); // Sede seleccionada para eliminar
    const [chosenSede, setChosenSede] = useState<string | null>(null); // Nueva state para la sede elegida

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

    const sedesData: Sedes[] = [
        { sede: 'ITESM Monterrey', modalidad: 'Presencial', grupos: '10', coordinadora: 'Úrsula Galván', fechas: 'DD/MM - DD/MM' },
        { sede: 'ITESM Puebla', modalidad: 'Presencial', grupos: '6', coordinadora: 'Verónica Chávez', fechas: 'DD/MM - DD/MM' },
        { sede: 'ITESM Guadalajara', modalidad: 'En línea', grupos: '8', coordinadora: 'Wendy Robles', fechas: 'DD/MM - DD/MM' },
        { sede: 'ITESM Toluca', modalidad: 'Presencial', grupos: '4', coordinadora: 'Ximena Flores', fechas: 'DD/MM - DD/MM' },
        { sede: 'ITESM Querétaro', modalidad: 'En línea', grupos: '9', coordinadora: 'Yolanda Meza', fechas: 'DD/MM - DD/MM' },
        { sede: 'ITESM Cuernavaca', modalidad: 'Presencial', grupos: '7', coordinadora: 'Andrea Gonzáles', fechas: 'DD/MM - DD/MM' },
        { sede: 'ITESM Hidalgo', modalidad: 'Presencial', grupos: '8', coordinadora: 'Laura Pinal', fechas: 'DD/MM - DD/MM' },
    ];

    // Obtener modalidades únicas
    const uniqueModalidades = Array.from(new Set(sedesData.map(sedes => sedes.modalidad))).sort();
    const modalidadesOptions = [
        { label: 'Todas', value: '__All__' },
        ...uniqueModalidades.map(modalidad => ({ label: modalidad, value: modalidad })),
    ];

    // Filtrar los datos según el valor de búsqueda y sede
    const filteredData = useMemo(() => {
        const searchTerm = inputValue.toLowerCase().trim();
        return sedesData.filter(sedes => {
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
    const handleDeleteClick = (sedes: Sedes) => {
        setSelectedSede(sedes);
        setChosenSede(sedes.sede); // Actualizar la sede elegida al hacer click en "Check"
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
        } catch (err: any) {
            setErrors([err.message]);
            setSuccess(null);
        }
    };

    return (
        <form className='pagina-formulario' onSubmit={handleSubmit}>
            <Navbar />
            <div className="pagina-formulario min-h-screen bg-gray-900 text-white p-4 md:p-8 flex flex-col justify-center items-center">

                <div className="info-formulario w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <div className="w-2 rounded-full h-16 mr-4 notification-icon-purple"></div>
                            <h1 className="text-2xl"><span className='italic'>Formulario de Registro</span><br /><span className='font-bold text-3xl'>Colaborador</span></h1>
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
                            <span className=" mr-2"><FlowerLotus></FlowerLotus></span> Datos Personales
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
                            Icon={withIconDecorator(Grains)}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Institución Académica */}
                        <InputField
                            label="Institución Académica*"
                            description="Escribe el nombre completo de la institución académica a la cual actualmente estás asistiendo."
                            placeholder="Tec de Monterrey"
                            variant="secondary"
                            icon={"Student"}
                            onChangeText={(value: string) =>
                                handleInputChange('generalCoordinator', 'username', value)
                            }
                        />

                        {/* Carrera */}
                        <InputField
                            label="Carrera*"
                            description="Escribe el nombre completo de la carrera la cual estás estudiando actualmente."
                            placeholder="Ingeniería en Mecatrónica"
                            variant="secondary"
                            icon={"Books"}
                            onChangeText={(value: string) =>
                                handleInputChange('generalCoordinator', 'username', value)
                            }
                        />

                        {/* Semestre */}
                        <InputField
                            label="Semestre Cursando*"
                            placeholder="6º Semestre"
                            variant="secondary"
                            icon={"Medal"}
                            onChangeText={(value: string) =>
                                handleInputChange('generalCoordinator', 'username', value)
                            }
                        />

                        {/* Locación */}
                        <InputField
                            label="Locación*"
                            placeholder="Puebla"
                            variant="secondary"
                            icon={"MapPin"}
                            onChangeText={(value: string) =>
                                handleInputChange('generalCoordinator', 'username', value)
                            }
                        />

                    </div>

                    {/* Section: Datos Coordinadora Asociada */}
                    <div className="mt-8">
                        <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
                            <span className="mr-2"><AddressBook></AddressBook></span> Selección de Sede
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base mb-4">
                            Selecciona la SEDE que más te llame la atención para apoyar. <br />
                            Puedes ver los detalles del grupo usando los botones del lado derecho.
                        </p>
                    </div>

                    <div className='flex justify-center items-center mx-auto w-[80%] h-[50px] rounded-t-[15px] mt-8 input-secondary text-xs sm:text-base md:text-lg lg:text-xl'>
                        <Student></Student>
                        <h2 className='mx-4 font-semibold'>SEDE Elegida: </h2>
                        <p>{chosenSede || 'Ninguna'}</p>
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
                                        <th className="p-2 text-center">Sede</th>
                                        <th className="p-2 text-center">Modalidad</th>
                                        <th className="p-2 text-center">Grupos</th>
                                        <th className="p-2 text-center">Coordinadora</th>
                                        <th className="p-2 text-center">Fechas</th>
                                        <th className="p-2 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {paginatedData.map((sede, index) => (
                                        <tr key={index} className="border-t border-gray-300">
                                            <td className="p-2 text-center">{sede.sede}</td>
                                            <td className="p-2 text-center">{sede.modalidad}</td>
                                            <td className="p-2 text-center">{sede.grupos}</td>
                                            <td className="p-2 text-center">{sede.coordinadora}</td>
                                            <td className="p-2 text-center">{sede.fechas}</td>
                                            <td className="p-2 flex gap-2 justify-center">
                                                <Button label='' variant="success" round showLeftIcon IconLeft={Check} onClick={() => handleDeleteClick(sede)} />
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
                            <span className="mr-2"><SketchLogo></SketchLogo></span> Preferencias
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base mb-4">
                            Responde con sinceridad sobre tus preferencias durante la participación del taller. <br />
                            Las secciones que contienen un asterisco (*) deben de responderse de manera obligatoria.
                        </p>
                    </div>

                    {/* Form Fields: Datos Coordinadora de Informes (Staff) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Nombre */}
                        <Dropdown
                            label="Rol Preferido*"
                            options={['Instructora', 'Facilitadora', 'Staff']}
                            value={formData.generalCoordinator.gender}
                            onChange={(value: string) =>
                                handleInputChange('generalCoordinator', 'gender', value)
                            }
                            variant="primary"
                            Icon={withIconDecorator(UserSound)}
                        />

                        <Dropdown
                            label="Idioma Preferido*"
                            options={['Español', 'Inglés']}
                            value={formData.generalCoordinator.gender}
                            onChange={(value: string) =>
                                handleInputChange('generalCoordinator', 'gender', value)
                            }
                            variant="primary"
                            Icon={withIconDecorator(ChatTeardropText)}
                        />

                        <Dropdown
                            label="Dificultad preferida*"
                            options={['Básico', 'Intermedio', 'Avanzado']}
                            value={formData.generalCoordinator.gender}
                            onChange={(value: string) =>
                                handleInputChange('generalCoordinator', 'gender', value)
                            }
                            variant="primary"
                            Icon={withIconDecorator(ChatTeardropText)}
                        />

                    </div>

                    {/* Aviso de Privacidad */}
                    <div className="mt-8">
                        <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
                            <span className="mr-2"><Megaphone></Megaphone></span> Aviso de Privacidad
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

export default CollaboratorRegistrationForm;