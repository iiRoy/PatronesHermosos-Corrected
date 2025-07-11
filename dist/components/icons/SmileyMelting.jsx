'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const SmileyMelting = ({
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
      d='M16.875 12.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM12.75 8.625a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Zm6.36-3.834A10.125 10.125 0 0 0 4.452 18.75a1.125 1.125 0 0 0 1.677-1.5 7.875 7.875 0 1 1 11.74 0 1.125 1.125 0 0 0 1.677 1.5 10.125 10.125 0 0 0-.438-13.96Zm-5.985 10.584h-.375c-1.857 0-4.125-1.557-4.125-3.375 0-.188.016-.377.047-.562a1.125 1.125 0 1 0-2.22-.375 5.77 5.77 0 0 0-.077.937c0 1.51.75 2.95 2.108 4.055 1.228.998 2.783 1.57 4.267 1.57h.375a.75.75 0 1 1 0 1.5h-3.75a3 3 0 0 0-3 3 1.125 1.125 0 0 0 2.25 0 .75.75 0 0 1 .75-.75h3.75a3 3 0 0 0 0-6Z'
    />{' '}
  </svg>
);
exports.default = SmileyMelting;
