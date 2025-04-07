import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowBendUpLeft: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M22.125 18.75a1.125 1.125 0 1 1-2.25 0A7.883 7.883 0 0 0 12 10.875H5.719l2.58 2.58a1.127 1.127 0 1 1-1.594 1.593l-4.5-4.5a1.125 1.125 0 0 1 0-1.594l4.5-4.5a1.127 1.127 0 1 1 1.594 1.594l-2.58 2.577H12A10.137 10.137 0 0 1 22.125 18.75Z"/> </svg> 
);

export default ArrowBendUpLeft;