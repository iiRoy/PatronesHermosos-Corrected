'use client';

import React, { useEffect, useState } from 'react';
import OptionLink from '../buttons_inputs/OptionLink';
import * as Icons from '../icons';

const menuItems = [
  {
    title: 'MENU',
    items: [
      {
        icon: 'ChartBarHorizontal',
        label: 'Estadísticas',
        href: '/estadisticas',
        visible: ['superuser', 'venue_coordinator'],
      },
      {
        icon: 'Bank',
        label: 'SEDES',
        href: '/sedes',
        visible: ['superuser'],
      },
      {
        icon: 'Bank',
        label: 'Mi SEDE',
        href: '/mi-sede',
        visible: ['venue_coordinator'],
      },
      {
        icon: 'Users',
        label: 'Gestionar Usuarios',
        href: '/gestionarUsuarios/coordinadoras',
        visible: ['superuser'],
      },
      {
        icon: 'PaperPlaneTilt',
        label: 'Solicitudes',
        href: '/solicitudesRegistro',
        visible: ['superuser', 'venue_coordinator'],
      },
      {
        icon: 'Certificate',
        label: 'Diplomas',
        href: '/gestionarDiplomas',
        visible: ['superuser', 'venue_coordinator'],
      },
      {
        icon: 'Envelope',
        label: 'Correos',
        href: '/gestionarCorreos',
        visible: ['superuser'],
      },
    ],
  },
];

const Menu: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = typeof window !== 'undefined' ? localStorage.getItem('user_role') : null;
    setRole(storedRole);
  }, []);

  if (!role) {
    return null;
  }

  // Establecer prefijo base según el rol
  const basePath = role === 'superuser' ? '/admin' : '/coordinator';

  return (
    <div className='text-[clamp(1rem,1.5vw,3rem)]'>
      {menuItems.map((section) => (
        <div key={section.title} className='flex flex-col gap-[1.5vmax] px-2'>
          {section.items
            .filter((item) => item.visible.includes(role))
            .map((item) => {
              const IconComponent = Icons[item.icon as keyof typeof Icons];
              const fullPath = `${basePath}${item.href}`;
              {
                /* const fullPath =
                 item.href.startsWith('/estadisticas') // Excepción si es ruta compartida
                  ? item.href
                  : `${basePath}${item.href}`; }*/
              }
              return (
                <OptionLink
                  key={item.label}
                  label={item.label}
                  Icon={IconComponent}
                  href={fullPath}
                />
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
