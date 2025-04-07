import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const WifiLow: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M13.5 19.125a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm2.912-4.566a7.5 7.5 0 0 0-8.824 0 1.125 1.125 0 0 0 1.325 1.82 5.25 5.25 0 0 1 6.174 0 1.125 1.125 0 0 0 1.325-1.82Z"/> </svg> 
);

export default WifiLow;