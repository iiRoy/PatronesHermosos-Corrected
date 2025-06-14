"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ArrowCounterClockwise = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1, }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    {' '}
    <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' d='M21.375 12a9.375 9.375 0 0 1-9.25 9.375H12a9.318 9.318 0 0 1-6.433-2.558 1.125 1.125 0 0 1 1.545-1.636 7.125 7.125 0 1 0-.147-10.22l-.037.036-1.782 1.628H6.75a1.125 1.125 0 0 1 0 2.25h-4.5A1.125 1.125 0 0 1 1.125 9.75v-4.5a1.125 1.125 0 0 1 2.25 0v1.942L5.389 5.35A9.375 9.375 0 0 1 21.375 12Z'/>{' '}
  </svg>);
exports.default = ArrowCounterClockwise;
