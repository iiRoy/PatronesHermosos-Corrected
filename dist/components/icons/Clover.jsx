'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Clover = ({
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
      d='M19.992 15.863c1.415-.613 2.133-2.165 2.133-4.613 0-2.448-.718-4.001-2.133-4.614-1-.433-2.211-.338-3.672.294.63-1.46.727-2.673.294-3.672C16 1.843 14.45 1.125 12 1.125s-4 .718-4.614 2.133c-.433 1-.337 2.211.294 3.672-1.46-.632-2.673-.727-3.672-.294-1.415.613-2.133 2.165-2.133 4.614s.718 4 2.133 4.613c.422.18.877.271 1.336.267.697 0 1.476-.188 2.338-.563-.631 1.462-.727 2.674-.295 3.672C8 20.657 9.552 21.375 12 21.375c2.449 0 4-.718 4.614-2.134.057-.132.105-.267.144-.406.71 1.236 1.312 2.57 1.65 3.938a1.125 1.125 0 1 0 2.184-.546c-.562-2.26-1.709-4.398-2.954-6.218a4.71 4.71 0 0 0 1.018.12c.46.005.914-.085 1.336-.266ZM9.451 4.153c.214-.497 1.143-.778 2.549-.778s2.335.281 2.55.777c.104.241.322 1.219-1.27 3.639A22.55 22.55 0 0 1 12 9.527a22.372 22.372 0 0 1-1.28-1.736C9.127 5.368 9.345 4.393 9.45 4.152Zm-4.549 9.646c-.496-.214-.777-1.143-.777-2.549s.281-2.335.777-2.55c.138-.054.285-.08.433-.075.522 0 1.509.23 3.206 1.344.6.398 1.179.825 1.736 1.281a22.11 22.11 0 0 1-1.736 1.28c-2.423 1.592-3.398 1.374-3.639 1.27Zm9.647 4.549c-.214.496-1.143.777-2.549.777s-2.335-.281-2.55-.777c-.104-.242-.322-1.219 1.27-3.639.433-.656.898-1.266 1.28-1.736a22.11 22.11 0 0 1 1.28 1.736c1.592 2.423 1.374 3.397 1.27 3.639Zm.91-5.817a22.544 22.544 0 0 1-1.736-1.281 21.415 21.415 0 0 1 1.736-1.28c2.423-1.594 3.398-1.374 3.639-1.27.496.215.777 1.144.777 2.55s-.281 2.335-.777 2.55c-.241.104-1.216.322-3.639-1.27Z'
    />{' '}
  </svg>
);
exports.default = Clover;
