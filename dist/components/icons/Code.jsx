'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Code = ({
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
      d='M6.72 9.114 3.257 12l3.463 2.886a1.125 1.125 0 1 1-1.44 1.728l-4.5-3.75a1.126 1.126 0 0 1 0-1.728l4.5-3.75a1.125 1.125 0 0 1 1.44 1.728Zm16.5 2.022-4.5-3.75a1.125 1.125 0 1 0-1.44 1.728L20.743 12l-3.463 2.886a1.127 1.127 0 0 0-.151 1.59 1.125 1.125 0 0 0 1.591.138l4.5-3.75a1.127 1.127 0 0 0 0-1.728Zm-7.836-8.444a1.125 1.125 0 0 0-1.441.674l-6 16.5a1.125 1.125 0 0 0 2.114.768l6-16.5a1.125 1.125 0 0 0-.673-1.442Z'
    />{' '}
  </svg>
);
exports.default = Code;
