'use client';
import React, { useState, useEffect } from 'react';
import GenericRadialChart from '@/components/graphics/bases/genericPieChart';
import GenericBarChart from '@/components/graphics/bases/genericBarChart';
import GenericLineChart from '@/components/graphics/bases/genericLineChart';
import PageTitle from '@/components/headers_menu_users/pageTitle';
import CardSection from './CardSection';
import { useIsResizing } from '@/components/hooks/useIsResizing';
import Button from '@/components/buttons_inputs/Button';
import { useNotification } from '@/components/buttons_inputs/Notification';

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
      : direction === 'column' && isResizing
        ? 'max-h-full min-h-full h-full'
        : 'flex flex-grow md:min-h-[380px] lg:min-h-[430px] md:max-h-[380px] lg:max-h-[430px] md:w-[100px]';

  const transitionClasses = 'transition-[max-width,max-height,flex-grow] duration-500 ease-in-out';

  return (
    <div
      className={`relative bg-white rounded-xl shadow overflow-hidden ${transitionClasses}
        ${
          isMinimized ? minimizedClasses : grow
        } ${className} items-center justify-center w-full flex`}
    >
      {/* Contenido + Overlay */}
      <div className='relative w-full h-full flex items-center justify-center'>
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
            <div className='bg-white border border-gray-300 shadow rounded-xl px-6 py-4 text-center text-gray-600 text-sm max-w-xs w-full flex justify-center'>
              {isMinimized ? (
                <>Expandir la gráfica.</>
              ) : (
                <>Ajusta tu ventana para mostrar la gráfica.</>
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
  const [userRole, setUserRole] = useState<string>('');
  const [isBackingUp, setIsBackingUp] = useState(false);
  const isResizing = useIsResizing(800); // se puede ajustar
  const { notify } = useNotification();

  useEffect(() => {
    setUserRole(typeof window !== 'undefined' ? localStorage.getItem('user_role') || '' : '');
  }, []);

  // Descargar respaldo (Excel + diplomas en ZIP)
  const handleBackup = async () => {
    setIsBackingUp(true);
    try {
      const res = await fetch('/api/admin/backup', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${
            typeof window !== 'undefined' ? localStorage.getItem('api_token') : ''
          }`,
        },
      });
      if (!res.ok) throw new Error('Error generando respaldo');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'respaldo.zip';
      a.click();
      a.remove();
      notify({
        color: 'green',
        title: 'Respaldo descargado correctamente',
        message: 'El respaldo (Excel + diplomas) se ha descargado exitosamente.',
        iconName: 'CheckCircle',
        variant: 'two',
        duration: 5000,
      });
    } catch (err) {
      notify({
        color: 'red',
        title: 'Error al descargar respaldo',
        message: 'No se pudo descargar el respaldo. Intenta nuevamente más tarde.',
        iconName: 'SealWarning',
        variant: 'two',
        duration: 5000,
      });
    }
    setIsBackingUp(false);
  };

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
          grow='overflow-visible md:flex-[2_2_0%] lg:flex-[24_3_15%] w-full h-fit md:max-h-[380px] lg:max-h-[430px] md:min-h-[380px] lg:min-h-[430px]'
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
          title={'Personas Aceptadas en tu SEDE'}
          labelFormatterPrefix={''}
          selectAll={false}
          deselectAll={true}
          maxItemsSelected={5}
        />
      </ChartWrapper>

      {/* BOTÓN DE DESCARGA DE RESPALDO */}
      <div className='flex flex-col gap-3 mt-10 items-end'>
        <Button
          label={isBackingUp ? 'Generando respaldo...' : 'Descargar respaldo (Excel + Diplomas)'}
          variant='primary'
          onClick={handleBackup}
          disabled={isBackingUp}
          showLeftIcon
          IconLeft={() => <span className='material-icons'>download</span>}
        />
      </div>
    </div>
  );
};

export default EstadisticasAdmin;
