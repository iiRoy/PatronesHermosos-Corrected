'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const FolderUser = ({
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
      d='M20.673 18.557a3.374 3.374 0 1 0-5.344 0 4.102 4.102 0 0 0-1.414 2.156A1.125 1.125 0 0 0 15 22.125a1.125 1.125 0 0 0 1.087-.836c.226-.833 1.008-1.414 1.913-1.414s1.688.581 1.913 1.414a1.125 1.125 0 0 0 2.174-.579 4.097 4.097 0 0 0-1.414-2.153ZM18 15.375a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Zm2.25-9h-7.745l-2.437-2.746A1.875 1.875 0 0 0 8.663 3H3.75a1.875 1.875 0 0 0-1.875 1.875v13.932a1.82 1.82 0 0 0 1.817 1.818h6.86a1.125 1.125 0 1 0 0-2.25H4.126v-9.75h15.75v1.5a1.125 1.125 0 1 0 2.25 0V8.25a1.875 1.875 0 0 0-1.875-1.875Zm-16.125 0V5.25h4.37l1 1.125h-5.37Z'
    />{' '}
  </svg>
);
exports.default = FolderUser;
