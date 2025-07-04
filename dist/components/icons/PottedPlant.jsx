'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const PottedPlant = ({
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
      d='M18.75 13.5h-6.656l1.991-1.992a5.635 5.635 0 0 0 2.25.49 4.846 4.846 0 0 0 2.531-.708c2.25-1.366 3.469-4.48 3.238-8.331a1.125 1.125 0 0 0-1.056-1.057c-3.852-.226-6.967.984-8.332 3.238-.866 1.43-.937 3.132-.218 4.782l-1.248 1.234-1.044-1.043c.463-1.209.375-2.449-.26-3.503-1.04-1.712-3.372-2.635-6.244-2.465A1.125 1.125 0 0 0 2.645 5.2c-.17 2.873.75 5.207 2.467 6.245a3.775 3.775 0 0 0 1.969.553 4.273 4.273 0 0 0 1.529-.293l1.046 1.044-.75.75H5.25a1.125 1.125 0 0 0 0 2.25h.682l1.09 4.907a1.864 1.864 0 0 0 1.83 1.468h6.297a1.864 1.864 0 0 0 1.83-1.468l1.09-4.907h.681a1.125 1.125 0 1 0 0-2.25Zm-4.116-7.194c.816-1.348 2.737-2.134 5.241-2.181-.045 2.502-.832 4.423-2.18 5.24-.884.535-1.917.513-3-.058-.575-1.084-.596-2.117-.06-3.001Zm-6.617 3.21c-.49.237-1.125.375-1.739.006-.794-.48-1.294-1.639-1.387-3.131 1.493.094 2.65.592 3.131 1.387.37.61.228 1.247-.005 1.738Zm6.831 10.359H9.152l-.916-4.125h7.529l-.917 4.125Z'
    />{' '}
  </svg>
);
exports.default = PottedPlant;
