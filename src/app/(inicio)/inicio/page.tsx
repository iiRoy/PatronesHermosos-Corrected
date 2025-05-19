'use client';

import Button from '@/components/buttons_inputs/Button';
import { BookBookmark, Medal, Student, MedalMilitary, LightbulbFilament, Certificate } from '@/components/icons';
import Navbar from '@/components/headers_menu_users/navbar';
import Image from 'next/image';

export default function PatronesHermosos() {
  return (
    <>
      <div className='h-screen'>
        <Navbar />
        <div className="pagina-inicio relative bg-gray-900 text-white flex items-center justify-center p-6 overflow-hidden">

          {/* Fondo blanco diagonal */}
          <div className="absolute inset-0 w-[0%] md:w-[30%] lg:w-[52%] bg-diagonal-morado "></div>

          <div className="absolute inset-0 w-[0%] md:w-[28%] lg:w-[50%] bg-diagonal-blanco"></div>

          {/* Imágenes circulares */}
          <div className="absolute top-[12%] left-[2%] w-[275px] h-[275px] bg-[#C57FAB] z-20 rounded-full hidden lg:block">
          </div>
          <div className="absolute top-[14%] left-[4%] w-[250px] h-[250px] z-30 hidden lg:block">
            <Image
              src="/images/top-image.png"
              alt="Top Circular Image"
              width={300}
              height={300}
              className="rounded-full border-4 border-white shadow-custom-dark"
            />
          </div>
          <div className="absolute top-[45%] left-[10%] w-[220px] h-[220px] bg-[#97639C] z-20 rounded-full hidden lg:block">
          </div>
          <div className="absolute top-[50%] left-[12%] w-[200px] h-[200px] z-30 hidden lg:block">
            <Image
              src="/images/bottom-image.png"
              alt="Bottom Circular Image"
              width={200}
              height={200}
              className="rounded-full border-4 border-white shadow-custom-dark"
            />
          </div>

          {/* Contenido principal */}
          <div className='flex w-full justify-center'>
            <div className='lg:basis-1/4'></div>
            <div className="relative z-10 text-center contenido-inicio lg:basis-3/4">
              <div className='flex justify-end pb-16'>
                <h1 className="text-4xl mb-4 text-[#2E1C31]  titulo-inicio text-end">
                  <span className='text-xl md:text-2xl lg:text-3xl italic'>¡Nos alegra verte en</span><br /> <span className='text-2xl md:text-3xl lg:text-4xl font-semibold'>Patrones Hermosos!</span>
                </h1>
                <div className="w-2 rounded-full h-24 lg:h-24 mr-4 notification-icon-purple ml-4"></div>
              </div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-12 font-medium">
                ¿Cómo te gustaría postularte?
              </p>

              {/* Botones y descripciones */}
              <div className="flex flex-col md:flex-row justify-center gap-12">
                {/* Botón Participante */}
                <div className="text-center">
                  <Button
                    label="Participante"
                    variant="primary"
                    showLeftIcon
                    IconLeft={BookBookmark}
                    href="/admin/gestion-usuarios/participantes"
                    className="mb-4"
                  />
                  <div className="description-box bg-[#97639c]">
                    <div className='flex justify-center items-center m-4'>
                      <MedalMilitary />
                    </div>
                    <p className="text-sm text-white">
                      ¿Quieres participar en el evento? Asegúrate de registrarte en el siguiente formulario.
                    </p>
                  </div>
                </div>

                {/* Botón Colaborador */}
                <div className="text-center">
                  <Button
                    label="Colaborador"
                    variant="secondary"
                    showLeftIcon
                    IconLeft={Medal}
                    href="/admin/gestion-usuarios/colaboradoras"
                    className="mb-4"
                  />
                  <div className="description-box-secondary bg-[#683756]">
                    <div className='flex justify-center items-center m-4'>
                      <LightbulbFilament />
                    </div>
                    <p className="text-sm text-white">
                      ¿Eres estudiante de universidad y te gustaría apoyarnos? Regístrate aquí.
                    </p>
                  </div>
                </div>

                {/* Botón SEDE */}
                <div className="text-center">
                  <Button
                    label="SEDE"
                    variant="primary"
                    showLeftIcon
                    IconLeft={Student}
                    href="formulario/sede"
                    className="mb-4"
                  />
                  <div className="description-box bg-[#97639c]">
                    <div className='flex justify-center items-center m-4'>
                      <Certificate />
                    </div>
                    <p className="text-sm text-white">
                      ¿Acaso quieres registrar a tu institución como SEDE? Completa el siguiente formulario.
                    </p>
                  </div>
                </div>

                <div className="sticky z-20 overflow-x-clip">
                  <div className="absolute top-0 right-[6vw] w-[8vw] h-[8vw] bg-[#C57FAB] rounded-full transform -translate-y-2/3 shadow-custom-dark"></div>
                  <div className="absolute top-[4vw] right-[-1vw] w-[10vw] h-[10vw] bg-[#97639C] rounded-full transform translate-x-1/3 -translate-y-1/4 shadow-custom-dark"></div>
                  <div className="absolute top-0 right-[1vw] w-[9vw] h-[9vw] bg-[#2E1C31] rounded-full transform translate-x-1/4 -translate-y-2/4 shadow-custom-dark"></div>
                  <div className="absolute top-[4vw] right-[7vw] w-[4vw] h-[4vw] bg-[#EBE6EB] rounded-full shadow-custom-dark"></div>
                  <div className="absolute top-[3vw] right-[12vw] w-[2.5vw] h-[2.5vw] bg-[#EBE6EB] rounded-full shadow-custom-dark"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}