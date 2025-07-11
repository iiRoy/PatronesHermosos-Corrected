'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const MusicNotesSimple = ({
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
      d='M20.192 1.363a1.125 1.125 0 0 0-.965-.204l-12 3a1.125 1.125 0 0 0-.852 1.091v9.69a3.75 3.75 0 1 0 2.25 3.435V6.128l9.75-2.437v8.25a3.75 3.75 0 1 0 2.25 3.434V2.25a1.125 1.125 0 0 0-.433-.887ZM4.875 19.875a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm12-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z'
    />{' '}
  </svg>
);
exports.default = MusicNotesSimple;
