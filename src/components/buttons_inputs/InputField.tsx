'use client';

import React from 'react';
import Image from 'next/image';

interface InputFieldProps {
    label: string;
    description?: string;
    showDescription?: boolean;
    placeholder?: string;
    error?: string;
    showError?: boolean;
    variant?:
    | 'accent'
    | 'primary'
    | 'secondary-shade'
    | 'text-color'
    | 'warning'
    | 'accent-disabled'
    | 'primary-disabled'
    | 'secondary-shade-disabled'
    | 'text-color-disabled';
    dim?: boolean;
    iconSrc?: string;
    iconAlt?: string;
    iconSize?: number;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    description,
    showDescription = true,
    placeholder = 'Text',
    error,
    showError = true,
    variant = 'accent',
    dim = false,
    iconSrc = '/student.png',
    iconAlt = 'Icono',
    iconSize = 16,
}) => {
    const inputClass = `input input-${variant}${dim ? ' dim' : ''}`;
    const errorClass =
        variant === 'warning' || variant.includes('warning')
            ? 'error-text-red'
            : 'error-text';

    return (
        <div className="container-input">
            <div className="label-input">{label}</div>
            {showDescription && description && <div className="description">{description}</div>}
            <div className={inputClass}>
                {iconSrc && (
                    <Image
                        src={iconSrc}
                        alt={iconAlt}
                        width={iconSize}
                        height={iconSize}
                        style={{ marginRight: '8px' }}
                    />
                )}
                <input type="text" placeholder={placeholder} disabled={variant.includes('disabled')} />
            </div>
            {showError && error && <div className={errorClass}>{error}</div>}
        </div>
    );
};

export default InputField;
