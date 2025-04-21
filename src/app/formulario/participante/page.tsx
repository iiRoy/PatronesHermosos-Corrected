'use client';
import React from 'react';
const RegistrationParticipant: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-2 h-12 bg-purple-600 mr-4"></div>
            <h1 className="text-2xl md:text-3xl font-bold">Formulario de Registro<br />Participantes</h1>
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-red-600 transition">
            Regresar <span className="ml-2">✕</span>
          </button>
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
          <div>
            <label className="block text-sm font-medium mb-1">Nombre(s)*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="María José de la Rosa"
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
                placeholder="Hernández"
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
                placeholder="Sánchez"
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
                placeholder="mariajhrndzsan@gmail.com"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Grado */}
          <div>
            <label className="block text-sm font-medium mb-1">Grado*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">📅</span>
              <select className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                <option>3°</option>
                <option>1°</option>
                <option>2°</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
            </div>
          </div>

          {/* Escolaridad */}
          <div>
            <label className="block text-sm font-medium mb-1">Escolaridad*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">🏫</span>
              <select className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                <option>Secundaria</option>
                <option>Preparatoria / Bachillerato</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
            </div>
          </div>
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
          <div>
            <label className="block text-sm font-medium mb-1">Nombre(s)*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="María de la Rosa"
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
                placeholder="Sánchez"
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
                placeholder="Mendoza"
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
                placeholder="mariajhrndzsan@gmail.com"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationParticipant;