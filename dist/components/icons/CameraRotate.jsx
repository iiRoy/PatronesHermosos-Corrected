'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CameraRotate = ({
  width = 24,
  height = 24,
  strokeColor = 'currentColor',
  fillColor = 'none',
  strokeWidth = 1,
}) => (
  <svg
    width={width}
    height={height}
    stroke={strokeColor}
    fill={fillColor}
    strokeWidth={strokeWidth}
    vectorEffect='non-scaling-stroke'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
  >
    {' '}
    <path
      stroke={strokeColor}
      fill={fillColor}
      strokeWidth={strokeWidth}
      vectorEffect='non-scaling-stroke'
      d='M19.5 4.875h-2.398l-1.165-1.75a1.125 1.125 0 0 0-.937-.5H9a1.125 1.125 0 0 0-.938.5l-1.165 1.75H4.5A2.625 2.625 0 0 0 1.875 7.5V18A2.625 2.625 0 0 0 4.5 20.625h15A2.625 2.625 0 0 0 22.125 18V7.5A2.625 2.625 0 0 0 19.5 4.875ZM19.875 18a.375.375 0 0 1-.375.375h-15A.375.375 0 0 1 4.125 18V7.5a.375.375 0 0 1 .375-.375h3a1.125 1.125 0 0 0 .938-.5l1.164-1.75h4.795l1.165 1.75a1.125 1.125 0 0 0 .938.5h3a.375.375 0 0 1 .375.375V18Zm-3-8.625v1.875a1.125 1.125 0 0 1-1.125 1.125h-1.875a1.124 1.124 0 0 1-.727-1.982 2.632 2.632 0 0 0-2.72.256A1.127 1.127 0 0 1 9.075 8.85a4.901 4.901 0 0 1 5.732-.085 1.125 1.125 0 0 1 2.069.61Zm-1.726 4.95a1.125 1.125 0 0 1-.223 1.575 4.848 4.848 0 0 1-2.918.97 4.904 4.904 0 0 1-2.813-.886 1.125 1.125 0 0 1-2.07-.609V13.5a1.125 1.125 0 0 1 1.125-1.125h1.875a1.124 1.124 0 0 1 .727 1.982 2.632 2.632 0 0 0 2.72-.256 1.126 1.126 0 0 1 1.577.224Z'
    />{' '}
  </svg>
);
exports.default = CameraRotate;
