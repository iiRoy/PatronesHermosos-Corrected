'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Sunglasses = ({
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
      d='M18.75 3.375a1.125 1.125 0 0 0 0 2.25 1.125 1.125 0 0 1 1.125 1.125v4.875H4.125V6.75A1.125 1.125 0 0 1 5.25 5.625a1.125 1.125 0 0 0 0-2.25A3.375 3.375 0 0 0 1.875 6.75v8.625a4.5 4.5 0 1 0 9 0v-1.5h2.25v1.5a4.5 4.5 0 1 0 9 0V6.75a3.375 3.375 0 0 0-3.375-3.375ZM6.375 17.625a2.25 2.25 0 0 1-2.25-2.25v-.844l2.976 2.976c-.234.079-.48.119-.726.118Zm2.25-2.25c0 .144-.014.289-.041.43l-1.928-1.93h1.969v1.5Zm9 2.25a2.25 2.25 0 0 1-2.25-2.25v-.844l2.976 2.976c-.234.079-.48.119-.726.118Zm2.25-2.25c0 .144-.014.289-.041.43l-1.928-1.93h1.969v1.5Z'
    />{' '}
  </svg>
);
exports.default = Sunglasses;
