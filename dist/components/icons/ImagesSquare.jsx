'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ImagesSquare = ({
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
      d='M19.5 2.625H8.25A1.875 1.875 0 0 0 6.375 4.5v1.125H4.5A1.875 1.875 0 0 0 2.625 7.5v12A1.875 1.875 0 0 0 4.5 21.375h12a1.875 1.875 0 0 0 1.875-1.875v-1.875H19.5a1.875 1.875 0 0 0 1.875-1.875V4.5A1.875 1.875 0 0 0 19.5 2.625ZM8.625 4.875h10.5v5.599l-.924-.925a1.875 1.875 0 0 0-2.652 0l-5.825 5.826H8.625v-10.5Zm7.5 14.25H4.875V7.875h1.5v7.875a1.875 1.875 0 0 0 1.875 1.875h7.875v1.5Zm-3.22-3.75 3.97-3.97 2.25 2.25v1.72h-6.22Zm-2.78-7.125a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z'
    />{' '}
  </svg>
);
exports.default = ImagesSquare;
