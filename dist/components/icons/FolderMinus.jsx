'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const FolderMinus = ({
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
      d='M8.625 13.5a1.125 1.125 0 0 1 1.125-1.125h4.5a1.125 1.125 0 1 1 0 2.25h-4.5A1.125 1.125 0 0 1 8.625 13.5Zm13.5-5.25v10.583a1.793 1.793 0 0 1-1.792 1.792H3.692a1.82 1.82 0 0 1-1.817-1.817V4.875A1.875 1.875 0 0 1 3.75 3h4.913a1.875 1.875 0 0 1 1.407.63l2.437 2.745h7.743a1.875 1.875 0 0 1 1.875 1.875Zm-18-1.875h5.37l-1-1.125h-4.37v1.125Zm15.75 2.25H4.125v9.75h15.75v-9.75Z'
    />{' '}
  </svg>
);
exports.default = FolderMinus;
