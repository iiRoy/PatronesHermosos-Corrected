'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import OptionLink from '../buttons_inputs/OptionLink';
import * as Icons from '../icons';
import Button from '../buttons_inputs/Button';

const navItems = [
  {
    title: 'NAVIGATION',
    items: [
      {
        icon: 'User',
        label: 'Postúlate',
        href: '../inicio',
      },
      {
        icon: 'Info',
        label: 'Conócenos',
        href: 'https://beautifulpatterns.org/',
      },
    ],
  },
];

const Navbar = () => {
  const router = useRouter();
  const [showPostulateMenu, setShowPostulateMenu] = useState(false);

  const handlePostulateHover = () => {
    setShowPostulateMenu(true);
  };

  const handlePostulateLeave = () => {
    setShowPostulateMenu(false);
  };

  return (
    <div className='min-h-[45px] flex items-center justify-between pr-4 pl-4 pb-2 pt-2 w-full rounded-b-lg bg-[#2E1C31] relative'>
      {/* Logo */}
      <Link
        href='/'
        className='relative h-[7vh] w-[7vh] min-h-[40px] min-w-[40px] flex items-center justify-center'
      >
        <Image
          src='/assets/logo.png'
          alt='logo'
          fill
          style={{ objectFit: 'contain' }}
          className='transition-all duration-300'
        />
      </Link>

      {/* Navegación */}
      <div className='text-[clamp(1rem,1.5vw,3rem)] items-center flex gap-[1.5vmax]'>
        {navItems.map((section) => (
          <div key={section.title} className='flex gap-[3vmax] px-2 relative'>
            {section.items.map((item) => {
              const IconComponent = Icons[item.icon as keyof typeof Icons];
              if (item.label === 'Postúlate') {
                return (
                  <div
                    key={item.label}
                    className='relative'
                    onMouseEnter={handlePostulateHover}
                    onMouseLeave={handlePostulateLeave}
                  >
                    <OptionLink label={item.label} Icon={IconComponent} href={item.href} />
                    {showPostulateMenu && (
                      <div className='absolute  left-1/2  mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-2 z-10 dropdown-menu'>
                        <div className='triangle-up'></div>
                        <ul className='list-none p-0 m-0'>
                          <li>
                            <Link
                              href='/formulario/participante'
                              className='block px-2 py-1 hover:bg-gray-200 rounded'
                            >
                              Participante
                            </Link>
                          </li>
                          <li>
                            <Link
                              href='/formulario/colaborador'
                              className='block px-2 py-1 hover:bg-gray-200 rounded'
                            >
                              Colaborador
                            </Link>
                          </li>
                          <li>
                            <Link
                              href='/formulario/sede'
                              className='block px-2 py-1 hover:bg-gray-200 rounded'
                            >
                              Sede
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <OptionLink
                  key={item.label}
                  label={item.label}
                  Icon={IconComponent}
                  href={item.href}
                />
              );
            })}
            <Button
              label='Iniciar Sesión'
              variant='secondary'
              showLeftIcon
              IconLeft={Icons.FingerprintSimple}
              disabled={usePathname() == '/login'}
              onClick={() => router.push('/login')}
              activeTransition={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
