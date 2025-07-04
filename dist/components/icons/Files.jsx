'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Files = ({
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
      d='m20.67 5.58-3.75-3.75a1.124 1.124 0 0 0-.795-.33h-7.5A1.875 1.875 0 0 0 6.75 3.375V5.25h-1.5a1.875 1.875 0 0 0-1.875 1.875V20.25a1.875 1.875 0 0 0 1.875 1.875h10.125a1.875 1.875 0 0 0 1.875-1.875v-1.875h1.875A1.875 1.875 0 0 0 21 16.5V6.375a1.126 1.126 0 0 0-.33-.796ZM15 19.874H5.625V7.5h6.281L15 10.594v9.281Zm3.75-3.75h-1.5v-6a1.126 1.126 0 0 0-.33-.796l-3.75-3.75a1.124 1.124 0 0 0-.795-.329H9v-1.5h6.656l3.094 3.094v9.281ZM13.5 13.5a1.125 1.125 0 0 1-1.125 1.125H8.25a1.125 1.125 0 1 1 0-2.25h4.125A1.125 1.125 0 0 1 13.5 13.5Zm0 3.75a1.125 1.125 0 0 1-1.125 1.125H8.25a1.125 1.125 0 1 1 0-2.25h4.125A1.125 1.125 0 0 1 13.5 17.25Z'
    />{' '}
  </svg>
);
exports.default = Files;
