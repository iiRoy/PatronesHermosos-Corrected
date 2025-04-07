import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const CaretLeft: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M15.796 18.704a1.127 1.127 0 1 1-1.594 1.594l-7.5-7.5a1.125 1.125 0 0 1 0-1.594l7.5-7.5a1.127 1.127 0 1 1 1.594 1.594L9.094 12l6.702 6.704Z"/> </svg> 
);

export default CaretLeft;