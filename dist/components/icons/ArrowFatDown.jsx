'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ArrowFatDown = ({
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
      d='M22.04 12.32a1.125 1.125 0 0 0-1.04-.695h-3.375V4.5a1.875 1.875 0 0 0-1.875-1.875h-7.5A1.875 1.875 0 0 0 6.375 4.5v7.125H3a1.125 1.125 0 0 0-.795 1.92l9 9a1.124 1.124 0 0 0 1.594 0l9-9a1.124 1.124 0 0 0 .24-1.225ZM12 20.156l-6.281-6.281H7.5a1.125 1.125 0 0 0 1.125-1.125V4.875h6.75v7.875a1.125 1.125 0 0 0 1.125 1.125h1.781L12 20.156Z'
    />{' '}
  </svg>
);
exports.default = ArrowFatDown;
