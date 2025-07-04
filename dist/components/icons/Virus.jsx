'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Virus = ({
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
        d='M10.125 12a1.875 1.875 0 1 1 0-3.75 1.875 1.875 0 0 1 0 3.75Zm5.625-1.875a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75ZM12 13.875a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75ZM23.625 12a1.125 1.125 0 0 1-1.125 1.125h-1.192a9.34 9.34 0 0 1-1.934 4.658l.922.921a1.127 1.127 0 1 1-1.594 1.594l-.92-.922a9.339 9.339 0 0 1-4.657 1.931V22.5a1.125 1.125 0 1 1-2.25 0v-1.192a9.34 9.34 0 0 1-4.658-1.934l-.921.922a1.126 1.126 0 0 1-1.838-1.228c.057-.137.14-.261.244-.366l.922-.92a9.34 9.34 0 0 1-1.931-4.657H1.5a1.125 1.125 0 1 1 0-2.25h1.192a9.34 9.34 0 0 1 1.934-4.658l-.922-.921a1.127 1.127 0 0 1 1.594-1.594l.92.922a9.34 9.34 0 0 1 4.657-1.931V1.5a1.125 1.125 0 1 1 2.25 0v1.192a9.34 9.34 0 0 1 4.658 1.934l.921-.922a1.127 1.127 0 1 1 1.594 1.594l-.922.92a9.338 9.338 0 0 1 1.931 4.657H22.5A1.125 1.125 0 0 1 23.625 12Zm-4.5 0A7.125 7.125 0 1 0 12 19.125 7.132 7.132 0 0 0 19.125 12Z'
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
exports.default = Virus;
