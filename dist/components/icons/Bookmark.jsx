'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Bookmark = ({
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
      d='M17.25 2.625H6.75A1.875 1.875 0 0 0 4.875 4.5V21a1.125 1.125 0 0 0 1.721.954L12 18.58l5.405 3.375a1.126 1.126 0 0 0 1.72-.955V4.5a1.875 1.875 0 0 0-1.875-1.875Zm-.375 2.25v9.595l-4.28-2.674a1.125 1.125 0 0 0-1.192 0L7.125 14.47V4.875h9.75Zm-4.28 11.42a1.125 1.125 0 0 0-1.192 0L7.125 18.97v-1.847L12 14.077l4.875 3.046v1.847l-4.28-2.674Z'
    />{' '}
  </svg>
);
exports.default = Bookmark;
