import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const AlignCenterVerticalSimple: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M19.5 10.875h-2.625V4.5A1.875 1.875 0 0 0 15 2.625H9A1.875 1.875 0 0 0 7.125 4.5v6.375H4.5a1.125 1.125 0 1 0 0 2.25h2.625V19.5A1.875 1.875 0 0 0 9 21.375h6a1.875 1.875 0 0 0 1.875-1.875v-6.375H19.5a1.125 1.125 0 1 0 0-2.25Zm-4.875 8.25h-5.25V4.875h5.25v14.25Z"/> </svg> 
);

export default AlignCenterVerticalSimple;