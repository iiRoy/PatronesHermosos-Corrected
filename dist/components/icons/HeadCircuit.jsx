'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const HeadCircuit = ({
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
      d='M19.117 21.61a1.126 1.126 0 0 1-1.86.983 1.125 1.125 0 0 1-.372-.703l-.75-6a1.125 1.125 0 0 1 .44-1.039 6.4 6.4 0 0 0 2.55-5.25c0-.076-.007-.15-.01-.225h-1.338l-2.166 2.599a2.257 2.257 0 1 1-1.729-1.44l2.504-3.001a1.125 1.125 0 0 1 .864-.409h1.304a6.393 6.393 0 0 0-5.804-3.75v1.803a2.25 2.25 0 1 1-2.25 0V3.782A6.385 6.385 0 0 0 6.375 9.75c0 .18-.044.359-.128.52l-1.98 3.807 2.202 1.007a1.125 1.125 0 0 1 .656 1.023v3.018h4.125a1.125 1.125 0 1 1 0 2.25h-4.5A1.875 1.875 0 0 1 4.875 19.5v-2.67l-1.928-.884a1.875 1.875 0 0 1-.884-2.508l2.062-3.972a8.625 8.625 0 0 1 9.094-8.329c4.472.236 8.056 3.93 8.156 8.41a8.656 8.656 0 0 1-2.93 6.681l.672 5.382Z'
    />{' '}
  </svg>
);
exports.default = HeadCircuit;
