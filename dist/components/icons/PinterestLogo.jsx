'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const PinterestLogo = ({
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
      d='M21.375 10.5c0 2.213-.777 4.24-2.19 5.708-1.324 1.377-3.123 2.167-4.935 2.167-1.448 0-2.51-.392-3.27-.873l-.885 3.756a1.125 1.125 0 1 1-2.19-.516l3-12.75a1.124 1.124 0 1 1 2.19.516l-1.542 6.556c.327.392 1.118 1.061 2.697 1.061 2.396 0 4.875-2.105 4.875-5.625a6.375 6.375 0 1 0-11.898 3.188 1.125 1.125 0 0 1-1.947 1.125A8.626 8.626 0 1 1 21.375 10.5Z'
    />{' '}
  </svg>
);
exports.default = PinterestLogo;
