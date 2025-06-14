"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ArrowLineUp = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1, }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    {' '}
    <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' d='M19.546 13.454a1.127 1.127 0 1 1-1.594 1.594l-4.827-4.83V21a1.125 1.125 0 1 1-2.25 0V10.219l-4.83 4.827a1.127 1.127 0 1 1-1.593-1.594l6.75-6.75a1.125 1.125 0 0 1 1.594 0l6.75 6.752Zm.704-10.829H3.75a1.125 1.125 0 0 0 0 2.25h16.5a1.125 1.125 0 0 0 0-2.25Z'/>{' '}
  </svg>);
exports.default = ArrowLineUp;
