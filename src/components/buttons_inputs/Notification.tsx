'use client';

import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import tus iconos y decoradores aquí si quieres, o pon tu lógica de íconos dentro

// Ajusta según tus iconos reales:
import withIconDecorator from '../decorators/IconDecorator';
import * as Icons from '../icons';

// ===== COMPONENTE Notification =====
const COLORS: Record<string, string> = {
  green: '#2ecc40',
  yellow: '#f6c000',
  red: '#e4572e',
  purple: '#9763ac',
};

interface NotificationProps {
  show: boolean;
  color: 'green' | 'yellow' | 'red' | 'purple';
  variant?: 'one' | 'two';
  title: string;
  message: string;
  iconName?: keyof typeof Icons;
  className?: string;
  onClose?: () => void;
  duration?: number;
}

const Notification: React.FC<Omit<NotificationProps, 'show'>> = ({
  color,
  variant = 'one',
  title,
  message,
  iconName,
  className = '',
  onClose,
  duration = 1800,
}) => {
  const notificationClass = `notification ${variant === 'two' ? `notification-${color}-two` : ''} ${className}`;
  const iconClass = `notification-icon ${variant === 'two' ? `notification-icon-${color}-two` : `notification-icon-${color}`}`;
  const titleClass = `notification-title${variant === 'one' ? ` notification-title-${color}` : ''}`;
  const textClass =
    variant === 'one' ? 'notification-text notification-text-black' : 'notification-text';
  const closeClass =
    variant === 'two'
      ? 'notification-close notification-close-white'
      : `notification-close notification-close-${color}`;

  // Usa el decorador de iconos si tienes, si no, pon tu lógica aquí
  const IconComponent = withIconDecorator(
    iconName && Icons[iconName] ? Icons[iconName] : Icons.Check
  );

  // Autocierre
  useEffect(() => {
    if (!onClose) return;
    const timeout = setTimeout(onClose, duration);
    return () => clearTimeout(timeout);
  }, [onClose, duration]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        padding: '20px 30px 20px 18px',
        zIndex: 9999,
      }}
      className={notificationClass}
    >
      <div className={iconClass}>
        <IconComponent
          fillColor={'var(--text-color)'}
          width={40}
          height={40}
        />
      </div>
      <div className="notification-content">
        <h3 className={titleClass}>{title}</h3>
        <p className={textClass}>{message}</p>
      </div>
      <button className={closeClass} onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

// ===== CONTEXTO y PROVIDER (incluye portal) =====
type Color = 'green' | 'yellow' | 'red' | 'purple';

interface NotificationOptions {
  color: Color;
  title: string;
  message: string;
  iconName?: keyof typeof Icons;
  variant?: 'one' | 'two';
  duration?: number;
}

interface NotificationContextType {
  notify: (options: NotificationOptions) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notify: () => {},
});

export function useNotification() {
  return useContext(NotificationContext);
}

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notif, setNotif] = useState<NotificationOptions & { show: boolean }>({
    show: false,
    color: 'green',
    title: '',
    message: '',
    iconName: undefined,
    variant: 'one',
    duration: 1800,
  });

  const notify = useCallback((options: NotificationOptions) => {
    setNotif({
      ...options,
      show: true,
      duration: options.duration || 1800,
    });
  }, []);

  const handleClose = () => setNotif((n) => ({ ...n, show: false }));

  // El portal
  const portal =
    typeof window !== 'undefined' && notif.show
      ? ReactDOM.createPortal(
          <Notification {...notif} onClose={handleClose} />,
          document.body
        )
      : null;

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {portal}
    </NotificationContext.Provider>
  );
};