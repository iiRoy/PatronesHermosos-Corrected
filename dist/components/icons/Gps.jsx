'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Gps = ({
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
        d='M22.5 10.875h-1.948a8.645 8.645 0 0 0-7.427-7.427V1.5a1.125 1.125 0 1 0-2.25 0v1.948a8.645 8.645 0 0 0-7.427 7.427H1.5a1.125 1.125 0 1 0 0 2.25h1.948a8.645 8.645 0 0 0 7.427 7.427V22.5a1.125 1.125 0 1 0 2.25 0v-1.948a8.645 8.645 0 0 0 7.427-7.427H22.5a1.125 1.125 0 1 0 0-2.25Zm-10.5 7.5A6.375 6.375 0 1 1 18.375 12 6.381 6.381 0 0 1 12 18.375Z'
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
exports.default = Gps;
