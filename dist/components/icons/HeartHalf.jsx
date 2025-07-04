'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const HeartHalf = ({
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
      d='M15.957 5.692a1.125 1.125 0 1 0-.414-2.211c-1.434.269-2.653.944-3.535 1.925C10.875 4.125 9.2 3.375 7.313 3.375a6.195 6.195 0 0 0-6.188 6.188c0 2.906 1.773 5.906 5.269 8.894a32.13 32.13 0 0 0 5.073 3.534 1.117 1.117 0 0 0 1.066-.003 31.85 31.85 0 0 0 3.903-2.582 1.125 1.125 0 0 0-1.372-1.781 31.238 31.238 0 0 1-1.939 1.376V7.74c.51-1.061 1.53-1.803 2.832-2.046ZM10.875 19a29.901 29.901 0 0 1-3.048-2.278c-2.031-1.743-4.452-4.4-4.452-7.159a3.937 3.937 0 0 1 3.938-3.937c1.593 0 2.939.803 3.562 2.111V19Zm10.969-8.88a1.124 1.124 0 0 1-1.242-.995 3.928 3.928 0 0 0-1.726-2.836 1.125 1.125 0 0 1 1.25-1.87 6.172 6.172 0 0 1 2.711 4.458 1.125 1.125 0 0 1-.993 1.242Zm.093 3.133c-.547 1.098-1.343 2.215-2.365 3.321a1.125 1.125 0 0 1-1.652-1.527c.878-.95 1.552-1.891 2.005-2.798a1.125 1.125 0 1 1 2.012 1.004Z'
    />{' '}
  </svg>
);
exports.default = HeartHalf;
