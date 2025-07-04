'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const RssSimple = ({
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
      d='M21.375 18a1.125 1.125 0 1 1-2.25 0c0-7.238-5.887-13.125-13.125-13.125a1.125 1.125 0 0 1 0-2.25c8.478 0 15.375 6.897 15.375 15.375ZM6 9.375a1.125 1.125 0 0 0 0 2.25A6.381 6.381 0 0 1 12.375 18a1.125 1.125 0 1 0 2.25 0A8.635 8.635 0 0 0 6 9.375Zm.375 6.75a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z'
    />{' '}
  </svg>
);
exports.default = RssSimple;
