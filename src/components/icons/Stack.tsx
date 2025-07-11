'use client';
import React from 'react';

interface IconProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

const Stack: React.FC<IconProps> = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (
  <svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M21.971 15.938a1.125 1.125 0 0 1-.409 1.534l-9 5.25a1.125 1.125 0 0 1-1.134 0l-9-5.25a1.125 1.125 0 0 1 1.134-1.944l8.437 4.92 8.438-4.92a1.125 1.125 0 0 1 1.534.41Zm-1.534-4.91L12 15.948l-8.433-4.92a1.125 1.125 0 0 0-1.13 1.944l9 5.25a1.125 1.125 0 0 0 1.135 0l9-5.25a1.126 1.126 0 0 0-1.134-1.944ZM1.875 7.5a1.125 1.125 0 0 1 .563-.972l9-5.25a1.13 1.13 0 0 1 1.134 0l9 5.25a1.126 1.126 0 0 1 0 1.944l-9 5.25a1.125 1.125 0 0 1-1.134 0l-9-5.25a1.125 1.125 0 0 1-.563-.972Zm3.358 0L12 11.448 18.767 7.5 12 3.552 5.233 7.5Z"/> </svg> 
);

export default Stack;