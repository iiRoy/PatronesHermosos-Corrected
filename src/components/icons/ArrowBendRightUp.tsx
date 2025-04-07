import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowBendRightUp: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M19.546 8.296a1.125 1.125 0 0 1-1.594 0l-2.577-2.577V12A10.137 10.137 0 0 1 5.25 22.125a1.125 1.125 0 1 1 0-2.25A7.883 7.883 0 0 0 13.125 12V5.719l-2.58 2.577a1.126 1.126 0 0 1-1.923-.797c0-.299.119-.585.33-.797l4.5-4.5a1.125 1.125 0 0 1 1.594 0l4.5 4.5a1.125 1.125 0 0 1 0 1.594Z"/> </svg> 
);

export default ArrowBendRightUp;