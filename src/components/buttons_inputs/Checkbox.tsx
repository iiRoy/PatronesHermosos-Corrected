// components/buttons_inputs/Checkbox.tsx
'use client';

import React from 'react';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  bordered?: boolean;
  onChange: (checked: boolean) => void;
  variant?: 'primary' | 'secondary' | 'accent';
}

const Checkbox: React.FC<CheckboxProps> = ({
  label = '',
  checked,
  onChange,
  bordered = false,
  variant = 'primary'
}) => {
  return (
    <label className={`flex items-center cursor-pointer ${bordered ? 'with-border' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`${variant === 'primary' ? 'checkbox-odd' : variant === 'secondary' ? 'checkbox-even' : 'checkbox-accent'} checkbox-circle mr-2`}
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
};

export default Checkbox;
