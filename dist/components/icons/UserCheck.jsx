'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const UserCheck = ({
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
        d='M14.297 14.676a6.75 6.75 0 1 0-8.344 0 11.625 11.625 0 0 0-4.565 3.35 1.125 1.125 0 1 0 1.724 1.448c1.283-1.528 3.544-3.349 7.013-3.349s5.73 1.82 7.013 3.349a1.125 1.125 0 0 0 1.724-1.448 11.615 11.615 0 0 0-4.565-3.35ZM5.625 9.375a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Zm18.046 3.421-3 3a1.125 1.125 0 0 1-1.594 0l-1.5-1.5a1.127 1.127 0 1 1 1.594-1.594l.704.704 2.204-2.205a1.124 1.124 0 0 1 1.594 0 1.125 1.125 0 0 1 0 1.594l-.002.001Z'
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
exports.default = UserCheck;
