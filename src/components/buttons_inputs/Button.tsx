'use client';

import React from 'react';
import Image from 'next/image';

interface ButtonProps {
    label: string;
    variant: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
    disabled?: boolean;
    round?: boolean;
    showLeftIcon?: boolean;
    showRightIcon?: boolean;
    leftIconPath?: string;
    rightIconPath?: string;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    variant,
    disabled = false,
    round = false,
    showLeftIcon = false,
    showRightIcon = false,
    leftIconPath = '/student.png',
    rightIconPath = '/student.png',
    onClick,
    className = '',
}) => {
    const variantClass = `button-${variant}`;
    const disabledClass = disabled ? `${variant}-disabled dim` : '';

    // Aplica solo una base dependiendo de round
    const baseClass = round ? 'round-button' : 'custom-button';

    return (
        <button
            className={`${baseClass} ${variantClass} ${disabledClass} ${round ? 'aspect-square p-0 justify-center' : ''
                } flex items-center gap-2 ${className}`}
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
        >
            {showLeftIcon && (
                <Image src={leftIconPath} alt='left icon' width={20} height={20} />
            )}

            {!round && <span className="label">{label}</span>}

            {showRightIcon && (
                <Image src={rightIconPath} alt='right icon' width={20} height={20} />
            )}
        </button>
    );
};

export default Button;
