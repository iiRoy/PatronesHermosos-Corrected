'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const BugDroid = ({
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
      d='m18.502 4.84 1.044-1.044a1.126 1.126 0 0 0-1.228-1.838c-.137.057-.261.14-.366.244l-1.139 1.144a8.61 8.61 0 0 0-9.626 0L6.046 2.204a1.127 1.127 0 0 0-1.594 1.594l1.046 1.041A8.586 8.586 0 0 0 3.375 10.5v3.75a8.625 8.625 0 1 0 17.25 0V10.5a8.586 8.586 0 0 0-2.123-5.66Zm-.127 5.66v.375H5.625V10.5a6.375 6.375 0 1 1 12.75 0ZM12 20.625a6.382 6.382 0 0 1-6.375-6.375v-1.125h12.75v1.125A6.381 6.381 0 0 1 12 20.625ZM13.125 8.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm-5.25 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z'
    />{' '}
  </svg>
);
exports.default = BugDroid;
