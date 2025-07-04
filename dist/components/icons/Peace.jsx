'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Peace = ({
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
      d='M12 1.875A10.125 10.125 0 1 0 22.125 12 10.137 10.137 0 0 0 12 1.875ZM19.875 12a7.82 7.82 0 0 1-.844 3.547l-5.906-4.133V4.207A7.886 7.886 0 0 1 19.875 12Zm-9-7.793v7.207l-5.906 4.133a7.868 7.868 0 0 1 5.906-11.343v.003Zm-4.61 13.182 4.61-3.228v5.632a7.862 7.862 0 0 1-4.61-2.404Zm6.86 2.404v-5.632l4.61 3.228a7.862 7.862 0 0 1-4.61 2.404Z'
    />{' '}
  </svg>
);
exports.default = Peace;
