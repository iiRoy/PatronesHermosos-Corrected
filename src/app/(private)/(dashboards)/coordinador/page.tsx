'use client';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface DecodedToken {
  userId: number;
  email: string;
  username: string;
  role: string;
  tokenVersion: number;
}

const Coordinador = () => {
  const [userInfo, setUserInfo] = useState<{ email: string; username: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiToken, setApiToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('api_token');
      setApiToken(token);
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          setUserInfo({ email: decoded.email, username: decoded.username });
        } catch (err) {
          setError('Token inválido');
          router.push('/login');
        }
      } else {
        setError('No se encontró el token, por favor inicia sesión');
        router.push('/login');
      }
    }
  }, [router]);

  if (error) {
    return <div className='p-6 pl-14 text-red-500'>Error: {error}</div>;
  }

  return (
    <div className='p-6 pl-14'>
      <h1 className='text-2xl font-bold mb-4'>Panel de Coordinador</h1>
      {userInfo ? (
        <div>
          <p>
            <strong>Usuario:</strong> {userInfo.username}
          </p>
          <p>
            <strong>Correo:</strong> {userInfo.email}
          </p>
        </div>
      ) : (
        <div>Cargando información del coordinador...</div>
      )}
    </div>
  );
};

export default Coordinador;
