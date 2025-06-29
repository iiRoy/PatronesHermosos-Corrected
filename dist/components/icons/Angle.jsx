'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Angle = ({
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
      d='M23.625 18.75a1.125 1.125 0 0 1-1.125 1.125H6.75a1.125 1.125 0 0 1-1.125-1.125V7.875H3a1.125 1.125 0 0 1 0-2.25h2.625V3a1.125 1.125 0 0 1 2.25 0v14.625H22.5a1.125 1.125 0 0 1 1.125 1.125ZM10.406 7.902a7.875 7.875 0 0 1 7.19 7.19 1.125 1.125 0 0 0 1.121 1.032h.094a1.124 1.124 0 0 0 1.031-1.219 10.125 10.125 0 0 0-9.248-9.245 1.126 1.126 0 0 0-.188 2.242Z'
    />{' '}
  </svg>
);
exports.default = Angle;
