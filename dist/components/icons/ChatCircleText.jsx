'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ChatCircleText = ({
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
      d='M16.125 10.125A1.125 1.125 0 0 1 15 11.25H9A1.125 1.125 0 1 1 9 9h6a1.125 1.125 0 0 1 1.125 1.125ZM15 12.75H9A1.125 1.125 0 1 0 9 15h6a1.125 1.125 0 1 0 0-2.25Zm7.125-.75a10.125 10.125 0 0 1-14.74 9.014l-3.04 1.017a1.875 1.875 0 0 1-2.376-2.375l1.013-3.04A10.125 10.125 0 1 1 22.125 12Zm-2.25 0a7.875 7.875 0 1 0-14.693 3.943 1.125 1.125 0 0 1 .093.92l-.93 2.793 2.792-.931a1.125 1.125 0 0 1 .919.094A7.875 7.875 0 0 0 19.875 12Z'
    />{' '}
  </svg>
);
exports.default = ChatCircleText;
