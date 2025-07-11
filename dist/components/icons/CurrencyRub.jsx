'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CurrencyRub = ({
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
      d='M13.875 14.625a6 6 0 1 0 0-12H8.25A1.125 1.125 0 0 0 7.125 3.75v8.625H5.25a1.125 1.125 0 1 0 0 2.25h1.875v1.5H5.25a1.125 1.125 0 1 0 0 2.25h1.875v1.875a1.125 1.125 0 0 0 2.25 0v-1.875H13.5a1.125 1.125 0 1 0 0-2.25H9.375v-1.5h4.5Zm-4.5-9.75h4.5a3.75 3.75 0 0 1 0 7.5h-4.5v-7.5Z'
    />{' '}
  </svg>
);
exports.default = CurrencyRub;
