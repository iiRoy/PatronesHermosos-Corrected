'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const YoutubeLogo = ({
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
      d='m15.983 11.054-5.25-3.375A1.125 1.125 0 0 0 9 8.625v6.75a1.125 1.125 0 0 0 1.733.946l5.25-3.375a1.126 1.126 0 0 0 0-1.892Zm-4.733 2.258v-2.624L13.295 12l-2.045 1.313Zm11.082-6.89a2.63 2.63 0 0 0-1.587-1.794C17.475 3.367 12.308 3.375 12 3.375c-.308 0-5.475-.008-8.745 1.254a2.63 2.63 0 0 0-1.587 1.795c-.248.956-.543 2.7-.543 5.576 0 2.876.295 4.62.543 5.576a2.63 2.63 0 0 0 1.587 1.795c3.14 1.212 8.029 1.254 8.686 1.254h.118c.656 0 5.546-.042 8.686-1.254a2.63 2.63 0 0 0 1.587-1.795c.248-.956.543-2.7.543-5.576 0-2.876-.295-4.62-.543-5.576v-.002Zm-2.176 10.59a.375.375 0 0 1-.22.26c-2.8 1.08-7.536 1.103-7.906 1.103h-.037c-.05 0-5.028.016-7.927-1.103a.375.375 0 0 1-.222-.26c-.176-.679-.469-2.233-.469-5.012 0-2.779.295-4.333.469-5.012a.375.375 0 0 1 .22-.26c2.9-1.119 7.879-1.103 7.928-1.103h.015c.05 0 5.028-.016 7.927 1.103a.376.376 0 0 1 .222.26c.177.679.469 2.233.469 5.012 0 2.779-.295 4.333-.469 5.012Z'
    />{' '}
  </svg>
);
exports.default = YoutubeLogo;
