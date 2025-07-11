'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const GooglePodcastsLogo = ({
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
      d='M13.125 1.5v3a1.125 1.125 0 1 1-2.25 0v-3a1.125 1.125 0 1 1 2.25 0ZM16.5 4.875A1.125 1.125 0 0 0 15.375 6v3a1.125 1.125 0 1 0 2.25 0V6A1.125 1.125 0 0 0 16.5 4.875Zm-4.5 13.5a1.125 1.125 0 0 0-1.125 1.125v3a1.125 1.125 0 1 0 2.25 0v-3A1.125 1.125 0 0 0 12 18.375Zm0-11.25a1.125 1.125 0 0 0-1.125 1.125v7.5a1.125 1.125 0 1 0 2.25 0v-7.5A1.125 1.125 0 0 0 12 7.125Zm-4.5-2.25A1.125 1.125 0 0 0 6.375 6v5.25a1.125 1.125 0 0 0 2.25 0V6A1.125 1.125 0 0 0 7.5 4.875Zm9 6.75a1.125 1.125 0 0 0-1.125 1.125V18a1.125 1.125 0 1 0 2.25 0v-5.25a1.125 1.125 0 0 0-1.125-1.125ZM3 9.375A1.125 1.125 0 0 0 1.875 10.5v3a1.125 1.125 0 0 0 2.25 0v-3A1.125 1.125 0 0 0 3 9.375Zm4.5 4.5A1.125 1.125 0 0 0 6.375 15v3a1.125 1.125 0 0 0 2.25 0v-3A1.125 1.125 0 0 0 7.5 13.875Zm13.5-4.5a1.125 1.125 0 0 0-1.125 1.125v3a1.125 1.125 0 1 0 2.25 0v-3A1.125 1.125 0 0 0 21 9.375Z'
    />{' '}
  </svg>
);
exports.default = GooglePodcastsLogo;
