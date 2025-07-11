'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const NumberEight = ({
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
      d='M15.229 11.148a4.876 4.876 0 1 0-6.458 0 5.625 5.625 0 1 0 6.458 0ZM9.375 7.5a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0ZM12 19.125a3.374 3.374 0 1 1 0-6.749 3.374 3.374 0 0 1 0 6.749Z'
    />{' '}
  </svg>
);
exports.default = NumberEight;
