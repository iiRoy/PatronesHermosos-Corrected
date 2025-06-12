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
  const [apiToken, setApiToken] = useState<string | null>(null);

  const handleResize = () => {
    // Tailwind breakpoint `md` = 768px, `lg` = 1024px
    const width = window.innerWidth;
    if (width >= 768) {
      setIsVisible(true); // md o más
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
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('api_token');
      const storedRole = localStorage.getItem('user_role');
      setApiToken(token);
      setRole(storedRole);

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

  // Helper para animación de entrada y movimiento aleatorio discreto
  const balls = [
    { className: 'bottom-[-6vw] right-[2vw] w-[10vw] h-[10vw] bg-[#C57FAB]', delay: 0 },
    { className: 'bottom-[-4vw] right-[15vw] w-[7vw] h-[7vw] bg-[#C57FAB]', delay: 0.2 },
    { className: 'bottom-[-5vw] right-[10vw] w-[8vw] h-[8vw] bg-[#97639C]', delay: 0.4 },
    { className: 'bottom-[-6vw] right-[21vw] w-[8vw] h-[8vw] bg-[#2E1C31]', delay: 0.6 },
    { className: 'bottom-[-2vw] right-[-1vw] w-[7vw] h-[7vw] bg-[#2E1C31]', delay: 0.8 },
    { className: 'bottom-[3vw] right-[27vw] w-[3.5vw] h-[3.5vw] bg-[#EBE6EB]', delay: 1.0 },
    { className: 'bottom-[6vw] right-[13vw] w-[2vw] h-[2vw] bg-[#EBE6EB]', delay: 1.2 },
  ];
  const ballsTop = [
    { className: 'top-[1vw] left-[38vw] w-[6vw] h-[6vw] bg-[#C57FAB]', delay: 0.1 },
    { className: 'top-[3vw] left-[30vw] w-[10vw] h-[10vw] bg-[#97639C]', delay: 0.3 },
    { className: 'top-[9vw] left-[29vw] w-[9vw] h-[9vw] bg-[#2E1C31]', delay: 0.5 },
    { className: 'top-[13vw] left-[40vw] w-[3vw] h-[3vw] bg-[#EBE6EB]', delay: 0.7 },
    { className: 'top-[4vw] left-[45vw] w-[4vw] h-[4vw] bg-[#EBE6EB]', delay: 0.9 },
  ];

  return (
    <div className='h-screen w-screen flex flex-col text-text bg-[#160D17] overflow-hidden'>
      <div className='h-[13%] min-h-[70px] shadow-custom-dark w-full flex items-center justify-between bg-[var(--background)] rounded-br-[1.5vmax] rounded-bl-[1.5vmax] z-10 overflow-visible'>
        <Navbar />
      </div>
      {/* Círculos decorativos animados y con entrada discreta */}
      <div
        className={`absolute inset-0 overflow-clip transition-opacity duration-500 ease-in-out pointer-events-none
    ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {balls.map((b, i) => (
          <div
            key={i}
            className={`absolute rounded-full -translate-y-1/2 shadow-custom-dark animate-ball-float`}
            style={{
              animationDelay: `${b.delay}s`,
              animationDuration: '7s',
              ...{},
            }}
            // Mantén las clases originales para tamaño y posición
            // y añade la animación
            // @ts-ignore
            className={`${b.className} absolute rounded-full -translate-y-1/2 shadow-custom-dark animate-ball-float`}
          ></div>
        ))}
      </div>
      <div
        className={`
    absolute mt-[30px] inset-0 overflow-x-hidden custom-scrollbar
  `}
      >
        <div className='h-fit w-full flex items-center justify-center align-middle relative z-0 overflow-y-visible overflow-x-hidden mt-10'>
          {ballsTop.map((b, i) => (
            <div
              key={i}
              className={`absolute rounded-full shadow-custom-dark animate-ball-float`}
              style={{
                animationDelay: `${b.delay}s`,
                animationDuration: '7s',
                ...{},
              }}
              // @ts-ignore
              className={`${b.className} absolute rounded-full shadow-custom-dark animate-ball-float`}
            ></div>
          ))}
          <div className='flex flex-col justify-center items-center w-full h-[90vh] animate-fade-in'>{children}</div>
        </div>
      </div>
      {/* Animaciones personalizadas */}
      <style jsx global>{`
        @keyframes ball-float {
          0% { transform: translateY(0) scale(1);}
          10% { transform: translateY(-6px) scale(1.01);}
          20% { transform: translateY(3px) scale(0.99);}
          30% { transform: translateY(-4px) scale(1.01);}
          40% { transform: translateY(2px) scale(1);}
          50% { transform: translateY(-5px) scale(1.01);}
          60% { transform: translateY(3px) scale(0.99);}
          70% { transform: translateY(-3px) scale(1);}
          80% { transform: translateY(2px) scale(1.01);}
          90% { transform: translateY(-2px) scale(1);}
          100% { transform: translateY(0) scale(1);}
        }
        .animate-ball-float {
          animation-name: ball-float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
}