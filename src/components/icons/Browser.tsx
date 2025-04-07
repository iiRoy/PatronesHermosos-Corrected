import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const Browser: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M20.25 3.375H3.75A1.875 1.875 0 0 0 1.875 5.25v13.5a1.875 1.875 0 0 0 1.875 1.875h16.5a1.875 1.875 0 0 0 1.875-1.875V5.25a1.875 1.875 0 0 0-1.875-1.875Zm-.375 2.25v2.25H4.125v-2.25h15.75Zm-15.75 12.75v-8.25h15.75v8.25H4.125Z"/> </svg> 
);

export default Browser;