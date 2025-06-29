'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const MusicNotesPlus = ({
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
      d='M22.125 4.5A1.125 1.125 0 0 1 21 5.625h-1.125V6.75a1.125 1.125 0 1 1-2.25 0V5.625H16.5a1.125 1.125 0 0 1 0-2.25h1.125V2.25a1.125 1.125 0 1 1 2.25 0v1.125H21A1.125 1.125 0 0 1 22.125 4.5Zm-1.5 6v4.875a3.75 3.75 0 1 1-2.25-3.436V10.5a1.125 1.125 0 1 1 2.25 0Zm-2.25 4.875a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Zm-9.75-4.747v7.747a3.75 3.75 0 1 1-2.25-3.436V5.25a1.125 1.125 0 0 1 .852-1.091l5.25-1.313a1.125 1.125 0 0 1 .546 2.183l-4.398 1.1v2.18l6.102-1.525a1.125 1.125 0 0 1 .546 2.182l-6.648 1.662Zm-2.25 7.747a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z'
    />{' '}
  </svg>
);
exports.default = MusicNotesPlus;
