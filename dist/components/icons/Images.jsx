'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Images = ({
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
      d='M15 8.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm7.125-3V15a1.875 1.875 0 0 1-1.875 1.875h-1.125v1.875a1.875 1.875 0 0 1-1.875 1.875H3.75a1.875 1.875 0 0 1-1.875-1.875V8.25A1.875 1.875 0 0 1 3.75 6.375h1.875V5.25A1.875 1.875 0 0 1 7.5 3.375h12.75a1.875 1.875 0 0 1 1.875 1.875Zm-5.25 11.625H7.5A1.875 1.875 0 0 1 5.625 15V8.625h-1.5v9.75h12.75v-1.5Zm-2.03-2.25-3.22-3.22-3.22 3.22h6.44Zm5.03-9h-12v6.349l2.424-2.425a1.875 1.875 0 0 1 2.652 0l5.075 5.076h1.849v-9Z'
    />{' '}
  </svg>
);
exports.default = Images;
