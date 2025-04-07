import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const Numpad: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M7.875 4.5a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0ZM12 2.625a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75Zm6 3.75a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Zm-12 1.5a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75Zm6 0a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75Zm6 0a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75Zm-12 5.25a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75Zm6 0a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75Zm0 5.25a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75Zm6-5.25a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75Z"/> </svg> 
);

export default Numpad;