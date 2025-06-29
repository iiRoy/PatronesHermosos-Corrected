'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const AirplaneTakeoff = ({
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
      d='M16.875 20.25a1.125 1.125 0 0 1-1.125 1.125H2.25a1.125 1.125 0 1 1 0-2.25h13.5a1.125 1.125 0 0 1 1.125 1.125Zm6.73-11.824a1.124 1.124 0 0 1-.528.76l-13.82 8.252-.011.006a4.1 4.1 0 0 1-4.894-.557l-.018-.017L.96 13.566a1.875 1.875 0 0 1 .52-3.066l.276-.135c.267-.13.574-.15.855-.055l2.484.838 1.327-.803-1.694-1.647A1.875 1.875 0 0 1 5.26 5.6l.045-.019.67-.253c.254-.095.534-.095.788 0l4.888 1.797 4.681-2.794a4.106 4.106 0 0 1 5.306.958l1.748 2.24a1.12 1.12 0 0 1 .218.897Zm-2.776-.52-.954-1.223a1.865 1.865 0 0 0-2.394-.42L12.346 9.33a1.125 1.125 0 0 1-.966.094L7.068 7.835l1.969 1.912a1.125 1.125 0 0 1-.202 1.77L5.812 13.34a1.125 1.125 0 0 1-.937.103l-1.252-.422 2.28 2.231a1.865 1.865 0 0 0 2.212.249l12.714-7.594Z'
    />{' '}
  </svg>
);
exports.default = AirplaneTakeoff;
