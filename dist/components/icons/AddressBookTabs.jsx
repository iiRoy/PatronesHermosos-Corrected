'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const AddressBookTabs = ({
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
      d='M19.5 2.625h-15A1.875 1.875 0 0 0 2.625 4.5v15A1.875 1.875 0 0 0 4.5 21.375h15a1.875 1.875 0 0 0 1.875-1.875v-15A1.875 1.875 0 0 0 19.5 2.625Zm-1.875 7.5h1.5v3.75h-1.5v-3.75Zm1.5-2.25h-1.5v-3h1.5v3Zm-14.25-3h10.5v14.25h-10.5V4.875Zm12.75 14.25v-3h1.5v3h-1.5Zm-3.41-3.656a4.052 4.052 0 0 0-1.422-2.156 3.374 3.374 0 1 0-5.336 0 4.064 4.064 0 0 0-1.421 2.156 1.125 1.125 0 1 0 2.178.562c.207-.8 1.032-1.406 1.911-1.406.88 0 1.705.604 1.91 1.406a1.125 1.125 0 1 0 2.18-.562ZM9 11.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z'
    />{' '}
  </svg>
);
exports.default = AddressBookTabs;
