'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const AlignCenterVertical = ({
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
      d='M21 10.875h-.75V6.75a1.875 1.875 0 0 0-1.875-1.875h-3.75A1.875 1.875 0 0 0 12.75 6.75v4.125h-1.5V4.5a1.875 1.875 0 0 0-1.875-1.875h-3.75A1.875 1.875 0 0 0 3.75 4.5v6.375H3a1.125 1.125 0 1 0 0 2.25h.75V19.5a1.875 1.875 0 0 0 1.875 1.875h3.75A1.875 1.875 0 0 0 11.25 19.5v-6.375h1.5v4.125a1.875 1.875 0 0 0 1.875 1.875h3.75a1.875 1.875 0 0 0 1.875-1.875v-4.125H21a1.125 1.125 0 1 0 0-2.25Zm-12 8.25H6V4.875h3v14.25Zm9-2.25h-3v-9.75h3v9.75Z'
    />{' '}
  </svg>
);
exports.default = AlignCenterVertical;
