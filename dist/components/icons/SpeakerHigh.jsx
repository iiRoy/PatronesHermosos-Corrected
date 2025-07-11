'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const SpeakerHigh = ({
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
      d='M14.744 1.99a1.125 1.125 0 0 0-1.185.122L7.114 7.125H3A1.875 1.875 0 0 0 1.125 9v6A1.875 1.875 0 0 0 3 16.875h4.114l6.445 5.013A1.125 1.125 0 0 0 15.375 21V3a1.125 1.125 0 0 0-.63-1.01ZM3.375 9.374h3v5.25h-3v-5.25Zm9.75 9.324-4.5-3.5V8.8l4.5-3.5v13.4Zm6.75-6.7a4.125 4.125 0 0 1-1.031 2.73 1.125 1.125 0 0 1-1.688-1.489 1.875 1.875 0 0 0 0-2.478 1.125 1.125 0 0 1 1.688-1.486A4.12 4.12 0 0 1 19.875 12Zm3.75 0a7.862 7.862 0 0 1-2.005 5.25 1.125 1.125 0 1 1-1.678-1.5 5.625 5.625 0 0 0 0-7.5 1.126 1.126 0 1 1 1.677-1.5A7.863 7.863 0 0 1 23.625 12Z'
    />{' '}
  </svg>
);
exports.default = SpeakerHigh;
