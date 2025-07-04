'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const GenderFemale = ({
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
      d='M19.875 9a7.875 7.875 0 1 0-9 7.793v1.582H8.25a1.125 1.125 0 1 0 0 2.25h2.625V22.5a1.125 1.125 0 1 0 2.25 0v-1.875h2.625a1.125 1.125 0 1 0 0-2.25h-2.625v-1.582A7.886 7.886 0 0 0 19.875 9Zm-13.5 0A5.625 5.625 0 1 1 12 14.625 5.631 5.631 0 0 1 6.375 9Z'
    />{' '}
  </svg>
);
exports.default = GenderFemale;
