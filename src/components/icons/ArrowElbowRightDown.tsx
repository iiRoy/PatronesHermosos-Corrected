import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowElbowRightDown: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="m21.796 15.796-4.5 4.5a1.125 1.125 0 0 1-1.594 0l-4.5-4.5a1.124 1.124 0 0 1 0-1.594 1.125 1.125 0 0 1 1.594 0l2.579 2.58V7.124H3a1.125 1.125 0 0 1 0-2.25h13.5A1.125 1.125 0 0 1 17.625 6v10.781l2.58-2.58a1.126 1.126 0 0 1 1.923.797 1.128 1.128 0 0 1-.33.797h-.002Z"/> </svg> 
);

export default ArrowElbowRightDown;