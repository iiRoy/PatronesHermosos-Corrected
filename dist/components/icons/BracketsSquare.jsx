'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const BracketsSquare = ({
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
      d='M4.875 4.875v14.25H7.5a1.125 1.125 0 1 1 0 2.25H3.75a1.125 1.125 0 0 1-1.125-1.125V3.75A1.125 1.125 0 0 1 3.75 2.625H7.5a1.125 1.125 0 0 1 0 2.25H4.875Zm15.375-2.25H16.5a1.125 1.125 0 0 0 0 2.25h2.625v14.25H16.5a1.125 1.125 0 1 0 0 2.25h3.75a1.125 1.125 0 0 0 1.125-1.125V3.75a1.125 1.125 0 0 0-1.125-1.125Z'
    />{' '}
  </svg>
);
exports.default = BracketsSquare;
