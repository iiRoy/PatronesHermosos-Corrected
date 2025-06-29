'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const TiktokLogo = ({
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
      d='M21 6.375a4.13 4.13 0 0 1-4.125-4.125 1.125 1.125 0 0 0-1.125-1.125H12a1.125 1.125 0 0 0-1.125 1.125v12.375a1.5 1.5 0 1 1-2.142-1.357 1.125 1.125 0 0 0 .642-1.016V8.25a1.125 1.125 0 0 0-1.322-1.107 7.44 7.44 0 0 0-4.414 2.6 7.672 7.672 0 0 0-1.764 4.882 7.5 7.5 0 0 0 15 0V11.5a10.06 10.06 0 0 0 4.125.875 1.125 1.125 0 0 0 1.125-1.125V7.5A1.125 1.125 0 0 0 21 6.375Zm-1.125 3.67a7.787 7.787 0 0 1-3.469-1.397 1.125 1.125 0 0 0-1.781.915v5.062a5.25 5.25 0 1 1-10.5 0 5.424 5.424 0 0 1 3-4.834v1.834a3.75 3.75 0 1 0 6 3V3.375h1.6a6.395 6.395 0 0 0 5.15 5.15v1.52Z'
    />{' '}
  </svg>
);
exports.default = TiktokLogo;
