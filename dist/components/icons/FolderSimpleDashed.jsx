'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const FolderSimpleDashed = ({
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
      d='M1.875 7.5V6A1.875 1.875 0 0 1 3.75 4.125h5c.405 0 .8.132 1.125.375l2.8 2.1a1.124 1.124 0 0 1-.954 1.99 1.125 1.125 0 0 1-.396-.19l-2.7-2.025h-4.5V7.5a1.125 1.125 0 0 1-2.25 0ZM8.25 18.375H4.125V18a1.125 1.125 0 0 0-2.25 0v.808a1.82 1.82 0 0 0 1.817 1.817H8.25a1.125 1.125 0 1 0 0-2.25Zm6.75 0h-3a1.125 1.125 0 1 0 0 2.25h3a1.125 1.125 0 1 0 0-2.25Zm6-5.25a1.125 1.125 0 0 0-1.125 1.125v4.125H18.75a1.125 1.125 0 1 0 0 2.25h1.583a1.793 1.793 0 0 0 1.792-1.792V14.25A1.125 1.125 0 0 0 21 13.125Zm-.75-6.75h-4.5a1.125 1.125 0 0 0 0 2.25h4.125V10.5a1.125 1.125 0 1 0 2.25 0V8.25a1.875 1.875 0 0 0-1.875-1.875Zm-17.25 9a1.125 1.125 0 0 0 1.125-1.125v-3a1.125 1.125 0 0 0-2.25 0v3A1.125 1.125 0 0 0 3 15.375Z'
    />{' '}
  </svg>
);
exports.default = FolderSimpleDashed;
