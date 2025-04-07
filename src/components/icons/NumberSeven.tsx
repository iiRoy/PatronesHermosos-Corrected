import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const NumberSeven: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="m16.827 4.823-4.5 15a1.124 1.124 0 0 1-2.065.209 1.125 1.125 0 0 1-.085-.855l4.06-13.552H8.25a1.125 1.125 0 0 1 0-2.25h7.5a1.125 1.125 0 0 1 1.077 1.448Z"/> </svg> 
);

export default NumberSeven;