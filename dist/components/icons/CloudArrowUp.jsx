'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CloudArrowUp = ({
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
      d='M18.42 14.204a1.127 1.127 0 1 1-1.593 1.594l-1.077-1.08V19.5a1.125 1.125 0 1 1-2.25 0v-4.781l-1.08 1.08a1.127 1.127 0 1 1-1.593-1.594l3-3a1.125 1.125 0 0 1 1.594 0l3 3ZM15 3.375A8.633 8.633 0 0 0 7.406 7.91a6.375 6.375 0 1 0-.656 12.715h2.625a1.125 1.125 0 1 0 0-2.25H6.75a4.125 4.125 0 0 1-.17-8.245A8.596 8.596 0 0 0 6.375 12a1.125 1.125 0 1 0 2.25 0 6.375 6.375 0 1 1 12.431 1.996 1.126 1.126 0 0 0 2.138.704A8.63 8.63 0 0 0 15 3.375Z'
    />{' '}
  </svg>
);
exports.default = CloudArrowUp;
