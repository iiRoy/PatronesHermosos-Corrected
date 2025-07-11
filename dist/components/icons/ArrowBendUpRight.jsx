'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ArrowBendUpRight = ({
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
      d='m21.796 10.546-4.5 4.5a1.127 1.127 0 1 1-1.594-1.594l2.58-2.577H12a7.884 7.884 0 0 0-7.875 7.875 1.125 1.125 0 1 1-2.25 0A10.136 10.136 0 0 1 12 8.625h6.281l-2.577-2.58a1.127 1.127 0 1 1 1.594-1.594l4.5 4.5a1.125 1.125 0 0 1-.002 1.595Z'
    />{' '}
  </svg>
);
exports.default = ArrowBendUpRight;
