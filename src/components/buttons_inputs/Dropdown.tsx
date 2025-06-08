'use client';
import React from 'react';
import { CaretDoubleDown } from '@/components/icons';

// Tipo para soportar opciones como string o { label, value }
type DropdownOption = string | { label: string; value: string };

// Define a type for label-value pairs
interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  description?: string;
  showDescription?: boolean;
  options: DropdownOption[] | string[] | Option[]; // Accept either string[] or Option[]
  value: string;
  darkText?: boolean;
  onChange: (value: string) => void;
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
  dim?: boolean;
  Icon?: React.FC<{ width?: number | string; height?: number | string; color?: string }>;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  description,
  showDescription = true,
  darkText = false,
  options,
  value,
  onChange,
  variant = 'accent',
  dim = false,
  Icon,
}) => {
  const selectClass = `input input-${variant}${dim ? ' dim' : ''} relative`;
  const labelClass = `label-input ${darkText ? ' darkText' : ''}`;

  return (
    <div className="container-input">
      <div className={labelClass}>{label}</div>
      {showDescription && description && <div className="description-input">{description}</div>}
      <div className={selectClass}>
        {Icon && (
          <div className='icon-input'>
            <Icon width={25} height={25} />
          </div>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2 bg-transparent rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer z-30"
          disabled={variant?.includes('disabled')}
        >
          {options.map((option, index) => {
            // Check if option is a string or an object
            const isString = typeof option === 'string';
            const optionValue = isString ? option : (option as Option).value;
            const optionLabel = isString ? option : (option as Option).label;

            return (
              <option key={isString ? option : option.value + index} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <CaretDoubleDown height={20} width={20} fillColor='#FFFFFF' strokeWidth={0} />
        </span>
      </div>
    </div>
  );
};

export default Dropdown;