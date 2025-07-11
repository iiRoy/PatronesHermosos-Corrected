'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ThumbsDown = ({
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
      d='m22.854 14.675-1.125-9a2.625 2.625 0 0 0-2.604-2.3H3A1.875 1.875 0 0 0 1.125 5.25v8.25A1.875 1.875 0 0 0 3 15.375h3.804l3.44 6.878a1.124 1.124 0 0 0 1.006.622 4.13 4.13 0 0 0 4.125-4.125v-1.125h4.875a2.625 2.625 0 0 0 2.604-2.95Zm-16.479-1.55h-3v-7.5h3v7.5Zm14.156 2.123a.374.374 0 0 1-.281.127h-6a1.125 1.125 0 0 0-1.125 1.125v2.25a1.874 1.874 0 0 1-1.236 1.762l-3.264-6.527v-8.36h10.5a.375.375 0 0 1 .375.328l1.125 9a.376.376 0 0 1-.094.295Z'
    />{' '}
  </svg>
);
exports.default = ThumbsDown;
