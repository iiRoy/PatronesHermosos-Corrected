'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ChartBarHorizontal = ({
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
      d='M21 8.625h-3.375V5.25A1.125 1.125 0 0 0 16.5 4.125H5.625V3.75a1.125 1.125 0 0 0-2.25 0v16.5a1.125 1.125 0 0 0 2.25 0v-.375H13.5a1.125 1.125 0 0 0 1.125-1.125v-3.375H21a1.125 1.125 0 0 0 1.125-1.125v-4.5A1.125 1.125 0 0 0 21 8.625Zm-5.625-2.25v2.25h-9.75v-2.25h9.75Zm-3 11.25h-6.75v-2.25h6.75v2.25Zm7.5-4.5H5.625v-2.25h14.25v2.25Z'
    />{' '}
  </svg>
);
exports.default = ChartBarHorizontal;
