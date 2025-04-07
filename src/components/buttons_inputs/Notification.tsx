'use client';

import React, { useState } from 'react';

interface NotificationProps {
    color: 'green' | 'yellow' | 'red' | 'purple';
    variant?: 'one' | 'two'; // Por si quieres diferenciar los estilos “uno” y “dos”
    title: string;
    message: string;
    icon?: string; // Emoji o ícono string
    className?: string; // Por si quieres agregar clases extra
}

const Notification: React.FC<NotificationProps> = ({
    color,
    variant = 'one',
    title,
    message,
    icon = '💬',
    className = '',
}) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const notificationClass = `notification ${variant === 'two' ? `notification-${color}-two` : ''
        } ${className}`;

    const iconClass = `notification-icon ${variant === 'two' ? `notification-icon-${color}-two` : `notification-icon-${color}`
        }`;

    const titleClass = `notification-title${variant === 'one' ? ` notification-title-${color}` : ''
        }`;

    const textClass =
        variant === 'one' ? 'notification-text notification-text-black' : 'notification-text';

    const closeClass =
        variant === 'two' ? 'notification-close notification-close-white' : `notification-close notification-close-${color}`;

    return (
        <div className={notificationClass}>
            <div className={iconClass}>
                <span className="icon">{icon}</span>
            </div>
            <div className="notification-content">
                <h3 className={titleClass}>{title}</h3>
                <p className={textClass}>{message}</p>
            </div>
            <button className={closeClass} onClick={() => setVisible(false)}>
                &times;
            </button>
        </div>
    );
};

export default Notification;
