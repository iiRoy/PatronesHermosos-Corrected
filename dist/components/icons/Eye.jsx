'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Eye = ({
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
      d='M23.531 11.543c-.034-.075-.856-1.899-2.67-3.713C18.434 5.407 15.375 4.125 12 4.125c-3.375 0-6.434 1.282-8.858 3.705C1.327 9.644.506 11.467.469 11.543a1.133 1.133 0 0 0 0 .915c.034.076.856 1.899 2.67 3.713 2.427 2.423 5.486 3.704 8.861 3.704 3.375 0 6.434-1.28 8.858-3.704 1.814-1.814 2.636-3.637 2.67-3.713a1.132 1.132 0 0 0 .003-.915Zm-4.318 3.094C17.2 16.62 14.774 17.625 12 17.625s-5.2-1.006-7.21-2.989A12.219 12.219 0 0 1 2.768 12 12.23 12.23 0 0 1 4.79 9.365C6.8 7.38 9.226 6.375 12 6.375s5.2 1.006 7.21 2.99A12.22 12.22 0 0 1 21.233 12a12.227 12.227 0 0 1-2.023 2.636l.003.001ZM12 7.875a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25Zm0 6a1.875 1.875 0 1 1 0-3.751 1.875 1.875 0 0 1 0 3.751Z'
    />{' '}
  </svg>
);
exports.default = Eye;
