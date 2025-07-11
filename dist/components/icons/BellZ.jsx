'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const BellZ = ({
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
      d='M14.625 13.125A1.125 1.125 0 0 1 13.5 14.25h-3a1.125 1.125 0 0 1-.938-1.75l1.836-2.75H10.5a1.125 1.125 0 1 1 0-2.25h3a1.125 1.125 0 0 1 .938 1.75L12.601 12h.898a1.125 1.125 0 0 1 1.125 1.125Zm6.5 4.313a1.853 1.853 0 0 1-1.625.937h-3.392a4.125 4.125 0 0 1-8.216 0H4.5a1.854 1.854 0 0 1-1.623-.938 1.883 1.883 0 0 1 .005-1.88c.81-1.4 1.243-3.409 1.243-5.807a7.875 7.875 0 0 1 15.75 0c0 2.397.43 4.406 1.244 5.806a1.884 1.884 0 0 1 .007 1.882h-.001Zm-7.287.937h-3.675a1.875 1.875 0 0 0 3.675 0Zm5.038-2.25c-.83-1.688-1.251-3.832-1.251-6.375a5.625 5.625 0 1 0-11.25 0c0 2.544-.42 4.688-1.25 6.375h13.75Z'
    />{' '}
  </svg>
);
exports.default = BellZ;
