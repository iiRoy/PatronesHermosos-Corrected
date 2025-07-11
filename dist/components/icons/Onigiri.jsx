'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Onigiri = ({
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
      d='M22.031 13.548 16.793 4.56a5.626 5.626 0 0 0-9.59 0l-5.234 8.987a5.625 5.625 0 0 0 4.79 8.577h10.482a5.624 5.624 0 0 0 4.79-8.577Zm-7.406 6.327h-5.25v-3.75h5.25v3.75Zm5.565-1.734a3.333 3.333 0 0 1-2.95 1.734h-.365V15.75A1.875 1.875 0 0 0 15 13.875H9a1.875 1.875 0 0 0-1.875 1.875v4.125h-.366a3.375 3.375 0 0 1-2.867-5.156l.016-.026 5.234-8.985a3.375 3.375 0 0 1 5.718 0l5.233 8.986.016.026a3.335 3.335 0 0 1 .08 3.42h.001Z'
    />{' '}
  </svg>
);
exports.default = Onigiri;
