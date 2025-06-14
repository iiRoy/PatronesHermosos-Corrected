"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CircleHalf = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1, }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    {' '}
    <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' d='M12 1.875A10.125 10.125 0 1 0 22.125 12 10.137 10.137 0 0 0 12 1.875Zm1.125 2.332a7.83 7.83 0 0 1 2.25.68v14.227a7.83 7.83 0 0 1-2.25.68V4.206Zm-9 7.793a7.886 7.886 0 0 1 6.75-7.793v15.586A7.886 7.886 0 0 1 4.125 12Zm13.5 5.504V6.496a7.857 7.857 0 0 1 0 11.008Z'/>{' '}
  </svg>);
exports.default = CircleHalf;
