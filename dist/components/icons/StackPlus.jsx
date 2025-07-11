'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const StackPlus = ({
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
      d='M22.5 18.75a1.125 1.125 0 0 1-1.125 1.125h-.75v.75a1.125 1.125 0 1 1-2.25 0v-.75h-.75a1.125 1.125 0 1 1 0-2.25h.75v-.75a1.125 1.125 0 1 1 2.25 0v.75h.75A1.125 1.125 0 0 1 22.5 18.75Zm-2.063-7.722L12 15.948l-8.433-4.92a1.125 1.125 0 0 0-1.13 1.944l9 5.25a1.125 1.125 0 0 0 1.135 0l9-5.25a1.126 1.126 0 0 0-1.134-1.944ZM1.875 7.5a1.125 1.125 0 0 1 .563-.972l9-5.25a1.13 1.13 0 0 1 1.134 0l9 5.25a1.126 1.126 0 0 1 0 1.944l-9 5.25a1.125 1.125 0 0 1-1.134 0l-9-5.25a1.125 1.125 0 0 1-.563-.972Zm3.358 0L12 11.448 18.767 7.5 12 3.552 5.233 7.5Zm7.705 12.403-.938.545-8.433-4.92a1.125 1.125 0 0 0-1.13 1.944l9 5.25a1.125 1.125 0 0 0 1.135 0l1.5-.875a1.125 1.125 0 0 0-1.134-1.944Z'
    />{' '}
  </svg>
);
exports.default = StackPlus;
