"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ArrowLineUpRight = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1, }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    {' '}
    <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' d='M21.375 20.25a1.125 1.125 0 0 1-1.125 1.125H3.75a1.125 1.125 0 1 1 0-2.25h16.5a1.125 1.125 0 0 1 1.125 1.125ZM7.5 16.875a1.126 1.126 0 0 0 .796-.33l8.579-8.576v6.281a1.125 1.125 0 1 0 2.25 0v-9A1.125 1.125 0 0 0 18 4.125H9a1.125 1.125 0 0 0 0 2.25h6.281l-8.577 8.58a1.125 1.125 0 0 0 .796 1.92Z'/>{' '}
  </svg>);
exports.default = ArrowLineUpRight;
