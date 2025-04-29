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
        href: '/estadísticas',
        visible: ['superuser', 'venue_coordinator'],
      },
      {
        icon: 'Bank',
        label: 'SEDES',
        href: '/admin/sedes',
        visible: ['superuser'],
      },
      {
        icon: 'Bank',
        label: 'Mi SEDE',
        href: '/admin/mi-sede',
        visible: ['venue_coordinator'],
      },
      {
        icon: 'Users',
        label: 'Gestionar Usuarios',
        href: '/admin/gestion-usuarios',
        visible: ['superuser'],
      },
      {
        icon: 'PaperPlaneTilt',
        label: 'Solicitudes',
        href: '/admin/solicitudes',
        visible: ['superuser', 'venue_coordinator'],
      },
      {
        icon: 'Certificate',
        label: 'Diplomas',
        href: '/admin/diplomas',
        visible: ['superuser', 'venue_coordinator'],
      },
      {
        icon: 'Envelope',
        label: 'Correos',
        href: '/admin/correos',
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
    // Si no hay rol todavía, puedes devolver null o un pequeño loader si quieres
    return null;
  }

  return (
    <div className='text-[clamp(1rem,1.5vw,3rem)]'>
      {menuItems.map((section) => (
        <div key={section.title} className='flex flex-col gap-[1.5vmax] px-2'>
          {section.items
            .filter((item) => item.visible.includes(role)) // 👈 Filtrar según el rol
            .map((item) => {
              const IconComponent = Icons[item.icon as keyof typeof Icons];
              return (
                <OptionLink
                  key={item.label}
                  label={item.label}
                  Icon={IconComponent}
                  href={item.href}
                />
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
