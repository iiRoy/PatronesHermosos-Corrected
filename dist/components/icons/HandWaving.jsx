'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const HandWaving = ({
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
      d='M17.31 2.17a1.123 1.123 0 0 1 1.405-.75c1.01.309 1.934.85 2.698 1.58a1.125 1.125 0 0 1-1.555 1.627 4.528 4.528 0 0 0-1.8-1.05 1.125 1.125 0 0 1-.749-1.408Zm4.52 13.561a8.625 8.625 0 0 1-15.8 2.082l-3.75-6.5a3 3 0 0 1 1.802-4.389A3 3 0 0 1 8.31 3.042a3 3 0 0 1 4.969.333l1.362 2.36a3 3 0 0 1 4.703.64l1.623 2.812a8.567 8.567 0 0 1 .862 6.544Zm-2.813-5.42L17.397 7.5a.75.75 0 0 0-1.3.75l.627 1.085a1.126 1.126 0 0 1-.298 1.461 2.625 2.625 0 0 0-.601 3.572 1.124 1.124 0 1 1-1.862 1.262 4.88 4.88 0 0 1 .366-5.944L11.334 4.5a.752.752 0 0 0-1.303.75l2.274 3.937a1.124 1.124 0 1 1-1.948 1.126L7.437 5.25A.75.75 0 0 0 6.14 6l3.142 5.438a1.125 1.125 0 0 1-1.948 1.124L5.525 9.438a.75.75 0 1 0-1.299.75l3.752 6.5a6.375 6.375 0 0 0 11.042-6.375l-.003-.001ZM4.731 18.564a1.125 1.125 0 1 0-1.948 1.125c.519.899 1.149 1.73 1.874 2.473a1.124 1.124 0 1 0 1.61-1.572 10.24 10.24 0 0 1-1.536-2.026Z'
    />{' '}
  </svg>
);
exports.default = HandWaving;
