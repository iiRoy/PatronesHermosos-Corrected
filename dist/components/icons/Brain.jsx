'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Brain = ({
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
      d='M23.625 11.625a5.638 5.638 0 0 0-3-4.976A4.875 4.875 0 0 0 12 3.639a4.875 4.875 0 0 0-8.625 3.01 5.625 5.625 0 0 0 0 9.95A4.875 4.875 0 0 0 12 19.612a4.876 4.876 0 0 0 8.625-3.013 5.63 5.63 0 0 0 3-4.974Zm-15.375 7.5a2.625 2.625 0 0 1-2.517-1.882c.094 0 .177.007.267.007h.75a1.125 1.125 0 1 0 0-2.25H6a3.374 3.374 0 0 1-1.125-6.558 1.125 1.125 0 0 0 .75-1.061V6.75a2.625 2.625 0 0 1 5.25 0v5.642a4.832 4.832 0 0 0-.675-.361 1.125 1.125 0 0 0-.9 2.062 2.625 2.625 0 0 1-1.05 5.032ZM18 15h-.75a1.125 1.125 0 1 0 0 2.25H18c.094 0 .178 0 .267-.007a2.626 2.626 0 1 1-3.562-3.15 1.125 1.125 0 1 0-.9-2.063c-.235.102-.46.223-.675.36V6.75a2.625 2.625 0 1 1 5.25 0v.63a1.125 1.125 0 0 0 .75 1.062 3.375 3.375 0 0 1-1.125 6.563L18 15Zm1.5-4.125A1.125 1.125 0 0 1 18.375 12a3.75 3.75 0 0 1-3.75-3.75v-.375a1.125 1.125 0 1 1 2.25 0v.375a1.5 1.5 0 0 0 1.5 1.5 1.125 1.125 0 0 1 1.125 1.125ZM9.375 8.25A3.75 3.75 0 0 1 5.625 12a1.125 1.125 0 1 1 0-2.25 1.5 1.5 0 0 0 1.5-1.5v-.375a1.125 1.125 0 0 1 2.25 0v.375Z'
    />{' '}
  </svg>
);
exports.default = Brain;
