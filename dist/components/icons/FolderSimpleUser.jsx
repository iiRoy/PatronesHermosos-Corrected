'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const FolderSimpleUser = ({
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
      d='M20.673 18.557a3.374 3.374 0 1 0-5.344 0 4.102 4.102 0 0 0-1.414 2.156A1.125 1.125 0 0 0 15 22.125a1.125 1.125 0 0 0 1.087-.836c.226-.833 1.008-1.414 1.913-1.414s1.688.581 1.913 1.414a1.125 1.125 0 0 0 2.174-.579 4.097 4.097 0 0 0-1.414-2.153ZM18 15.375a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Zm4.125-7.125v1.875a1.125 1.125 0 1 1-2.25 0v-1.5H12.25c-.405 0-.8-.132-1.125-.375l-2.5-1.875h-4.5v12H10.5a1.125 1.125 0 1 1 0 2.25H3.75a1.875 1.875 0 0 1-1.875-1.875V6A1.875 1.875 0 0 1 3.75 4.125h5c.405 0 .8.132 1.125.375l2.5 1.875h7.875a1.875 1.875 0 0 1 1.875 1.875Z'
    />{' '}
  </svg>
);
exports.default = FolderSimpleUser;
