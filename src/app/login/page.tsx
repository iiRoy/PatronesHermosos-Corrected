'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InputField from '@/components/buttons_inputs/InputField'; // ajusta el path si es necesario
import Button from '@/components/buttons_inputs/Button';
import Checkbox from '@/components/buttons_inputs/Checkbox';
import * as Icons from '@/components/icons';
import { useNotification } from '@/components/buttons_inputs/Notification';

export default function LoginForm() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const router = useRouter();
  const { notify } = useNotification();


  useEffect(() => {
    const lockoutTime = parseInt(localStorage.getItem('lockoutTime') || '');
    const readableTime = new Date(lockoutTime).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (lockoutTime && Date.now() < lockoutTime) {
      setIsLocked(true);
      notify({
        color: 'red',
        title: 'Demasiados intentos',
        message: `Has superado el número de intentos permitidos. Intenta nuevamente a las ${readableTime}`,
        iconName: 'SealWarning',
        variant: 'two',
        duration: 5000,
      });
      setError('Has superado el número máximo de intentos. Vuelve a ingresar dentro de 10 minutos.');
    } else {
      localStorage.removeItem('lockoutTime');
      if (Number(localStorage.getItem('loginAttempts')) >= 5){
        localStorage.removeItem('loginAttempts');
      }
    }
  }, []);

  // Función para elegir el dashboard según rol
  function getDashboardRouteByRole(role: string) {
    switch (role) {
      case 'superuser':
        return '/admin/estadisticas';
      case 'venue_coordinator':
        return '/coordinador/estadisticas';
      default:
        return '/login';
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        let attempts = parseInt(localStorage.getItem('loginAttempts') || '0') + 1;
        localStorage.setItem('loginAttempts', attempts.toString());

        if (attempts >= 5) {
          const oneHourLater = Date.now() + 60 * 10 * 1000;
          localStorage.setItem('lockoutTime', oneHourLater.toString());
          const lockoutTime = parseInt(localStorage.getItem('lockoutTime') || '');
          const readableTime = new Date(lockoutTime).toLocaleTimeString('es-MX', {
            hour: '2-digit',
            minute: '2-digit',
          });
          setIsLocked(true);
          setTimeout(() => notify({
          color: 'red',
          title: 'Demasiados intentos',
          message: `Has superado el número de intentos permitidos. Intenta nuevamente a las ${readableTime}`,
          iconName: 'SealWarning',
          variant: 'two',
          duration: 5000,
        }), 100)
        setError('Has superado el número máximo de intentos. Vuelve a ingresar dentro de 10 minutos.');
        setLoading(false);
        return;
        }

        setError(`${data.message} (Intentos restantes: ${5-Number(localStorage.getItem('loginAttempts'))}.)`);
        notify({
          color: 'red',
          title: 'Error en Inicio de Sesión',
          message: 'No se pudo iniciar sesión a causa de un error. Por favor intenta de nuevo.',
          iconName: 'SealWarning',
          variant: 'two',
          duration: 4000,
        });
        setLoading(false);
        return;
      }

      // Guarda en localStorage los datos del usuario
      localStorage.setItem('api_token', data.token);
      localStorage.setItem('user_id', data.user.id);
      localStorage.setItem('user_name', data.user.name);
      localStorage.setItem('user_username', data.user.username);
      localStorage.setItem('user_role', data.role);
      localStorage.setItem('user_name', data.user.name);
      localStorage.setItem('user_username', data.user.username);
      localStorage.setItem('user_image', data.user.image);

      localStorage.removeItem('lockoutTime');
      localStorage.removeItem('loginAttempts');

      router.push(getDashboardRouteByRole(data.role));
    } catch (err) {
      setError('Hay un error interno de conexión. Intenta de nuevo más tarde.');
      notify({
        color: 'red',
        title: 'Error en Inicio de Sesión',
        message: 'No se pudo iniciar sesión a causa de un error. Por favor intenta de nuevo.',
        iconName: 'SealWarning',
        variant: 'two',
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
    setError('');
  };

  return (
    <div className='h-lvh max-h-full my-[20vw]'>
      <form
        onSubmit={handleLogin}
        className='flex flex-col gap-4 justify-center align-bottom h-fit min-w-[340px] w-[90vw] max-w-[400px]'
      >
        <Image
          src='/assets/logo.png'
          alt='logo'
          width={120}
          height={120}
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '3vw'  }}
        />
        <div>
          <h2 className='text-4xl font-bold text-center text-[#ede0e8]'>Iniciar Sesión</h2>
          <p className='justify-center flex flex-center text-3xl italic font-light'>
            Bienvenida de vuelta
          </p>
        </div>
        <InputField
          label='Correo o Usuario'
          placeholder='Ingresa tu correo o usuario'
          value={emailOrUsername}
          onChangeText={setEmailOrUsername}
          variant={isLocked ? 'accent-disabled' : error ? 'warning' : 'accent'}
          icon='Envelope'
          disabled= {isLocked}
        />
        <div className='flex flex-col flex-nowrap mt-2'>
          <InputField
            label='Contraseña'
            placeholder='Ingresa tu contraseña'
            value={password}
            onChangeText={setPassword}
            icon='Lock'
            type={showConfirmPassword ? 'text' : 'password'}
            variant={isLocked ? 'primary-disabled' : error ? 'warning' : 'primary'}
            disabled= {isLocked}
          />
          {error && (
            <div className='text-[var(--error)] text-sm'>
              <strong>Error:</strong> {error}
            </div>
          )}
          <div className={`mt-2 ${isLocked ? 'hidden' : 'block'}`}>
            <Checkbox
              label='Mostrar Contraseña'
              color={error ? 'yellow' : 'purple'}
              checked={showConfirmPassword}
              onChange={setShowConfirmPassword}
            />
          </div>
        </div>
        <div className='flex flex-center justify-center mb-[3vw]'>
          <Button
            label={loading ? 'Entrando...' : 'Validar'}
            variant='success'
            disabled={loading || isLocked || !emailOrUsername || !password}
            showLeftIcon
            IconLeft={Icons.StarFour}
          />
        </div>
      </form>
    </div>
  );
}
