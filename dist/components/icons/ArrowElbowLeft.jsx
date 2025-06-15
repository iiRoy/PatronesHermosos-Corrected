'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ArrowElbowLeft = ({
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
      d='m22.546 9.796-9 9a1.125 1.125 0 0 1-1.594 0l-8.577-8.577v4.031a1.125 1.125 0 0 1-2.25 0V7.5A1.125 1.125 0 0 1 2.25 6.375H9a1.125 1.125 0 0 1 0 2.25H4.969l7.781 7.781 8.204-8.205a1.127 1.127 0 1 1 1.594 1.594h-.002Z'
    />{' '}
  </svg>
);
exports.default = ArrowElbowLeft;
