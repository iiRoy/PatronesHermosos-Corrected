'use client';
import React from 'react';
const RegistrationVenue: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-2 h-12 bg-purple-600 mr-4"></div>
            <h1 className="text-2xl md:text-3xl font-bold">Formulario de Registro<br />SEDE</h1>
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-red-600 transition">
            Regresar <span className="ml-2">✕</span>
          </button>
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
          <div>
            <label className="block text-sm font-medium mb-1">Nombre(s)*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="Edna"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Apellido Paterno */}
          <div>
            <label className="block text-sm font-medium mb-1">Apellido Paterno*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="Moda"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Apellido Materno */}
          <div>
            <label className="block text-sm font-medium mb-1">Apellido Materno</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="Apellido Materno"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-sm font-medium mb-1">Correo Electrónico*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">@</span>
              <input
                type="email"
                placeholder="ednamoda@disney.com"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Celular */}
          <div>
            <label className="block text-sm font-medium mb-1">Celular*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">📞</span>
              <input
                type="tel"
                placeholder="+52 222 123 4567"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Sexo */}
          <div>
            <label className="block text-sm font-medium mb-1">Sexo*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">⚥</span>
              <select className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                <option>Mujer</option>
                <option>Hombre</option>
                <option>Otro</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
            </div>
          </div>

          {/* Nombre de Usuario */}
          <div>
            <label className="block text-sm font-medium mb-1">Nombre de Usuario*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">👤</span>
              <input
                type="text"
                placeholder="edna_moda"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <p className="text-gray-400 text-xs mt-1">El nombre de usuario solo puede contener letras, números y guiones bajos.</p>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">🔒</span>
              <input
                type="password"
                placeholder="********"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <p className="text-gray-400 text-xs mt-1">Tu contraseña deberá de ser un mínimo de 8 caracteres, contener una mayúscula, una minúscula y un carácter especial.</p>
            <div className="flex items-center mt-2">
              <input type="checkbox" className="mr-2" />
              <label className="text-gray-400 text-xs">Mostrar Contraseña</label>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirmar Contraseña*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">🔒</span>
              <input
                type="password"
                placeholder="********"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center mt-2">
              <input type="checkbox" className="mr-2" />
              <label className="text-gray-400 text-xs">Mostrar Contraseña</label>
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
          <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-600 transition">
            Subir mi imagen
          </button>
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
          <div>
            <label className="block text-sm font-medium mb-1">Nombre(s)*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="Juana"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Apellido Paterno */}
          <div>
            <label className="block text-sm font-medium mb-1">Apellido Paterno*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="De Arco"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Apellido Materno */}
          <div>
            <label className="block text-sm font-medium mb-1">Apellido Materno</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="Ramírez"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-sm font-medium mb-1">Correo Electrónico*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">@</span>
              <input
                type="email"
                placeholder="juanadearco@disney.com"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Celular */}
          <div>
            <label className="block text-sm font-medium mb-1">Celular*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">📞</span>
              <input
                type="tel"
                placeholder="+52 222 123 4567"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
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
          <div>
            <label className="block text-sm font-medium mb-1">Nombre(s)*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="Juana"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Apellido Paterno */}
          <div>
            <label className="block text-sm font-medium mb-1">Apellido Paterno*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="De Arco"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Apellido Materno */}
          <div>
            <label className="block text-sm font-medium mb-1">Apellido Materno</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="Ramírez"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-sm font-medium mb-1">Correo Electrónico*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">@</span>
              <input
                type="email"
                placeholder="juanadearco@disney.com"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Celular */}
          <div>
            <label className="block text-sm font-medium mb-1">Celular*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">📞</span>
              <input
                type="tel"
                placeholder="+52 222 123 4567"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
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
          <div>
            <label className="block text-sm font-medium mb-1">Nombre(s)*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="Juana"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Apellido Paterno */}
          <div>
            <label className="block text-sm font-medium mb-1">Apellido Paterno*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="De Arco"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Apellido Materno */}
          <div>
            <label className="block text-sm font-medium mb-1">Apellido Materno</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="Ramírez"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-sm font-medium mb-1">Correo Electrónico*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">@</span>
              <input
                type="email"
                placeholder="juanadearco@disney.com"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Celular */}
          <div>
            <label className="blockÜber das Team text-sm font-medium mb-1">Celular*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">📞</span>
              <input
                type="tel"
                placeholder="+52 222 123 4567"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
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
          <div>
            <label className="block text-sm font-medium mb-1">Nombre de la SEDE*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">🏫</span>
              <input
                type="text"
                placeholder="Instituto Oriente"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Localización */}
          <div>
            <label className="block text-sm font-medium mb-1">Localización*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">📍</span>
              <select className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                <option>Puebla</option>
                <option>Ciudad de México</option>
                <option>Guadalajara</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
            </div>
          </div>

          {/* Dirección */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Dirección*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">📍</span>
              <input
                type="text"
                placeholder="P. Sherman Calle Wallaby 42 Sidney"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
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
          <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-600 transition">
            Subir mi imagen
          </button>
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
          <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-600 transition">
            Subir mi documento
          </button>
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
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button className="bg-green-500 text-white px-6 py-2 rounded-full flex items-center hover:bg-green-600 transition">
            Enviar Registro <span className="ml-2">📨</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationVenue;