'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CoatHanger = ({
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
      d='m22.875 15.75-9-6.75 1.8-1.35a1.125 1.125 0 0 0 .45-.9 4.125 4.125 0 0 0-8.218-.514 1.126 1.126 0 0 0 2.233.281 1.875 1.875 0 0 1 3.665-.273l-2.461 1.841-.04.03-10.18 7.635a1.875 1.875 0 0 0 1.125 3.375h19.5a1.875 1.875 0 0 0 1.125-3.375Zm-19.5 1.125L12 10.406l8.625 6.469H3.375Z'
    />{' '}
  </svg>
);
exports.default = CoatHanger;
