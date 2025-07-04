'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CopySimple = ({
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
      d='M16.875 6H3.75a1.125 1.125 0 0 0-1.125 1.125V20.25a1.125 1.125 0 0 0 1.125 1.125h13.125A1.125 1.125 0 0 0 18 20.25V7.125A1.125 1.125 0 0 0 16.875 6ZM15.75 19.125H4.875V8.25H15.75v10.875ZM21.375 3.75v13.125a1.125 1.125 0 1 1-2.25 0v-12h-12a1.125 1.125 0 0 1 0-2.25H20.25a1.125 1.125 0 0 1 1.125 1.125Z'
    />{' '}
  </svg>
);
exports.default = CopySimple;
