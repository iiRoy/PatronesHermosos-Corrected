'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const GooglePlayLogo = ({
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
      d='M22.668 10.378 6.938 1.373a1.898 1.898 0 0 0-1.887.006 1.84 1.84 0 0 0-.926 1.606v18.03a1.84 1.84 0 0 0 .93 1.606 1.896 1.896 0 0 0 1.885.006l15.728-9a1.852 1.852 0 0 0 0-3.244v-.005ZM6.375 19.031V4.97L13.406 12l-7.031 7.031ZM15 13.594l1.163 1.162-5.438 3.113L15 13.594Zm-4.274-7.46 5.437 3.113L15 10.407l-4.274-4.273Zm7.461 7.46L16.595 12l1.593-1.594L20.974 12l-2.787 1.594Z'
    />{' '}
  </svg>
);
exports.default = GooglePlayLogo;
