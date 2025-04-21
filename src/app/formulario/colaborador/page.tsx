'use client';
import React from 'react';
const RegistrationCollaborator: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-2 h-12 bg-purple-600 mr-4"></div>
            <h1 className="text-2xl md:text-3xl font-bold">Formulario de Registro<br />Colaborador</h1>
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-red-600 transition">
            Regresar <span className="ml-2">✕</span>
          </button>
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

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">Nombre(s)*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">✎</span>
              <input
                type="text"
                placeholder="Gwen"
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
                placeholder="Stacey"
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

          {/* Institución Académica */}
          <div>
            <label className="block text-sm font-medium mb-1">Institución Académica*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">🏫</span>
              <input
                type="text"
                placeholder="Tec de Monterrey"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <p className="text-gray-400 text-xs mt-1">Escribe el nombre completo de la institución académica a la cual estás asistiendo actualmente.</p>
          </div>

          {/* Carrera */}
          <div>
            <label className="block text-sm font-medium mb-1">Carrera*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">🎓</span>
              <input
                type="text"
                placeholder="Ingeniería en Mecatrónica"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <p className="text-gray-400 text-xs mt-1">Escribe el nombre completo de la carrera la cual estás estudiando actualmente.</p>
          </div>

          {/* Semestre Cursando */}
          <div>
            <label className="block text-sm font-medium mb-1">Semestre Cursando*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">📅</span>
              <select className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                <option>1° Semestre</option>
                <option>2° Semestre</option>
                <option>3° Semestre</option>
                <option>4° Semestre</option>
                <option>5° Semestre</option>
                <option>6° Semestre</option>
                <option>7° Semestre</option>
                <option>8° Semestre</option>
                <option>9° Semestre</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
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
          <div>
            <label className="block text-sm font-medium mb-1">Rol Preferido*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">🔍</span>
              <select className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                <option>Facilitadora, Staff</option>
                <option>Instructora</option>
                <option>Staff</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">*Puedes seleccionar varias opciones.</p>
          </div>

          {/* Idioma Preferido */}
          <div>
            <label className="block text-sm font-medium mb-1">Idioma Preferido*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">🌐</span>
              <select className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                <option>Cualquiera</option>
                <option>Español</option>
                <option>Inglés</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">*Puedes seleccionar varias opciones.</p>
          </div>

          {/* Dificultad Preferida */}
          <div>
            <label className="block text-sm font-medium mb-1">Dificultad Preferida*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">🎚</span>
              <select className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                <option>Básico</option>
                <option>Avanzado</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">*Puedes seleccionar varias opciones.</p>
          </div>
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

export default RegistrationCollaborator;