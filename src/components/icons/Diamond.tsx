import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const Diamond: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="m22.328 10.677-9.006-9.005a1.875 1.875 0 0 0-2.645 0l-9 9.005a1.875 1.875 0 0 0 0 2.646l9.005 9.005a1.875 1.875 0 0 0 2.645 0l9-9.005a1.875 1.875 0 0 0 0-2.646ZM12 20.468 3.532 12 12 3.532 20.468 12 12 20.468Z"/> </svg> 
);

export default Diamond;