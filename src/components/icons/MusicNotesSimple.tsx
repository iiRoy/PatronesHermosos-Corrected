import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const MusicNotesSimple: React.FC<IconProps> = ({ width = 24, height = 24, color = 'black' }) => (
  <svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M20.192 1.363a1.125 1.125 0 0 0-.965-.204l-12 3a1.125 1.125 0 0 0-.852 1.091v9.69a3.75 3.75 0 1 0 2.25 3.435V6.128l9.75-2.437v8.25a3.75 3.75 0 1 0 2.25 3.434V2.25a1.125 1.125 0 0 0-.433-.887ZM4.875 19.875a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm12-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/> </svg> 
);

export default MusicNotesSimple;