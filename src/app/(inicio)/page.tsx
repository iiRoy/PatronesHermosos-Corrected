// app/page.tsx
'use client';

import Button from '@/components/buttons_inputs/Button';
import withIconDecorator from '@/components/decorators/IconDecorator';
import {
  BookBookmark,
  Medal,
  Student,
  MedalMilitary,
  LightbulbFilament,
  Certificate,
} from '@/components/icons';
import Navbar from '@/components/headers_menu_users/navbar';
import Image from 'next/image';
import { useState } from 'react';

// Wrappers para que los íconos conserven estilos al colocarlos dentro de los popups
const DecoratedMedalMilitary = withIconDecorator(MedalMilitary);
const DecoratedLightbulb = withIconDecorator(LightbulbFilament);
const DecoratedCertificate = withIconDecorator(Certificate);
const DecoratedBookBookmark = withIconDecorator(BookBookmark);

// Tipos para el estado de hover
type ButtonType = 'participante' | 'colaborador' | 'sede' | null;

export default function PatronesHermosos() {
  const [hoveredButton, setHoveredButton] = useState<ButtonType>(null);

  return (
    <div className='h-full w-full custom-scrollbar overflow-hidden'>
      <div className='pagina-inicio relative text-white flex items-center justify-center p-6 overflow-hidden'>
        {/* Fondos diagonales */}
        <div className='absolute inset-0 opacity-0 md:opacity-100 w-[55vw] h-[60vw] bg-diagonal-morado transition-opacity duration-200 ease-in-out'></div>
        <div className='absolute inset-0 opacity-0 md:opacity-100 w-[51vw] h-[56vw] bg-diagonal-blanco transition-opacity duration-200 ease-in-out'></div>

        {/* Círculos decorativos grandes */}
        <div className='absolute top-[27vw] left-[10vw] w-[21vw] h-[21vw] bg-[#531D59] z-20 rounded-full hidden lg:block shadow-custom-dark'></div>
        <div className='absolute top-[29.4vw] left-[12.4vw] z-30 hidden lg:block'>
          <Image
            src='/assets/imagen-inicio2.png'
            alt='Imagen circular inferior'
            width={200}
            height={200}
            className='rounded-full shadow-custom-dark w-[18.5vw] h-[18.5vw]'
          />
        </div>
        <div className='absolute top-[6.5vw] -left-[2vw] w-[25vw] h-[25vw] bg-[#EED0F1] z-20 rounded-full hidden lg:block shadow-custom-dark'></div>
        <div className='absolute top-[8vw] left-[1vw] w-[22vw] h-[22vw] z-30 hidden lg:block'>
          <Image
            src='/assets/imagen-inicio1.png'
            alt='Imagen circular superior'
            width={400}
            height={400}
            className='rounded-full shadow-custom-dark'
          />
        </div>

        {/* Contenido central */}
        <div className='flex w-full justify-center md:justify-end'>
          <div className='lg:basis-1/4' />
          <div className='relative z-20 text-center contenido-inicio lg:basis-3/4'>
            <div className='flex justify-end pb-16 items-center'>
              <h1 className='text-4xl mb-4 text-[#2E1C31] titulo-inicio text-center md:text-end'>
                <span className='text-3xl lg:text-4xl italic'>¡Nos alegra verte en</span>
                <br />
                <span className='text-4xl lg:text-5xl font-semibold'>Patrones Hermosos!</span>
              </h1>
              <div className='w-2 rounded-full h-24 lg:h-24 notification-icon-purple ml-4 hidden md:block'></div>
            </div>
            <p className='text-2xl md:text-3xl lg:text-4xl font-semibold mb-12'>
              ¿Cómo te gustaría postularte?
            </p>

            <div className='flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto gap-7'>
              {/* Participante */}
              <div
                className='text-center relative scale-[1.2]'
                onMouseEnter={() => setHoveredButton('participante')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div
                  className={`${
                    hoveredButton === 'participante' ? 'scale-[1.2]' : ''
                  } transition-transform duration-500`}
                >
                  <Button
                    label='Participante'
                    variant='primary'
                    showLeftIcon
                    IconLeft={DecoratedBookBookmark}
                    href='/formulario/participante'
                    className=''
                  />
                </div>
                <div
                  className={`description-box ${
                    hoveredButton === 'participante'
                      ? 'opacity-100 pointer-events-auto'
                      : 'opacity-0 pointer-events-none'
                  } transition-opacity duration-300 bg-[#97639c] scale-[80%]`}
                >
                  <div className='flex justify-center items-center m-2'>
                    <DecoratedMedalMilitary
                      width='3vw'
                      height='3vw'
                      fillColor='#ebe6eb'
                      strokeColor='currentColor'
                    />
                  </div>
                  <p className='text-md text-white'>
                    ¿Quieres participar en el evento? Asegúrate de registrarte en el siguiente
                    formulario.
                  </p>
                </div>
              </div>

              {/* Colaborador */}
              <div
                className='text-center relative scale-[1.2] md:ml-8'
                onMouseEnter={() => setHoveredButton('colaborador')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div
                  className={`${
                    hoveredButton === 'colaborador' ? 'scale-[1.2]' : ''
                  } transition-transform duration-500`}
                >
                  <Button
                    label='Colaborador'
                    variant='secondary'
                    showLeftIcon
                    IconLeft={Medal}
                    href='/formulario/colaborador'
                    className=''
                  />
                </div>
                <div
                  className={`description-box-secondary ${
                    hoveredButton === 'colaborador'
                      ? 'opacity-100 pointer-events-auto'
                      : 'opacity-0 pointer-events-none'
                  } transition-opacity duration-300 bg-[#683756] scale-[80%]`}
                >
                  <div className='flex justify-center items-center m-4'>
                    <DecoratedLightbulb
                      width='3vw'
                      height='3vw'
                      fillColor='#ebe6eb'
                      strokeColor='currentColor'
                    />
                  </div>
                  <p className='text-md text-white'>
                    ¿Eres estudiante de universidad y te gustaría apoyarnos? Regístrate aquí.
                  </p>
                </div>
              </div>

              {/* Sede */}
              <div
                className='text-center relative scale-[1.2]'
                onMouseEnter={() => setHoveredButton('sede')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div
                  className={`${
                    hoveredButton === 'sede' ? 'scale-[1.2]' : ''
                  } transition-transform duration-500`}
                >
                  <Button
                    label='SEDE'
                    variant='primary'
                    showLeftIcon
                    IconLeft={Student}
                    href='/formulario/sede'
                    className=''
                  />
                </div>
                <div
                  className={`description-box ${
                    hoveredButton === 'sede'
                      ? 'opacity-100 pointer-events-auto'
                      : 'opacity-0 pointer-events-none'
                  } transition-opacity duration-300 bg-[#97639c] scale-[80%]`}
                >
                  <div className='flex justify-center items-center m-4'>
                    <DecoratedCertificate
                      width='3vw'
                      height='3vw'
                      fillColor='#ebe6eb'
                      strokeColor='currentColor'
                    />
                  </div>
                  <p className='text-md text-white'>
                    ¿Acaso quieres registrar a tu institución como SEDE? Completa el siguiente
                    formulario.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
