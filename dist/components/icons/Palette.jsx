'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Palette = ({
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
      d='M19.085 4.781A10.116 10.116 0 0 0 1.875 12c0 4.192 2.588 7.71 6.75 9.182a3.377 3.377 0 0 0 4.5-3.182 1.125 1.125 0 0 1 1.125-1.125h4.332a3.355 3.355 0 0 0 3.29-2.625c.175-.766.26-1.55.253-2.335a10.052 10.052 0 0 0-3.04-7.134Zm.594 8.97a1.117 1.117 0 0 1-1.097.871H14.25a3.375 3.375 0 0 0-3.375 3.375 1.124 1.124 0 0 1-1.5 1.06c-1.56-.552-2.873-1.478-3.795-2.678A7.125 7.125 0 0 1 4.125 12a7.875 7.875 0 0 1 7.793-7.875H12a7.908 7.908 0 0 1 7.875 7.808 7.94 7.94 0 0 1-.196 1.821v-.004ZM13.5 7.124a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-4.125 2.25a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.25a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm8.25-5.25a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z'
    />{' '}
  </svg>
);
exports.default = Palette;
