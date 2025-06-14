'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import OptionLink from '../buttons_inputs/OptionLink';
import SubmenuLink from '../buttons_inputs/SubmenuLink';
import Button from '../buttons_inputs/Button';
import * as Icons from '../icons';
import withIconDecorator from '@/components/decorators/IconDecorator';
import { useTransition } from '../TransitionContext';

const navItems = [
  {
    title: 'NAVIGATION',
    items: [
      {
        icon: 'User',
        label: 'Postúlate',
        href: '',
      },
      {
        icon: 'Info',
        label: 'Conócenos',
        href: 'https://beautifulpatterns.org/',
      },
    ],
  },
];

const submenuPostulateLinks = [
  { label: 'Participante', icon: 'User', href: '/formulario/participante' },
  { label: 'Colaborador', icon: 'Users', href: '/formulario/colaborador' },
  { label: 'SEDE', icon: 'Bank', href: '/formulario/sede' },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { triggerTransition } = useTransition();

  // Submenú
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [fadeSubmenu, setFadeSubmenu] = useState(false);
  const [submenuCoords, setSubmenuCoords] = useState({ top: 0, left: 0 });
  const submenuTimeout = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Detecta si alguna opción del submenú está activa
  const isSubmenuActive = submenuPostulateLinks.some((link) => pathname?.startsWith(link.href));

  const triggerOpenSubmenu = () => {
    if (submenuTimeout.current) clearTimeout(submenuTimeout.current);

    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setSubmenuCoords({
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2,
      });
    }

    if (!submenuVisible) {
      setSubmenuVisible(true);
      setTimeout(() => setFadeSubmenu(true), 10);
    } else {
      setFadeSubmenu(true);
    }
  };

  const triggerCloseSubmenu = () => {
    if (submenuTimeout.current) clearTimeout(submenuTimeout.current);
    setFadeSubmenu(false);
    submenuTimeout.current = setTimeout(() => {
      setSubmenuVisible(false);
    }, 180);
  };

  // Permite abrir/cerrar con click
  const handlePostulateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!submenuVisible) {
      triggerOpenSubmenu();
    } else {
      triggerCloseSubmenu();
    }
  };

  return (
    <div className='relative z-40 min-h-[70px] h-[12vh] flex items-center justify-between px-6 w-full rounded-b-lg bg-[#2E1C31]'>
      {/* Logo */}
      <Link
        href='/'
        className='relative h-[8vmin] w-[8vmin] min-h-[60px] min-w-[60px] flex items-center justify-center'
        onClick={(e) => {
          e.preventDefault();
          if (pathname !== '/') triggerTransition('/');
        }}
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
              const DecoratedIcon = withIconDecorator(IconComponent);
              if (item.label === 'Postúlate') {
                return (
                  <div
                    key={item.label}
                    className='relative flex items-center'
                    ref={triggerRef}
                    onMouseEnter={triggerOpenSubmenu}
                    onMouseLeave={triggerCloseSubmenu}
                  >
                    <span
                      tabIndex={0}
                      onClick={handlePostulateClick}
                      className='cursor-pointer flex items-center'
                      style={{ height: '100%' }}
                    >
                      <OptionLink label={item.label} Icon={DecoratedIcon} href={item.href} />
                    </span>
                    {submenuVisible &&
                      createPortal(
                        <div
                          className={`fixed z-50 transition-opacity duration-200 ${fadeSubmenu ? 'opacity-100' : 'opacity-0'}`}
                          style={{
                            top: submenuCoords.top,
                            left: submenuCoords.left - 120,
                          }}
                          onMouseEnter={triggerOpenSubmenu}
                          onMouseLeave={triggerCloseSubmenu}
                        >
                          {/* flechita */}
                          <div className='absolute left-[110px] -top-2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white' />
                          <div className='bg-white rounded-lg shadow-lg w-56 p-2 flex flex-col border border-[#6E2D75]'>
                            {submenuPostulateLinks.map(({ label, icon, href }) => {
                              const SubIcon = withIconDecorator(Icons[icon as keyof typeof Icons]);
                              const isActive = pathname?.startsWith(href);
                              return (
                                <Link
                                  key={label}
                                  href={href}
                                  className={`
                                    flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors
                                    ${
                                      isActive
                                        ? 'bg-[#6E2D75] text-white'
                                        : 'text-[#6E2D75] hover:bg-[#ede6f7]'
                                    }
                                  `}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (pathname !== href) triggerTransition(href);
                                    setSubmenuVisible(false);
                                  }}
                                >
                                  <SubIcon width={20} height={20} />
                                  {label}
                                </Link>
                              );
                            })}
                          </div>
                        </div>,
                        document.body,
                      )}
                  </div>
                );
              }

              return (
                <OptionLink
                  key={item.label}
                  label={item.label}
                  Icon={DecoratedIcon}
                  href={item.href}
                />
              );
            })}
            <Button
              label='Iniciar Sesión'
              variant='secondary'
              showLeftIcon
              IconLeft={Icons.FingerprintSimple}
              disabled={pathname == '/login'}
              onClick={() => {
                if (pathname !== '/login') triggerTransition('/login');
              }}
              activeTransition={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
