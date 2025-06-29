'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Broom = ({
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
      d='M22.241 19.988c-1.98-.957-3.116-3.053-3.116-5.738v-1.62a1.87 1.87 0 0 0-1.183-1.742l-2.33-.92a.375.375 0 0 1-.213-.481l2-4.97A3.001 3.001 0 0 0 15.672.563a3.012 3.012 0 0 0-3.836 1.707l-.007.017-1.968 4.977a.37.37 0 0 1-.201.206.365.365 0 0 1-.281.006L6.994 6.51a1.865 1.865 0 0 0-2.037.428C2.912 9.04 1.875 11.502 1.875 14.25a10.824 10.824 0 0 0 3.027 7.528 1.126 1.126 0 0 0 .817.347H21.75a1.125 1.125 0 0 0 .491-2.137ZM6.393 8.693l2.144.87a2.625 2.625 0 0 0 3.416-1.471l1.964-4.97a.78.78 0 0 1 .969-.45.75.75 0 0 1 .432.99v.011l-2.005 4.98a2.63 2.63 0 0 0 1.47 3.405l2.092.828v1.364c0 .094 0 .194.005.29L5.4 9.948c.296-.445.628-.864.993-1.254Zm4.551 11.182a7.85 7.85 0 0 1-2.07-3.656 1.125 1.125 0 0 0-2.18.562c.28 1.099.739 2.144 1.358 3.094H6.211a8.58 8.58 0 0 1-2.086-5.625 7.875 7.875 0 0 1 .32-2.26l12.813 5.124a8.12 8.12 0 0 0 1.366 2.761h-7.68Z'
    />{' '}
  </svg>
);
exports.default = Broom;
