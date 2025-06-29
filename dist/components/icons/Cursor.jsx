'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Cursor = ({
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
      d='m21.014 16.797-4.39-4.39 3.556-1.266.07-.028a1.875 1.875 0 0 0-.164-3.494L5.078 2.72a1.875 1.875 0 0 0-2.36 2.359L7.62 20.085a1.875 1.875 0 0 0 3.522.094l1.267-3.555 4.39 4.39a1.875 1.875 0 0 0 2.651 0l1.565-1.565a1.875 1.875 0 0 0 0-2.652Zm-2.89 2.36-4.545-4.545a1.875 1.875 0 0 0-3.074.647l-1.093 3.07L5.09 5.088l13.238 4.323-3.066 1.093a1.875 1.875 0 0 0-.65 3.073l4.546 4.545-1.034 1.034Z'
    />{' '}
  </svg>
);
exports.default = Cursor;
