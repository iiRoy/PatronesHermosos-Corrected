"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ArrowUpLeft = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1, }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    {' '}
    <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' d='M18.796 18.796a1.125 1.125 0 0 1-1.594 0L7.125 8.719v7.031a1.125 1.125 0 0 1-2.25 0V6A1.125 1.125 0 0 1 6 4.875h9.75a1.125 1.125 0 0 1 0 2.25H8.719l10.077 10.08a1.123 1.123 0 0 1 0 1.59Z'/>{' '}
  </svg>);
exports.default = ArrowUpLeft;
