'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ArrowBendRightDown = ({
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
      d='m19.546 17.296-4.5 4.5a1.125 1.125 0 0 1-1.594 0l-4.5-4.5a1.127 1.127 0 1 1 1.594-1.594l2.579 2.58V12A7.883 7.883 0 0 0 5.25 4.125a1.125 1.125 0 0 1 0-2.25A10.136 10.136 0 0 1 15.375 12v6.281l2.58-2.58a1.127 1.127 0 1 1 1.593 1.594h-.002Z'
    />{' '}
  </svg>
);
exports.default = ArrowBendRightDown;
