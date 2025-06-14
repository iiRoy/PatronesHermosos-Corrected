'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const GooglePhotosLogo = ({
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
      d='M21.75 10.875h-3.128A7.126 7.126 0 0 0 12 1.125a1.125 1.125 0 0 0-1.125 1.125v3.128A7.125 7.125 0 0 0 1.125 12a1.125 1.125 0 0 0 1.125 1.125h3.128A7.125 7.125 0 0 0 12 22.875a1.125 1.125 0 0 0 1.125-1.125v-3.128A7.126 7.126 0 0 0 22.875 12a1.125 1.125 0 0 0-1.125-1.125ZM16.875 8.25a4.817 4.817 0 0 1-.767 2.625h-2.983V3.506a4.884 4.884 0 0 1 3.75 4.744ZM8.25 7.125a4.817 4.817 0 0 1 2.625.767v2.983H3.506a4.883 4.883 0 0 1 4.744-3.75ZM7.125 15.75a4.817 4.817 0 0 1 .767-2.625h2.983v7.369a4.884 4.884 0 0 1-3.75-4.744Zm8.625 1.125a4.817 4.817 0 0 1-2.625-.767v-2.983h7.369a4.884 4.884 0 0 1-4.744 3.75Z'
    />{' '}
  </svg>
);
exports.default = GooglePhotosLogo;
