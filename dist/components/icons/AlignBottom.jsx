'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const AlignBottom = ({
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
      d='M21.375 20.25a1.125 1.125 0 0 1-1.125 1.125H3.75a1.125 1.125 0 1 1 0-2.25h16.5a1.125 1.125 0 0 1 1.125 1.125Zm-8.625-4.5V7.5a1.875 1.875 0 0 1 1.875-1.875H18A1.875 1.875 0 0 1 19.875 7.5v8.25A1.875 1.875 0 0 1 18 17.625h-3.375a1.875 1.875 0 0 1-1.875-1.875Zm2.25-.375h2.625v-7.5H15v7.5Zm-10.875.375v-12A1.875 1.875 0 0 1 6 1.875h3.375A1.875 1.875 0 0 1 11.25 3.75v12a1.875 1.875 0 0 1-1.875 1.875H6a1.875 1.875 0 0 1-1.875-1.875Zm2.25-.375H9V4.125H6.375v11.25Z'
    />{' '}
  </svg>
);
exports.default = AlignBottom;
