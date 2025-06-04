'use client';
import React, { useState } from 'react';
import GenericRadialChart from '@/components/graphics/bases/genericPieChart';
import GenericBarChart from '@/components/graphics/bases/genericBarChart';
import GenericLineChart from '@/components/graphics/bases/genericLineChart';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import CardSection from './CardSection';
import { useIsResizing } from '@/components/hooks/useIsResizing';

const ChartWrapper = ({
  title,
  isMinimized,
  onExpand,
  isResizing,
  children,
  direction = 'column',
  className = '',
  grow = 'flex-1',
}: {
  title: string;
  isMinimized: boolean;
  onExpand: () => void;
  isResizing: boolean;
  children: React.ReactElement<{ isFrozen?: boolean }>;
  direction?: 'row' | 'column';
  className?: string;
  grow?: string;
}) => {
    const minimizedClasses =
    direction === 'column' && isMinimized
      ? 'max-h-[100px] min-h-[100px] h-[100px]'
      : direction === 'column' && isResizing ? 'max-h-full min-h-full h-full' : 'flex flex-grow md:min-h-[380px] lg:min-h-[430px] md:max-h-[380px] lg:max-h-[430px] md:w-[100px]';

  const transitionClasses =
    'transition-[max-width,max-height,flex-grow] duration-500 ease-in-out';

  return (
    <div
      className={`relative bg-white rounded-xl shadow overflow-hidden ${transitionClasses}
        ${isMinimized ? minimizedClasses : grow} ${className} items-center justify-center w-full flex`}
    >
      {/* Contenido + Overlay */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className={`
            w-full h-full items-center justify-center
            ${isMinimized || isResizing ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            transition-opacity duration-100 ease-in-out
          `}
        >
          {React.isValidElement(children)
            ? React.cloneElement(children, { isFrozen: isResizing })
            : children}
        </div>

        {/* Placeholder de overlay */}
        {(isMinimized || isResizing) && (
          <div
            onClick={isMinimized ? onExpand : undefined}
            className={`absolute inset-0 z-10 w-full h-full flex items-center justify-center px-4
            ${isMinimized ? 'cursor-pointer hover:text-black' : ''}`}
          >
            <div className="bg-white border border-gray-300 shadow rounded-xl px-6 py-4 text-center text-gray-600 text-sm max-w-xs w-full flex justify-center">
              {isMinimized ? (
                <>
                  Expandir la gráfica.
                </>
              ) : (
                <>
                  Ajusta tu ventana para mostrar la gráfica.
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EstadisticasAdmin = () => {
  const [radialMinimized, setRadialMinimized] = useState(false);
  const [lineMinimized, setLineMinimized] = useState(false);
  const [barMinimized, setBarMinimized] = useState(false);
  const isResizing = useIsResizing(800); // se puede ajustar

  return (
    <div className='relative p-6 pl-9 flex flex-col gap-4 text-primaryShade'>
      <PageTitle>Estadísticas</PageTitle>
      <CardSection />

      {/* BLOQUE RADIAL + LÍNEA */}
      <div className='flex flex-col md:flex-row gap-4 transition-all duration-500 ease-in-out md:max-h-[425px] h-fit justify-center items-center'>
        <ChartWrapper
          title='Colaboradoras'
          isMinimized={radialMinimized}
          onExpand={() => setRadialMinimized(false)}
          isResizing={isResizing}
          direction='row'
          grow='md:flex-[2_2_0%] lg:flex-[19_3_0%] w-full h-fit md:max-h-[380px] lg:max-h-[425px] md:min-h-[380px] lg:min-h-[425px]'
        >
          <GenericRadialChart
            onMinimize={() => setRadialMinimized(true)}
            apiEndpoint='/api/data?page=colaboradoras'
            dataPath='resumenColaboradoras'
            areaInner='rol'
            title='Colaboradoras'
          />
        </ChartWrapper>

        <ChartWrapper
          title='Creación de usuarios'
          isMinimized={lineMinimized}
          onExpand={() => setLineMinimized(false)}
          isResizing={isResizing}
          direction='row'
          grow='md:flex-[2_2_0%] lg:flex-[24_3_15%] w-full h-fit md:max-h-[380px] lg:max-h-[430px] md:min-h-[380px] lg:min-h-[430px]'
        >
          <GenericLineChart
            onMinimize={() => setLineMinimized(true)}
            apiEndpoint='/api/data?page=times'
            dataPath='resumenTiempos'
            title='Creación de usuarios'
          />
        </ChartWrapper>
      </div>

      {/* BLOQUE BARRAS */}
      <ChartWrapper
        title='SEDEs'
        isMinimized={barMinimized}
        onExpand={() => setBarMinimized(false)}
        isResizing={isResizing}
        direction='column'
        grow='w-full h-[500px]'
      >
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
      </ChartWrapper>
    </div>
  );
};

export default EstadisticasAdmin;
