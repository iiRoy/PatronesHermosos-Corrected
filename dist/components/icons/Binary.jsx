'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Binary = ({
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
      d='M8.625 2.25c-2.208 0-3.75 1.85-3.75 4.5s1.542 4.5 3.75 4.5 3.75-1.85 3.75-4.5-1.542-4.5-3.75-4.5Zm0 6.75c-1.458 0-1.5-2.02-1.5-2.25 0-.23.042-2.25 1.5-2.25s1.5 2.02 1.5 2.25c0 .23-.042 2.25-1.5 2.25Zm4.994-3.997a1.125 1.125 0 0 1 .503-1.509l2.25-1.125A1.125 1.125 0 0 1 18 3.375v6.75a1.125 1.125 0 1 1-2.25 0v-4.93l-.622.31a1.125 1.125 0 0 1-1.509-.502Zm1.756 7.747c-2.208 0-3.75 1.85-3.75 4.5s1.542 4.5 3.75 4.5 3.75-1.85 3.75-4.5-1.542-4.5-3.75-4.5Zm0 6.75c-1.458 0-1.5-2.02-1.5-2.25 0-.23.042-2.25 1.5-2.25s1.5 2.02 1.5 2.25c0 .23-.042 2.25-1.5 2.25ZM9.75 13.875v6.75a1.125 1.125 0 0 1-2.25 0v-4.93l-.622.31a1.124 1.124 0 0 1-1.582-1.36 1.125 1.125 0 0 1 .576-.65l2.25-1.126a1.124 1.124 0 0 1 1.628 1.006Z'
    />{' '}
  </svg>
);
exports.default = Binary;
