'use client';
import React from 'react';
import { CaretDoubleDown } from '@/components/icons';

// Tipo para soportar opciones como string o { label, value }
type DropdownOption = string | { label: string; value: string };

interface DropdownProps {
  label: string;
  description?: string;
  showDescription?: boolean;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
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
  Icon?: React.FC<{ width?: number | string; height?: number | string; color?: string }>;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  description,
  showDescription = true,
  options,
  value,
  onChange,
  variant = 'accent',
  dim = false,
  Icon,
}) => {
  const selectClass = `input input-${variant}${dim ? ' dim' : ''} relative`;

  return (
    <div className='container-input'>
      <div className='label-input'>{label}</div>
      {showDescription && description && <div className='description-input'>{description}</div>}
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
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            return (
              <option key={optionValue || index} value={optionValue}>
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