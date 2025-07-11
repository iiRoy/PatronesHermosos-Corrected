'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Heart = ({
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
      d='M16.688 3.375c-1.884 0-3.555.743-4.688 2.021-1.133-1.278-2.804-2.021-4.688-2.021a6.195 6.195 0 0 0-6.187 6.188c0 6.781 9.92 12.2 10.342 12.428a1.125 1.125 0 0 0 1.066 0c.422-.228 10.342-5.647 10.342-12.428a6.195 6.195 0 0 0-6.188-6.188Zm-.515 13.346A30.82 30.82 0 0 1 12 19.703a30.82 30.82 0 0 1-4.173-2.982c-2.031-1.743-4.452-4.4-4.452-7.159a3.937 3.937 0 0 1 3.938-3.937c1.668 0 3.065.881 3.645 2.3a1.125 1.125 0 0 0 2.084 0c.58-1.419 1.977-2.3 3.646-2.3a3.937 3.937 0 0 1 3.937 3.938c0 2.758-2.42 5.415-4.452 7.158Z'
    />{' '}
  </svg>
);
exports.default = Heart;
