'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const StackSimple = ({
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
      d='m.942 10.352 10.5 6a1.125 1.125 0 0 0 1.116 0l10.5-6a1.125 1.125 0 0 0 0-1.954l-10.5-6a1.125 1.125 0 0 0-1.116 0l-10.5 6a1.125 1.125 0 0 0 0 1.954ZM12.005 4.67l8.227 4.704L12 14.079 3.768 9.375l8.237-4.704Zm11.477 8.646a1.125 1.125 0 0 1-.42 1.535l-10.5 6a1.125 1.125 0 0 1-1.115 0l-10.5-6a1.125 1.125 0 1 1 1.115-1.954L12 18.58l9.938-5.68a1.123 1.123 0 0 1 1.539.418h.005Z'
    />{' '}
  </svg>
);
exports.default = StackSimple;
