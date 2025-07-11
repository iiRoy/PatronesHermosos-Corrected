'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const WifiMedium = ({
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
      d='M13.5 19.125a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm5.948-7.909a12 12 0 0 0-14.896 0 1.125 1.125 0 0 0 1.396 1.764 9.75 9.75 0 0 1 12.104 0 1.124 1.124 0 0 0 1.396-1.764Zm-3.035 3.343a7.505 7.505 0 0 0-8.826 0 1.125 1.125 0 0 0 1.326 1.82 5.25 5.25 0 0 1 6.174 0 1.126 1.126 0 0 0 1.326-1.82Z'
    />{' '}
  </svg>
);
exports.default = WifiMedium;
