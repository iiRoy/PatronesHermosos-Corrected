import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const CaretDown: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="m20.296 9.796-7.5 7.5a1.125 1.125 0 0 1-1.594 0l-7.5-7.5a1.127 1.127 0 0 1 1.594-1.594L12 14.906l6.704-6.705a1.127 1.127 0 1 1 1.594 1.594h-.002Z"/> </svg> 
);

export default CaretDown;