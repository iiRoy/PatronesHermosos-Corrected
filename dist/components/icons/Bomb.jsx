'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Bomb = ({
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
        d='M22.875 2.625A1.125 1.125 0 0 0 21.75 3.75a4.565 4.565 0 0 1-.312 1.5c-.416.997-1.054 1.125-1.563 1.125-.826 0-1.398-.797-2.242-2.108-.899-1.4-2.019-3.142-4.133-3.142-1.7 0-3 .917-3.67 2.582a6.4 6.4 0 0 0-.336 1.168H8.25A1.875 1.875 0 0 0 6.375 6.75v.673A8.625 8.625 0 0 0 10.5 23.625h.156a8.625 8.625 0 0 0 3.969-16.202V6.75a1.875 1.875 0 0 0-1.875-1.875h-.944c.037-.127.081-.252.131-.375.416-.996 1.054-1.125 1.563-1.125.826 0 1.398.797 2.242 2.108.899 1.4 2.019 3.142 4.133 3.142 1.7 0 3-.917 3.67-2.582A6.744 6.744 0 0 0 24 3.75a1.125 1.125 0 0 0-1.125-1.125Zm-9.825 6.53a6.375 6.375 0 1 1-5.1 0 1.125 1.125 0 0 0 .675-1.032v-.998h3.75v1a1.125 1.125 0 0 0 .675 1.03Zm-2.602 9.76a1.124 1.124 0 0 1-1.41.737A4.856 4.856 0 0 1 5.624 15a1.125 1.125 0 0 1 2.25 0 2.615 2.615 0 0 0 1.838 2.505 1.125 1.125 0 0 1 .735 1.41Z'
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
exports.default = Bomb;
