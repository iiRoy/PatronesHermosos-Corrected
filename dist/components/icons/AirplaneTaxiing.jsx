'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const AirplaneTaxiing = ({
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
      d='M19.5 8.25h-5.531L9.796 4.08A1.125 1.125 0 0 0 9 3.75h-.75a1.875 1.875 0 0 0-1.781 2.468L7.15 8.25H5.72L3.796 6.33A1.125 1.125 0 0 0 3 6h-.75A1.875 1.875 0 0 0 .456 8.414l1.319 4.396a4.1 4.1 0 0 0 3.95 2.94H22.5a1.125 1.125 0 0 0 1.125-1.125v-2.25A4.13 4.13 0 0 0 19.5 8.25Zm1.875 5.25H5.725a1.864 1.864 0 0 1-1.796-1.336L2.85 8.565l1.605 1.606c.21.21.497.329.795.329h3.46a1.125 1.125 0 0 0 1.068-1.48L8.89 6.355l3.815 3.816c.21.21.497.329.795.329h6a1.875 1.875 0 0 1 1.875 1.875V13.5Zm0 5.625a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm-9 0a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Z'
    />{' '}
  </svg>
);
exports.default = AirplaneTaxiing;
