'use client';
import React from 'react';

interface IconProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

const Fingerprint: React.FC<IconProps> = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (
  <svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M15 12c0 3.45-.85 6.849-2.472 9.894a1.127 1.127 0 0 1-1.53.476 1.125 1.125 0 0 1-.454-1.537A18.781 18.781 0 0 0 12.75 12a.75.75 0 1 0-1.5 0A1.125 1.125 0 1 1 9 12a3 3 0 1 1 6 0Zm-3-6.75a1.125 1.125 0 0 0 0 2.25 4.505 4.505 0 0 1 4.5 4.5c0 .714-.034 1.436-.1 2.144a1.125 1.125 0 0 0 1.013 1.231h.107a1.125 1.125 0 0 0 1.118-1.02c.074-.777.111-1.57.111-2.355A6.758 6.758 0 0 0 12 5.25ZM9 8.647A1.125 1.125 0 0 0 7.5 6.97 6.76 6.76 0 0 0 5.25 12a11.26 11.26 0 0 1-1.417 5.472A1.127 1.127 0 1 0 5.8 18.568c1.116-2.01 1.7-4.27 1.699-6.568A4.508 4.508 0 0 1 9 8.647Zm.947 6.009a1.125 1.125 0 0 0-1.356.834 14.87 14.87 0 0 1-1.77 4.3 1.125 1.125 0 1 0 1.922 1.17 17.144 17.144 0 0 0 2.038-4.948 1.125 1.125 0 0 0-.834-1.356Zm7.193 2.257a1.123 1.123 0 0 0-1.372.806c-.208.79-.458 1.568-.75 2.331a1.125 1.125 0 0 0 2.1.805c.323-.84.598-1.696.825-2.566a1.123 1.123 0 0 0-.803-1.377ZM12 1.5A10.511 10.511 0 0 0 1.5 11.947v.054c0 .89-.159 1.774-.469 2.608a1.125 1.125 0 1 0 2.11.783 9.712 9.712 0 0 0 .609-3.338v-.053a8.25 8.25 0 0 1 16.5-.047v.047c0 1.935-.211 3.865-.632 5.754a1.125 1.125 0 1 0 2.198.49 28.67 28.67 0 0 0 .684-6.193V12A10.512 10.512 0 0 0 12 1.5Z"/> </svg> 
);

export default Fingerprint;