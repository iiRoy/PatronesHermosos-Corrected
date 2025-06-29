'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const PhoneTransfer = ({
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
      d='M12.375 6.75A1.125 1.125 0 0 1 13.5 5.625h4.031l-1.077-1.08a1.126 1.126 0 0 1 .797-1.923c.299 0 .585.119.797.33l3 3a1.125 1.125 0 0 1 0 1.594l-3 3a1.127 1.127 0 0 1-1.594-1.594l1.077-1.077H13.5a1.125 1.125 0 0 1-1.125-1.125Zm8.985 10.46a5.65 5.65 0 0 1-5.61 4.915c-7.65 0-13.875-6.224-13.875-13.875a5.65 5.65 0 0 1 4.914-5.61 1.875 1.875 0 0 1 1.949 1.11l1.979 4.418.006.017a1.868 1.868 0 0 1-.234 1.873l-1.787 2.13c.662 1.203 1.922 2.452 3.14 3.113l2.091-1.781a1.867 1.867 0 0 1 1.886-.242l.017.007 4.414 1.977a1.875 1.875 0 0 1 1.11 1.949Zm-2.28-.005-3.937-1.763-2.101 1.787a1.094 1.094 0 0 1-.105.08 1.876 1.876 0 0 1-1.847.132c-1.827-.881-3.646-2.688-4.53-4.5a1.875 1.875 0 0 1 .12-1.841 1.01 1.01 0 0 1 .081-.108L8.56 8.86 6.795 4.922a3.4 3.4 0 0 0-2.67 3.328A11.64 11.64 0 0 0 15.75 19.875a3.4 3.4 0 0 0 3.33-2.67Z'
    />{' '}
  </svg>
);
exports.default = PhoneTransfer;
