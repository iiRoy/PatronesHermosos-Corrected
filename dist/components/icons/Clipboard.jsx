'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Clipboard = ({
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
      d='M18.75 2.625h-3.237a4.864 4.864 0 0 0-7.026 0H5.25A1.875 1.875 0 0 0 3.375 4.5v15.75a1.875 1.875 0 0 0 1.875 1.875h13.5a1.875 1.875 0 0 0 1.875-1.875V4.5a1.875 1.875 0 0 0-1.875-1.875Zm-4.152 3H9.402a2.625 2.625 0 0 1 5.196 0Zm3.777 14.25H5.625v-15h1.632A4.887 4.887 0 0 0 7.125 6v.75A1.125 1.125 0 0 0 8.25 7.875h7.5a1.125 1.125 0 0 0 1.125-1.125V6a4.9 4.9 0 0 0-.132-1.125h1.632v15Z'
    />{' '}
  </svg>
);
exports.default = Clipboard;
