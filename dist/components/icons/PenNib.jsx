'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const PenNib = ({
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
      d='M23.625 8.689a1.861 1.861 0 0 0-.55-1.326L16.638.923a1.875 1.875 0 0 0-2.652 0l-2.608 2.609L6.01 5.544a1.875 1.875 0 0 0-1.19 1.448l-2.18 13.07a1.125 1.125 0 0 0 1.297 1.298l13.074-2.18a1.881 1.881 0 0 0 1.447-1.19l2.012-5.367 2.608-2.609a1.86 1.86 0 0 0 .547-1.325Zm-7.2 8.308-9.394 1.566 3.094-3.094a3.188 3.188 0 1 0-1.594-1.594l-3.094 3.094 1.566-9.394 4.716-1.768 6.473 6.474-1.767 4.716ZM10.5 12.563a.938.938 0 1 1 1.875 0 .938.938 0 0 1-1.875 0Zm9-2.157L13.594 4.5l1.72-1.72 5.905 5.907-1.719 1.72Z'
    />{' '}
  </svg>
);
exports.default = PenNib;
