'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const PhoneDisconnect = ({
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
      d='M21.974 8.183c-5.407-5.41-14.541-5.41-19.948 0-2.011 2.013-2.205 4.981-.469 7.22a1.875 1.875 0 0 0 2.149.596l4.582-1.628.042-.015a1.874 1.874 0 0 0 1.139-1.374l.51-2.554a6.795 6.795 0 0 1 4.009-.009l.543 2.577a1.875 1.875 0 0 0 1.138 1.358l.043.016 4.588 1.628a1.875 1.875 0 0 0 2.148-.597c1.731-2.237 1.537-5.205-.474-7.218ZM20.828 13.8l-4.14-1.47-.54-2.579a1.874 1.874 0 0 0-1.22-1.387 9.046 9.046 0 0 0-5.9.013 1.875 1.875 0 0 0-1.21 1.397l-.505 2.558-4.14 1.468c-.86-1.298-.695-2.885.443-4.024C5.888 7.5 8.945 6.364 12 6.364c3.055 0 6.112 1.136 8.384 3.411 1.138 1.14 1.302 2.727.444 4.024Zm.547 4.951a1.125 1.125 0 0 1-1.125 1.125H3.75a1.125 1.125 0 1 1 0-2.25h16.5a1.125 1.125 0 0 1 1.125 1.125Z'
    />{' '}
  </svg>
);
exports.default = PhoneDisconnect;
