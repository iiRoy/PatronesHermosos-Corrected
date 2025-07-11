'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const BluetoothSlash = ({
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
      d='m21.082 19.493-15-16.5a1.125 1.125 0 0 0-1.665 1.514l6.364 7L5.325 15.6a1.125 1.125 0 1 0 1.35 1.8l4.2-3.15V21a1.125 1.125 0 0 0 1.8.9l4.492-3.37 2.25 2.477a1.125 1.125 0 0 0 1.665-1.514Zm-7.957-.743v-4.5l.469.353 2.05 2.256-2.519 1.891ZM10.875 5.6V3a1.125 1.125 0 0 1 1.8-.9l6 4.5a1.125 1.125 0 0 1 0 1.8l-2.54 1.906a1.125 1.125 0 1 1-1.35-1.8l1.34-1.006-3-2.25v.35a1.125 1.125 0 1 1-2.25 0Z'
    />{' '}
  </svg>
);
exports.default = BluetoothSlash;
