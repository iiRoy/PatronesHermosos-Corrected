'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CloudCheck = ({
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
      d='M15 3.375a8.634 8.634 0 0 0-7.594 4.534 6.375 6.375 0 1 0-.656 12.716H15a8.625 8.625 0 1 0 0-17.25Zm0 15H6.75a4.126 4.126 0 0 1-.17-8.25A8.612 8.612 0 0 0 6.374 12a1.125 1.125 0 0 0 2.25 0A6.375 6.375 0 1 1 15 18.375Zm3.796-8.67a1.125 1.125 0 0 1 0 1.593l-4.5 4.5a1.125 1.125 0 0 1-1.594 0l-2.25-2.25a1.125 1.125 0 0 1 .797-1.924 1.125 1.125 0 0 1 .797.33l1.454 1.452 3.704-3.705a1.125 1.125 0 0 1 1.592.003Z'
    />{' '}
  </svg>
);
exports.default = CloudCheck;
