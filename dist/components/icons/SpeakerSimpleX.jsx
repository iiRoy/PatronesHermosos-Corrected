'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const SpeakerSimpleX = ({
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
        d='M15.494 1.99a1.125 1.125 0 0 0-1.185.122L7.864 7.125H3.75A1.875 1.875 0 0 0 1.875 9v6a1.875 1.875 0 0 0 1.875 1.875h4.114l6.445 5.013A1.125 1.125 0 0 0 16.125 21V3a1.125 1.125 0 0 0-.63-1.01ZM13.875 18.7l-4.934-3.838a1.126 1.126 0 0 0-.691-.237H4.125v-5.25H8.25c.25 0 .493-.084.69-.237L13.876 5.3v13.4Zm10.17-5.245a1.126 1.126 0 1 1-1.593 1.594L21 13.594l-1.454 1.455a1.127 1.127 0 1 1-1.594-1.594L19.406 12l-1.455-1.454a1.126 1.126 0 1 1 1.594-1.594L21 10.406l1.454-1.454a1.126 1.126 0 1 1 1.594 1.594L22.594 12l1.452 1.455Z'
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
exports.default = SpeakerSimpleX;
