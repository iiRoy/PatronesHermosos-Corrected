'use client';
import React, { useState } from 'react';
import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@components/buttons_inputs/Button';
import Checkbox from '@components/buttons_inputs/Checkbox';
// Import icons using the specified path (placeholders)
import User from '@components/icons/User'; // For name fields
import Email from '@components/icons/Envelope'; // For email fields
import Phone from '@components/icons/Phone'; // For phone fields
import Grade from '@components/icons/BookOpen'; // For grade field
import School from '@components/icons/GraduationCap'; // For escolaridad field
import Send from '@components/icons/ArrowFatRight'; // For submit button

const RegistrationParticipant: React.FC = () => {
  const [grado, setGrado] = useState('1°');
  const [escolaridad, setEscolaridad] = useState('Secundaria');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-2 h-12 bg-purple-600 mr-4"></div>
            <h1 className="text-2xl md:text-3xl font-bold">Formulario de Registro<br />Participantes</h1>
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

        {/* Section: Datos del Participante */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <span className="text-purple-400 mr-2">❀</span> Datos del Participante
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Responde con sinceridad las siguientes preguntas acerca de tus datos personales y de contacto.<br />
            Las secciones que contengan un asterisco (*) deberán responderse de manera obligatoria.
          </p>
          <p className="text-gray-400 text-sm italic">
            Es importante resaltar que este programa va dirigido a mujeres en secundaria o preparatoria / bachillerato interesadas en aprender y desarrollarse en áreas relacionadas con STEM.
          </p>
        </div>

        {/* Form Fields: Datos del Participante */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <InputField
            label="Nombre(s)*"
            placeholder="María José de la Rosa"
            variant="accent"
            Icon={User}
          />

          {/* Apellido Paterno */}
          <InputField
            label="Apellido Paterno*"
            placeholder="Hernández"
            variant="accent"
            Icon={User}
          />

          {/* Apellido Materno */}
          <InputField
            label="Apellido Materno"
            placeholder="Sánchez"
            variant="accent"
            Icon={User}
          />

          {/* Correo Electrónico */}
          <InputField
            label="Correo Electrónico*"
            placeholder="mariajhrndzsan@gmail.com"
            variant="accent"
            Icon={Email}
          />

          {/* Grado */}
          <Dropdown
            label="Grado*"
            options={['1°', '2°', '3°']}
            value={grado}
            onChange={setGrado}
            variant="accent"
            Icon={Grade}
          />

          {/* Escolaridad */}
          <Dropdown
            label="Escolaridad*"
            options={['Secundaria', 'Preparatoria / Bachillerato']}
            value={escolaridad}
            onChange={setEscolaridad}
            variant="accent"
            Icon={School}
          />
        </div>

        {/* Section: Datos del Tutor */}
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <span className="text-purple-400 mr-2">⚠</span> Datos del Tutor
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Pídele a tu tutor que llene la siguiente parte del formulario con sus datos personales.<br />
            Las secciones que contengan un asterisco (*) deberán responderse de manera obligatoria.
          </p>
        </div>

        {/* Form Fields: Datos del Tutor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <InputField
            label="Nombre(s)*"
            placeholder="María de la Rosa"
            variant="accent"
            Icon={User}
          />

          {/* Apellido Paterno */}
          <InputField
            label="Apellido Paterno*"
            placeholder="Sánchez"
            variant="accent"
            Icon={User}
          />

          {/* Apellido Materno */}
          <InputField
            label="Apellido Materno"
            placeholder="Mendoza"
            variant="accent"
            Icon={User}
          />

          {/* Correo Electrónico */}
          <InputField
            label="Correo Electrónico*"
            placeholder="mariajhrndzsan@gmail.com"
            variant="accent"
            Icon={Email}
          />

          {/* Celular */}
          <InputField
            label="Celular*"
            placeholder="+52 222 123 4567"
            variant="accent"
            Icon={Phone}
          />
        </div>

        {/* Aviso de Privacidad */}
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <span className="text-purple-400 mr-2">🔒</span> Aviso de Privacidad
          </h2>
          <p className="text-gray-400 text-sm">
            Confirma que he leído, entendido y acepto el Aviso de Privacidad disponible en:<br />
            <a href="https://tec.mx/es/aviso-privacidad-campamentos-clubs-tec" className="text-purple-400 hover:underline">
            https://tec.mx/es/aviso-privacidad-campamentos-clubs-tec
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
            IconRight={Send}
            onClick={() => console.log('Enviar Registro clicked')}
            className="px-6 py-2 rounded-full flex items-center"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationParticipant;