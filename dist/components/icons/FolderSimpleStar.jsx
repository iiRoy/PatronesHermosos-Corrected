'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const FolderSimpleStar = ({
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
      d='M4.125 6.375v12h6a1.125 1.125 0 1 1 0 2.25H3.75a1.875 1.875 0 0 1-1.875-1.875V6A1.875 1.875 0 0 1 3.75 4.125h5c.405 0 .8.132 1.125.375l2.5 1.875h7.875a1.875 1.875 0 0 1 1.875 1.875v1.875a1.125 1.125 0 1 1-2.25 0v-1.5H12c-.243 0-.48-.079-.675-.225l-2.7-2.025h-4.5Zm18.341 9.644-1.93 1.594.587 2.368a1.125 1.125 0 0 1-1.662 1.24l-2.211-1.303-2.21 1.301a1.125 1.125 0 0 1-1.663-1.239l.586-2.368-1.93-1.594a1.124 1.124 0 0 1 .63-1.99l2.571-.198.985-2.276a1.125 1.125 0 0 1 2.062 0l.983 2.277 2.57.199a1.126 1.126 0 0 1 .63 1.99h.002Zm-3.581.04-.469-.037a1.126 1.126 0 0 1-.946-.676l-.218-.506-.219.506a1.125 1.125 0 0 1-.946.676l-.47.036.327.27a1.125 1.125 0 0 1 .375 1.137l-.113.458.475-.281a1.125 1.125 0 0 1 1.142 0l.475.281-.11-.458a1.125 1.125 0 0 1 .375-1.137l.322-.27Z'
    />{' '}
  </svg>
);
exports.default = FolderSimpleStar;
