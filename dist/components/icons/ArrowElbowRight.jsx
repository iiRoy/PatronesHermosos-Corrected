'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ArrowElbowRight = ({
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
      d='M22.875 7.5v6.75a1.125 1.125 0 1 1-2.25 0v-4.031l-8.58 8.58a1.125 1.125 0 0 1-1.593 0l-9-9a1.127 1.127 0 0 1 1.594-1.594l8.204 8.201 7.781-7.781H15a1.125 1.125 0 0 1 0-2.25h6.75A1.125 1.125 0 0 1 22.875 7.5Z'
    />{' '}
  </svg>
);
exports.default = ArrowElbowRight;
