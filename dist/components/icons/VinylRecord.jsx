'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const VinylRecord = ({
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
      d='M12 1.875A10.125 10.125 0 1 0 22.125 12 10.137 10.137 0 0 0 12 1.875Zm0 18A7.875 7.875 0 1 1 19.875 12 7.883 7.883 0 0 1 12 19.875Zm0-12A4.13 4.13 0 0 0 7.875 12a1.125 1.125 0 1 1-2.25 0A6.382 6.382 0 0 1 12 5.625a1.125 1.125 0 0 1 0 2.25ZM18.375 12A6.381 6.381 0 0 1 12 18.375a1.125 1.125 0 1 1 0-2.25A4.13 4.13 0 0 0 16.125 12a1.125 1.125 0 1 1 2.25 0ZM12 14.625a2.625 2.625 0 1 1 0-5.25 2.625 2.625 0 0 1 0 5.25Z'
    />{' '}
  </svg>
);
exports.default = VinylRecord;
