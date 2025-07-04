'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Sword = ({
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
      d='M20.25 2.625h-6a1.125 1.125 0 0 0-.875.417L7.453 10.36l-.437-.436a1.875 1.875 0 0 0-2.652 0L2.8 11.49a1.875 1.875 0 0 0 0 2.652l1.42 1.421-1.982 1.985a1.875 1.875 0 0 0 0 2.651l1.565 1.565a1.875 1.875 0 0 0 2.65 0l1.986-1.982 1.422 1.422a1.873 1.873 0 0 0 2.652 0l1.565-1.565a1.874 1.874 0 0 0 0-2.653l-.436-.436 7.318-5.922a1.126 1.126 0 0 0 .416-.877v-6a1.125 1.125 0 0 0-1.125-1.125ZM5.127 19.907l-1.031-1.031 1.716-1.72 1.032 1.032-1.717 1.719Zm6.057-.563-6.53-6.528 1.037-1.032 6.53 6.53-1.037 1.03Zm7.941-10.131-7.086 5.735-.695-.698 4.454-4.453a1.127 1.127 0 1 0-1.594-1.594L9.75 12.656l-.698-.697 5.735-7.084h4.338v4.338Z'
    />{' '}
  </svg>
);
exports.default = Sword;
