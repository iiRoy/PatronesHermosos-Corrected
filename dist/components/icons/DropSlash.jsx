'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const DropSlash = ({
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
      d='M5.332 2.993a1.125 1.125 0 1 0-1.665 1.514l1.928 2.12c-1.47 2.3-2.22 4.608-2.22 6.873a8.625 8.625 0 0 0 14.344 6.46l.952 1.047a1.125 1.125 0 0 0 1.665-1.514L5.332 2.994ZM12 19.875A6.381 6.381 0 0 1 5.625 13.5c0-1.663.52-3.386 1.546-5.14l9.03 9.938A6.36 6.36 0 0 1 12 19.875ZM8.682 4.448a1.125 1.125 0 0 1 .011-1.594A22.848 22.848 0 0 1 11.355.576a1.125 1.125 0 0 1 1.29 0c.326.23 7.98 5.672 7.98 12.924a8.695 8.695 0 0 1-.094 1.25 1.125 1.125 0 1 1-2.226-.323 6.51 6.51 0 0 0 .07-.927c0-4.962-4.64-9.18-6.375-10.582-.435.35-1.05.874-1.726 1.54a1.126 1.126 0 0 1-1.592-.01Z'
    />{' '}
  </svg>
);
exports.default = DropSlash;
