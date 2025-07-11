'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const FloppyDisk = ({
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
      d='m20.826 6.485-3.31-3.31a1.862 1.862 0 0 0-1.326-.55H4.5A1.875 1.875 0 0 0 2.625 4.5v15A1.875 1.875 0 0 0 4.5 21.375h15a1.875 1.875 0 0 0 1.875-1.875V7.81a1.861 1.861 0 0 0-.55-1.325Zm-5.451 12.64h-6.75V15h6.75v4.125Zm3.75 0h-1.5v-4.5a1.875 1.875 0 0 0-1.875-1.875h-7.5a1.875 1.875 0 0 0-1.875 1.875v4.5h-1.5V4.875h11.156l3.094 3.094v11.156Zm-3.75-11.25A1.125 1.125 0 0 1 14.25 9H9a1.125 1.125 0 0 1 0-2.25h5.25a1.125 1.125 0 0 1 1.125 1.125Z'
    />{' '}
  </svg>
);
exports.default = FloppyDisk;
