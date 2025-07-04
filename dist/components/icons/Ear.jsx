'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Ear = ({
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
      d='M20.625 9.75a1.125 1.125 0 1 1-2.25 0 6.375 6.375 0 1 0-12.75 0c0 2.344.71 3.028 1.533 3.821C7.98 14.364 9 15.348 9 17.625a3 3 0 0 0 3 3c.844 0 1.518-.347 2.133-1.091a1.125 1.125 0 0 1 1.734 1.432c-1.046 1.267-2.347 1.909-3.867 1.909a5.256 5.256 0 0 1-5.25-5.25c0-1.32-.434-1.74-1.154-2.438-.99-.95-2.221-2.138-2.221-5.437a8.625 8.625 0 0 1 17.25 0Zm-3.762 5.026a1.125 1.125 0 0 0-1.538.41.375.375 0 0 1-.7-.187c0-.713.342-1.206.9-1.95.6-.8 1.35-1.799 1.35-3.299a4.875 4.875 0 1 0-9.75 0 1.125 1.125 0 0 0 2.25 0 2.625 2.625 0 0 1 5.25 0c0 .713-.342 1.206-.9 1.95-.6.802-1.35 1.8-1.35 3.3a2.625 2.625 0 0 0 4.898 1.313 1.125 1.125 0 0 0-.41-1.537Z'
    />{' '}
  </svg>
);
exports.default = Ear;
