'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ThumbsUp = ({
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
      d='M22.219 7.263a2.626 2.626 0 0 0-1.969-.888h-4.875V5.25a4.13 4.13 0 0 0-4.125-4.125 1.125 1.125 0 0 0-1.006.622l-3.44 6.878H3A1.875 1.875 0 0 0 1.125 10.5v8.25A1.875 1.875 0 0 0 3 20.625h16.125a2.625 2.625 0 0 0 2.604-2.3l1.125-9a2.624 2.624 0 0 0-.635-2.062ZM3.375 10.875h3v7.5h-3v-7.5Zm17.25-1.828-1.125 9a.375.375 0 0 1-.375.328h-10.5v-8.36l3.264-6.528a1.875 1.875 0 0 1 1.236 1.763V7.5a1.125 1.125 0 0 0 1.125 1.125h6a.375.375 0 0 1 .375.422Z'
    />{' '}
  </svg>
);
exports.default = ThumbsUp;
