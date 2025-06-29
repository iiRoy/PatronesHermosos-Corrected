'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const TwitchLogo = ({
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
      d='M19.5 2.625h-15A1.875 1.875 0 0 0 2.625 4.5V18A1.875 1.875 0 0 0 4.5 19.875h1.125V22.5a1.125 1.125 0 0 0 1.845.864l4.187-3.489h3.821a1.88 1.88 0 0 0 1.201-.435l4.021-3.35a1.87 1.87 0 0 0 .675-1.442V4.5A1.875 1.875 0 0 0 19.5 2.625Zm-.375 11.848-3.782 3.152H11.25c-.263 0-.518.092-.72.26l-2.655 2.213V18.75a1.125 1.125 0 0 0-1.125-1.125H4.875V4.875h14.25v9.598Zm-4.5-1.723v-4.5a1.125 1.125 0 1 1 2.25 0v4.5a1.125 1.125 0 1 1-2.25 0Zm-4.5 0v-4.5a1.125 1.125 0 1 1 2.25 0v4.5a1.125 1.125 0 1 1-2.25 0Z'
    />{' '}
  </svg>
);
exports.default = TwitchLogo;
