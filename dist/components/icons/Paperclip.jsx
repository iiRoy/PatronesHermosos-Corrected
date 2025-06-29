'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Paperclip = ({
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
      d='m19.92 12.796-7.693 7.687a5.626 5.626 0 1 1-7.955-7.957l9.203-9.177a3.75 3.75 0 1 1 5.302 5.305l-.016.015-8.981 8.646a1.124 1.124 0 1 1-1.56-1.622l8.973-8.636a1.5 1.5 0 0 0-2.128-2.115l-9.203 9.174a3.376 3.376 0 0 0 4.775 4.773L18.33 11.2a1.127 1.127 0 0 1 1.594 1.594h-.004Z'
    />{' '}
  </svg>
);
exports.default = Paperclip;
