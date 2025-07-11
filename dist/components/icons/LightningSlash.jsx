'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const LightningSlash = ({
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
      d='M5.332 2.993a1.125 1.125 0 1 0-1.665 1.514l3.449 3.792-3.438 3.683a1.125 1.125 0 0 0 .404 1.812l4.798 1.92-.993 6.62a1.125 1.125 0 0 0 1.935.937l5.522-5.917 3.324 3.656a1.125 1.125 0 0 0 1.665-1.513l-15-16.504Zm5.318 16.09.588-3.916a1.125 1.125 0 0 0-.695-1.211l-4.099-1.64 2.19-2.344 5.191 5.711-3.175 3.4ZM10.445 6.38a1.125 1.125 0 0 1-.056-1.594L14.178.732a1.125 1.125 0 0 1 1.935.938l-.993 6.617 4.798 1.919a1.126 1.126 0 0 1 .404 1.812l-1.577 1.687A1.125 1.125 0 1 1 17.1 12.17l.456-.489-4.1-1.64a1.125 1.125 0 0 1-.694-1.21l.588-3.917-1.313 1.407a1.125 1.125 0 0 1-1.592.06Z'
    />{' '}
  </svg>
);
exports.default = LightningSlash;
