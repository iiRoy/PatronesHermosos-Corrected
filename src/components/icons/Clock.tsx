import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const Clock: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M12 1.875A10.125 10.125 0 1 0 22.125 12 10.137 10.137 0 0 0 12 1.875Zm0 18A7.875 7.875 0 1 1 19.875 12 7.883 7.883 0 0 1 12 19.875ZM18.375 12a1.125 1.125 0 0 1-1.125 1.125H12A1.125 1.125 0 0 1 10.875 12V6.75a1.125 1.125 0 1 1 2.25 0v4.125h4.125A1.125 1.125 0 0 1 18.375 12Z"/> </svg> 
);

export default Clock;