'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CurrencyBtc = ({
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
      d='M17.351 10.73A4.5 4.5 0 0 0 15 3.518V2.25a1.125 1.125 0 1 0-2.25 0v1.125h-1.5V2.25a1.125 1.125 0 1 0-2.25 0v1.125H6.75a1.125 1.125 0 0 0 0 2.25h.375v12H6.75a1.125 1.125 0 1 0 0 2.25H9V21a1.125 1.125 0 0 0 2.25 0v-1.125h1.5V21A1.125 1.125 0 1 0 15 21v-1.125a4.875 4.875 0 0 0 2.351-9.144Zm-1.226-2.855a2.25 2.25 0 0 1-2.25 2.25h-4.5v-4.5h4.5a2.25 2.25 0 0 1 2.25 2.25ZM15 17.625H9.375v-5.25H15a2.625 2.625 0 0 1 0 5.25Z'
    />{' '}
  </svg>
);
exports.default = CurrencyBtc;
