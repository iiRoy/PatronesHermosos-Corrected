'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CellTower = ({
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
      d='M13 8.11a1.125 1.125 0 0 0-2 0L4.25 21.235a1.126 1.126 0 0 0 2 1.032l1.032-2.015h9.432l1.036 2.015a1.124 1.124 0 1 0 2-1.032L13 8.11Zm-1 2.975 1.627 3.165h-3.255L12 11.085ZM8.444 18l.77-1.5h5.571l.77 1.5h-7.11ZM16.36 6.443a1.124 1.124 0 1 1-2.01 1.008 2.625 2.625 0 0 0-4.723.049 1.126 1.126 0 0 1-2.033-.966A4.901 4.901 0 0 1 12 3.75a4.85 4.85 0 0 1 4.36 2.693ZM4.68 13.568a8.625 8.625 0 1 1 14.64 0 1.126 1.126 0 1 1-1.91-1.193 6.376 6.376 0 1 0-10.82 0 1.125 1.125 0 0 1-1.91 1.19v.003Z'
    />{' '}
  </svg>
);
exports.default = CellTower;
