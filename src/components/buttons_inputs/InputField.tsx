'use client';

import React, { useState, useEffect } from 'react';
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
  Icon: React.FC<{ width?: number | string; height?: number | string; color?: string }>;
  iconAlt?: string;
  iconSize?: number;
  value?: string;
  onChangeText?: (value: string) => void;
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
  Icon,
  value,
  onChangeText,
}) => {
  const [inputValue, setInputValue] = useState(value ?? '');

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChangeText) {
      onChangeText(newValue);
    }
  };

  const inputClass = `input input-${variant}${dim ? ' dim' : ''}`;
  const errorClass =
    variant === 'warning' || variant.includes('warning') ? 'error-text-red' : 'error-text';

  return (
    <div className='container-input'>
      <div className='label-input'>{label}</div>
      {showDescription && description && <div className='description-input'>{description}</div>}
      <div className={inputClass}>
        {Icon && (
          <div className='icon-input'>
            <Icon width={25} height={25} />
          </div>
        )}
        <input
          type='text'
          placeholder={placeholder}
          disabled={variant.includes('disabled')}
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      {showError && error && <div className={errorClass}>{error}</div>}
    </div>
  );
};

export default InputField;
