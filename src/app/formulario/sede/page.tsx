'use client';
import React, { useState } from 'react';
import InputField from '@components/buttons_inputs/InputField';
import Dropdown from '@components/buttons_inputs/Dropdown';
import Button from '@components/buttons_inputs/Button';
import Checkbox from '@components/buttons_inputs/Checkbox';

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

const RegistrationVenue: React.FC = () => {
  const [sexo, setSexo] = useState('Mujer');
  const [localizacion, setLocalizacion] = useState('Puebla');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
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
            Icon={User}
          />

          {/* Apellido Paterno */}
          <InputField
            label="Apellido Paterno*"
            placeholder="Moda"
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
            placeholder="ednamoda@disney.com"
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

          {/* Nombre de Usuario */}
          <InputField
            label="Nombre de Usuario*"
            description="El nombre de usuario solo puede contener letras, números y guiones bajos."
            placeholder="edna_moda"
            variant="accent"
            Icon={User}
          />

          {/* Contraseña */}
          <div>
            <InputField
              label="Contraseña*"
              description="Tu contraseña deberá de ser un mínimo de 8 caracteres, contener una mayúscula, una minúscula y un carácter especial."
              placeholder="********"
              variant="accent"
              Icon={Lock}
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
              Icon={Lock}
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
          <Button
            label="Subir mi imagen"
            variant="primary"
            onClick={() => console.log('Subir imagen clicked')}
            className="mt-4 px-4 py-2 rounded-lg flex items-center"
          />
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
            Icon={User}
          />

          {/* Apellido Paterno */}
          <InputField
            label="Apellido Paterno*"
            placeholder="De Arco"
            variant="accent"
            Icon={User}
          />

          {/* Apellido Materno */}
          <InputField
            label="Apellido Materno"
            placeholder="Ramírez"
            variant="accent"
            Icon={User}
          />

          {/* Correo Electrónico */}
          <InputField
            label="Correo Electrónico*"
            placeholder="juanadearco@disney.com"
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
            Icon={User}
          />

          {/* Apellido Paterno */}
          <InputField
            label="Apellido Paterno*"
            placeholder="De Arco"
            variant="accent"
            Icon={User}
          />

          {/* Apellido Materno */}
          <InputField
            label="Apellido Materno"
            placeholder="Ramírez"
            variant="accent"
            Icon={User}
          />

          {/* Correo Electrónico */}
          <InputField
            label="Correo Electrónico*"
            placeholder="juanadearco@disney.com"
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
            Icon={User}
          />

          {/* Apellido Paterno */}
          <InputField
            label="Apellido Paterno*"
            placeholder="De Arco"
            variant="accent"
            Icon={User}
          />

          {/* Apellido Materno */}
          <InputField
            label="Apellido Materno"
            placeholder="Ramírez"
            variant="accent"
            Icon={User}
          />

          {/* Correo Electrónico */}
          <InputField
            label="Correo Electrónico*"
            placeholder="juanadearco@disney.com"
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
            Icon={School}
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

          {/* Dirección */}
          <div className="md:col-span-2">
            <InputField
              label="Dirección*"
              placeholder="P. Sherman Calle Wallaby 42 Sidney"
              variant="accent"
              Icon={Location}
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
          <Button
            label="Subir mi imagen"
            variant="primary"
            onClick={() => console.log('Subir imagen clicked')}
            className="mt-4 px-4 py-2 rounded-lg flex items-center"
          />
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
          <Button
            label="Subir mi documento"
            variant="primary"
            onClick={() => console.log('Subir documento clicked')}
            className="mt-4 px-4 py-2 rounded-lg flex items-center"
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

export default RegistrationVenue;