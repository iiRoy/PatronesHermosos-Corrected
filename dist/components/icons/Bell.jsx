'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Bell = ({
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
      d='M21.12 15.556c-.813-1.4-1.245-3.409-1.245-5.806a7.875 7.875 0 0 0-15.75 0c0 2.398-.43 4.406-1.244 5.806a1.883 1.883 0 0 0 .679 2.571c.286.165.61.25.94.248h3.392a4.125 4.125 0 0 0 8.216 0H19.5a1.853 1.853 0 0 0 1.623-.938 1.882 1.882 0 0 0-.002-1.881ZM12 19.875a1.875 1.875 0 0 1-1.838-1.5h3.675a1.875 1.875 0 0 1-1.837 1.5Zm-6.876-3.75c.83-1.688 1.251-3.83 1.251-6.375a5.625 5.625 0 0 1 11.25 0c0 2.543.42 4.688 1.25 6.375H5.125Z'
    />{' '}
  </svg>
);
exports.default = Bell;
