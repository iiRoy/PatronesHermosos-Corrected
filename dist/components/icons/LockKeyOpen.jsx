'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const LockKeyOpen = ({
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
      d='M19.5 7.125H9.375V5.25A2.625 2.625 0 0 1 12 2.625c1.267 0 2.405.902 2.648 2.1a1.125 1.125 0 1 0 2.204-.45c-.458-2.26-2.499-3.9-4.852-3.9A4.88 4.88 0 0 0 7.125 5.25v1.875H4.5A1.875 1.875 0 0 0 2.625 9v10.5A1.875 1.875 0 0 0 4.5 21.375h15a1.875 1.875 0 0 0 1.875-1.875V9A1.875 1.875 0 0 0 19.5 7.125Zm-.375 12H4.875v-9.75h14.25v9.75Zm-8.25-2.844v.594a1.125 1.125 0 1 0 2.25 0v-.594a3 3 0 1 0-2.25 0ZM12 12.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z'
    />{' '}
  </svg>
);
exports.default = LockKeyOpen;
