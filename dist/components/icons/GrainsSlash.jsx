'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const GrainsSlash = ({
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
      d='M5.332 2.993a1.125 1.125 0 1 0-1.664 1.514l.41.45A1.125 1.125 0 0 0 3.374 6v7.5a8.625 8.625 0 0 0 14.344 6.46l.952 1.047a1.125 1.125 0 0 0 1.665-1.514L5.333 2.993Zm.31 10.984a6.39 6.39 0 0 1 5.215 5.796 6.39 6.39 0 0 1-5.214-5.796ZM12 15.995a8.645 8.645 0 0 0-6.375-4.297V7.223c.22.04.437.091.65.153l6.64 7.303A8.67 8.67 0 0 0 12 15.995Zm1.143 3.777a6.4 6.4 0 0 1 1.305-3.407l1.753 1.928a6.35 6.35 0 0 1-3.058 1.479ZM20.625 6v7.5a8.696 8.696 0 0 1-.094 1.25 1.125 1.125 0 1 1-2.226-.323c.021-.149.037-.299.048-.45a8.65 8.65 0 0 0-.214.042 1.126 1.126 0 1 1-.476-2.198c.233-.05.468-.094.708-.123V7.225a6.375 6.375 0 0 0-3.636 2.037 1.127 1.127 0 0 1-1.68-1.5 8.601 8.601 0 0 1 1.628-1.415c-.769-1.4-1.998-2.344-2.684-2.79a9.172 9.172 0 0 0-1.459 1.181A1.125 1.125 0 0 1 8.947 3.15a10.875 10.875 0 0 1 2.549-1.905 1.125 1.125 0 0 1 1.006 0c.125.062 2.753 1.406 4.195 4.1a8.628 8.628 0 0 1 2.803-.469A1.125 1.125 0 0 1 20.625 6Z'
    />{' '}
  </svg>
);
exports.default = GrainsSlash;
