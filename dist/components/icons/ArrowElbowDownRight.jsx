'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ArrowElbowDownRight = ({
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
      d='m21.046 17.296-4.5 4.5a1.127 1.127 0 1 1-1.594-1.594l2.58-2.577H6.75A1.125 1.125 0 0 1 5.625 16.5V3a1.125 1.125 0 0 1 2.25 0v12.375h9.656l-2.58-2.58a1.124 1.124 0 0 1 0-1.593 1.124 1.124 0 0 1 1.594 0l4.5 4.5a1.126 1.126 0 0 1 0 1.594Z'
    />{' '}
  </svg>
);
exports.default = ArrowElbowDownRight;
