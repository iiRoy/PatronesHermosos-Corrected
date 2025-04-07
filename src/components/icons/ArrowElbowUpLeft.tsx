import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowElbowUpLeft: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M19.125 7.5V21a1.125 1.125 0 1 1-2.25 0V8.625H7.219l2.58 2.58a1.127 1.127 0 1 1-1.594 1.593l-4.5-4.5a1.125 1.125 0 0 1 0-1.594l4.5-4.5a1.127 1.127 0 0 1 1.594 1.594l-2.58 2.577H18A1.125 1.125 0 0 1 19.125 7.5Z"/> </svg> 
);

export default ArrowElbowUpLeft;