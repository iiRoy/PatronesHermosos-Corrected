'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CameraSlash = ({
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
      d='M5.332 2.993a1.125 1.125 0 1 0-1.664 1.514l.375.41A2.625 2.625 0 0 0 1.875 7.5V18A2.625 2.625 0 0 0 4.5 20.625h13.82l.348.382a1.125 1.125 0 0 0 1.665-1.514l-15-16.5Zm4.627 8.438 2.791 3.067a2.25 2.25 0 0 1-2.79-3.07v.003ZM4.5 18.375A.375.375 0 0 1 4.125 18V7.5a.375.375 0 0 1 .375-.375h1.548l2.336 2.57a4.5 4.5 0 0 0 5.938 6.531l1.953 2.149H4.5ZM22.125 7.5v8.826a1.125 1.125 0 1 1-2.25 0V7.5a.375.375 0 0 0-.375-.375h-3a1.125 1.125 0 0 1-.938-.5l-1.165-1.75H9.568a1.125 1.125 0 1 1 0-2.25H15a1.125 1.125 0 0 1 .938.5l1.164 1.75H19.5A2.625 2.625 0 0 1 22.125 7.5Z'
    />{' '}
  </svg>
);
exports.default = CameraSlash;
