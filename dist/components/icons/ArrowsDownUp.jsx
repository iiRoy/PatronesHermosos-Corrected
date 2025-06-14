'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ArrowsDownUp = ({
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
      d='M11.296 15.704a1.125 1.125 0 0 1 0 1.594l-3 3a1.125 1.125 0 0 1-1.594 0l-3-3a1.127 1.127 0 1 1 1.594-1.594l1.079 1.077V4.5a1.125 1.125 0 1 1 2.25 0v12.281l1.08-1.08a1.126 1.126 0 0 1 1.59.003Zm9-9-3-3a1.125 1.125 0 0 0-1.594 0l-3 3a1.127 1.127 0 1 0 1.594 1.594l1.079-1.08V19.5a1.125 1.125 0 1 0 2.25 0V7.219l1.08 1.08a1.127 1.127 0 1 0 1.593-1.594h-.002Z'
    />{' '}
  </svg>
);
exports.default = ArrowsDownUp;
