'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import OptionLink from '../buttons_inputs/OptionLink';
import * as Icons from '../icons';

const navItems = [
  {
    title: 'NAVIGATION',
    items: [
      {
        icon: 'User',
        label: 'Postúlate',
        href: '/',
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
  return (
    <div className='min-h-[45px] flex item-center justify-between pr-4 pl-4 pb-2 pt-2 w-full rounded-b-lg'>
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
          <div key={section.title} className='flex gap-[1.5vmax] px-2'>
            {section.items.map((item) => {
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
    </div>
  );
};

export default Navbar;
