'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CloudMoon = ({
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
      d='M16.125 6.375c-.156 0-.31.006-.464.015A7.118 7.118 0 0 0 10.223.556a1.125 1.125 0 0 0-1.347 1.348 4.88 4.88 0 0 1-5.848 5.847 1.125 1.125 0 0 0-1.347 1.35 7.182 7.182 0 0 0 2.617 4.056 5.25 5.25 0 0 0 4.327 8.218h7.5a7.5 7.5 0 0 0 0-15Zm-4.885-3a4.841 4.841 0 0 1 2.22 3.485 7.537 7.537 0 0 0-4.236 4.045 5.304 5.304 0 0 0-.599-.03c-.93 0-1.844.247-2.647.718a4.939 4.939 0 0 1-1.465-1.478 7.135 7.135 0 0 0 6.727-6.74Zm4.885 15.75h-7.5a3 3 0 0 1 0-6h.026c-.01.103-.018.206-.024.31a1.127 1.127 0 0 0 2.25.13c.02-.348.074-.693.163-1.03l.014-.052a5.255 5.255 0 1 1 5.071 6.642Z'
    />{' '}
  </svg>
);
exports.default = CloudMoon;
