'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const DotsSixVertical = ({
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
      d='M10.125 5.625a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm5.25 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM8.625 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm6.75 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-6.75 6.375a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm6.75 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z'
    />{' '}
  </svg>
);
exports.default = DotsSixVertical;
