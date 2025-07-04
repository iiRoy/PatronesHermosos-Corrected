'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const BookOpenUser = ({
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
      d='M21.75 6.75H15a4.112 4.112 0 0 0-3 1.298A4.112 4.112 0 0 0 9 6.75H2.25a1.125 1.125 0 0 0-1.125 1.125V18.75a1.125 1.125 0 0 0 1.125 1.125H9a1.875 1.875 0 0 1 1.875 1.875 1.125 1.125 0 1 0 2.25 0A1.875 1.875 0 0 1 15 19.875h6.75a1.125 1.125 0 0 0 1.125-1.125V7.875A1.125 1.125 0 0 0 21.75 6.75ZM9 17.625H3.375V9H9a1.875 1.875 0 0 1 1.875 1.875v7.2A4.106 4.106 0 0 0 9 17.626Zm11.625 0H15c-.652 0-1.295.155-1.875.453v-7.203A1.875 1.875 0 0 1 15 9h5.625v8.625ZM8.1 3.825a4.875 4.875 0 0 1 7.8 0 1.125 1.125 0 1 1-1.8 1.35 2.624 2.624 0 0 0-4.2 0 1.125 1.125 0 1 1-1.8-1.35Z'
    />{' '}
  </svg>
);
exports.default = BookOpenUser;
