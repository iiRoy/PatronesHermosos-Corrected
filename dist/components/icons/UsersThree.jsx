'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const UsersThree = ({
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
      d='M15.41 16.978a4.876 4.876 0 1 0-6.82 0 7.114 7.114 0 0 0-2.813 2.709 1.125 1.125 0 0 0 1.948 1.125 4.968 4.968 0 0 1 8.552 0 1.123 1.123 0 0 0 1.547.43 1.126 1.126 0 0 0 .401-1.555 7.114 7.114 0 0 0-2.814-2.709ZM9.376 13.5a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Zm13.8.9a1.124 1.124 0 0 1-1.575-.225c-.78-1.04-1.86-1.837-2.75-2.029a1.125 1.125 0 0 1-.17-2.148 1.874 1.874 0 1 0-2.323-2.653 1.127 1.127 0 0 1-1.884.18 1.125 1.125 0 0 1-.085-1.267 4.125 4.125 0 1 1 6.87 4.533 8.64 8.64 0 0 1 2.142 2.033 1.125 1.125 0 0 1-.224 1.575ZM5.15 12.15c-.89.191-1.97.988-2.75 2.029a1.126 1.126 0 0 1-1.8-1.355 8.659 8.659 0 0 1 2.143-2.033 4.125 4.125 0 1 1 6.87-4.533 1.125 1.125 0 1 1-1.969 1.087 1.875 1.875 0 1 0-2.323 2.653 1.125 1.125 0 0 1-.17 2.148l-.001.003Z'
    />{' '}
  </svg>
);
exports.default = UsersThree;
