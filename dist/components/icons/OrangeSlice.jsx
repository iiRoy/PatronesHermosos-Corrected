'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const OrangeSlice = ({
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
    <g clipPath='url(#a)'>
      {' '}
      <path
        stroke={strokeColor}
        fill={fillColor}
        strokeWidth={strokeWidth}
        vectorEffect='non-scaling-stroke'
        d='M22.875 7.125H1.125A1.125 1.125 0 0 0 0 8.25v.375a12 12 0 0 0 24 0V8.25a1.125 1.125 0 0 0-1.125-1.125ZM6.049 9.375h4.002l-2.113 3.66a5.988 5.988 0 0 1-1.89-3.66ZM12 10.5l2.15 3.725a5.978 5.978 0 0 1-4.3 0L12 10.5Zm4.062 2.536L13.95 9.375h4.002a5.988 5.988 0 0 1-1.889 3.66ZM12 18.375a9.764 9.764 0 0 1-9.722-9h1.507a8.25 8.25 0 0 0 16.43 0h1.507a9.764 9.764 0 0 1-9.722 9Z'
      />{' '}
    </g>{' '}
    <defs>
      {' '}
      <clipPath id='a'>
        {' '}
        <path
          stroke={strokeColor}
          fill={fillColor}
          strokeWidth={strokeWidth}
          vectorEffect='non-scaling-stroke'
          d='M0 0h24v24H0z'
        />{' '}
      </clipPath>{' '}
    </defs>{' '}
  </svg>
);
exports.default = OrangeSlice;
