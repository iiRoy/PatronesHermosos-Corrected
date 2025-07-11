'use client';
import React from 'react';

interface IconProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

const Highlighter: React.FC<IconProps> = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (
  <svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24"> <g clipPath="url(#a)"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M23.67 10.08a1.125 1.125 0 0 0-1.593 0L18 14.155 10.594 6.75l4.08-4.079a1.127 1.127 0 1 0-1.594-1.594L8.735 5.424a1.875 1.875 0 0 0-.443 1.943L6.485 9.174a1.875 1.875 0 0 0 0 2.652l.171.174-5.202 5.204a1.125 1.125 0 0 0 .44 1.863l6.75 2.25a1.106 1.106 0 0 0 .787-.028c.136-.056.26-.14.365-.244l2.954-2.951.174.174a1.875 1.875 0 0 0 2.652 0l1.806-1.806a1.862 1.862 0 0 0 1.943-.444l4.346-4.344a1.126 1.126 0 0 0 0-1.595ZM8.697 18.962l-4.364-1.454 3.918-3.915 2.906 2.906-2.46 2.463Zm5.554-2.557-5.204-5.201-.702-.705L9.75 9.094 15.656 15l-1.406 1.406Z"/> </g> <defs> <clipPath id="a"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M0 0h24v24H0z"/> </clipPath> </defs> </svg> 
);

export default Highlighter;