'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const GoogleChromeLogo = ({
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
      d='M12 1.875A10.125 10.125 0 1 0 22.125 12 10.137 10.137 0 0 0 12 1.875Zm0 2.25a7.864 7.864 0 0 1 6.178 3H12a4.88 4.88 0 0 0-4.327 2.632l-1.656-2.87A7.858 7.858 0 0 1 12 4.126ZM14.625 12a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Zm-10.5 0c0-1 .19-1.99.563-2.917l3.093 5.354.019.029a4.875 4.875 0 0 0 4.42 2.403l-1.658 2.872A7.886 7.886 0 0 1 4.125 12Zm9.005 7.793 3.089-5.355.022-.044a4.858 4.858 0 0 0-.137-5.019h3.32a7.87 7.87 0 0 1-6.294 10.418Z'
    />{' '}
  </svg>
);
exports.default = GoogleChromeLogo;
