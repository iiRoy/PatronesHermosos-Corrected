import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const Prohibit: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M12 1.875A10.125 10.125 0 1 0 22.125 12 10.137 10.137 0 0 0 12 1.875ZM19.875 12a7.837 7.837 0 0 1-1.57 4.714L7.286 5.695A7.875 7.875 0 0 1 19.875 12Zm-15.75 0a7.837 7.837 0 0 1 1.57-4.714l11.019 11.019A7.875 7.875 0 0 1 4.125 12Z"/> </svg> 
);

export default Prohibit;