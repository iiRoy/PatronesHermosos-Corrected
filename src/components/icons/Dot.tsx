import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const Dot: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M13.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/> </svg> 
);

export default Dot;