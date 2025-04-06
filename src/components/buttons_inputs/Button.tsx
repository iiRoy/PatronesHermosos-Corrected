import React from 'react';
import Image from 'next/image';

interface ButtonProps {
    label: string;
    variant: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
    disabled?: boolean;
    round?: boolean;
    icon?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    label,
    variant,
    disabled,
    round,
    icon,
}) => {
    const baseClass = 'custom-button';
    const variantClass = `button-${variant}`;
    const disabledClass = disabled ? `${variant}-disabled dim` : '';
    const roundClass = round ? 'round-button' : '';

    return (
        <button
            className={`${baseClass} ${variantClass} ${disabledClass} ${roundClass}`}
        >
            {icon ? (
                <Image
                    src={icon}
                    alt='icon'
                    width={20}
                    height={20}
                    className='mr-2'
                />
            ) : (
                <i className='fa-regular fa-star icon'></i>
            )}
            {!round && <span className='label'>{label}</span>}
            {!round && <i className='fa-solid fa-xmark close'></i>}
        </button>
    );
};

export default Button;
