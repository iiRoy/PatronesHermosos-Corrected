'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Meteor = ({
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
      d='M9 11.625a3.375 3.375 0 1 0 0 6.75 3.375 3.375 0 0 0 0-6.75Zm0 4.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm12.046-4.921a1.126 1.126 0 0 1 0 1.594l-4.5 4.5a1.127 1.127 0 1 1-1.594-1.594l4.5-4.5a1.125 1.125 0 0 1 1.594 0ZM17.67 9.329a1.125 1.125 0 0 1 0 1.594l-1.875 1.875a1.127 1.127 0 1 1-1.594-1.594l1.875-1.875a1.125 1.125 0 0 1 1.594 0Zm4.125-2.531-1.5 1.5a1.127 1.127 0 1 1-1.594-1.594l1.5-1.5a1.127 1.127 0 1 1 1.594 1.594ZM11.202 8.204l6.75-6.75a1.127 1.127 0 1 1 1.594 1.594l-6.75 6.75a1.126 1.126 0 1 1-1.594-1.594Zm2.834 10.243a1.126 1.126 0 0 1 0 1.594 7.128 7.128 0 0 1-10.076-.002 7.125 7.125 0 0 1 .002-10.077l7.757-7.758a1.127 1.127 0 1 1 1.594 1.594l-7.76 7.755a4.875 4.875 0 1 0 6.894 6.894 1.125 1.125 0 0 1 1.591 0h-.002Z'
    />{' '}
  </svg>
);
exports.default = Meteor;
