import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const DotOutline: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 3.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"/> </svg> 
);

export default DotOutline;