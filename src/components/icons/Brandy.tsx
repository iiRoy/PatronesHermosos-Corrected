import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const Brandy: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M21.375 8.25a9.34 9.34 0 0 0-1.517-5.114 1.124 1.124 0 0 0-.937-.511H5.084a1.125 1.125 0 0 0-.937.51A9.34 9.34 0 0 0 2.625 8.25a9.39 9.39 0 0 0 8.25 9.308v2.317H8.25a1.125 1.125 0 1 0 0 2.25h7.5a1.125 1.125 0 1 0 0-2.25h-2.625v-2.317a9.389 9.389 0 0 0 8.25-9.308ZM5.723 4.875h12.558c.378.702.635 1.463.76 2.25H4.969a7.071 7.071 0 0 1 .754-2.25Zm6.282 10.5a7.136 7.136 0 0 1-7.032-6h14.058a7.136 7.136 0 0 1-7.031 6h.005Z"/> </svg> 
);

export default Brandy;