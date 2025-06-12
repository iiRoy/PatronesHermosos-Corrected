'use client';
import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import withIconDecorator from '@/components/decorators/IconDecorator';
import ArrowFatRight from '@/components/icons/ArrowFatRight';

export interface IconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  isCompleted?: boolean;
  isIncorrect?: boolean;
  Icon?: React.ComponentType<IconProps>;
  Color?: string;
  Optional?: boolean;
  OpenForm?: boolean;
}

export default function CollapsibleSection({
  title,
  children,
  isIncorrect = false,
  isCompleted = false,
  Icon,
  Color,
  Optional,
}: CollapsibleSectionProps) {
  const ToggleIcon = withIconDecorator(ArrowFatRight);

if (Icon) {
  Icon = withIconDecorator(Icon);
}

  return (
    <Disclosure as="div" className="mb-8">
      {({ open }) => (
        <>
<Disclosure.Button
  className={`
    flex justify-between items-center w-full
    px-6 py-4 text-lg font-semibold text-white rounded-t-lg
    focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75
    transition-colors duration-500
  `}
  style={{
    backgroundColor: isIncorrect
      ? shiftHueTo(Color, 'red')
      : isCompleted
      ? shiftHueTo(Color, 'green')
      : (Optional ? (Color ? shiftHueTo(Color, 'blue') : shiftHueTo('#97639c', 'blue')) : ( Color ? Color : '#97639c')),
  }}
  onMouseEnter={e => {
    const button = e.currentTarget;
    const bg = isIncorrect
      ? shiftHueTo(Color, 'red')
      : isCompleted
      ? shiftHueTo(Color, 'green')
      : (Optional ? (Color ? shiftHueTo(Color, 'blue') : shiftHueTo('#97639c', 'blue')) : ( Color ? Color : '#97639c'))
    button.style.backgroundColor = adjustColorBrightness(bg, 20);
  }}
  onMouseLeave={e => {
    const button = e.currentTarget;
    button.style.backgroundColor = isIncorrect
      ? shiftHueTo(Color, 'red')
      : isCompleted
      ? shiftHueTo(Color, 'green')
      : (Optional ? (Color ? shiftHueTo(Color, 'blue') : shiftHueTo('#97639c', 'blue')) : ( Color ? Color : '#97639c'))
  }}
>
            <div className="flex items-center space-x-2">
              {Icon && <Icon width={24} height={24} />}
              <span>{title}</span>
            </div>
            <ToggleIcon
              width={24}
              height={24}
              className={`transform transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </Disclosure.Button>

          <Transition
            show={open}
            enter="transition-all duration-300 ease-in-out"
            enterFrom="opacity-0 max-h-0"
            enterTo="opacity-100 max-h-[1000px]"
            leave="transition-all duration-200 ease-in-out"
            leaveFrom="opacity-100 max-h-[1000px]"
            leaveTo="opacity-0 max-h-0"
          >
            <Disclosure.Panel static className="bg-white text-gray-800 p-6 rounded-b-lg border border-gray-200 shadow-sm overflow-hidden">
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

function adjustColorBrightness(hex: string, percent: number): string {
  let cleanHex = hex.trim().replace(/^#/, '').toLowerCase();

  if (cleanHex.length === 8) {
    cleanHex = cleanHex.slice(0, 6);
  }

  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }

  if (!/^[0-9a-f]{6}$/.test(cleanHex)) {
    console.warn(`adjustColorBrightness: invalid hex "#${hex}"`);
    return hex;
  }

  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  const isDark = luminance < 100;

  const adjust = (channel: number) => {
    const delta = Math.round((isDark ? 255 - channel : 0 - channel) * (percent / 100));
    return Math.max(0, Math.min(255, channel + delta));
  };

  const rAdj = adjust(r);
  const gAdj = adjust(g);
  const bAdj = adjust(b);

  return `rgb(${rAdj}, ${gAdj}, ${bAdj})`;
}

function shiftHueTo(
  hex: string | undefined,
  hue: 'green' | 'red' | 'orange' | 'blue' | 'purple'
): string {
  const hueMap: Record<typeof hue, number> = {
    red: 0,
    orange: 30,
    green: 120,
    blue: 240,
    purple: 280,
  };

  if (hex === undefined) { hex = '#97639c'}

  const targetHue = hueMap[hue];
  hex = hex.replace('#', '');

  let alpha = '';
  if (hex.length === 8) {
    alpha = hex.slice(6);
    hex = hex.slice(0, 6);
  }

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l < 0.5 ? delta / (max + min) : delta / (2 - max - min);
    switch (max) {
      case r: h = ((g - b) / delta + (g < b ? 6 : 0)); break;
      case g: h = (b - r) / delta + 2; break;
      case b: h = (r - g) / delta + 4; break;
    }
    h *= 60;
  }

  h = targetHue;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r1 = 0, g1 = 0, b1 = 0;
  if (0 <= h && h < 60)       [r1, g1, b1] = [c, x, 0];
  else if (60 <= h && h < 120) [r1, g1, b1] = [x, c, 0];
  else if (120 <= h && h < 180)[r1, g1, b1] = [0, c, x];
  else if (180 <= h && h < 240)[r1, g1, b1] = [0, x, c];
  else if (240 <= h && h < 300)[r1, g1, b1] = [x, 0, c];
  else if (300 <= h && h < 360)[r1, g1, b1] = [c, 0, x];

  const rFinal = Math.round((r1 + m) * 255);
  const gFinal = Math.round((g1 + m) * 255);
  const bFinal = Math.round((b1 + m) * 255);

  const hexResult =
    '#' +
    rFinal.toString(16).padStart(2, '0') +
    gFinal.toString(16).padStart(2, '0') +
    bFinal.toString(16).padStart(2, '0') +
    (alpha ? alpha : '');

  return hexResult.toUpperCase();
}