'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const MapPin = ({
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
      d='M12 5.625a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25Zm0 6a1.875 1.875 0 1 1 0-3.75 1.875 1.875 0 0 1 0 3.75Zm0-10.5A8.634 8.634 0 0 0 3.375 9.75c0 7.253 7.654 12.694 7.98 12.922a1.125 1.125 0 0 0 1.29 0 24.287 24.287 0 0 0 3.954-3.657c2.634-3.024 4.026-6.23 4.026-9.265A8.635 8.635 0 0 0 12 1.125Zm2.934 16.38A23.38 23.38 0 0 1 12 20.332a23.378 23.378 0 0 1-2.934-2.829C7.5 15.691 5.625 12.873 5.625 9.75a6.375 6.375 0 0 1 12.75 0c0 3.123-1.875 5.94-3.44 7.754Z'
    />{' '}
  </svg>
);
exports.default = MapPin;
