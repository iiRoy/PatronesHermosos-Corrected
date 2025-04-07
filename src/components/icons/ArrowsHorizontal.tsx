import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowsHorizontal: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="m22.546 12.796-3 3a1.127 1.127 0 1 1-1.594-1.594l1.08-1.077H4.968l1.08 1.08a1.127 1.127 0 1 1-1.594 1.593l-3-3a1.125 1.125 0 0 1 0-1.594l3-3a1.127 1.127 0 1 1 1.594 1.594l-1.08 1.077H19.03l-1.08-1.08a1.127 1.127 0 0 1 1.594-1.593l3 3a1.126 1.126 0 0 1 0 1.594Z"/> </svg> 
);

export default ArrowsHorizontal;