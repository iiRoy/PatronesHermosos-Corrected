'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Snowflake = ({
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
      d='M21.342 13.982a1.125 1.125 0 0 1-.824 1.36l-1.938.476.507 1.89a1.125 1.125 0 0 1-2.174.584l-.683-2.55-3.105-1.794v3.583l1.92 1.92a1.127 1.127 0 1 1-1.594 1.594L12 19.594l-1.454 1.455a1.127 1.127 0 0 1-1.594-1.594l1.923-1.924v-3.583L7.77 15.742l-.683 2.55a1.125 1.125 0 1 1-2.174-.584l.507-1.89-1.938-.476a1.124 1.124 0 1 1 .536-2.184l2.615.642L9.75 12l-3.117-1.8-2.615.642a1.125 1.125 0 0 1-.535-2.184l1.938-.476-.507-1.89a1.125 1.125 0 0 1 2.174-.584l.683 2.55 3.104 1.793V6.469l-1.92-1.924a1.127 1.127 0 0 1 1.594-1.594L12 4.406l1.454-1.455a1.126 1.126 0 0 1 1.838 1.228c-.056.137-.14.261-.244.366l-1.923 1.924v3.585L16.23 8.26l.683-2.55a1.125 1.125 0 0 1 2.174.583l-.507 1.89 1.938.477a1.125 1.125 0 0 1-.268 2.214 1.1 1.1 0 0 1-.27-.033l-2.614-.642L14.25 12l3.117 1.8 2.615-.642a1.125 1.125 0 0 1 1.36.824Z'
    />{' '}
  </svg>
);
exports.default = Snowflake;
