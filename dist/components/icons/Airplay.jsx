'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Airplay = ({
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
      d='M12.854 14.268a1.126 1.126 0 0 0-1.708 0l-4.5 5.25a1.125 1.125 0 0 0 .854 1.857h9a1.124 1.124 0 0 0 .854-1.857l-4.5-5.25Zm-2.906 4.857L12 16.729l2.054 2.396H9.948ZM22.125 6v10.5a2.625 2.625 0 0 1-2.625 2.625h-.375a1.125 1.125 0 1 1 0-2.25h.375a.375.375 0 0 0 .375-.375V6a.375.375 0 0 0-.375-.375h-15A.375.375 0 0 0 4.125 6v10.5a.375.375 0 0 0 .375.375h.375a1.125 1.125 0 1 1 0 2.25H4.5A2.625 2.625 0 0 1 1.875 16.5V6A2.625 2.625 0 0 1 4.5 3.375h15A2.625 2.625 0 0 1 22.125 6Z'
    />{' '}
  </svg>
);
exports.default = Airplay;
