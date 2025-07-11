'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Binoculars = ({
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
      d='M22.594 14.123v-.004a4.81 4.81 0 0 0-.237-.553l-3.895-8.862a1.125 1.125 0 0 0-.234-.342 3.374 3.374 0 0 0-4.774 0c-.21.21-.329.496-.329.794v1.969h-2.25V5.156a1.12 1.12 0 0 0-.33-.795 3.375 3.375 0 0 0-4.773 0 1.125 1.125 0 0 0-.234.342l-3.895 8.863c-.09.179-.17.364-.237.553v.004a4.875 4.875 0 1 0 9.469 1.627V9.375h2.25v6.375a4.875 4.875 0 1 0 9.469-1.627ZM7.5 5.84a1.125 1.125 0 0 1 1.125-.115v5.92a4.866 4.866 0 0 0-3.366-.714L7.5 5.84ZM6 18.375a2.625 2.625 0 1 1 0-5.25 2.625 2.625 0 0 1 0 5.25Zm9.375-12.65a1.13 1.13 0 0 1 1.125.114l2.238 5.091a4.865 4.865 0 0 0-3.366.715l.003-5.92ZM18 18.374a2.625 2.625 0 1 1 0-5.25 2.625 2.625 0 0 1 0 5.25Z'
    />{' '}
  </svg>
);
exports.default = Binoculars;
