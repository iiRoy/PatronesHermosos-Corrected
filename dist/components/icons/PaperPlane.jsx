'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const PaperPlane = ({
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
      d='m22.633 18.581-.005-.008-9.006-15.745a1.875 1.875 0 0 0-3.264 0L1.367 18.581a1.875 1.875 0 0 0 2.256 2.686L12 18.437l8.378 2.83a1.875 1.875 0 0 0 2.256-2.686Zm-9.508-2.138V11.25a1.125 1.125 0 0 0-2.25 0v5.193l-7.058 2.384L11.99 4.506l8.19 14.32-7.055-2.383Z'
    />{' '}
  </svg>
);
exports.default = PaperPlane;
