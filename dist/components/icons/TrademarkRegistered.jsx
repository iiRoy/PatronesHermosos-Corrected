'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const TrademarkRegistered = ({
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
      d='M12 1.875A10.125 10.125 0 1 0 22.125 12 10.137 10.137 0 0 0 12 1.875Zm0 18A7.875 7.875 0 1 1 19.875 12 7.883 7.883 0 0 1 12 19.875Zm2.69-6.617a3.375 3.375 0 0 0-1.94-6.133h-3A1.125 1.125 0 0 0 8.625 8.25v7.5a1.125 1.125 0 1 0 2.25 0v-1.875h1.523l1.665 2.5a1.126 1.126 0 0 0 1.874-1.25l-1.246-1.867Zm-3.815-3.883h1.875a1.125 1.125 0 0 1 0 2.25h-1.875v-2.25Z'
    />{' '}
  </svg>
);
exports.default = TrademarkRegistered;
