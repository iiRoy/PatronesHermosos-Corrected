'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const BellSimpleSlash = ({
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
      d='m20.332 19.493-15-16.5a1.125 1.125 0 1 0-1.664 1.514l1.387 1.527a7.836 7.836 0 0 0-.93 3.716c0 2.398-.43 4.406-1.244 5.806a1.883 1.883 0 0 0 .68 2.571c.285.165.61.25.939.248h11.775l2.393 2.632a1.125 1.125 0 0 0 1.665-1.514ZM5.127 16.125c.829-1.688 1.249-3.83 1.249-6.375 0-.648.11-1.292.33-1.902l7.524 8.277H5.126ZM16.125 21A1.125 1.125 0 0 1 15 22.125H9a1.125 1.125 0 1 1 0-2.25h6A1.125 1.125 0 0 1 16.125 21ZM8.333 3.97a1.125 1.125 0 0 1 .598-1.474A7.875 7.875 0 0 1 19.875 9.75c0 1.751.223 3.275.663 4.526a1.124 1.124 0 0 1-1.121 1.5 1.124 1.124 0 0 1-1.002-.75c-.525-1.496-.79-3.27-.79-5.276a5.624 5.624 0 0 0-7.817-5.183 1.125 1.125 0 0 1-1.475-.597Z'
    />{' '}
  </svg>
);
exports.default = BellSimpleSlash;
