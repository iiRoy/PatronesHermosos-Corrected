'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CursorText = ({
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
      d='M17.625 19.5a1.125 1.125 0 0 1-1.125 1.125H15a4.112 4.112 0 0 1-3-1.298 4.112 4.112 0 0 1-3 1.298H7.5a1.125 1.125 0 1 1 0-2.25H9a1.875 1.875 0 0 0 1.875-1.875v-3.375H9.75a1.125 1.125 0 1 1 0-2.25h1.125V7.5A1.875 1.875 0 0 0 9 5.625H7.5a1.125 1.125 0 0 1 0-2.25H9a4.112 4.112 0 0 1 3 1.298 4.112 4.112 0 0 1 3-1.298h1.5a1.125 1.125 0 0 1 0 2.25H15A1.875 1.875 0 0 0 13.125 7.5v3.375h1.125a1.125 1.125 0 1 1 0 2.25h-1.125V16.5A1.875 1.875 0 0 0 15 18.375h1.5a1.125 1.125 0 0 1 1.125 1.125Z'
    />{' '}
  </svg>
);
exports.default = CursorText;
