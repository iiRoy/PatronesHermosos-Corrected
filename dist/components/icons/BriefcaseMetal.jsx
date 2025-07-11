'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const BriefcaseMetal = ({
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
      d='M20.25 4.875h-3.375V3.75a2.625 2.625 0 0 0-2.625-2.625h-4.5A2.625 2.625 0 0 0 7.125 3.75v1.125H3.75A1.875 1.875 0 0 0 1.875 6.75v12a1.875 1.875 0 0 0 1.875 1.875h16.5a1.875 1.875 0 0 0 1.875-1.875v-12a1.875 1.875 0 0 0-1.875-1.875ZM4.125 11.25h15.75v3H4.125v-3Zm5.25-7.5a.375.375 0 0 1 .375-.375h4.5a.375.375 0 0 1 .375.375v1.125h-5.25V3.75Zm10.5 3.375V9H4.125V7.125h15.75Zm-15.75 11.25V16.5h15.75v1.875H4.125Z'
    />{' '}
  </svg>
);
exports.default = BriefcaseMetal;
