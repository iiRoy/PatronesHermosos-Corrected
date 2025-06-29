'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Anchor = ({
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
      d='M20.25 12.375a1.125 1.125 0 0 0-1.125 1.125c0 2.05-1.07 2.433-3.296 3.04-.855.233-1.839.502-2.704 1.002v-5.167h2.625a1.125 1.125 0 1 0 0-2.25h-2.625V8.432a3.375 3.375 0 1 0-2.25 0v1.693H8.25a1.125 1.125 0 1 0 0 2.25h2.625v5.166c-.865-.5-1.849-.768-2.704-1.002-2.226-.602-3.296-.99-3.296-3.039a1.125 1.125 0 0 0-2.25 0c0 3.86 2.863 4.64 4.954 5.21 2.226.607 3.296.99 3.296 3.04a1.125 1.125 0 1 0 2.25 0c0-2.05 1.07-2.433 3.296-3.04 2.09-.57 4.954-1.35 4.954-5.21a1.125 1.125 0 0 0-1.125-1.125ZM12 4.125a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Z'
    />{' '}
  </svg>
);
exports.default = Anchor;
