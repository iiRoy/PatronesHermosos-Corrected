"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CurrencyEur = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1, }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    {' '}
    <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' d='M18.088 17.78A1.124 1.124 0 0 1 18 19.375 7.875 7.875 0 0 1 5.02 15H3.75a1.125 1.125 0 1 1 0-2.25h1.125v-1.5H3.75a1.125 1.125 0 1 1 0-2.25h1.27A7.875 7.875 0 0 1 18 4.63a1.125 1.125 0 1 1-1.5 1.678A5.625 5.625 0 0 0 7.33 9h5.42a1.125 1.125 0 1 1 0 2.25H7.125v1.5h4.125a1.125 1.125 0 1 1 0 2.25H7.33a5.625 5.625 0 0 0 9.17 2.692 1.125 1.125 0 0 1 1.588.089Z'/>{' '}
  </svg>);
exports.default = CurrencyEur;
