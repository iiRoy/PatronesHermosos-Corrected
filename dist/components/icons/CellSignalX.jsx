'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CellSignalX = ({
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
      d='M20.296 17.954a1.127 1.127 0 1 1-1.594 1.594l-1.452-1.454-1.454 1.455a1.127 1.127 0 1 1-1.594-1.594l1.454-1.455-1.455-1.454a1.127 1.127 0 1 1 1.594-1.594l1.455 1.454 1.454-1.455a1.127 1.127 0 1 1 1.594 1.594L18.844 16.5l1.452 1.454ZM15 11.25a1.125 1.125 0 0 0 1.125-1.125V6.75a1.125 1.125 0 1 0-2.25 0v3.375A1.125 1.125 0 0 0 15 11.25Zm3.75 0a1.125 1.125 0 0 0 1.125-1.125V3a1.125 1.125 0 1 0-2.25 0v7.125a1.125 1.125 0 0 0 1.125 1.125Zm-7.5-1.875a1.125 1.125 0 0 0-1.125 1.125v8.25a1.125 1.125 0 1 0 2.25 0V10.5a1.125 1.125 0 0 0-1.125-1.125Zm-3.75 3.75a1.125 1.125 0 0 0-1.125 1.125v4.5a1.125 1.125 0 0 0 2.25 0v-4.5A1.125 1.125 0 0 0 7.5 13.125Zm-3.75 3.75A1.125 1.125 0 0 0 2.625 18v.75a1.125 1.125 0 0 0 2.25 0V18a1.125 1.125 0 0 0-1.125-1.125Z'
    />{' '}
  </svg>
);
exports.default = CellSignalX;
