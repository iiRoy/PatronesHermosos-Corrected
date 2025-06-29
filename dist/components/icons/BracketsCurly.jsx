'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const BracketsCurly = ({
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
      d='M5.138 11.202a3.3 3.3 0 0 1-.54.798c.218.238.4.507.54.798.487 1.006.487 2.186.487 3.327 0 2.432.173 3 1.875 3a1.125 1.125 0 1 1 0 2.25c-1.794 0-3.019-.647-3.638-1.923-.487-1.006-.487-2.186-.487-3.327 0-2.432-.172-3-1.875-3a1.125 1.125 0 1 1 0-2.25c1.703 0 1.875-.568 1.875-3 0-1.14 0-2.321.487-3.327.62-1.276 1.844-1.923 3.638-1.923a1.125 1.125 0 0 1 0 2.25c-1.702 0-1.875.568-1.875 3 0 1.14 0 2.321-.487 3.327Zm17.362-.327c-1.703 0-1.875-.568-1.875-3 0-1.14 0-2.321-.488-3.327-.618-1.276-1.843-1.923-3.637-1.923a1.125 1.125 0 0 0 0 2.25c1.703 0 1.875.568 1.875 3 0 1.14 0 2.321.488 3.327.14.291.324.56.543.798-.218.238-.4.507-.539.798-.492 1.006-.492 2.186-.492 3.327 0 2.432-.172 3-1.875 3a1.125 1.125 0 1 0 0 2.25c1.794 0 3.019-.647 3.637-1.923.488-1.006.488-2.186.488-3.327 0-2.432.172-3 1.875-3a1.125 1.125 0 1 0 0-2.25Z'
    />{' '}
  </svg>
);
exports.default = BracketsCurly;
