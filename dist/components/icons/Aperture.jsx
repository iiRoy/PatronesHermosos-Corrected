'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Aperture = ({
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
      d='M19.163 4.84a10.125 10.125 0 1 0 0 14.32 10.067 10.067 0 0 0 0-14.32ZM17.57 6.434c.302.301.58.626.83.972l-2.556 3.009L13.659 4.3a7.83 7.83 0 0 1 3.913 2.13l-.002.003Zm-11.143 0a7.822 7.822 0 0 1 4.792-2.269l1.328 3.718-6.387-1.17c.087-.095.177-.189.27-.282l-.002.003ZM4.5 14.41a7.92 7.92 0 0 1 .319-5.653l3.885.713L4.5 14.41Zm1.927 3.16a7.875 7.875 0 0 1-.826-.975l2.555-3.009 2.185 6.114a7.832 7.832 0 0 1-3.912-2.13h-.002Zm3.408-5.964 1.423-1.673 2.162.395.74 2.068-1.423 1.673-2.162-.395-.74-2.068Zm7.734 5.964a7.826 7.826 0 0 1-4.792 2.268l-1.325-3.712 6.388 1.166-.268.278h-.003Zm-2.273-3.038 4.204-4.94a7.915 7.915 0 0 1-.32 5.653l-3.884-.713Z'
    />{' '}
  </svg>
);
exports.default = Aperture;
