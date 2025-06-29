'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const HourglassHigh = ({
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
      d='M17.25 1.875H6.75A1.875 1.875 0 0 0 4.875 3.75v3.375a1.884 1.884 0 0 0 .75 1.5l4.5 3.375-4.5 3.375a1.884 1.884 0 0 0-.75 1.5v3.375a1.875 1.875 0 0 0 1.875 1.875h10.5a1.875 1.875 0 0 0 1.875-1.875v-3.341a1.887 1.887 0 0 0-.744-1.5L13.866 12l4.515-3.412a1.886 1.886 0 0 0 .744-1.5V3.75a1.875 1.875 0 0 0-1.875-1.875Zm-.375 2.25v1.5h-9.75v-1.5h9.75ZM12 10.594 8.375 7.875h7.218L12 10.594Zm4.875 9.281h-9.75v-2.813L12 13.406l4.875 3.687v2.782Z'
    />{' '}
  </svg>
);
exports.default = HourglassHigh;
