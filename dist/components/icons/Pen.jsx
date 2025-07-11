'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Pen = ({
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
      d='m21.577 6.613-4.19-4.189a1.875 1.875 0 0 0-2.651 0L3.174 13.984a1.862 1.862 0 0 0-.549 1.326v4.19A1.875 1.875 0 0 0 4.5 21.375h4.19a1.861 1.861 0 0 0 1.325-.55l7.45-7.448.39 1.302-3.275 3.275a1.127 1.127 0 0 0 1.594 1.594l3.75-3.75a1.125 1.125 0 0 0 .281-1.12l-.932-3.106 2.305-2.305a1.873 1.873 0 0 0-.001-2.654ZM6.094 14.25l6.656-6.656 3.656 3.656-6.656 6.656-3.656-3.656Zm-1.219 1.969 2.906 2.906H4.875v-2.906ZM18 9.656 14.344 6l1.72-1.72 3.655 3.657L18 9.657Z'
    />{' '}
  </svg>
);
exports.default = Pen;
