'use client';
import { useEffect, useState } from 'react';
import GenericRadialChart from '@/components/graphics/bases/genericRadialChart';
import GenericBarChart from '@/components/graphics/bases/genericBarChart';
import UserCard from '@/components/headers_menu_users/UserCard';
import PageTitle from '@/components/headers_menu_users/pageTitle';

const EstadisticasAdmin = () => {
  const [resumenEvento, setResumenEvento] = useState({
    participantes: 0,
    colaboradores: 0,
    mentoras: 0,
    coordinadoras: 0,
  });

  useEffect(() => {
    fetch('/api/dashboard', {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.resumenEvento) {
          setResumenEvento(data.resumenEvento);
        }
      })
      .catch((err) => console.error('Error cargando resumenEvento:', err));
  }, []);

  return (
    <div className='p-6 pl-14 flex gap-4 flex-col'>
      <PageTitle>Estadísticas</PageTitle>

      <div className='flex flex-col'>
        <div className='w-full lg:w-4/7 flex flex-col gap-8'>
          {/* USER CARDS */}
          <div className='flex gap-4 justify-between flex-wrap'>
            <UserCard type='participantes' count={resumenEvento.participantes} />
            <UserCard type='colaboradores' count={resumenEvento.colaboradores} />
            <UserCard type='mentoras' count={resumenEvento.mentoras} />
            <UserCard type='coordinadoras' count={resumenEvento.coordinadoras} />
          </div>

          {/* GRAPHS */}
          <div className='flex gap-7 flex-col md:flex-row'>
            <div className='w-full lg:w-2/5 h-[35vmax] min-h-[400px] text-secondary'>
              <GenericRadialChart
                apiEndpoint='/api/dashboard'
                dataPath='resumenColaboradoras'
                title='Colaboradoras'
                // colorPalette={[
                //   '#E85D50',
                //   '#FED569',
                //   '#4CB197',
                //   '#D6DCDD',
                // ]}
              />
            </div>
            <div className='w-full lg:w-3/5 h-[35vmax] min-h-[400px] bg-white rounded-2xl text-primary'></div>
          </div>

          {/* BAR CHART */}
          <div className='w-full h-[40vmax] min-h-[500px] text-accent'>
            <GenericBarChart
              apiEndpoint='/api/dashboard'
              dataPath='sedes'
              xKey='name'
              title='Personas por SEDE'
              labelFormatterPrefix='SEDE:'
            />
          </div>
        </div>
        <div className='flex flex-col w-full lg:w-4/6'></div>
      </div>
    </div>
  );
};

export default EstadisticasAdmin;
