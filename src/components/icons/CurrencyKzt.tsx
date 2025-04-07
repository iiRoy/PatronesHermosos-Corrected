import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const CurrencyKzt: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M19.875 9.375A1.125 1.125 0 0 1 18.75 10.5h-5.625v9.375a1.125 1.125 0 1 1-2.25 0V10.5H5.25a1.125 1.125 0 1 1 0-2.25h13.5a1.125 1.125 0 0 1 1.125 1.125ZM5.25 6h13.5a1.125 1.125 0 0 0 0-2.25H5.25a1.125 1.125 0 0 0 0 2.25Z"/> </svg> 
);

export default CurrencyKzt;