'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const GenderIntersex = ({
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
      d='M19.5 1.875h-3.75a1.125 1.125 0 0 0 0 2.25h1.031l-1.466 1.47a6.375 6.375 0 1 0-5.19 11.179V18H8.25a1.125 1.125 0 1 0 0 2.25h1.875v1.5a1.125 1.125 0 1 0 2.25 0v-1.5h1.875a1.125 1.125 0 1 0 0-2.25h-1.875v-1.226a6.37 6.37 0 0 0 4.397-9.454l1.603-1.601V6.75a1.125 1.125 0 1 0 2.25 0V3A1.125 1.125 0 0 0 19.5 1.875Zm-8.25 12.75a4.125 4.125 0 1 1 0-8.25 4.125 4.125 0 0 1 0 8.25Z'
    />{' '}
  </svg>
);
exports.default = GenderIntersex;
