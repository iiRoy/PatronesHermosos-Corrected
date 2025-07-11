'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const NumberFive = ({
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
      d='M16.875 15A5.624 5.624 0 0 1 7.5 19.192 1.125 1.125 0 1 1 9 17.517a3.374 3.374 0 1 0 .065-5.088 1.125 1.125 0 0 1-1.832-1.078l1.414-7.07a1.125 1.125 0 0 1 1.103-.905h6a1.125 1.125 0 0 1 0 2.25h-5.078L9.89 9.543A5.625 5.625 0 0 1 16.875 15Z'
    />{' '}
  </svg>
);
exports.default = NumberFive;
