'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const PokerChip = ({
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
      d='M12 1.875A10.125 10.125 0 1 0 22.125 12 10.137 10.137 0 0 0 12 1.875Zm0 13.5a3.375 3.375 0 1 1 0-6.75 3.375 3.375 0 0 1 0 6.75Zm3.1-8.063a5.58 5.58 0 0 0-1.975-.824V4.207a7.832 7.832 0 0 1 3.589 1.488l-1.615 1.617Zm-4.225-.824a5.58 5.58 0 0 0-1.974.824L7.286 5.696a7.833 7.833 0 0 1 3.589-1.488v2.281ZM7.312 8.901a5.58 5.58 0 0 0-.824 1.974H4.207a7.837 7.837 0 0 1 1.488-3.589l1.617 1.615Zm-.824 4.224a5.58 5.58 0 0 0 .824 1.974l-1.617 1.615a7.836 7.836 0 0 1-1.488-3.589h2.281Zm2.413 3.563a5.586 5.586 0 0 0 1.974.824v2.281a7.832 7.832 0 0 1-3.589-1.488l1.615-1.617Zm4.224.824a5.58 5.58 0 0 0 1.974-.825l1.615 1.615a7.833 7.833 0 0 1-3.589 1.491v-2.281Zm3.563-2.413a5.586 5.586 0 0 0 .824-1.974h2.281a7.836 7.836 0 0 1-1.488 3.589l-1.617-1.615Zm.824-4.224a5.58 5.58 0 0 0-.825-1.974l1.615-1.615a7.836 7.836 0 0 1 1.491 3.589h-2.281Z'
    />{' '}
  </svg>
);
exports.default = PokerChip;
