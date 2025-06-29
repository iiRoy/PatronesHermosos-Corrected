'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const FloppyDiskBack = ({
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
      d='M19.5 2.625H7.81a1.862 1.862 0 0 0-1.325.55l-3.31 3.31a1.862 1.862 0 0 0-.55 1.325V19.5A1.875 1.875 0 0 0 4.5 21.375h15a1.875 1.875 0 0 0 1.875-1.875v-15A1.875 1.875 0 0 0 19.5 2.625ZM8.625 4.875h6.75V6.75h-6.75V4.875Zm10.5 14.25H4.875V7.969l1.5-1.5v.656A1.875 1.875 0 0 0 8.25 9h7.5a1.875 1.875 0 0 0 1.875-1.875v-2.25h1.5v14.25Zm-7.125-9a3.937 3.937 0 1 0 0 7.874 3.937 3.937 0 0 0 0-7.874Zm0 5.625a1.687 1.687 0 1 1 0-3.375 1.687 1.687 0 0 1 0 3.375Z'
    />{' '}
  </svg>
);
exports.default = FloppyDiskBack;
