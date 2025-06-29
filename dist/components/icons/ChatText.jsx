'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ChatText = ({
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
      d='M20.25 4.125H3.75A1.875 1.875 0 0 0 1.875 6v15a1.858 1.858 0 0 0 1.084 1.697 1.867 1.867 0 0 0 1.998-.264l.01-.01 2.952-2.548H20.25A1.875 1.875 0 0 0 22.125 18V6a1.875 1.875 0 0 0-1.875-1.875Zm-.375 13.5H7.5c-.27 0-.531.097-.735.274l-2.64 2.279V6.375h15.75v11.25Zm-12-7.5A1.125 1.125 0 0 1 9 9h6a1.125 1.125 0 0 1 0 2.25H9a1.125 1.125 0 0 1-1.125-1.125Zm0 3.75A1.125 1.125 0 0 1 9 12.75h6A1.125 1.125 0 1 1 15 15H9a1.125 1.125 0 0 1-1.125-1.125Z'
    />{' '}
  </svg>
);
exports.default = ChatText;
