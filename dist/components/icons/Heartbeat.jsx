'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Heartbeat = ({
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
      d='M6.728 13.875H2.972a1.125 1.125 0 1 1 0-2.25h3.153l1.167-1.75a1.125 1.125 0 0 1 1.875 0l2.062 3.094.563-.843a1.126 1.126 0 0 1 .937-.501h2.25a1.125 1.125 0 0 1 0 2.25h-1.65l-1.168 1.75a1.125 1.125 0 0 1-1.875 0L8.224 12.53l-.563.843a1.125 1.125 0 0 1-.933.501Zm9.951-10.5c-1.886 0-3.562.743-4.694 2.021-1.134-1.278-2.808-2.021-4.695-2.021a6.187 6.187 0 0 0-6.158 5.501 1.129 1.129 0 0 0 2.243.248A3.938 3.938 0 0 1 7.29 5.625c1.672 0 3.07.881 3.652 2.3a1.124 1.124 0 0 0 2.085 0c.582-1.419 1.98-2.3 3.652-2.3a3.945 3.945 0 0 1 3.946 3.938c0 2.758-2.424 5.415-4.459 7.158a30.847 30.847 0 0 1-4.18 2.982c-1.018-.604-3.315-2.062-5.297-4.005a1.126 1.126 0 0 0-1.579 1.604c2.85 2.795 6.202 4.613 6.343 4.688a1.13 1.13 0 0 0 1.068 0c.416-.227 10.354-5.646 10.354-12.427a6.199 6.199 0 0 0-6.196-6.188Z'
    />{' '}
  </svg>
);
exports.default = Heartbeat;
