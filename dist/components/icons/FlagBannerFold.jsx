'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const FlagBannerFold = ({
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
      d='M22.696 3.89a1.124 1.124 0 0 0-.946-.515h-7.5a1.125 1.125 0 0 0-1.024.656l-.724 1.594H2.625a1.125 1.125 0 0 0-.833 1.882l3.062 3.368-3.062 3.368a1.125 1.125 0 0 0 .833 1.882h6.852a1.125 1.125 0 0 0 1.023-.656l.723-1.594h5.028l-3.027 6.656a1.127 1.127 0 0 0 2.05.938l7.5-16.5a1.125 1.125 0 0 0-.078-1.078ZM5.168 13.876l2.04-2.243a1.125 1.125 0 0 0 0-1.514l-2.04-2.243h6.312l-2.728 6H5.168Zm12.107-2.25h-5.027l2.727-6h5.028l-2.728 6Z'
    />{' '}
  </svg>
);
exports.default = FlagBannerFold;
