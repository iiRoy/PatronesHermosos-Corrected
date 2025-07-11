'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ArrowFatUp = ({
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
      d='m21.795 10.454-9-9a1.124 1.124 0 0 0-1.594 0l-9 9A1.125 1.125 0 0 0 3 12.375h3.375V19.5a1.875 1.875 0 0 0 1.875 1.875h7.5a1.875 1.875 0 0 0 1.875-1.875v-7.125H21a1.125 1.125 0 0 0 .795-1.92Zm-5.295-.329a1.125 1.125 0 0 0-1.125 1.125v7.875h-6.75V11.25A1.125 1.125 0 0 0 7.5 10.125H5.719L12 3.844l6.281 6.281H16.5Z'
    />{' '}
  </svg>
);
exports.default = ArrowFatUp;
