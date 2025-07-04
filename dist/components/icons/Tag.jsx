'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Tag = ({
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
      d='m23.077 12.486-9.312-9.312a1.861 1.861 0 0 0-1.325-.549H3.75A1.125 1.125 0 0 0 2.625 3.75v8.69a1.861 1.861 0 0 0 .55 1.325l9.31 9.312a1.875 1.875 0 0 0 2.652 0l7.94-7.94a1.875 1.875 0 0 0 0-2.651ZM13.81 21.22l-8.936-8.939V4.875h7.406l8.937 8.936-7.407 7.41ZM9.75 8.25a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z'
    />{' '}
  </svg>
);
exports.default = Tag;
