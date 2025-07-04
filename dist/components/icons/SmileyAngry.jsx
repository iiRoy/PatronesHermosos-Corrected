'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const SmileyAngry = ({
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
      d='M8.625 14.625a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm6.75-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm6.75.375A10.124 10.124 0 1 1 12 1.875 10.136 10.136 0 0 1 22.125 12Zm-2.25 0A7.875 7.875 0 1 0 12 19.875 7.883 7.883 0 0 0 19.875 12ZM8.001 9.562l3.375 2.25a1.126 1.126 0 0 0 1.248 0L16 9.563a1.126 1.126 0 0 0-1.248-1.874L12 9.523 9.25 7.688A1.126 1.126 0 0 0 8 9.563Zm6.437 6.106a4.79 4.79 0 0 0-4.876 0 1.124 1.124 0 1 0 1.126 1.946 2.543 2.543 0 0 1 2.624 0 1.126 1.126 0 1 0 1.126-1.947Z'
    />{' '}
  </svg>
);
exports.default = SmileyAngry;
