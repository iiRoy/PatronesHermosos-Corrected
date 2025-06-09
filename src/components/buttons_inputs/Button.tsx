'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import withIconDecorator from '../decorators/IconDecorator';
import { useTransition } from '../TransitionContext';

interface ButtonProps {
  label?: string;
  variant: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  round?: boolean;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  IconLeft?: React.FC<{
    width?: number | string;
    height?: number | string;
    strokeColor?: string;
    strokeWidth?: number;
    fillColor?: string;
    className?: string;
  }>;
  IconRight?: React.FC<{
    width?: number | string;
    height?: number | string;
    strokeColor?: string;
    strokeWidth?: number;
    fillColor?: string;
    className?: string;
  }>;
  onClick?: (event: React.MouseEvent) => void;
  href?: string;
  className?: string;
  activeTransition?: boolean;
  stroke?: number;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant,
  type = 'button',
  disabled = false,
  round = false,
  showLeftIcon = false,
  showRightIcon = false,
  IconLeft,
  IconRight,
  onClick,
  href,
  className = '',
  stroke,
  activeTransition = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { triggerTransition } = useTransition();

  const DecoratedIconL = IconLeft ? withIconDecorator(IconLeft) : null;
  const DecoratedIconR = IconRight ? withIconDecorator(IconRight) : null;

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;

    if (href && href !== pathname && activeTransition) {
      e.preventDefault();
      triggerTransition(href);
    } else if (href && href !== pathname) {
      router.push(href);
    }

    if (onClick) {
      onClick(e);
    }
  };

  const buttonClass = round ? 'round-button' : 'custom-button';
  const variantClass = `button-${variant}`;
  const disabledClass = disabled ? `${variant}-disabled dim` : '';
  const roundAdjustments = round ? 'aspect-square p-0 justify-center' : '';

  const classes = [
    buttonClass,
    variantClass,
    disabledClass,
    roundAdjustments,
    'flex items-center gap-2',
    className,
  ].join(' ');

  return (
    <button
      className={classes}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      aria-label={label || 'Button'}
      data-variant={variant}
    >
      {showLeftIcon && DecoratedIconL && (
        <div className='ease-in-out duration-500 transition-colors'>
          <DecoratedIconL
            width='1.5rem'
            height='1.5rem'
            fillColor='#ebe6eb'
            strokeColor='currentColor'
            strokeWidth={stroke = stroke || 0 }  
          />
        </div>
      )}
      {!round && label && <span className='option-label text-[var(--text-color)]'>{label}</span>}
      {showRightIcon && DecoratedIconR && (
        <div className='ease-in-out duration-300 transition-colors'>
          <DecoratedIconR
            width='2rem'
            height='2rem'
            fillColor='#ebe6eb'
            strokeColor='currentColor'
            strokeWidth={stroke = stroke || 0 }  
          />
        </div>
      )}
    </button>
  );
};

export default Button;
