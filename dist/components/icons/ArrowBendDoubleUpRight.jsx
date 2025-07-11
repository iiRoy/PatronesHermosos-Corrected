'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ArrowBendDoubleUpRight = ({
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
      d='m21.796 10.546-4.5 4.5a1.127 1.127 0 1 1-1.594-1.594l3.704-3.702-3.702-3.705a1.127 1.127 0 1 1 1.594-1.594l4.5 4.5a1.125 1.125 0 0 1-.002 1.595Zm-5.25-1.594-4.5-4.5a1.126 1.126 0 0 0-1.924.797 1.128 1.128 0 0 0 .33.797l2.58 2.579H12A10.136 10.136 0 0 0 1.875 18.75a1.125 1.125 0 0 0 2.25 0A7.883 7.883 0 0 1 12 10.875h1.031l-2.58 2.58a1.127 1.127 0 1 0 1.594 1.593l4.5-4.5a1.126 1.126 0 0 0 0-1.594v-.002Z'
    />{' '}
  </svg>
);
exports.default = ArrowBendDoubleUpRight;
