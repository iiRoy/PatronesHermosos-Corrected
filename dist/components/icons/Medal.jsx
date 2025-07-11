'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Medal = ({
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
      d='M20.625 9a8.625 8.625 0 1 0-14.25 6.534V22.5a1.125 1.125 0 0 0 1.628 1.006L12 21.508l3.998 1.998a1.125 1.125 0 0 0 1.627-1.006v-6.966a8.613 8.613 0 0 0 3-6.534Zm-15 0A6.375 6.375 0 1 1 12 15.375 6.381 6.381 0 0 1 5.625 9Zm9.75 11.68-2.873-1.436a1.125 1.125 0 0 0-1.006 0L8.625 20.68v-3.742a8.626 8.626 0 0 0 6.75 0v3.743ZM12 13.875a4.875 4.875 0 1 0 0-9.75 4.875 4.875 0 0 0 0 9.75Zm0-7.5a2.625 2.625 0 1 1 0 5.25 2.625 2.625 0 0 1 0-5.25Z'
    />{' '}
  </svg>
);
exports.default = Medal;
