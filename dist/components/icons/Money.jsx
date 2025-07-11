'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Money = ({
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
      d='M22.5 4.875h-21A1.125 1.125 0 0 0 .375 6v12A1.125 1.125 0 0 0 1.5 19.125h21A1.125 1.125 0 0 0 23.625 18V6A1.125 1.125 0 0 0 22.5 4.875Zm-5.512 12H7.012a5.642 5.642 0 0 0-4.387-4.387v-.976a5.642 5.642 0 0 0 4.387-4.387h9.976a5.642 5.642 0 0 0 4.387 4.387v.976a5.642 5.642 0 0 0-4.387 4.387Zm4.387-7.693a3.396 3.396 0 0 1-2.057-2.057h2.057v2.057ZM4.682 7.125a3.397 3.397 0 0 1-2.057 2.057V7.125h2.057Zm-2.057 7.693a3.398 3.398 0 0 1 2.057 2.057H2.625v-2.057Zm16.693 2.057a3.397 3.397 0 0 1 2.057-2.057v2.057h-2.057ZM12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Zm0 5.25a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z'
    />{' '}
  </svg>
);
exports.default = Money;
