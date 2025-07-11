'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const FingerprintSimple = ({
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
      d='M8.625 12c0 2.478-.629 4.915-1.828 7.084a1.126 1.126 0 0 1-1.969-1.091A12.375 12.375 0 0 0 6.375 12a5.625 5.625 0 0 1 9.345-4.219 1.124 1.124 0 1 1-1.489 1.688A3.375 3.375 0 0 0 8.625 12Zm7.89-.75H16.5a1.125 1.125 0 0 0-1.125 1.106 21.26 21.26 0 0 1-1.594 7.766 1.124 1.124 0 1 0 2.08.856 23.479 23.479 0 0 0 1.764-8.584 1.124 1.124 0 0 0-1.11-1.144Zm-5.833 7.613a1.125 1.125 0 0 0-1.5.52c-.129.263-.267.53-.41.79a1.126 1.126 0 0 0 1.968 1.09c.163-.295.32-.596.469-.896a1.126 1.126 0 0 0-.528-1.504ZM12 10.875A1.125 1.125 0 0 0 10.875 12c0 1.302-.149 2.6-.445 3.868a1.125 1.125 0 0 0 2.19.514c.336-1.436.506-2.907.505-4.382A1.125 1.125 0 0 0 12 10.875Zm0-9c-1 0-1.996.147-2.953.438a1.127 1.127 0 1 0 .656 2.156A7.88 7.88 0 0 1 19.875 12c0 1.935-.214 3.864-.641 5.75a1.122 1.122 0 0 0 .848 1.347 1.125 1.125 0 0 0 1.346-.848A28.3 28.3 0 0 0 22.125 12 10.137 10.137 0 0 0 12 1.875ZM6.42 4.851a1.125 1.125 0 0 0-1.595 0A10.061 10.061 0 0 0 1.875 12a7.806 7.806 0 0 1-.713 3.281 1.125 1.125 0 1 0 2.044.938A10.04 10.04 0 0 0 4.125 12a7.82 7.82 0 0 1 2.297-5.558 1.125 1.125 0 0 0-.003-1.591Z'
    />{' '}
  </svg>
);
exports.default = FingerprintSimple;
