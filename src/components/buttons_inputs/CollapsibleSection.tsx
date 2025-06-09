'use client';
import React from 'react';
import { Disclosure } from '@headlessui/react';
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
  Icon?: React.ComponentType<IconProps>;
}

export default function CollapsibleSection({
  title,
  children,
  isCompleted = false,
  Icon,
}: CollapsibleSectionProps) {
  const ToggleIcon = withIconDecorator(ArrowFatRight);

  return (
    <Disclosure as="div" className="mb-8">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`
              flex justify-between items-center w-full
              px-6 py-4 text-lg font-semibold text-white rounded-t-lg
              focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75
              transition-colors
              ${
                isCompleted
                  ? 'bg-green-600 hover:bg-green-500 focus-visible:ring-green-400'
                  : 'bg-purple-800 hover:bg-purple-700 focus-visible:ring-purple-500'
              }
            `}
          >
            <div className="flex items-center space-x-2">
              <span>{title}</span>
              {Icon && <Icon width={24} height={24} />}
            </div>
            <ToggleIcon
              width={24}
              height={24}
              className={`transform transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </Disclosure.Button>

          <Disclosure.Panel
            className="
              bg-white text-gray-800
              p-6
              rounded-b-lg
              border border-gray-200
              shadow-sm
            "
          >
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}