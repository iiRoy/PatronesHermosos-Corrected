'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const EarSlash = ({
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
      d='M20.332 19.493a1.126 1.126 0 1 1-1.665 1.514l-3.126-3.44A2.625 2.625 0 0 1 12.375 15c0-.277.027-.554.08-.826L9.1 10.484a1.125 1.125 0 0 1-1.976-.734c0-.425.055-.848.164-1.26L6.143 7.23a6.347 6.347 0 0 0-.518 2.521c0 2.344.71 3.028 1.533 3.821C7.98 14.364 9 15.348 9 17.625a3 3 0 0 0 3 3c.844 0 1.518-.347 2.133-1.091a1.125 1.125 0 0 1 1.734 1.432c-1.046 1.267-2.347 1.909-3.867 1.909a5.256 5.256 0 0 1-5.25-5.25c0-1.321-.434-1.74-1.154-2.438-.99-.95-2.221-2.138-2.221-5.437a8.56 8.56 0 0 1 1.148-4.301l-.855-.938a1.127 1.127 0 0 1 1.664-1.518l15 16.5ZM9.313 3.967a6.382 6.382 0 0 1 9.062 5.783 1.125 1.125 0 1 0 2.25 0A8.625 8.625 0 0 0 8.363 1.927a1.125 1.125 0 0 0 .95 2.04Zm6.102 7.593a1.125 1.125 0 0 0 1.35-.84c.074-.319.11-.644.11-.97a4.88 4.88 0 0 0-5.354-4.852 1.125 1.125 0 1 0 .218 2.24 2.625 2.625 0 0 1 2.886 2.612c0 .154-.017.307-.05.457a1.125 1.125 0 0 0 .84 1.35v.003Z'
    />{' '}
  </svg>
);
exports.default = EarSlash;
