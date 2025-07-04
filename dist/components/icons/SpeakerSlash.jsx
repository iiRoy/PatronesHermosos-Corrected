'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const SpeakerSlash = ({
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
      d='M5.332 2.993a1.125 1.125 0 1 0-1.664 1.514l2.38 2.618H3A1.875 1.875 0 0 0 1.125 9v6A1.875 1.875 0 0 0 3 16.875h4.114l6.445 5.013A1.125 1.125 0 0 0 15.375 21v-3.615l3.293 3.621a1.125 1.125 0 0 0 1.665-1.513l-15-16.5ZM3.375 9.375h3v5.25h-3v-5.25Zm9.75 9.324-4.5-3.5V9.96l4.5 4.947V18.7ZM10.219 6.137a1.124 1.124 0 0 1 .198-1.579l3.141-2.444A1.125 1.125 0 0 1 15.375 3v5.9a1.125 1.125 0 1 1-2.25 0V5.3l-1.327 1.032a1.125 1.125 0 0 1-1.58-.197v.002Zm6.937 4.626a1.125 1.125 0 0 1 1.688-1.486 4.126 4.126 0 0 1 .52 4.708 1.125 1.125 0 0 1-1.969-1.083 1.875 1.875 0 0 0-.24-2.14v.001ZM23.625 12a7.892 7.892 0 0 1-1.792 5.002 1.124 1.124 0 0 1-1.95-1.043c.045-.142.117-.273.213-.387a5.625 5.625 0 0 0-.153-7.322 1.124 1.124 0 1 1 1.677-1.5A7.862 7.862 0 0 1 23.625 12Z'
    />{' '}
  </svg>
);
exports.default = SpeakerSlash;
