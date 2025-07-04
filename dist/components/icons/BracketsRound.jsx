'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const BracketsRound = ({
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
      d='M7.718 20.83a1.124 1.124 0 0 1-1.546.384C6 21.109 1.875 18.563 1.875 12c0-6.563 4.125-9.109 4.297-9.214a1.125 1.125 0 0 1 1.163 1.925c-.143.09-3.21 2.068-3.21 7.289 0 5.22 3.08 7.207 3.21 7.29a1.125 1.125 0 0 1 .383 1.54Zm10.11-18.044a1.124 1.124 0 1 0-1.164 1.925c.131.082 3.211 2.057 3.211 7.289 0 5.232-3.08 7.207-3.203 7.284a1.124 1.124 0 1 0 1.156 1.93c.172-.105 4.297-2.651 4.297-9.214 0-6.563-4.125-9.109-4.297-9.214Z'
    />{' '}
  </svg>
);
exports.default = BracketsRound;
