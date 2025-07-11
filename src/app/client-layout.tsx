'use client';

import React, { useEffect, useState } from 'react';
import { NotificationProvider } from '@/components/buttons_inputs/Notification';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Permitir desactivar el loader en entorno de test E2E (Cypress)
    if (typeof window !== 'undefined' && (window as any).Cypress) {
      setShowLoader(false);
      setIsLoading(false);
      return;
    }
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('user_id');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }

    setIsLoading(false);

    setTimeout(() => {
      setShowLoader(false);
    }, 600);
  }, []);

  return (
    <>
      {showLoader && (
        <div
          className={`custom-scrollbar fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-[#160D17] transition-opacity duration-1000 ease-in-out ${
            isLoading ? 'opacity-100' : 'opacity-0'
          } z-50`}
        >
          <span className='text-white text-lg animate-pulse'>Cargando...</span>
        </div>
      )}

      <div className='custom-scrollbar'>
        <NotificationProvider userId={userId || ''}>{children}</NotificationProvider>
      </div>
    </>
  );
}
