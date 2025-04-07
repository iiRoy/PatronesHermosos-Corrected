import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowElbowLeftUp: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M22.875 18a1.125 1.125 0 0 1-1.125 1.125H8.25A1.125 1.125 0 0 1 7.125 18V7.219l-2.58 2.577a1.127 1.127 0 1 1-1.593-1.594l4.5-4.5a1.125 1.125 0 0 1 1.594 0l4.5 4.5a1.127 1.127 0 1 1-1.594 1.594L9.375 7.219v9.656H21.75A1.125 1.125 0 0 1 22.875 18Z"/> </svg> 
);

export default ArrowElbowLeftUp;