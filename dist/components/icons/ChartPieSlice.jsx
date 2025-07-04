'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const ChartPieSlice = ({
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
      d='M8.796 10.935a1.125 1.125 0 0 0 .579-.983V3.819a1.125 1.125 0 0 0-1.594-1.022 10.15 10.15 0 0 0-5.862 10.15 1.125 1.125 0 0 0 1.665.88l5.212-2.892ZM7.125 5.818v3.469l-2.924 1.622a7.911 7.911 0 0 1 2.924-5.09ZM12 1.875A1.125 1.125 0 0 0 10.875 3v8.393l-7.202 4.195a1.126 1.126 0 0 0-.403 1.543A10.125 10.125 0 1 0 12 1.875Zm0 18a7.92 7.92 0 0 1-6.147-2.953l6.71-3.91a1.126 1.126 0 0 0 .562-.973V4.205A7.875 7.875 0 0 1 12 19.875Z'
    />{' '}
  </svg>
);
exports.default = ChartPieSlice;
