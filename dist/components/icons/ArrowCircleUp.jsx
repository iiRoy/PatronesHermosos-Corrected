'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ArrowCircleUp = ({
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
      d='M12 1.875A10.125 10.125 0 1 0 22.125 12 10.137 10.137 0 0 0 12 1.875Zm0 18A7.875 7.875 0 1 1 19.875 12 7.883 7.883 0 0 1 12 19.875Zm3.796-9.42a1.127 1.127 0 1 1-1.594 1.593l-1.077-1.08v4.782a1.125 1.125 0 1 1-2.25 0v-4.781l-1.08 1.08a1.127 1.127 0 1 1-1.593-1.594l3-3a1.125 1.125 0 0 1 1.594 0l3 3Z'
    />{' '}
  </svg>
);
exports.default = ArrowCircleUp;
