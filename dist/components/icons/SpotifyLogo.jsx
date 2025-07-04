'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const SpotifyLogo = ({
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
      d='M12 1.875A10.125 10.125 0 1 0 22.125 12 10.137 10.137 0 0 0 12 1.875Zm0 18A7.875 7.875 0 1 1 19.875 12 7.883 7.883 0 0 1 12 19.875Zm6.243-7.909a1.125 1.125 0 0 1-1.523.462 10.003 10.003 0 0 0-9.44 0 1.126 1.126 0 0 1-1.06-1.983 12.245 12.245 0 0 1 11.559 0 1.125 1.125 0 0 1 .464 1.521Zm-1.5 3.375a1.123 1.123 0 0 1-1.522.469 6.844 6.844 0 0 0-6.442 0 1.125 1.125 0 0 1-1.058-1.986 9.094 9.094 0 0 1 8.558 0 1.125 1.125 0 0 1 .464 1.517Z'
    />{' '}
  </svg>
);
exports.default = SpotifyLogo;
