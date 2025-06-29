'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const PhoneSlash = ({
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
      d='M5.334 2.993A1.125 1.125 0 1 0 3.67 4.507L5.906 6.97a13.788 13.788 0 0 0-3.884 2.72c-2.01 2.012-2.205 4.978-.469 7.219a1.875 1.875 0 0 0 2.15.592l4.585-1.626.042-.016a1.87 1.87 0 0 0 1.139-1.375l.51-2.552a4.43 4.43 0 0 1 .349-.093l8.335 9.171a1.124 1.124 0 1 0 1.664-1.513L5.334 2.993Zm2.485 8.284-.506 2.558-4.14 1.467c-.86-1.298-.695-2.884.443-4.022a11.398 11.398 0 0 1 3.89-2.552l1.188 1.303a1.88 1.88 0 0 0-.875 1.246Zm14.625 5.625a1.86 1.86 0 0 1-1.054.674 1.125 1.125 0 0 1-.652-2.149c.958-1.319.82-2.972-.355-4.148-2.123-2.124-5.008-3.333-8.11-3.404a1.125 1.125 0 1 1 .025-2.25h.025c3.688.082 7.115 1.523 9.651 4.06 2.011 2.016 2.205 4.982.47 7.218Z'
    />{' '}
  </svg>
);
exports.default = PhoneSlash;
