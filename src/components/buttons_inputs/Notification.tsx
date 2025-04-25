'use client';
import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import withIconDecorator from '../decorators/IconDecorator';
import * as Icons from '../icons';

interface NotificationProps {
  color: 'green' | 'yellow' | 'red' | 'purple';
  variant?: 'one' | 'two';
  title: string;
  message: string;
  iconName?: keyof typeof Icons;
  className?: string;
  onClose?: () => void;
  onManualClose?: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps & { show?: boolean }> = ({
  color,
  variant = 'one',
  title,
  message,
  iconName,
  className = '',
  onClose,
  onManualClose,
  duration = 5000,
  show = true,
}) => {
  const iconClass = `notification-icon ${
    variant === 'two' ? `notification-icon-${color}-two` : `notification-icon-${color}`
  }`;
  const titleClass = `notification-title${variant === 'one' ? ` notification-title-${color}` : ''}`;
  const [visible, setVisible] = useState(false);
  const textClass =
    variant === 'one' ? 'notification-text notification-text-black' : 'notification-text';
  const closeClass =
    variant === 'two'
      ? 'notification-close notification-close-white'
      : `notification-close notification-close-${color}`;

  const IconComponent = withIconDecorator(
    iconName && Icons[iconName] ? Icons[iconName] : Icons.Check,
  );

  useEffect(() => {
    if (show) setVisible(true);
    return () => setVisible(false);
  }, [show]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onManualClose?.();
    }, 200);
  };

  // Cierre automático (timeout)
  useEffect(() => {
    if (!onClose) return;
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose();
      }, 200);
    }, duration);
    return () => clearTimeout(timeout);
  }, [onClose, duration]);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        padding: '20px 30px 20px 18px',
        zIndex: 9999,
      }}
      className={`
        notification
        transition-all duration-200 ease-out
        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        ${variant === 'two' ? `notification-${color}-two` : ''} ${className}
      `}
    >
      <div className={iconClass}>
        <IconComponent fillColor={'var(--text-color)'} width={40} height={40} />
      </div>
      <div className='notification-content'>
        <h3 className={titleClass}>{title}</h3>
        <p className={textClass}>{message}</p>
      </div>
      <button className={closeClass} onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

type Color = 'green' | 'yellow' | 'red' | 'purple';

interface NotificationOptions {
  color: Color;
  title: string;
  message: string;
  iconName?: keyof typeof Icons;
  variant?: 'one' | 'two';
  duration?: number;
}

export interface NotificationWithId extends NotificationOptions {
  id: number;
}

interface NotificationContextType {
  notifications: NotificationWithId[];
  notify: (options: NotificationOptions) => void;
  dismiss: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  notify: () => {},
  dismiss: () => {},
});

export function useNotification() {
  return useContext(NotificationContext);
}

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationWithId[]>([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastId, setToastId] = useState<number | null>(null);

  const notify = useCallback((options: NotificationOptions) => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { ...options, id }]);
    setToastId(id);
    setToastVisible(false);
    setTimeout(() => setToastVisible(true), 10);
  }, []);

  const dismiss = useCallback(
    (id: number) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      if (id === toastId) setToastVisible(false);
    },
    [toastId],
  );

  const currentToast = notifications.find((n) => n.id === toastId);

  const portal =
    typeof window !== 'undefined' && currentToast && toastVisible
      ? ReactDOM.createPortal(
          <Notification
            {...currentToast}
            show={true}
            onClose={() => setToastVisible(false)}
            onManualClose={() => dismiss(currentToast.id)}
          />,
          document.body,
        )
      : null;

  return (
    <NotificationContext.Provider value={{ notifications, notify, dismiss }}>
      {children}
      {portal}
    </NotificationContext.Provider>
  );
};
