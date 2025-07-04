'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const BookBookmark = ({
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
      d='M19.5 1.875H6.75A3.375 3.375 0 0 0 3.375 5.25V21A1.125 1.125 0 0 0 4.5 22.125H18a1.125 1.125 0 1 0 0-2.25H5.625V19.5a1.125 1.125 0 0 1 1.125-1.125H19.5a1.125 1.125 0 0 0 1.125-1.125V3A1.125 1.125 0 0 0 19.5 1.875Zm-8.25 2.25h3.375v5.531l-.985-.788a1.125 1.125 0 0 0-1.407 0l-.983.788V4.125Zm7.125 12H6.75c-.383 0-.764.065-1.125.193V5.25A1.125 1.125 0 0 1 6.75 4.125H9V12a1.125 1.125 0 0 0 1.828.878l2.109-1.687 2.11 1.687A1.124 1.124 0 0 0 16.875 12V4.125h1.5v12Z'
    />{' '}
  </svg>
);
exports.default = BookBookmark;
