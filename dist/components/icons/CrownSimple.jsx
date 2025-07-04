'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CrownSimple = ({
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
      d='M21.81 6.562a1.858 1.858 0 0 0-2.209.442l-2.767 2.983-3.126-7.01-.005-.013a1.875 1.875 0 0 0-3.405 0l-.006.013-3.126 7.01L4.4 7.002A1.875 1.875 0 0 0 1.155 8.58c0 .015.006.03.008.044l2.125 9.73a1.875 1.875 0 0 0 1.841 1.522h13.742a1.875 1.875 0 0 0 1.841-1.523l2.125-9.727c0-.015.006-.03.008-.044a1.857 1.857 0 0 0-1.036-2.019Zm-3.242 11.063H5.432l-1.77-8.108 3.013 3.248a1.125 1.125 0 0 0 1.856-.307L12 4.671l3.469 7.787a1.125 1.125 0 0 0 1.852.307l3.013-3.248-1.766 8.108Z'
    />{' '}
  </svg>
);
exports.default = CrownSimple;
