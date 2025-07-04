'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const FileDoc = ({
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
      d='M4.5 13.125H3a1.125 1.125 0 0 0-1.125 1.125v5.25A1.125 1.125 0 0 0 3 20.625h1.5a3.75 3.75 0 0 0 0-7.5Zm0 5.25h-.375v-3H4.5a1.5 1.5 0 1 1 0 3Zm16.903-.356a1.124 1.124 0 0 1 .035 1.594 3.187 3.187 0 0 1-2.313 1.012c-1.86 0-3.375-1.682-3.375-3.75s1.514-3.75 3.375-3.75a3.187 3.187 0 0 1 2.313 1.015 1.125 1.125 0 1 1-1.626 1.557.963.963 0 0 0-.687-.322c-.61 0-1.125.687-1.125 1.5s.516 1.5 1.125 1.5a.964.964 0 0 0 .687-.322 1.126 1.126 0 0 1 1.591-.034ZM12 13.125c-1.86 0-3.375 1.682-3.375 3.75s1.514 3.75 3.375 3.75c1.86 0 3.375-1.682 3.375-3.75s-1.514-3.75-3.375-3.75Zm0 5.25c-.61 0-1.125-.687-1.125-1.5s.516-1.5 1.125-1.5c.61 0 1.125.687 1.125 1.5s-.516 1.5-1.125 1.5ZM4.5 11.25a1.125 1.125 0 0 0 1.125-1.125v-6h7.125v4.5a1.125 1.125 0 0 0 1.125 1.125h4.5v.375a1.125 1.125 0 1 0 2.25 0V8.25a1.12 1.12 0 0 0-.33-.795l-5.25-5.25a1.124 1.124 0 0 0-.795-.33h-9A1.875 1.875 0 0 0 3.375 3.75v6.375A1.125 1.125 0 0 0 4.5 11.25ZM15 5.344 17.156 7.5H15V5.344Z'
    />{' '}
  </svg>
);
exports.default = FileDoc;
