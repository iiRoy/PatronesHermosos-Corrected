'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ArrowFatLineRight = ({
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
      d='m22.546 11.204-9-9A1.125 1.125 0 0 0 11.625 3v3.375H7.5A1.125 1.125 0 0 0 6.375 7.5v9A1.125 1.125 0 0 0 7.5 17.625h4.125V21a1.125 1.125 0 0 0 1.92.796l9-9a1.123 1.123 0 0 0 0-1.592Zm-8.671 7.077V16.5a1.125 1.125 0 0 0-1.125-1.125H8.625v-6.75h4.125A1.125 1.125 0 0 0 13.875 7.5V5.719L20.156 12l-6.281 6.281Zm-9-10.781v9a1.125 1.125 0 0 1-2.25 0v-9a1.125 1.125 0 0 1 2.25 0Z'
    />{' '}
  </svg>
);
exports.default = ArrowFatLineRight;
