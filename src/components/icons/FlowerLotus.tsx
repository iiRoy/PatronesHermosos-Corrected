'use client';
import React from 'react';

interface IconProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

const FlowerLotus: React.FC<IconProps> = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (
  <svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M23.372 11.215a1.829 1.829 0 0 0-1.125-.862 7.128 7.128 0 0 0-1.723-.228 8.643 8.643 0 0 0-.282-3.937 1.89 1.89 0 0 0-2.197-1.273 8.286 8.286 0 0 0-2.454.973A9.186 9.186 0 0 0 13.125 3a1.882 1.882 0 0 0-2.25 0 9.187 9.187 0 0 0-2.466 2.888 8.286 8.286 0 0 0-2.451-.974A1.889 1.889 0 0 0 3.76 6.188a8.643 8.643 0 0 0-.28 3.937 7.125 7.125 0 0 0-1.727.228 1.83 1.83 0 0 0-1.125.862 1.875 1.875 0 0 0-.187 1.436c.332 1.233 1.35 3.577 4.419 5.41 3.03 1.814 5.711 1.814 7.147 1.814 1.437 0 4.103 0 7.132-1.813 3.07-1.834 4.087-4.178 4.42-5.411a1.872 1.872 0 0 0-.187-1.436ZM6.015 16.13c-2.09-1.249-2.94-2.731-3.281-3.69a5.4 5.4 0 0 1 1.363-.042c.226.571.494 1.126.801 1.658.516.89 1.132 1.718 1.837 2.467a9.825 9.825 0 0 1-.72-.393Zm1.391-2.323a11.173 11.173 0 0 1-.562-.871c-1.466-2.558-1.328-4.598-1.032-5.74.615.18 1.2.451 1.735.804a11.642 11.642 0 0 0-.422 3.172c-.004.886.09 1.77.281 2.635ZM12 17.369c-.911-.756-2.625-2.651-2.625-6.2 0-3.508 1.688-5.409 2.625-6.195.938.786 2.625 2.687 2.625 6.195 0 3.55-1.714 5.446-2.625 6.203v-.003Zm4.594-3.562c.19-.865.285-1.749.281-2.635A11.642 11.642 0 0 0 16.453 8a6.478 6.478 0 0 1 1.735-.805c.293 1.143.43 3.188-1.037 5.74-.173.305-.362.595-.557.872Zm1.393 2.323c-.24.143-.477.273-.71.39a13.365 13.365 0 0 0 1.828-2.464 12.47 12.47 0 0 0 .802-1.658 5.4 5.4 0 0 1 1.363.043c-.346.958-1.195 2.44-3.285 3.689h.002Z"/> </svg> 
);

export default FlowerLotus;