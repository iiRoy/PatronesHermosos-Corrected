'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const SmileySticker = ({
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
      d='M12 1.875a10.125 10.125 0 1 0 2.976 19.806 1.11 1.11 0 0 0 .468-.282l5.96-5.96c.13-.13.227-.291.281-.468A10.132 10.132 0 0 0 12 1.875Zm7.605 12.18-5.55 5.55a7.863 7.863 0 1 1 5.55-5.55Zm-12.48-3.93a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm9.75 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-.15 4.688c-1.032 1.786-2.756 2.812-4.725 2.812-1.969 0-3.69-1.025-4.724-2.813a1.125 1.125 0 0 1 1.948-1.124c.365.63 1.21 1.687 2.776 1.687 1.566 0 2.411-1.057 2.776-1.688a1.126 1.126 0 1 1 1.948 1.126Z'
    />{' '}
  </svg>
);
exports.default = SmileySticker;
