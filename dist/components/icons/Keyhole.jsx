'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Keyhole = ({
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
      d='M12 1.875A10.125 10.125 0 1 0 22.125 12 10.137 10.137 0 0 0 12 1.875Zm0 18A7.875 7.875 0 1 1 19.875 12 7.883 7.883 0 0 1 12 19.875Zm0-13.5a4.125 4.125 0 0 0-3.15 6.788l-.925 3.006A1.125 1.125 0 0 0 9 17.625h6a1.125 1.125 0 0 0 1.075-1.456l-.924-3.006A4.124 4.124 0 0 0 12 6.375Zm.8 6.798.677 2.202h-2.954l.677-2.202a1.125 1.125 0 0 0-.375-1.209 1.875 1.875 0 1 1 2.344 0 1.125 1.125 0 0 0-.37 1.209Z'
    />{' '}
  </svg>
);
exports.default = Keyhole;
