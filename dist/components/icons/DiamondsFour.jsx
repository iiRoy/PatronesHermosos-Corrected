'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const DiamondsFour = ({
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
      d='M11.204 10.17a1.125 1.125 0 0 0 1.594 0l3.562-3.562a1.125 1.125 0 0 0 0-1.593l-3.562-3.563a1.125 1.125 0 0 0-1.594 0L7.642 5.015a1.125 1.125 0 0 0 0 1.593l3.562 3.563ZM12 3.845l1.969 1.968L12 7.782l-1.969-1.97L12 3.844Zm.796 9.988a1.125 1.125 0 0 0-1.594 0L7.64 17.394a1.125 1.125 0 0 0 0 1.594l3.562 3.563a1.125 1.125 0 0 0 1.594 0l3.562-3.563a1.124 1.124 0 0 0 0-1.594l-3.562-3.562ZM12 20.156l-1.969-1.968L12 16.218l1.969 1.97L12 20.155Zm-1.83-8.955L6.609 7.64a1.125 1.125 0 0 0-1.593 0L1.452 11.2a1.124 1.124 0 0 0 0 1.594l3.563 3.563a1.125 1.125 0 0 0 1.593 0l3.563-3.563a1.125 1.125 0 0 0 0-1.591V11.2ZM5.814 13.97 3.843 12l1.97-1.969L7.78 12l-1.968 1.969Zm16.732-2.77-3.563-3.56a1.125 1.125 0 0 0-1.593 0l-3.563 3.56a1.124 1.124 0 0 0 0 1.594l3.563 3.563a1.125 1.125 0 0 0 1.593 0l3.563-3.563a1.125 1.125 0 0 0 0-1.591V11.2Zm-4.358 2.768L16.218 12l1.97-1.969L20.155 12l-1.968 1.969Z'
    />{' '}
  </svg>
);
exports.default = DiamondsFour;
