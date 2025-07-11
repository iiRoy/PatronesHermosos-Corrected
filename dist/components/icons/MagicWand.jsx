'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const MagicWand = ({
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
      d='M23.625 14.25a1.125 1.125 0 0 1-1.125 1.125h-1.125V16.5a1.125 1.125 0 1 1-2.25 0v-1.125H18a1.125 1.125 0 1 1 0-2.25h1.125V12a1.125 1.125 0 1 1 2.25 0v1.125H22.5a1.125 1.125 0 0 1 1.125 1.125ZM5.25 7.125h1.125V8.25a1.125 1.125 0 1 0 2.25 0V7.125H9.75a1.125 1.125 0 0 0 0-2.25H8.625V3.75a1.125 1.125 0 0 0-2.25 0v1.125H5.25a1.125 1.125 0 0 0 0 2.25Zm12 10.5h-.375v-.375a1.125 1.125 0 1 0-2.25 0v.375h-.375a1.125 1.125 0 1 0 0 2.25h.375v.375a1.125 1.125 0 1 0 2.25 0v-.375h.375a1.125 1.125 0 1 0 0-2.25Zm3.576-9.86L7.764 20.825a1.875 1.875 0 0 1-2.65 0l-1.94-1.938a1.875 1.875 0 0 1 0-2.652l13.06-13.06a1.875 1.875 0 0 1 2.652 0l1.94 1.938a1.875 1.875 0 0 1 0 2.652Zm-5.92 2.735L13.5 9.094 5.03 17.56l1.406 1.407 8.47-8.467Zm4.06-4.06L17.56 5.033 15.094 7.5 16.5 8.906l2.467-2.466Z'
    />{' '}
  </svg>
);
exports.default = MagicWand;
