'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Lightbulb = ({
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
      d='M16.875 21.75a1.125 1.125 0 0 1-1.125 1.125h-7.5a1.125 1.125 0 1 1 0-2.25h7.5a1.125 1.125 0 0 1 1.125 1.125Zm3.75-12a8.58 8.58 0 0 1-3.297 6.783 1.15 1.15 0 0 0-.453.904v.188A1.875 1.875 0 0 1 15 19.5H9a1.875 1.875 0 0 1-1.875-1.875v-.188a1.125 1.125 0 0 0-.44-.891 8.584 8.584 0 0 1-3.31-6.747c-.025-4.672 3.75-8.562 8.418-8.674a8.624 8.624 0 0 1 8.832 8.625Zm-2.25 0a6.374 6.374 0 0 0-6.53-6.375c-3.449.082-6.239 2.958-6.22 6.41a6.348 6.348 0 0 0 2.447 4.987 3.362 3.362 0 0 1 1.303 2.478h5.26a3.387 3.387 0 0 1 1.303-2.485 6.345 6.345 0 0 0 2.437-5.015Zm-1.882-.499a4.547 4.547 0 0 0-2.991-3.75 1.125 1.125 0 0 0-.75 2.12 2.279 2.279 0 0 1 1.508 1.876 1.125 1.125 0 1 0 2.237-.248l-.004.002Z'
    />{' '}
  </svg>
);
exports.default = Lightbulb;
