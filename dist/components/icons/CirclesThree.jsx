'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CirclesThree = ({
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
      d='M16.5 7.125a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0ZM12 9.375a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Zm5.625 2.25a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 6.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Zm-11.25-6.75a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 6.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z'
    />{' '}
  </svg>
);
exports.default = CirclesThree;
