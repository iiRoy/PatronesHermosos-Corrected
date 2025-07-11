'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const AppStoreLogo = ({
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
      d='M22.875 15a1.125 1.125 0 0 1-1.125 1.125h-2.937l1.655 2.802a1.123 1.123 0 0 1-.389 1.553 1.125 1.125 0 0 1-1.547-.408l-5.323-9.01a1.125 1.125 0 0 1 1.937-1.143l2.337 3.956h4.267A1.125 1.125 0 0 1 22.875 15Zm-10.392-1.125H9.13l6.088-10.302a1.123 1.123 0 0 0-.806-1.698 1.125 1.125 0 0 0-1.13.553L12 4.594l-1.282-2.166a1.125 1.125 0 1 0-1.936 1.145l1.911 3.235-4.175 7.067H2.25a1.125 1.125 0 1 0 0 2.25h10.233a1.125 1.125 0 1 0 0-2.25Zm-6.968 3.907a1.125 1.125 0 0 0-1.54.395l-.443.75a1.125 1.125 0 1 0 1.936 1.145l.444-.75a1.125 1.125 0 0 0-.397-1.54Z'
    />{' '}
  </svg>
);
exports.default = AppStoreLogo;
