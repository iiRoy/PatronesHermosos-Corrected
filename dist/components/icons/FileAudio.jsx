'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const FileAudio = ({
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
      d='M9.055 11.71a1.125 1.125 0 0 0-1.226.244l-1.923 1.921H4.125A1.125 1.125 0 0 0 3 15v3.75a1.125 1.125 0 0 0 1.125 1.125h1.781l1.92 1.92A1.125 1.125 0 0 0 9.75 21v-8.25a1.125 1.125 0 0 0-.695-1.04ZM7.5 18.281l-.33-.33a1.125 1.125 0 0 0-.795-.326H5.25v-1.5h1.125a1.126 1.126 0 0 0 .796-.33l.329-.326v2.812Zm7.5-1.406a4.176 4.176 0 0 1-2.058 3.596 1.124 1.124 0 1 1-1.13-1.942 1.923 1.923 0 0 0 0-3.308 1.124 1.124 0 1 1 1.135-1.942A4.177 4.177 0 0 1 15 16.875Zm5.296-9.42-5.25-5.25a1.124 1.124 0 0 0-.796-.33h-9A1.875 1.875 0 0 0 3.375 3.75v6.75a1.125 1.125 0 0 0 2.25 0V4.125h7.125v4.5a1.125 1.125 0 0 0 1.125 1.125h4.5v10.125h-1.5a1.125 1.125 0 1 0 0 2.25h1.875a1.875 1.875 0 0 0 1.875-1.875v-12a1.126 1.126 0 0 0-.33-.796ZM15 5.343 17.156 7.5H15V5.344Z'
    />{' '}
  </svg>
);
exports.default = FileAudio;
