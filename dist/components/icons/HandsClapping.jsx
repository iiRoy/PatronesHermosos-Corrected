'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const HandsClapping = ({
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
      d='m20.697 7.835-1.985-3.429a2.826 2.826 0 0 0-4.316-.701L13.5 2.156a2.828 2.828 0 0 0-4.645-.354 2.83 2.83 0 0 0-2.68.075 2.808 2.808 0 0 0-1.199 3.51 2.782 2.782 0 0 0-1.366.961 2.813 2.813 0 0 0-.205 3.12l.028.05a2.88 2.88 0 0 0-.527.232 2.813 2.813 0 0 0-1.031 3.844l3.312 5.719a7.92 7.92 0 0 0 13.113.86 7.828 7.828 0 0 0 1.361-2.759c.037-.136.069-.27.094-.408a7.887 7.887 0 0 0 .942-9.171Zm-4.974-2.168a.562.562 0 0 1 1.031-.136L18.74 8.96a5.611 5.611 0 0 1 .688 3.656 7.986 7.986 0 0 0-.553-1.178L15.78 6.093a.557.557 0 0 1-.058-.427Zm-5.214-2.25a.561.561 0 0 1 .692-.398.563.563 0 0 1 .342.262l2.094 3.614a2.834 2.834 0 0 0-.971.56l-2.1-3.611a.563.563 0 0 1-.057-.427Zm-3.468.75a.562.562 0 0 1 1.03-.136l.353.617c-.18.058-.353.134-.517.227a2.85 2.85 0 0 0-.458.328l-.354-.61a.556.556 0 0 1-.056-.426h.002Zm7.813 16.083a5.66 5.66 0 0 1-7.71-2.063L3.833 12.47a.563.563 0 1 1 .977-.563l1.903 3.281a1.128 1.128 0 1 0 1.954-1.124l-3.308-5.72a.563.563 0 1 1 .976-.562l2.987 5.157a1.128 1.128 0 1 0 1.954-1.126L8.831 7.598v-.004a.564.564 0 0 1 .979-.563l3.428 5.907a1.125 1.125 0 0 0 1.95-1.126L14.01 9.787a.565.565 0 0 1 .682-.788c.142.047.26.149.327.282l1.9 3.281a5.625 5.625 0 0 1-2.066 7.688Z'
    />{' '}
  </svg>
);
exports.default = HandsClapping;
