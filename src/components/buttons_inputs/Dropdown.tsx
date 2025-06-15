'use client';
import React, { useId } from 'react';
import withIconDecorator from '../decorators/IconDecorator';
import { CaretDoubleDown as RawCaretDoubleDown } from '@/components/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type DropdownOption = string | { label: string; value: string };
const CaretDoubleDown = withIconDecorator(RawCaretDoubleDown);

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  description?: string;
  showDescription?: boolean;
  options: DropdownOption[] | string[] | Option[];
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
  error?: string;
  disabled?: boolean;
  id?: string;
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
  error,
  disabled = false,
  id,
}) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const selectClass = `input input-${variant}${
    dim ? ' dim' : ''
  } relative transition-all duration-500`;
  const labelClass = `label-input ${darkText ? ' darkText' : ''}`;
  const getLabel = (val: string) => {
    const selected = options.find((o) => (typeof o === 'string' ? o === val : o.value === val));
    return typeof selected === 'string' ? selected : (selected?.label ?? val);
  };

  return (
    <div className='container-input scrollbar-hide'>
      <label className={labelClass} htmlFor={selectId}>
        {label}
      </label>
      {showDescription && description && <div className='description-input'>{description}</div>}
      <div className={selectClass}>
        <Select value={value} onValueChange={(val) => onChange(val)} disabled={disabled}>
          {/* Icon decorado */}
          {Icon &&
            (() => {
              const DecoratedIcon = withIconDecorator(Icon);
              return (
                <div className='icon-input'>
                  <DecoratedIcon width={25} height={25} />
                </div>
              );
            })()}
          <SelectTrigger
            id={selectId}
            className={`w-full text-md border-hidden shadow-none bg-transparent pr-10 py-2 focus:outline-none [&>svg]:hidden ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'text-white'
            }`}
            disabled={disabled}
          >
            {value ? (
              <span>{getLabel(value)}</span>
            ) : (
              <span className='text-white opacity-30'>Selecciona una opción</span>
            )}
            <span className='icon-input absolute right-3 top-1/2 transform -translate-y-1/2'>
              <CaretDoubleDown height={20} width={20} />
            </span>
          </SelectTrigger>

          <SelectContent className='bg-[#f4edf4] text-[#822f87]'>
            {options.map((option, index) => {
              const val = typeof option === 'string' ? option : option.value;
              const label = typeof option === 'string' ? option : option.label;

              return (
                <SelectItem
                  key={val}
                  value={val}
                  className={`font-medium ${
                    index % 2 === 0
                      ? 'text-secondaryCol focus:bg-secondaryCol focus:text-text'
                      : 'text-primaryCol focus:bg-primaryCol focus:text-text'
                  }`}
                >
                  {label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Error message */}
      {error && <p className='text-sm text-red-500 mt-1 ml-1'>{error}</p>}
    </div>
  );
};

export default Dropdown;
