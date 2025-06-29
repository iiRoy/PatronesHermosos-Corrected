'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ChatTeardropSlash = ({
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
      d='M5.332 2.993a1.125 1.125 0 1 0-1.664 1.514l1.02 1.118a9.691 9.691 0 0 0-2.063 6V19.5A1.875 1.875 0 0 0 4.5 21.375h7.875a9.78 9.78 0 0 0 5.238-1.53l1.055 1.162a1.125 1.125 0 0 0 1.665-1.514l-15-16.5Zm7.043 16.132h-7.5v-7.5a7.454 7.454 0 0 1 1.356-4.3l9.843 10.828a7.414 7.414 0 0 1-3.699.972Zm9.75-7.5a9.646 9.646 0 0 1-.971 4.246 1.127 1.127 0 0 1-2.029-.98 7.43 7.43 0 0 0 .75-3.266 7.506 7.506 0 0 0-10.11-7.031 1.125 1.125 0 0 1-.783-2.11 9.757 9.757 0 0 1 13.143 9.141Z'
    />{' '}
  </svg>
);
exports.default = ChatTeardropSlash;
