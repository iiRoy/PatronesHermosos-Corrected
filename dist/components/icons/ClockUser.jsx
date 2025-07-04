'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ClockUser = ({
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
      d='m17.003 10.756-4.5 2.25A1.125 1.125 0 0 1 10.874 12V6.75a1.125 1.125 0 1 1 2.25 0v3.43l2.872-1.436a1.124 1.124 0 1 1 1.006 2.012Zm4.286 11.33a1.125 1.125 0 0 1-1.377-.797c-.224-.833-1.007-1.414-1.912-1.414s-1.688.581-1.913 1.414a1.125 1.125 0 1 1-2.175-.579 4.102 4.102 0 0 1 1.413-2.156 3.376 3.376 0 1 1 5.344 0 4.097 4.097 0 0 1 1.414 2.156 1.125 1.125 0 0 1-.794 1.377ZM16.875 16.5a1.125 1.125 0 1 0 2.25 0 1.125 1.125 0 0 0-2.25 0Zm-5.861 3.314a7.876 7.876 0 1 1 8.8-8.8 1.123 1.123 0 0 0 2.01.557 1.124 1.124 0 0 0 .222-.838 10.124 10.124 0 1 0-11.31 11.313 1.125 1.125 0 1 0 .278-2.232Z'
    />{' '}
  </svg>
);
exports.default = ClockUser;
