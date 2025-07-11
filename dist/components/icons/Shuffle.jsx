'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Shuffle = ({
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
      d='M22.546 16.454a1.124 1.124 0 0 1 0 1.594l-2.25 2.25a1.127 1.127 0 1 1-1.594-1.594l.33-.329h-.197a7.14 7.14 0 0 1-5.798-2.984L9.129 9.917a4.884 4.884 0 0 0-3.967-2.042H3a1.125 1.125 0 0 1 0-2.25h2.162a7.14 7.14 0 0 1 5.798 2.984l3.91 5.474a4.884 4.884 0 0 0 3.968 2.042h.193l-.33-.329a1.127 1.127 0 1 1 1.594-1.594l2.25 2.252Zm-8.964-6.808a1.125 1.125 0 0 0 1.587-.106 4.874 4.874 0 0 1 3.67-1.665h.192l-.33.33a1.127 1.127 0 1 0 1.594 1.593l2.25-2.25a1.125 1.125 0 0 0 0-1.594l-2.25-2.25a1.127 1.127 0 1 0-1.594 1.594l.33.327h-.196a7.125 7.125 0 0 0-5.362 2.438 1.125 1.125 0 0 0 .109 1.583Zm-3.164 4.708a1.125 1.125 0 0 0-1.587.106 4.875 4.875 0 0 1-3.67 1.665H3a1.125 1.125 0 0 0 0 2.25h2.162a7.124 7.124 0 0 0 5.362-2.438 1.125 1.125 0 0 0-.106-1.583Z'
    />{' '}
  </svg>
);
exports.default = Shuffle;
