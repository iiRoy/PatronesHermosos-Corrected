'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ChatCenteredDots = ({
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
      d='M8.25 11.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm7.875-7.5v12a1.875 1.875 0 0 1-1.875 1.875h-5.448l-1.174 2.055a1.874 1.874 0 0 1-3.256 0l-1.174-2.055H3.75a1.875 1.875 0 0 1-1.875-1.875v-12A1.875 1.875 0 0 1 3.75 3.375h16.5a1.875 1.875 0 0 1 1.875 1.875Zm-2.25.375H4.125v11.25H9.85a1.125 1.125 0 0 1 .977.567L12 19.494l1.173-2.052a1.125 1.125 0 0 1 .977-.567h5.725V5.625Z'
    />{' '}
  </svg>
);
exports.default = ChatCenteredDots;
