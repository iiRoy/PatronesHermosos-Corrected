'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Sun = ({
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
    <g clipPath='url(#a)'>
      {' '}
      <path
        stroke={strokeColor}
        fill={fillColor}
        strokeWidth={strokeWidth}
        vectorEffect='non-scaling-stroke'
        d='M10.875 3.375v-1.5a1.125 1.125 0 1 1 2.25 0v1.5a1.125 1.125 0 1 1-2.25 0Zm7.5 8.625A6.375 6.375 0 1 1 12 5.625 6.382 6.382 0 0 1 18.375 12Zm-2.25 0a4.125 4.125 0 1 0-8.25 0 4.125 4.125 0 0 0 8.25 0ZM4.829 6.42a1.127 1.127 0 0 0 1.594-1.593L5.298 3.702a1.127 1.127 0 1 0-1.594 1.594L4.83 6.42Zm0 11.157-1.125 1.125a1.127 1.127 0 1 0 1.594 1.594l1.125-1.125a1.127 1.127 0 1 0-1.594-1.594ZM18.375 6.75a1.125 1.125 0 0 0 .796-.33l1.125-1.124a1.126 1.126 0 0 0-1.228-1.838c-.137.057-.261.14-.366.244l-1.125 1.125a1.125 1.125 0 0 0 .798 1.923Zm.796 10.83a1.127 1.127 0 1 0-1.594 1.593l1.125 1.125a1.127 1.127 0 1 0 1.594-1.594L19.17 17.58ZM4.5 12a1.125 1.125 0 0 0-1.125-1.125h-1.5a1.125 1.125 0 1 0 0 2.25h1.5A1.125 1.125 0 0 0 4.5 12Zm7.5 7.5a1.125 1.125 0 0 0-1.125 1.125v1.5a1.125 1.125 0 1 0 2.25 0v-1.5A1.125 1.125 0 0 0 12 19.5Zm10.125-8.625h-1.5a1.125 1.125 0 1 0 0 2.25h1.5a1.125 1.125 0 1 0 0-2.25Z'
      />{' '}
    </g>{' '}
    <defs>
      {' '}
      <clipPath id='a'>
        {' '}
        <path
          stroke={strokeColor}
          fill={fillColor}
          strokeWidth={strokeWidth}
          vectorEffect='non-scaling-stroke'
          d='M0 0h24v24H0z'
        />{' '}
      </clipPath>{' '}
    </defs>{' '}
  </svg>
);
exports.default = Sun;
