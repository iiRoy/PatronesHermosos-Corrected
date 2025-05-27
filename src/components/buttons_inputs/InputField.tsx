'use client';

import React, { useState, useEffect } from 'react';
import withIconDecorator from '../decorators/IconDecorator';
import * as Icons from '../icons';

interface InputFieldProps {
  label: string;
  description?: string;
  showDescription?: boolean;
  placeholder?: string;
  error?: string;
  showError?: boolean;
  darkText?: boolean;
  variant?:
  | 'accent'
  | 'primary'
  | 'secondary'
  | 'secondary-shade'
  | 'text-color'
  | 'warning'
  | 'accent-disabled'
  | 'primary-disabled'
  | 'secondary-shade-disabled'
  | 'text-color-disabled';
  disabled?: boolean;
  icon?: keyof typeof Icons;
  value?: string;
  onChangeText?: (value: string) => void;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  description,
  showDescription = true,
  placeholder = 'Text',
  error,
  showError = true,
  darkText = true,
  variant = 'accent',
  disabled = false,
  icon,
  value,
  onChangeText,
  type = 'text',
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

  const inputClass = `input input-${variant}${disabled ? ' input-disabled' : ''}${darkText ? ' darkText' : ''} transition-all duration-500 ease-in-out`;
  const errorClass =
    variant === 'warning' || variant.includes('warning') ? 'error-text-red' : 'error-text';

  const IconComponent = icon && Icons[icon] ? withIconDecorator(Icons[icon]) : null;

  return (
    <div className='container-input'>
      <div className='label-input'>{label}</div>
      {showDescription && description && <div className='description-input'>{description}</div>}
      <div className={inputClass}>
        {IconComponent && (
          <div className='icon-input'>
            <IconComponent width={25} height={25} strokeWidth={0} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      {showError && error && <div className={errorClass}>{error}</div>}
    </div>
  );
};

export default InputField;
