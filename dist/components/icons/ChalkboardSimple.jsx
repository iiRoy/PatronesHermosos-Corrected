'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ChalkboardSimple = ({
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
      d='M22.5 17.625h-.375V15A1.125 1.125 0 0 0 21 13.875h-6A1.125 1.125 0 0 0 13.875 15v2.625h-9.75v-12h15.75v5.625a1.125 1.125 0 1 0 2.25 0v-6a1.875 1.875 0 0 0-1.875-1.875H3.75A1.875 1.875 0 0 0 1.875 5.25v12.375H1.5a1.125 1.125 0 1 0 0 2.25h21a1.125 1.125 0 1 0 0-2.25Zm-6.375-1.5h3.75v1.5h-3.75v-1.5Z'
    />{' '}
  </svg>
);
exports.default = ChalkboardSimple;
