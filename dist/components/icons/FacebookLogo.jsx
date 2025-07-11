'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const FacebookLogo = ({
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
      d='M12 1.875A10.125 10.125 0 1 0 22.125 12 10.137 10.137 0 0 0 12 1.875Zm1.125 17.918v-5.168H15a1.125 1.125 0 1 0 0-2.25h-1.875V10.5a1.125 1.125 0 0 1 1.125-1.125h1.5a1.125 1.125 0 0 0 0-2.25h-1.5a3.375 3.375 0 0 0-3.375 3.375v1.875H9a1.125 1.125 0 1 0 0 2.25h1.875v5.168a7.875 7.875 0 1 1 2.25 0Z'
    />{' '}
  </svg>
);
exports.default = FacebookLogo;
