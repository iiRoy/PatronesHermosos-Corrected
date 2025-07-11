'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ShieldSlash = ({
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
      d='M5.332 2.993a1.125 1.125 0 0 0-1.957.757 1.875 1.875 0 0 0-.75 1.5v5.25c0 5.09 2.468 8.177 4.537 9.87 2.223 1.819 4.448 2.438 4.542 2.466.194.052.398.052.592 0 .127-.035 2.813-.79 5.237-3.077l1.134 1.248a1.125 1.125 0 0 0 1.665-1.514l-15-16.5ZM12 20.567a11.85 11.85 0 0 1-3.477-1.99c-2.42-2.012-3.648-4.73-3.648-8.077V5.835l11.144 12.259A11.813 11.813 0 0 1 12 20.567ZM21.375 5.25v5.25a13.498 13.498 0 0 1-.772 4.609 1.125 1.125 0 1 1-2.115-.766c.434-1.235.65-2.535.637-3.843V5.625H10.25a1.125 1.125 0 1 1 0-2.25h9.25a1.875 1.875 0 0 1 1.875 1.875Z'
    />{' '}
  </svg>
);
exports.default = ShieldSlash;
