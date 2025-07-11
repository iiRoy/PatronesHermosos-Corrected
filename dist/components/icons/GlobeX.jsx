'use strict';
'use client';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const GlobeX = ({
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
      d='M12 1.875a10.125 10.125 0 0 0 0 20.25 1.125 1.125 0 0 0 .702-2.003c-.023-.02-1.645-1.35-2.615-3.997H12a1.125 1.125 0 1 0 0-2.25H9.514a12.739 12.739 0 0 1 0-3.75h4.969c.094.62.141 1.247.142 1.875a1.125 1.125 0 1 0 2.25 0c0-.627-.039-1.253-.117-1.875h2.89A7.83 7.83 0 0 1 19.874 12a1.125 1.125 0 1 0 2.25 0A10.137 10.137 0 0 0 12 1.875ZM9.168 4.654a13.202 13.202 0 0 0-1.453 3.221h-2.42a7.918 7.918 0 0 1 3.873-3.221Zm0 14.692a7.919 7.919 0 0 1-3.873-3.221h2.42a13.203 13.203 0 0 0 1.453 3.221Zm-1.926-5.471h-2.89a7.83 7.83 0 0 1 0-3.75h2.89a15.059 15.059 0 0 0 0 3.75Zm2.845-6c.247-.678.561-1.33.937-1.947A10.1 10.1 0 0 1 12 4.594c.83.97 1.477 2.081 1.912 3.281h-3.825Zm6.198 0a13.202 13.202 0 0 0-1.453-3.221 7.918 7.918 0 0 1 3.873 3.221h-2.42Zm4.76 8.67L19.595 18l1.455 1.454a1.124 1.124 0 0 1 0 1.594 1.124 1.124 0 0 1-1.594 0L18 19.594l-1.454 1.455a1.127 1.127 0 1 1-1.594-1.594L16.406 18l-1.455-1.454a1.127 1.127 0 1 1 1.594-1.594L18 16.406l1.454-1.455a1.124 1.124 0 0 1 1.594 0 1.124 1.124 0 0 1 0 1.594h-.002Z'
    />{' '}
  </svg>
);
exports.default = GlobeX;
