"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ChatTeardrop = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1, }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    {' '}
    <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' d='M12.375 1.875a9.76 9.76 0 0 0-9.75 9.75V19.5A1.875 1.875 0 0 0 4.5 21.375h7.875a9.75 9.75 0 1 0 0-19.5Zm0 17.25h-7.5v-7.5a7.5 7.5 0 1 1 7.5 7.5Z'/>{' '}
  </svg>);
exports.default = ChatTeardrop;
