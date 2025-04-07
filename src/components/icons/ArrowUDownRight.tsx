import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowUDownRight: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="m21.796 16.546-4.5 4.5a1.127 1.127 0 1 1-1.594-1.594l2.58-2.577H8.25a6.375 6.375 0 1 1 0-12.75h8.25a1.125 1.125 0 0 1 0 2.25H8.25a4.125 4.125 0 0 0 0 8.25h10.031l-2.58-2.58a1.126 1.126 0 0 1 .797-1.923 1.128 1.128 0 0 1 .797.33l4.5 4.5a1.126 1.126 0 0 1 0 1.594Z"/> </svg> 
);

export default ArrowUDownRight;