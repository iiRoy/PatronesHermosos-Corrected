'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const KeyReturn = ({
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
      d='M6.704 13.546a1.125 1.125 0 0 1 0-1.594l2.25-2.25a1.127 1.127 0 0 1 1.594 1.594l-.33.329h5.157V9.75a1.125 1.125 0 1 1 2.25 0v3a1.125 1.125 0 0 1-1.125 1.125h-6.281l.33.33a1.127 1.127 0 1 1-1.594 1.593l-2.25-2.252ZM22.125 5.25v13.5a1.875 1.875 0 0 1-1.875 1.875H3.75a1.875 1.875 0 0 1-1.875-1.875V5.25A1.875 1.875 0 0 1 3.75 3.375h16.5a1.875 1.875 0 0 1 1.875 1.875Zm-2.25.375H4.125v12.75h15.75V5.625Z'
    />{' '}
  </svg>
);
exports.default = KeyReturn;
