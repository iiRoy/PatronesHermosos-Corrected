'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Screencast = ({
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
      d='M21.75 5.625v12.75a1.875 1.875 0 0 1-1.875 1.875h-3.75a1.125 1.125 0 1 1 0-2.25H19.5V6h-15v.375a1.125 1.125 0 0 1-2.25 0v-.75A1.875 1.875 0 0 1 4.125 3.75h15.75a1.875 1.875 0 0 1 1.875 1.875ZM3.375 16.5a1.125 1.125 0 1 0 0 2.25.375.375 0 0 1 .375.375 1.125 1.125 0 0 0 2.25 0A2.625 2.625 0 0 0 3.375 16.5Zm0-3.75a1.125 1.125 0 1 0 0 2.25A4.13 4.13 0 0 1 7.5 19.125a1.125 1.125 0 0 0 2.25 0 6.382 6.382 0 0 0-6.375-6.375Zm0-3.75a1.125 1.125 0 0 0 0 2.25 7.883 7.883 0 0 1 7.875 7.875 1.125 1.125 0 1 0 2.25 0A10.137 10.137 0 0 0 3.375 9Z'
    />{' '}
  </svg>
);
exports.default = Screencast;
