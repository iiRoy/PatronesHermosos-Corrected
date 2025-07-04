'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Folders = ({
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
      d='M21.375 5.25H15l-2.5-1.875A1.886 1.886 0 0 0 11.375 3h-4.25A1.875 1.875 0 0 0 5.25 4.875V6.75H3.375A1.875 1.875 0 0 0 1.5 8.625v10.5A1.875 1.875 0 0 0 3.375 21h14.333a1.793 1.793 0 0 0 1.792-1.792V17.25h1.958a1.793 1.793 0 0 0 1.792-1.792V7.125a1.875 1.875 0 0 0-1.875-1.875Zm-4.125 13.5H3.75V9H7.5l2.7 2.025c.195.146.432.225.675.225h6.375v7.5ZM21 15h-1.5v-4.125A1.875 1.875 0 0 0 17.625 9H11.25l-2.5-1.875a1.886 1.886 0 0 0-1.125-.375H7.5v-1.5h3.75l2.7 2.025c.195.146.432.225.675.225H21V15Z'
    />{' '}
  </svg>
);
exports.default = Folders;
