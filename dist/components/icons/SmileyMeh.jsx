'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const SmileyMeh = ({
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
      d='M12 1.875A10.125 10.125 0 1 0 22.125 12 10.137 10.137 0 0 0 12 1.875Zm0 18A7.875 7.875 0 1 1 19.875 12 7.883 7.883 0 0 1 12 19.875ZM16.875 15a1.125 1.125 0 0 1-1.125 1.125h-7.5a1.125 1.125 0 1 1 0-2.25h7.5A1.125 1.125 0 0 1 16.875 15Zm-9.75-4.875a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm9.75 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z'
    />{' '}
  </svg>
);
exports.default = SmileyMeh;
