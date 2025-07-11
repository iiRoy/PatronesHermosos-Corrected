'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const FileCloud = ({
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
      d='m20.296 7.455-5.25-5.25a1.124 1.124 0 0 0-.796-.33h-9A1.875 1.875 0 0 0 3.375 3.75v7.875a1.125 1.125 0 1 0 2.25 0v-7.5h7.125v4.5a1.125 1.125 0 0 0 1.125 1.125h4.5v10.125h-1.5a1.125 1.125 0 1 0 0 2.25h1.875a1.875 1.875 0 0 0 1.875-1.875v-12a1.12 1.12 0 0 0-.33-.795ZM15 5.344 17.156 7.5H15V5.344Zm-4.875 6.281a5.25 5.25 0 0 0-4.748 3.008 3.75 3.75 0 0 0 .248 7.492h4.5a5.25 5.25 0 1 0 0-10.5Zm0 8.25h-4.5a1.5 1.5 0 0 1-.613-2.869 1.125 1.125 0 0 0 2.125-.405 3.072 3.072 0 0 1 .116-.599 3 3 0 1 1 2.872 3.873Z'
    />{' '}
  </svg>
);
exports.default = FileCloud;
