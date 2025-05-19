'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/buttons_inputs/Button';
import { FingerprintSimple } from '@/components/icons';

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
    <div className='flex item-center justify-between pr-4 pl-4 pb-2 pt-2 bg-[#2E1C31] shadow-md w-full rounded-b-lg'>
      {/*LOGO*/}
      <div className='hidden md:block items-center justify-center'>
        <Image src='/logo.png' alt='logo' width={60} height={60} className='center' />
      </div>
      {/*NAVIGATION*/}
      <div className=''>
        {navItems.map((i) => (
          <div key={i.title} className='flex gap-2 items-center justify-center h-full'>
            {i.items.map((item) =>
              item.type === 'link' ? (
                <Link
                  href={item.href}
                  key={item.label}
                  className='flex items-center justify-center gap-2 p-2 rounded-md transition duration-200 ease-in-out group'
                >
                  <div className='center'>
                    <Image
                      src={item.icon}
                      alt=''
                      width={25}
                      height={25}
                      className='group-hover:fill-[#B673BD] transition duration-200 ease-in-out'
                    />
                  </div>
                  <span className='hidden lg:block text-white'>{item.label}</span>
                </Link>
              ) : (
                <Button
                  label='Perfil'
                  variant='secondary'
                  showLeftIcon
                  IconLeft={FingerprintSimple}
                />
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
