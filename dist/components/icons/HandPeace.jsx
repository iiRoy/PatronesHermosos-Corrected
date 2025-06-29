'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const HandPeace = ({
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
      d='M20.222 2.625a3 3 0 0 0-5.496.724l-.851 3.18-.852-3.18a3 3 0 0 0-5.795 1.554l.724 2.702-.234-.045a3 3 0 0 0-2.906 4.85 3.007 3.007 0 0 0-.686 1.93V15A7.875 7.875 0 0 0 12 22.875h.06c4.312-.032 7.815-3.603 7.815-7.96v-.313a5.609 5.609 0 0 0-1.07-3.29l1.716-6.409a2.984 2.984 0 0 0-.3-2.278Zm-3.323 1.307a.75.75 0 1 1 1.45.388l-1.43 5.336a5.591 5.591 0 0 0-1.406-.531l1.386-5.193ZM9.476 3.75a.75.75 0 0 1 1.374.18l1.276 4.762a3.024 3.024 0 0 0-.743.265 2.986 2.986 0 0 0-.937-.75L9.405 4.323a.75.75 0 0 1 .071-.573ZM6.5 14.732a.75.75 0 0 1 .767-1.15l.946.188a.75.75 0 1 1-.305 1.468l-.938-.187a.75.75 0 0 1-.47-.32Zm-.11-4.381a.75.75 0 0 1 .886-.585h.012l1.944.375a.75.75 0 1 1-.306 1.469h-.012l-1.943-.375a.75.75 0 0 1-.58-.884Zm11.235 4.565c0 3.125-2.503 5.686-5.58 5.709a5.633 5.633 0 0 1-5.167-3.297l.585.117a3 3 0 0 0 3.572-3.358 3 3 0 0 0 1.125.479l.24.048a3.809 3.809 0 0 0-.025.386 3.73 3.73 0 0 0 1.072 2.625 1.125 1.125 0 1 0 1.606-1.575 1.5 1.5 0 0 1-.249-1.763 1.125 1.125 0 0 0-.768-1.64l-1.436-.286a.75.75 0 1 1 .305-1.47l2.006.402a3.384 3.384 0 0 1 2.714 3.31v.313Z'
    />{' '}
  </svg>
);
exports.default = HandPeace;
