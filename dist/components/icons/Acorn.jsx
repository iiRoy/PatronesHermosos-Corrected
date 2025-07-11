'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Acorn = ({
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
      d='M22.125 9.75A5.631 5.631 0 0 0 16.5 4.125h-3.338A1.875 1.875 0 0 1 15 2.625a1.125 1.125 0 0 0 0-2.25 4.13 4.13 0 0 0-4.107 3.75H7.5A5.632 5.632 0 0 0 1.875 9.75a1.875 1.875 0 0 0 .75 1.5V12c0 3.51 3.188 6.067 5.74 8.12.958.768 2.403 1.93 2.51 2.396a1.125 1.125 0 1 0 2.25 0c.107-.469 1.552-1.628 2.51-2.396 2.557-2.053 5.74-4.61 5.74-8.12v-.75a1.875 1.875 0 0 0 .75-1.5ZM7.5 6.375h9a3.38 3.38 0 0 1 3.354 3H4.146a3.38 3.38 0 0 1 3.354-3Zm6.726 11.99c-.86.69-1.637 1.313-2.226 1.927-.589-.612-1.366-1.236-2.226-1.926-2.18-1.753-4.899-3.934-4.899-6.366v-.375h14.25V12c0 2.432-2.719 4.613-4.9 6.366Z'
    />{' '}
  </svg>
);
exports.default = Acorn;
