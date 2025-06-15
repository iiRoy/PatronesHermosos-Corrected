'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const HourglassLow = ({
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
      d='M19.125 7.091V3.75a1.875 1.875 0 0 0-1.875-1.875H6.75A1.875 1.875 0 0 0 4.875 3.75v3.375a1.884 1.884 0 0 0 .75 1.5l4.5 3.375-4.5 3.375a1.884 1.884 0 0 0-.75 1.5v3.375a1.875 1.875 0 0 0 1.875 1.875h10.5a1.875 1.875 0 0 0 1.875-1.875v-3.341a1.887 1.887 0 0 0-.744-1.5L13.866 12l4.515-3.412a1.887 1.887 0 0 0 .744-1.497Zm-3.533 9.034h-7.22L12 13.406l3.592 2.719Zm-8.467 3.75v-1.5h9.75v1.5h-9.75Zm9.75-12.97L12 10.594 7.125 6.938V4.124h9.75v2.78Z'
    />{' '}
  </svg>
);
exports.default = HourglassLow;
