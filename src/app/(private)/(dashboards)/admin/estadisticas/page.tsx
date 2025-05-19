'use client';
import React, { useState } from 'react';
import GenericRadialChart from '@/components/graphics/bases/genericPieChart';
import GenericBarChart from '@/components/graphics/bases/genericBarChart';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import CardSection from './CardSection';

const EstadisticasAdmin = () => {
  const [barMinimized, setBarMinimized] = useState(false);
  return (
    <div className='p-6 pl-14 flex gap-4 flex-col text-primaryShade'>
      <PageTitle>Estadísticas</PageTitle>
      <CardSection />
      <div className='flex flex-col gap-4'>
        {/* GRÁFICAS */}
        <div className='flex gap-7 flex-col md:flex-row'>
          <div className='w-full lg:w-2/5 h-[35vmax] min-h-[400px] text-secondary'>
            <GenericRadialChart
              apiEndpoint='/api/data?page=colaboradoras'
              dataPath='resumenColaboradoras'
              areaInner='rol'
              title='Colaboradoras'
            />
          </div>
          <div className='w-full lg:w-3/5 h-[35vmax] min-h-[400px] bg-white rounded-2xl text-primary'></div>
        </div>

<<<<<<< Updated upstream
        <div className='w-full h-[40vmax] min-h-[500px] text-accent'>
          <GenericBarChart
            apiEndpoint='/api/data?page=sedes'
            dataPath='resumenSedes'
            xKey='sede'
            title='Personas Aceptadas por SEDE'
            labelFormatterPrefix='SEDE: '
            selectAll = {false}
            deselectAll = {true}
            maxItemsSelected={5}
          />
=======
        {/* GRÁFICA DE BARRAS */}
        <div>
          <div
            className={`w-full transition-all duration-500 ease-in-out overflow-hidden ${
              barMinimized
                ? 'max-h-10 opacity-100 translate-y-0 pointer-events-auto'
                : 'max-h-0 opacity-0 translate-y-5 pointer-events-none'
            }`}
          >
            <div
              onClick={() => setBarMinimized(false)}
              className='w-full h-10 flex items-center justify-center bg-white rounded-xl shadow text-sm text-gray-500 cursor-pointer hover:text-black'
            >
              Expandir gráfica
            </div>
          </div>
          <div
            className={`w-full transition-all duration-700 ease-in-out overflow-hidden ${
              barMinimized
                ? 'max-h-0 opacity-0 translate-y-10 pointer-events-none'
                : 'max-h-100 opacity-100 translate-y-0 pointer-events-auto'
            }`}
          >
            {!barMinimized && (
              <div className='w-full flex h-[40vmax] min-h-[500px] text-accent'>
                <GenericBarChart
                  onMinimize={() => setBarMinimized(true)}
                  apiEndpoint='/api/data?page=sedes'
                  dataPath='resumenSedes'
                  xKey='sede'
                  title='Personas Aceptadas por SEDE'
                  labelFormatterPrefix='SEDE: '
                  selectAll={false}
                  deselectAll={true}
                  maxItemsSelected={5}
                />
              </div>
            )}
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
      <div className='flex flex-col w-full lg:w-4/6'></div>
    </div>
  );
};

export default EstadisticasAdmin;
