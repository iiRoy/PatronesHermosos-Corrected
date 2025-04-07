import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const WifiMedium: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M13.5 19.125a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm5.948-7.909a12 12 0 0 0-14.896 0 1.125 1.125 0 0 0 1.396 1.764 9.75 9.75 0 0 1 12.104 0 1.124 1.124 0 0 0 1.396-1.764Zm-3.035 3.343a7.505 7.505 0 0 0-8.826 0 1.125 1.125 0 0 0 1.326 1.82 5.25 5.25 0 0 1 6.174 0 1.126 1.126 0 0 0 1.326-1.82Z"/> </svg> 
);

export default WifiMedium;