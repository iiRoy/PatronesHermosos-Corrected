'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Chats = ({
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
      d='M20.25 7.125h-2.625V4.5a1.875 1.875 0 0 0-1.875-1.875h-12A1.875 1.875 0 0 0 1.875 4.5v12a1.125 1.125 0 0 0 1.832.875l2.668-2.157v2.032a1.875 1.875 0 0 0 1.875 1.875h8.64l3.403 2.75A1.125 1.125 0 0 0 22.125 21V9a1.875 1.875 0 0 0-1.875-1.875Zm-16.125 7.02v-9.27h11.25v7.5H6.711c-.259 0-.51.088-.711.25l-1.875 1.52Zm15.75 4.5L18 17.124c-.2-.162-.45-.25-.707-.25H8.625v-2.25h7.125a1.875 1.875 0 0 0 1.875-1.875V9.375h2.25v9.27Z'
    />{' '}
  </svg>
);
exports.default = Chats;
