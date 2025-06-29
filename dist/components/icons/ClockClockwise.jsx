'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ClockClockwise = ({
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
      d='M13.125 7.5v3.863l3.203 1.922a1.123 1.123 0 0 1 .105 1.882 1.125 1.125 0 0 1-1.261.048l-3.75-2.25a1.125 1.125 0 0 1-.547-.965V7.5a1.125 1.125 0 1 1 2.25 0ZM21 4.875A1.125 1.125 0 0 0 19.875 6v.69a39.792 39.792 0 0 0-1.246-1.32 9.375 9.375 0 1 0-.194 13.448 1.125 1.125 0 1 0-1.545-1.636 7.125 7.125 0 1 1 .143-10.225 36 36 0 0 1 1.551 1.668H17.25a1.125 1.125 0 1 0 0 2.25H21a1.125 1.125 0 0 0 1.125-1.125V6A1.125 1.125 0 0 0 21 4.875Z'
    />{' '}
  </svg>
);
exports.default = ClockClockwise;
