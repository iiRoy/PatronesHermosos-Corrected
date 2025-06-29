'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const SkypeLogo = ({
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
      d='M16.125 14.25c0 1.893-1.812 3.375-4.125 3.375-1.993 0-3.7-1.158-4.057-2.754a1.125 1.125 0 0 1 2.196-.492c.108.48.85.996 1.861.996.885 0 1.875-.48 1.875-1.125 0-.597-.59-.874-2.25-1.352-1.513-.436-3.584-1.031-3.584-3.148 0-1.924 1.701-3.375 3.958-3.375 1.616 0 3.006.763 3.627 1.991a1.125 1.125 0 1 1-2.007 1.017c-.232-.46-.869-.758-1.619-.758-.958 0-1.708.494-1.708 1.125 0 .102 0 .207.307.391.392.232 1.032.417 1.65.595.82.236 1.67.481 2.38.925 1.236.771 1.496 1.833 1.496 2.589Zm6 2.25a5.632 5.632 0 0 1-5.625 5.625 5.564 5.564 0 0 1-3-.869A9.385 9.385 0 0 1 2.744 10.5a5.565 5.565 0 0 1-.869-3A5.632 5.632 0 0 1 7.5 1.875a5.565 5.565 0 0 1 3.005.87A9.385 9.385 0 0 1 21.256 13.5a5.56 5.56 0 0 1 .869 2.999Zm-2.25 0a3.34 3.34 0 0 0-.702-2.063 1.125 1.125 0 0 1-.21-.925 7.133 7.133 0 0 0-8.477-8.478 1.125 1.125 0 0 1-.924-.207A3.34 3.34 0 0 0 7.5 4.125 3.375 3.375 0 0 0 4.125 7.5a3.34 3.34 0 0 0 .702 2.063 1.125 1.125 0 0 1 .21.925 7.132 7.132 0 0 0 8.477 8.478 1.124 1.124 0 0 1 .925.209 3.34 3.34 0 0 0 2.061.7 3.375 3.375 0 0 0 3.375-3.375Z'
    />{' '}
  </svg>
);
exports.default = SkypeLogo;
