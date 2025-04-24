'use client';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import withIconDecorator from '../decorators/IconDecorator';
import * as Icons from '../icons';

interface NotificationProps {
  show: boolean;
  color: 'green' | 'yellow' | 'red' | 'purple';
  variant?: 'one' | 'two';
  title: string;
  message: string;
  iconName?: keyof typeof Icons;
  className?: string;
  onClose?: () => void;
}

const Notification: React.FC<Omit<NotificationProps, 'show'>> = ({
  color,
  variant = 'one',
  title,
  message,
  iconName,
  className = '',
  onClose,
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
  const colorClass =
    variant === 'two' ? 'var(--text-color)' : `${color}`;
  const IconComponent = withIconDecorator(
    iconName && Icons[iconName] ? Icons[iconName] : Icons.Check,
  );

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
          fillColor={colorClass}
          width={40}
          height={40}
        />
      </div>
      <div className='notification-content'>
        <h3 className={titleClass}>{title}</h3>
        <p className={textClass}>{message}</p>
      </div>
      <button className={closeClass} onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

// Componente principal que maneja el portal
const NotificationPortal: React.FC<NotificationProps> = (props) => {
  // SSR-safe
  if (!props.show || typeof window === 'undefined') return null;
  return ReactDOM.createPortal(
    <Notification {...props} />,
    document.body
  );
};

export default NotificationPortal;