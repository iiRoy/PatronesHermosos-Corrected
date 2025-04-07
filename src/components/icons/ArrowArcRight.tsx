import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowArcRight: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M22.875 8.25v6a1.125 1.125 0 0 1-1.125 1.125h-6a1.125 1.125 0 1 1 0-2.25h3.272l-1.451-1.441A7.875 7.875 0 0 0 4.125 17.25a1.125 1.125 0 0 1-2.25 0 10.125 10.125 0 0 1 17.285-7.16l1.465 1.456V8.25a1.125 1.125 0 1 1 2.25 0Z"/> </svg> 
);

export default ArrowArcRight;