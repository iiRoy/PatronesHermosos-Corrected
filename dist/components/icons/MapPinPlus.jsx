'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const MapPinPlus = ({
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
      d='M16.125 9.75A1.125 1.125 0 0 1 15 10.875h-1.875v1.875a1.125 1.125 0 1 1-2.25 0v-1.875H9a1.125 1.125 0 1 1 0-2.25h1.875V6.75a1.125 1.125 0 1 1 2.25 0v1.875H15a1.125 1.125 0 0 1 1.125 1.125Zm4.5 0c0 3.036-1.392 6.24-4.026 9.27a24.282 24.282 0 0 1-3.954 3.655 1.125 1.125 0 0 1-1.29 0c-.326-.231-7.98-5.672-7.98-12.925a8.625 8.625 0 0 1 17.25 0Zm-2.25 0a6.375 6.375 0 1 0-12.75 0c0 3.123 1.875 5.94 3.44 7.754A23.378 23.378 0 0 0 12 20.334a23.38 23.38 0 0 0 2.934-2.83c1.566-1.813 3.441-4.631 3.441-7.754Z'
    />{' '}
  </svg>
);
exports.default = MapPinPlus;
