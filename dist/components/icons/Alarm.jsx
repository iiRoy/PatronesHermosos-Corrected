'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Alarm = ({
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
      d='M12 3.375a9.375 9.375 0 1 0 9.375 9.375A9.385 9.385 0 0 0 12 3.375Zm0 16.5a7.125 7.125 0 1 1 7.125-7.125A7.133 7.133 0 0 1 12 19.875ZM3.046 6.795a1.127 1.127 0 0 1-1.594-1.593l3-3a1.127 1.127 0 1 1 1.594 1.594l-3 3Zm19.5 0a1.125 1.125 0 0 1-1.594 0l-3-3a1.126 1.126 0 0 1 1.228-1.837c.137.056.261.14.366.244l3 3a1.125 1.125 0 0 1 0 1.594Zm-6.046 4.83a1.125 1.125 0 1 1 0 2.25H12a1.125 1.125 0 0 1-1.125-1.125v-4.5a1.125 1.125 0 1 1 2.25 0v3.375H16.5Z'
    />{' '}
  </svg>
);
exports.default = Alarm;
