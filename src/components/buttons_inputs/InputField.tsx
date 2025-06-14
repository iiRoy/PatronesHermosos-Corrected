'use client';

import React, { useEffect, useId } from 'react';
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
  id?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  description,
  showDescription = true,
  placeholder = 'Text',
  error,
  showError = true,
  darkText = false,
  variant = 'accent',
  disabled = false,
  icon,
  value = '',
  onChangeText,
  type = 'text',
  id,
}) => {
  const autoId = useId();
  const inputId = id || `${autoId}`;

  const inputClass = `input input-${variant}${disabled ? ' input-disabled' : ''}${
    darkText ? ' darkText' : ''
  } transition-all duration-500 ease-in-out`;
  const labelClass = `label-input ${darkText ? ' darkText' : ''}`;
  const errorClass =
    variant === 'warning' || variant.includes('warning') ? 'error-text-red' : 'error-text';

  const IconComponent = icon && Icons[icon] ? withIconDecorator(Icons[icon]) : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeText) {
      onChangeText(e.target.value);
    }
  };

  return (
    <div className='container-input'>
      <label className={labelClass} htmlFor={inputId}>
        {label}
      </label>
      {showDescription && description && <div className='description-input'>{description}</div>}
      <div className={inputClass}>
        {IconComponent && (
          <div className='icon-input'>
            <IconComponent width={25} height={25} strokeWidth={0} />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={handleChange}
        />
      </div>
      {showError && error && <div className={'error-text-red'}>{error}</div>}
    </div>
  );
};

export default InputField;
