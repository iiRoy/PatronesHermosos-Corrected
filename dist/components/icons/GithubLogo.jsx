'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const GithubLogo = ({
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
        d='M19.933 7.047a5.972 5.972 0 0 0-.584-4.61 1.125 1.125 0 0 0-.974-.562 5.973 5.973 0 0 0-4.688 2.25h-1.874a5.972 5.972 0 0 0-4.688-2.25 1.125 1.125 0 0 0-.974.563 5.972 5.972 0 0 0-.584 4.61 5.766 5.766 0 0 0-.692 2.702v.75a5.634 5.634 0 0 0 4.29 5.464A4.093 4.093 0 0 0 8.625 18v.375h-1.5A1.875 1.875 0 0 1 5.25 16.5a4.13 4.13 0 0 0-4.125-4.125 1.125 1.125 0 0 0 0 2.25A1.875 1.875 0 0 1 3 16.5a4.13 4.13 0 0 0 4.125 4.125h1.5v1.125a1.125 1.125 0 0 0 2.25 0V18a1.875 1.875 0 1 1 3.75 0v3.75a1.125 1.125 0 1 0 2.25 0V18c0-.714-.185-1.416-.54-2.036a5.635 5.635 0 0 0 4.29-5.464v-.75a5.766 5.766 0 0 0-.692-2.703ZM18.375 10.5A3.375 3.375 0 0 1 15 13.875h-4.5A3.375 3.375 0 0 1 7.125 10.5v-.75A3.55 3.55 0 0 1 7.7 7.864a1.092 1.092 0 0 0 .148-1.077 3.74 3.74 0 0 1-.038-2.6 3.738 3.738 0 0 1 2.476 1.67 1.125 1.125 0 0 0 .947.518h3.033a1.125 1.125 0 0 0 .948-.518 3.736 3.736 0 0 1 2.476-1.67 3.74 3.74 0 0 1-.038 2.6 1.124 1.124 0 0 0 .151 1.08c.364.562.563 1.214.572 1.883v.75Z'
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
exports.default = GithubLogo;
