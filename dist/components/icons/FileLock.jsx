'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const FileLock = ({
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
      d='M11.25 15.75h-.375v-.375a3 3 0 0 0-6 0v.375H4.5a1.125 1.125 0 0 0-1.125 1.125V21A1.125 1.125 0 0 0 4.5 22.125h6.75A1.125 1.125 0 0 0 12.375 21v-4.125a1.125 1.125 0 0 0-1.125-1.125Zm-4.125-.375a.75.75 0 1 1 1.5 0v.375h-1.5v-.375Zm3 4.5h-4.5V18h4.5v1.875Zm10.17-12.42-5.25-5.25a1.124 1.124 0 0 0-.795-.33h-9A1.875 1.875 0 0 0 3.375 3.75v6.375a1.125 1.125 0 0 0 2.25 0v-6h7.125v4.5a1.125 1.125 0 0 0 1.125 1.125h4.5v10.125h-3a1.125 1.125 0 1 0 0 2.25h3.375a1.875 1.875 0 0 0 1.875-1.875v-12a1.12 1.12 0 0 0-.33-.795ZM15 5.344 17.156 7.5H15V5.344Z'
    />{' '}
  </svg>
);
exports.default = FileLock;
