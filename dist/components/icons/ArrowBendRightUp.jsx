'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ArrowBendRightUp = ({
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
      d='M19.546 8.296a1.125 1.125 0 0 1-1.594 0l-2.577-2.577V12A10.137 10.137 0 0 1 5.25 22.125a1.125 1.125 0 1 1 0-2.25A7.883 7.883 0 0 0 13.125 12V5.719l-2.58 2.577a1.126 1.126 0 0 1-1.923-.797c0-.299.119-.585.33-.797l4.5-4.5a1.125 1.125 0 0 1 1.594 0l4.5 4.5a1.125 1.125 0 0 1 0 1.594Z'
    />{' '}
  </svg>
);
exports.default = ArrowBendRightUp;
