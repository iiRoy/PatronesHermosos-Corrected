'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const TagSimple = ({
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
      d='m23.438 11.376-4.28-6.416a1.875 1.875 0 0 0-1.56-.835H3.75A1.875 1.875 0 0 0 1.875 6v12a1.875 1.875 0 0 0 1.875 1.875h13.849a1.876 1.876 0 0 0 1.56-.835l4.279-6.416a1.126 1.126 0 0 0 0-1.248Zm-6.04 6.249H4.125V6.375h13.273L21.148 12l-3.75 5.625Z'
    />{' '}
  </svg>
);
exports.default = TagSimple;
