'use client';
import React from 'react';

interface IconProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

const ShieldStar: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  strokeColor = 'currentColor',
  fillColor = 'none',
  strokeWidth = 1,
}) => (
  <svg
    width={width}
    height={height}
    stroke={strokeColor}
    fill={fillColor}
    strokeWidth={strokeWidth}
    vectorEffect='non-scaling-stroke'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
  >
    {' '}
    <path
      stroke={strokeColor}
      fill={fillColor}
      strokeWidth={strokeWidth}
      vectorEffect='non-scaling-stroke'
      d='M7.206 10.832a1.125 1.125 0 0 1 1.462-.626l2.207.883V9a1.125 1.125 0 1 1 2.25 0v2.089l2.207-.883a1.125 1.125 0 0 1 .836 2.088l-2.387.956 1.369 1.825a1.127 1.127 0 0 1-1.06 1.789 1.124 1.124 0 0 1-.74-.439l-1.35-1.8-1.35 1.8a1.123 1.123 0 0 1-1.868-.102 1.125 1.125 0 0 1 .068-1.248l1.369-1.825-2.387-.956a1.125 1.125 0 0 1-.626-1.462ZM21.375 5.25v5.25c0 5.09-2.468 8.177-4.538 9.87-2.222 1.819-4.447 2.438-4.54 2.466a1.135 1.135 0 0 1-.593 0c-.094-.027-2.319-.647-4.542-2.465-2.07-1.694-4.537-4.781-4.537-9.871V5.25A1.875 1.875 0 0 1 4.5 3.375h15a1.875 1.875 0 0 1 1.875 1.875Zm-2.25.375H4.875V10.5c0 3.348 1.227 6.065 3.648 8.077A11.83 11.83 0 0 0 12 20.567a11.842 11.842 0 0 0 3.477-1.99c2.42-2.012 3.648-4.73 3.648-8.077V5.625Z'
    />{' '}
  </svg>
);

export default ShieldStar;
