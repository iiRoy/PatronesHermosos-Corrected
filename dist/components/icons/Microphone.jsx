'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Microphone = ({
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
      d='M12 16.875A4.88 4.88 0 0 0 16.875 12V6a4.875 4.875 0 1 0-9.75 0v6A4.88 4.88 0 0 0 12 16.875ZM9.375 6a2.625 2.625 0 0 1 5.25 0v6a2.625 2.625 0 0 1-5.25 0V6Zm3.75 14.552V22.5a1.125 1.125 0 1 1-2.25 0v-1.948A8.639 8.639 0 0 1 3.375 12a1.125 1.125 0 0 1 2.25 0 6.375 6.375 0 1 0 12.75 0 1.125 1.125 0 1 1 2.25 0 8.639 8.639 0 0 1-7.5 8.552Z'
    />{' '}
  </svg>
);
exports.default = Microphone;
