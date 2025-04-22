'use client';
import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@components/buttons_inputs/Button';
import Checkbox from '@components/buttons_inputs/Checkbox';
import React, { useState } from 'react';

import User from '@components/icons/User'; // For name fields
import Phone from '@components/icons/Phone'; // For phone fields
import Degree from '@components/icons/BookOpen'; // For grade field
import School from '@components/icons/GraduationCap'; // For escolaridad field
import Send from '@components/icons/ArrowFatRight'; // For submit button
import Email from '@components/icons/Envelope';
import Calendar from '@components/icons/Calendar';
import Location from '@components/icons/Gps';
import Role from '@components/icons/IdentificationBadge';
import Language from '@components/icons/MusicNotesSimple';
import Difficulty from '@components/icons/Medal';

const RegistrationCollaborator: React.FC = () => {
  const [sexo, setSexo] = useState('Mujer');
  const [semestre, setSemestre] = useState('1° Semestre');
  const [localizacion, setLocalizacion] = useState('Puebla');
  const [rol, setRol] = useState('Facilitadora, Staff');
  const [idioma, setIdioma] = useState('Cualquiera');
  const [dificultad, setDificultad] = useState('Básico');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-2 h-12 bg-purple-600 mr-4"></div>
            <h1 className="text-2xl md:text-3xl font-bold">Formulario de Registro<br />Colaborador</h1>
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

        {/* Section: Datos Personales */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <span className="text-purple-400 mr-2">❀</span> Datos Personales
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Responde con veracidad las siguientes preguntas acerca de tus datos personales y de contacto.<br />
            Las secciones que contengan un asterisco (*) deberán responderse de manera obligatoria.
          </p>
          <p className="text-gray-400 text-sm italic">
            Es importante resaltar que solamente personas estudiando una carrera universitaria podrán participar en el equipo de apoyo & staff. Mujeres estudiando una carrera universitaria en relación al área de STEM podrán aplicar para el rol de instructoras o facilitadoras.
          </p>
        </div>

        {/* Form Fields: Datos Personales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <InputField
            label="Nombre(s)*"
            placeholder="Gwen"
            variant="accent"
            Icon={User}
          />

          {/* Apellido Paterno */}
          <InputField
            label="Apellido Paterno*"
            placeholder="Stacey"
            variant="accent"
            Icon={User}
          />

          {/* Apellido Materno */}
          <InputField
            label="Apellido Materno"
            placeholder="Apellido Materno"
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

          {/* Sexo */}
          <Dropdown
            label="Sexo*"
            options={['Mujer', 'Hombre', 'Otro']}
            value={sexo}
            onChange={setSexo}
            variant="accent"
            Icon={User}
          />

          {/* Institución Académica */}
          <InputField
            label="Institución Académica*"
            description="Escribe el nombre completo de la institución académica a la cual estás asistiendo actualmente."
            placeholder="Tec de Monterrey"
            variant="accent"
            Icon={School}
          />

          {/* Carrera */}
          <InputField
            label="Carrera*"
            description="Escribe el nombre completo de la carrera la cual estás estudiando actualmente."
            placeholder="Ingeniería en Mecatrónica"
            variant="accent"
            Icon={Degree}
          />

          {/* Semestre Cursando */}
          <Dropdown
            label="Semestre Cursando*"
            options={[
              '1° Semestre',
              '2° Semestre',
              '3° Semestre',
              '4° Semestre',
              '5° Semestre',
              '6° Semestre',
              '7° Semestre',
              '8° Semestre',
              '9° Semestre',
            ]}
            value={semestre}
            onChange={setSemestre}
            variant="accent"
            Icon={Calendar}
          />

          {/* Localización */}
          <Dropdown
            label="Localización*"
            options={['Puebla', 'Ciudad de México', 'Guadalajara']}
            value={localizacion}
            onChange={setLocalizacion}
            variant="accent"
            Icon={Location}
          />
        </div>

        {/* Section: Preferencias */}
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center mb-2">
            <span className="text-purple-400 mr-2">💎</span> Preferencias
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Responde con sinceridad sobre tus preferencias durante la participación del taller.<br />
            Las secciones que contengan un asterisco (*) deberán responderse de manera obligatoria.
          </p>
          <p className="text-gray-400 text-sm italic">
            Es importante resaltar que las facilitadoras o instructoras deberán ser obligatoriamente mujeres. El equipo de staff puede estar conformado por hombres y mujeres.
          </p>
        </div>

        {/* Form Fields: Preferencias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Rol Preferido */}
          <Dropdown
            label="Rol Preferido*"
            description="*Puedes seleccionar varias opciones."
            options={['Facilitadora, Staff', 'Instructora', 'Staff']}
            value={rol}
            onChange={setRol}
            variant="accent"
            Icon={Role}
          />

          {/* Idioma Preferido */}
          <Dropdown
            label="Idioma Preferido*"
            description="*Puedes seleccionar varias opciones."
            options={['Cualquiera', 'Español', 'Inglés']}
            value={idioma}
            onChange={setIdioma}
            variant="accent"
            Icon={Language}
          />

          {/* Dificultad Preferida */}
          <Dropdown
            label="Dificultad Preferida*"
            description="*Puedes seleccionar varias opciones."
            options={['Básico', 'Intermedio', 'Avanzado']}
            value={dificultad}
            onChange={setDificultad}
            variant="accent"
            Icon={Difficulty}
          />
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
            IconRight={Send}
            onClick={() => console.log('Enviar Registro clicked')}
            className="px-6 py-2 rounded-full flex items-center"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationCollaborator;