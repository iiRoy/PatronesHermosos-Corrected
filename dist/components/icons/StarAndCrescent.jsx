'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const StarAndCrescent = ({
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
      d='M14.762 18.349a7.125 7.125 0 0 1 0-12.698 1.125 1.125 0 0 0 0-2.003 9.375 9.375 0 1 0 0 16.704 1.125 1.125 0 0 0 0-2.003Zm-4.262.776a7.125 7.125 0 0 1 0-14.25c.427 0 .852.037 1.272.112a9.388 9.388 0 0 0 0 14.026 7.23 7.23 0 0 1-1.272.112Zm12.82-8.156-2.276-.985-.199-2.57a1.126 1.126 0 0 0-1.99-.63l-1.593 1.93-2.368-.587a1.125 1.125 0 0 0-1.24 1.662L14.958 12l-1.301 2.21a1.125 1.125 0 0 0 1.239 1.663l2.368-.586 1.594 1.93a1.124 1.124 0 0 0 1.99-.63l.198-2.571 2.275-.985a1.125 1.125 0 0 0 0-2.062Zm-3.79 1.251a1.125 1.125 0 0 0-.677.946l-.036.469-.27-.322a1.126 1.126 0 0 0-1.137-.376l-.458.113.281-.475a1.125 1.125 0 0 0 0-1.142l-.281-.476.458.114a1.125 1.125 0 0 0 1.137-.375l.27-.326.036.468a1.126 1.126 0 0 0 .676.946l.506.219-.506.217Z'
    />{' '}
  </svg>
);
exports.default = StarAndCrescent;
