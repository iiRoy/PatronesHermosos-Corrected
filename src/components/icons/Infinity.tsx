import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const Infinity: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M23.625 12a5.625 5.625 0 0 1-9.603 3.978l-.046-.05-5.612-6.336a3.375 3.375 0 1 0 0 4.816l.29-.326a1.126 1.126 0 1 1 1.687 1.492l-.314.354-.046.05a5.625 5.625 0 1 1 0-7.956l.046.05 5.611 6.336a3.374 3.374 0 1 0 0-4.816l-.288.326a1.127 1.127 0 0 1-1.688-1.492l.314-.354.046-.05A5.625 5.625 0 0 1 23.625 12Z"/> </svg> 
);

export default Infinity;