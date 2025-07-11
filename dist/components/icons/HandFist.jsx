'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const HandFist = ({
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
      d='M18.75 7.125h-1.125V6A3.375 3.375 0 0 0 12 3.488a3.375 3.375 0 0 0-5.506 1.625A3.375 3.375 0 0 0 1.875 8.25V12a10.125 10.125 0 0 0 20.25 0v-1.5a3.375 3.375 0 0 0-3.375-3.375ZM13.125 6a1.125 1.125 0 1 1 2.25 0v1.125h-2.25V6Zm-4.5 0a1.125 1.125 0 0 1 2.25 0v3.75a1.125 1.125 0 1 1-2.25 0V6Zm-4.5 2.25a1.125 1.125 0 0 1 2.25 0v1.5a1.125 1.125 0 0 1-2.25 0v-1.5ZM19.875 12a7.875 7.875 0 0 1-15.693.952 3.368 3.368 0 0 0 3.318-.69 3.364 3.364 0 0 0 4.092.314c.173.222.373.423.595.596a4.858 4.858 0 0 0-1.312 3.328 1.125 1.125 0 1 0 2.25 0 2.625 2.625 0 0 1 2.625-2.625 1.125 1.125 0 1 0 0-2.25h-1.5a1.125 1.125 0 0 1-1.125-1.125V9.375h5.625a1.125 1.125 0 0 1 1.125 1.125V12Z'
    />{' '}
  </svg>
);
exports.default = HandFist;
