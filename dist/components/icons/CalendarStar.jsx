'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CalendarStar = ({
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
      d='M19.5 2.625h-1.875V2.25a1.125 1.125 0 1 0-2.25 0v.375h-6.75V2.25a1.125 1.125 0 0 0-2.25 0v.375H4.5A1.875 1.875 0 0 0 2.625 4.5v15A1.875 1.875 0 0 0 4.5 21.375h15a1.875 1.875 0 0 0 1.875-1.875v-15A1.875 1.875 0 0 0 19.5 2.625Zm-.375 16.5H4.875V4.875h1.5a1.125 1.125 0 0 0 2.25 0h6.75a1.125 1.125 0 1 0 2.25 0h1.5v14.25Zm-2.539-8.845-2.57-.2-.985-2.275a1.125 1.125 0 0 0-2.062 0l-.985 2.276-2.57.199a1.126 1.126 0 0 0-.63 1.99l1.93 1.593-.587 2.368a1.125 1.125 0 0 0 1.662 1.24L12 16.167l2.21 1.301a1.125 1.125 0 0 0 1.663-1.239l-.586-2.368 1.93-1.594a1.124 1.124 0 0 0-.63-1.99v.002Zm-3.281 2.298a1.126 1.126 0 0 0-.375 1.137l.113.458-.475-.281a1.13 1.13 0 0 0-1.142 0l-.475.281.113-.458a1.124 1.124 0 0 0-.375-1.137l-.325-.27.469-.036a1.126 1.126 0 0 0 .946-.676l.218-.506.219.506a1.125 1.125 0 0 0 .946.676l.468.036-.325.27Z'
    />{' '}
  </svg>
);
exports.default = CalendarStar;
