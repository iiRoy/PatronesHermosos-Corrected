'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const AlignCenterVerticalSimple = ({
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
      d='M19.5 10.875h-2.625V4.5A1.875 1.875 0 0 0 15 2.625H9A1.875 1.875 0 0 0 7.125 4.5v6.375H4.5a1.125 1.125 0 1 0 0 2.25h2.625V19.5A1.875 1.875 0 0 0 9 21.375h6a1.875 1.875 0 0 0 1.875-1.875v-6.375H19.5a1.125 1.125 0 1 0 0-2.25Zm-4.875 8.25h-5.25V4.875h5.25v14.25Z'
    />{' '}
  </svg>
);
exports.default = AlignCenterVerticalSimple;
