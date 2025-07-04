'use client';
import React from 'react';

interface IconProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

const Trash: React.FC<IconProps> = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (
  <svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M20.25 4.5h-3.375V3.375A2.625 2.625 0 0 0 14.25.75h-4.5a2.625 2.625 0 0 0-2.625 2.625V4.5H3.75a1.125 1.125 0 0 0 0 2.25h.375V19.5A1.875 1.875 0 0 0 6 21.375h12a1.875 1.875 0 0 0 1.875-1.875V6.75h.375a1.125 1.125 0 0 0 0-2.25ZM9.375 3.375A.375.375 0 0 1 9.75 3h4.5a.375.375 0 0 1 .375.375V4.5h-5.25V3.375Zm8.25 15.75H6.375V6.75h11.25v12.375Zm-6.75-9.375v6a1.125 1.125 0 1 1-2.25 0v-6a1.125 1.125 0 0 1 2.25 0Zm4.5 0v6a1.125 1.125 0 1 1-2.25 0v-6a1.125 1.125 0 1 1 2.25 0Z"/> </svg> 
);

export default Trash;