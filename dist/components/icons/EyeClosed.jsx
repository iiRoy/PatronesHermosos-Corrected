'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const EyeClosed = ({
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
      d='M21.977 15.188a1.13 1.13 0 0 1-.415 1.539 1.128 1.128 0 0 1-1.539-.415l-1.58-2.765c-.883.555-1.833.992-2.829 1.3l.496 2.966a1.125 1.125 0 0 1-2.22.372l-.484-2.888c-.936.104-1.881.104-2.818 0l-.478 2.89a1.125 1.125 0 1 1-2.22-.375l.496-2.973a11.927 11.927 0 0 1-2.828-1.3l-1.581 2.774a1.127 1.127 0 1 1-1.954-1.125l1.727-3.015a14.971 14.971 0 0 1-1.623-1.716 1.125 1.125 0 0 1 1.749-1.414C5.379 10.905 8.01 13.125 12 13.125s6.62-2.22 8.124-4.082a1.125 1.125 0 0 1 1.75 1.414 14.971 14.971 0 0 1-1.624 1.716l1.727 3.014Z'
    />{' '}
  </svg>
);
exports.default = EyeClosed;
