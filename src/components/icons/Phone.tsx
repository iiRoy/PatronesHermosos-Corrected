'use client';
import React from 'react';

interface IconProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

const Phone: React.FC<IconProps> = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (
  <svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="m21 14.512-4.415-1.979-.017-.007a1.87 1.87 0 0 0-1.78.164c-.037.024-.072.05-.106.079l-2.091 1.781c-1.22-.661-2.478-1.91-3.14-3.114l1.787-2.124c.029-.034.055-.07.08-.108a1.874 1.874 0 0 0 .148-1.782L9.488 3a1.88 1.88 0 0 0-1.949-1.111 5.65 5.65 0 0 0-4.914 5.61c0 7.652 6.224 13.876 13.875 13.876a5.65 5.65 0 0 0 5.61-4.914A1.88 1.88 0 0 0 21 14.513Zm-4.5 4.613A11.64 11.64 0 0 1 4.875 7.5a3.402 3.402 0 0 1 2.67-3.332l1.764 3.938-1.796 2.139a1.13 1.13 0 0 0-.08.109 1.875 1.875 0 0 0-.12 1.841c.883 1.807 2.702 3.615 4.529 4.5a1.875 1.875 0 0 0 1.845-.136 1.07 1.07 0 0 0 .105-.08l2.102-1.787 3.938 1.763a3.403 3.403 0 0 1-3.332 2.67Z"/> </svg> 
);

export default Phone;