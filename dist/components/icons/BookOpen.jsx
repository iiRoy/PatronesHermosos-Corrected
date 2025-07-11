'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const BookOpen = ({
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
      d='M21.75 4.125H15a4.112 4.112 0 0 0-3 1.298 4.112 4.112 0 0 0-3-1.298H2.25A1.125 1.125 0 0 0 1.125 5.25v13.5a1.125 1.125 0 0 0 1.125 1.125H9a1.875 1.875 0 0 1 1.875 1.875 1.125 1.125 0 1 0 2.25 0A1.875 1.875 0 0 1 15 19.875h6.75a1.125 1.125 0 0 0 1.125-1.125V5.25a1.125 1.125 0 0 0-1.125-1.125ZM9 17.625H3.375V6.375H9a1.875 1.875 0 0 1 1.875 1.875v9.826A4.106 4.106 0 0 0 9 17.625Zm11.625 0H15c-.652 0-1.295.155-1.875.453V8.25A1.875 1.875 0 0 1 15 6.375h5.625v11.25Z'
    />{' '}
  </svg>
);
exports.default = BookOpen;
