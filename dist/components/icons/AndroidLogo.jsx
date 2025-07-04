'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const AndroidLogo = ({
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
      d='M16.875 13.875a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-8.25-1.5a1.5 1.5 0 1 0 0 2.999 1.5 1.5 0 0 0 0-2.999ZM22.875 15v2.25A1.875 1.875 0 0 1 21 19.125H3a1.875 1.875 0 0 1-1.875-1.875v-2.144a11.002 11.002 0 0 1 3.161-7.729L2.204 5.296a1.127 1.127 0 0 1 1.594-1.594l2.23 2.235a10.72 10.72 0 0 1 5.934-1.812H12c2.13-.006 4.214.618 5.99 1.794l2.214-2.215a1.126 1.126 0 0 1 1.924.797 1.128 1.128 0 0 1-.33.797L19.735 7.36a10.798 10.798 0 0 1 3.14 7.64Zm-2.25 0a8.624 8.624 0 0 0-8.656-8.625c-4.739.017-8.594 3.938-8.594 8.73v1.77h17.25V15Z'
    />{' '}
  </svg>
);
exports.default = AndroidLogo;
