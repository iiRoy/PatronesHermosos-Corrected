'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CloudArrowDown = ({
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
      d='M18.046 15.704a1.125 1.125 0 0 1 0 1.594l-3 3a1.125 1.125 0 0 1-1.594 0l-3-3a1.125 1.125 0 0 1 .797-1.924 1.125 1.125 0 0 1 .797.33l1.079 1.077V12a1.125 1.125 0 1 1 2.25 0v4.781l1.08-1.08a1.124 1.124 0 0 1 1.59.003ZM15 3.375A8.633 8.633 0 0 0 7.406 7.91a6.375 6.375 0 1 0-.656 12.715h1.125a1.125 1.125 0 1 0 0-2.25H6.75a4.125 4.125 0 0 1-.17-8.245A8.596 8.596 0 0 0 6.375 12a1.125 1.125 0 1 0 2.25 0 6.375 6.375 0 1 1 12.75 0 6.307 6.307 0 0 1-.68 2.868 1.127 1.127 0 0 0 .49 1.525 1.126 1.126 0 0 0 1.518-.51A8.539 8.539 0 0 0 23.625 12 8.635 8.635 0 0 0 15 3.375Z'
    />{' '}
  </svg>
);
exports.default = CloudArrowDown;
