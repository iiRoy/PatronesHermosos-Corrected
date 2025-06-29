'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Cake = ({
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
      d='M22.125 10.5A2.625 2.625 0 0 0 19.5 7.875h-6.375v-.193a3.381 3.381 0 0 0 2.25-3.182c0-2.912-2.754-4.323-2.872-4.38a1.125 1.125 0 0 0-1.006 0c-.118.057-2.872 1.468-2.872 4.38a3.382 3.382 0 0 0 2.25 3.182v.193H4.5A2.625 2.625 0 0 0 1.875 10.5v2.187c0 .855.262 1.688.75 2.39v3.673a2.625 2.625 0 0 0 2.625 2.625h13.5a2.625 2.625 0 0 0 2.625-2.625v-3.673a4.19 4.19 0 0 0 .75-2.39V10.5Zm-10.5-7.694c.118-.12.243-.231.375-.335.132.104.257.215.375.335.5.517.75 1.087.75 1.694a1.125 1.125 0 1 1-2.25 0c0-.607.254-1.177.75-1.694Zm-7.5 7.694a.375.375 0 0 1 .375-.375h15a.375.375 0 0 1 .375.375v2.187c0 1.04-.817 1.91-1.822 1.937a1.875 1.875 0 0 1-1.928-1.874 1.125 1.125 0 1 0-2.25 0 1.875 1.875 0 1 1-3.75 0 1.125 1.125 0 1 0-2.25 0 1.875 1.875 0 0 1-1.928 1.875c-1.005-.028-1.822-.897-1.822-1.938V10.5Zm14.625 8.625H5.25a.375.375 0 0 1-.375-.375v-2.035a4.095 4.095 0 0 0 4.126-1.133 4.125 4.125 0 0 0 6 0 4.093 4.093 0 0 0 3 1.293h.116c.342-.01.68-.064 1.008-.16v2.035a.375.375 0 0 1-.375.375Z'
    />{' '}
  </svg>
);
exports.default = Cake;
