'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const DropHalf = ({
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
      d='M12.645.578a1.125 1.125 0 0 0-1.29 0 24.28 24.28 0 0 0-3.954 3.657c-2.634 3.024-4.026 6.23-4.026 9.265a8.625 8.625 0 1 0 17.25 0c0-7.252-7.654-12.694-7.98-12.922ZM18.195 15h-5.07v-1.5h5.25a6.32 6.32 0 0 1-.18 1.5Zm-5.07-3.75v-1.5h4.406c.215.486.393.988.533 1.5h-4.939Zm1.81-5.504c.483.557.933 1.143 1.347 1.754h-3.157V3.887a22.824 22.824 0 0 1 1.81 1.859ZM5.624 13.5c0-3.123 1.875-5.94 3.44-7.754a22.824 22.824 0 0 1 1.81-1.86v15.888a6.385 6.385 0 0 1-5.25-6.274Zm7.5 6.274V17.25h4.026a6.375 6.375 0 0 1-4.026 2.524Z'
    />{' '}
  </svg>
);
exports.default = DropHalf;
