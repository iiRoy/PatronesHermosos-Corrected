'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const HourglassSimpleLow = ({
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
      d='M20.063 18.157 13.627 12l6.435-6.157.017-.017a1.875 1.875 0 0 0-1.329-3.201H5.25a1.875 1.875 0 0 0-1.325 3.2l.017.018L10.373 12l-6.43 6.157-.018.017a1.875 1.875 0 0 0 1.325 3.201h13.5a1.875 1.875 0 0 0 1.326-3.2l-.014-.018Zm-6.165-2.782h-3.796L12 13.557l1.898 1.818Zm3.915-10.5L12 10.443 6.188 4.875h11.625ZM6.188 19.125l1.566-1.5h8.496l1.563 1.5H6.188Z'
    />{' '}
  </svg>
);
exports.default = HourglassSimpleLow;
