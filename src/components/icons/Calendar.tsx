'use client';
import React from 'react';

interface IconProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

const Calendar: React.FC<IconProps> = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (
  <svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M19.5 2.625h-1.875V2.25a1.125 1.125 0 1 0-2.25 0v.375h-6.75V2.25a1.125 1.125 0 0 0-2.25 0v.375H4.5A1.875 1.875 0 0 0 2.625 4.5v15A1.875 1.875 0 0 0 4.5 21.375h15a1.875 1.875 0 0 0 1.875-1.875v-15A1.875 1.875 0 0 0 19.5 2.625ZM6.375 4.875a1.125 1.125 0 0 0 2.25 0h6.75a1.125 1.125 0 1 0 2.25 0h1.5v2.25H4.875v-2.25h1.5Zm-1.5 14.25v-9.75h14.25v9.75H4.875Zm5.625-7.5v5.25a1.125 1.125 0 1 1-2.25 0v-3.439a1.125 1.125 0 0 1-.878-2.062l1.5-.75a1.125 1.125 0 0 1 1.628 1.001Zm5.765 3.176-.9.949h.385a1.125 1.125 0 1 1 0 2.25h-3a1.126 1.126 0 0 1-.817-1.898l2.64-2.79a.375.375 0 1 0-.648-.374 1.125 1.125 0 0 1-1.948-1.126 2.624 2.624 0 0 1 4.898 1.313 2.604 2.604 0 0 1-.529 1.58 1.005 1.005 0 0 1-.081.096Z"/> </svg> 
);

export default Calendar;