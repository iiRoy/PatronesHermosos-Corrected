import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const DotsSix: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M7.125 8.625a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM12 7.125a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm6.375 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-12.75 3.75a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm6.375 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm6.375 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/> </svg> 
);

export default DotsSix;