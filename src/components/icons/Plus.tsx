import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const Plus: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M21.375 12a1.125 1.125 0 0 1-1.125 1.125h-7.125v7.125a1.125 1.125 0 1 1-2.25 0v-7.125H3.75a1.125 1.125 0 1 1 0-2.25h7.125V3.75a1.125 1.125 0 1 1 2.25 0v7.125h7.125A1.125 1.125 0 0 1 21.375 12Z"/> </svg> 
);

export default Plus;