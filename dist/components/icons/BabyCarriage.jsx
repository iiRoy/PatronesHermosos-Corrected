'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const BabyCarriage = ({
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
      d='M15 2.625h-.75A1.875 1.875 0 0 0 12.375 4.5v4.875H5.452A3.757 3.757 0 0 0 1.875 6.75a1.125 1.125 0 0 0 0 2.25 1.5 1.5 0 0 1 1.5 1.5 7.883 7.883 0 0 0 7.875 7.875H15a7.875 7.875 0 0 0 0-15.75Zm4.506 4.511c.497.663.84 1.427 1.006 2.239h-3.805l2.799-2.239ZM15 4.875c.982 0 1.946.259 2.797.75l-3.172 2.531V4.875H15Zm0 11.25h-3.75a5.634 5.634 0 0 1-5.512-4.5h14.774a5.635 5.635 0 0 1-5.512 4.5ZM10.125 21a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm9.75 0a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Z'
    />{' '}
  </svg>
);
exports.default = BabyCarriage;
