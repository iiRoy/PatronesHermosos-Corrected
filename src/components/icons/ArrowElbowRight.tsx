import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowElbowRight: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M22.875 7.5v6.75a1.125 1.125 0 1 1-2.25 0v-4.031l-8.58 8.58a1.126 1.126 0 0 1-1.593 0l-9-9a1.127 1.127 0 0 1 1.594-1.594l8.204 8.201 7.781-7.781H15a1.125 1.125 0 0 1 0-2.25h6.75A1.125 1.125 0 0 1 22.875 7.5Z"/> </svg> 
);

export default ArrowElbowRight;