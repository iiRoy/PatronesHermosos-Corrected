import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const CaretUp: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M20.296 15.796a1.125 1.125 0 0 1-1.594 0L12 9.094l-6.704 6.702a1.127 1.127 0 1 1-1.594-1.594l7.5-7.5a1.125 1.125 0 0 1 1.594 0l7.5 7.5a1.125 1.125 0 0 1 0 1.594Z"/> </svg> 
);

export default CaretUp;