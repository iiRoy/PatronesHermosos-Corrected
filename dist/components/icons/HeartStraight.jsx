'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const HeartStraight = ({
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
      d='M21.172 5.075a5.82 5.82 0 0 0-8.205-.012L12 5.96l-.967-.898a5.813 5.813 0 1 0-8.211 8.23l8.376 8.5a1.125 1.125 0 0 0 1.604 0l8.37-8.494a5.812 5.812 0 0 0 0-8.221v-.003ZM19.58 11.71 12 19.397l-7.582-7.692a3.563 3.563 0 1 1 5.068-5.011l1.747 1.627a1.125 1.125 0 0 0 1.534 0l1.747-1.627a3.564 3.564 0 0 1 6.108 2.5 3.564 3.564 0 0 1-1.046 2.517h.003Z'
    />{' '}
  </svg>
);
exports.default = HeartStraight;
