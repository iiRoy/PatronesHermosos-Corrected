'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/headers_menu_users/navbar';

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(false);

  const handleResize = () => {
    // Tailwind breakpoint `md` = 768px, `lg` = 1024px
    const width = window.innerWidth;
    if (width >= 768) {
      setIsVisible(true);  // md o más
    } else {
      setIsVisible(false); // menor que md
    }
  };

  useEffect(() => {
    handleResize(); // Verifica al montar el componente
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : null;
    const storedRole = typeof window !== 'undefined' ? localStorage.getItem('user_role') : null;

    if (token && storedRole) {
      if (storedRole === 'superuser') {
        router.push('/admin/estadisticas');
      } else if (storedRole === 'venue_coordinator') {
        router.push('/coordinador/estadisticas');
      }
    } else {
      setRole(null);
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className='h-screen w-screen flex items-center justify-center bg-[#160D17]'>
        {/* Loader visual */}
        <div className='text-white text-lg animate-pulse'>Cargando...</div>
      </div>
    );
  }

  return (
    <div className='h-screen w-screen flex flex-col text-text bg-[#160D17]'>
      <div className='h-[13%] min-h-[70px] shadow-custom-dark w-full flex items-center justify-between bg-[var(--background)] rounded-br-[1.5vmax] rounded-bl-[1.5vmax] z-10 overflow-hidden'>
        <Navbar />
      </div>
                  {/* Círculos decorativos */}
      <div   className={`
    absolute mt-[50px] inset-0 overflow-hidden
    transition-opacity duration-500 ease-in-out
    ${isVisible ? 'opacity-100' : 'opacity-0'}
  `}>
        <div className='absolute top-[10vw] left-[-2vw] w-[6vw] h-[6vw] bg-[#C57FAB] rounded-full -translate-y-1/2 shadow-custom-dark'></div>
        <div className='absolute top-0 left-[3vw] w-[10vw] h-[10vw] bg-[#97639C] rounded-full translate-x-1/3 -translate-y-1/4 shadow-custom-dark'></div>
        <div className='absolute top-[4vw] left-[-4vw] w-[9vw] h-[9vw] bg-[#2E1C31] rounded-full translate-x-1/4 -translate-y-1/2 shadow-custom-dark'></div>
        <div className='absolute top-[6vw] left-[16vw] w-[4vw] h-[4vw] bg-[#EBE6EB] rounded-full shadow-custom-dark'></div>
        <div className='absolute top-[9vw] left-[5vw] w-[2.5vw] h-[2.5vw] bg-[#EBE6EB] rounded-full shadow-custom-dark'></div>
      </div>
      <div className={`absolute inset-0 overflow-clip transition-opacity duration-500 ease-in-out
    ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className='absolute bottom-[-7vw] right-[2vw] w-[10vw] h-[10vw] bg-[#C57FAB] rounded-full -translate-y-1/2 shadow-custom-dark'></div>
        <div className='absolute bottom-[-5vw] right-[15vw] w-[7vw] h-[7vw] bg-[#C57FAB] rounded-full -translate-y-1/2 shadow-custom-dark'></div>
        <div className='absolute bottom-[-6vw] right-[12vw] w-[8vw] h-[8vw] bg-[#97639C] rounded-full translate-x-1/3 -translate-y-1/4 shadow-custom-dark'></div>
        <div className='absolute bottom-[-9vw] right-[22vw] w-[8vw] h-[8vw] bg-[#2E1C31] rounded-full translate-x-1/4 -translate-y-1/2 shadow-custom-dark'></div>
        <div className='absolute bottom-[-7vw] right-[0vw] w-[7vw] h-[7vw] bg-[#2E1C31] rounded-full translate-x-1/4 -translate-y-1/2 shadow-custom-dark'></div>
        <div className='absolute bottom-[3vw] right-[27vw] w-[3.5vw] h-[3.5vw] bg-[#EBE6EB] rounded-full shadow-custom-dark'></div>
        <div className='absolute bottom-[6vw] right-[13vw] w-[2vw] h-[2vw] bg-[#EBE6EB] rounded-full shadow-custom-dark'></div>
      </div>
      <div className='h-fit w-full flex items-center justify-center align-middle relative z-0 overflow-y-visible overflow-x-hidden'>
        <div className='flex flex-col justify-center items-center w-full h-full'>{children}</div>
      </div>
    </div>
  );
}
