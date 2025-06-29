'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const MathOperations = ({
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
      d='M10.875 6.75A1.125 1.125 0 0 1 9.75 7.875h-6a1.125 1.125 0 0 1 0-2.25h6a1.125 1.125 0 0 1 1.125 1.125ZM9.75 16.125H7.875V14.25a1.125 1.125 0 0 0-2.25 0v1.875H3.75a1.125 1.125 0 1 0 0 2.25h1.875v1.875a1.125 1.125 0 0 0 2.25 0v-1.875H9.75a1.125 1.125 0 1 0 0-2.25Zm4.5.375h6a1.125 1.125 0 1 0 0-2.25h-6a1.125 1.125 0 1 0 0 2.25Zm6 1.5h-6a1.125 1.125 0 1 0 0 2.25h6a1.125 1.125 0 1 0 0-2.25Zm-6.046-8.204a1.124 1.124 0 0 0 1.594 0l1.452-1.452 1.454 1.455a1.127 1.127 0 0 0 1.594-1.594L18.844 6.75l1.455-1.454a1.127 1.127 0 1 0-1.594-1.594L17.25 5.156l-1.454-1.452a1.127 1.127 0 1 0-1.594 1.594l1.454 1.452-1.452 1.454a1.125 1.125 0 0 0 0 1.592Z'
    />{' '}
  </svg>
);
exports.default = MathOperations;
