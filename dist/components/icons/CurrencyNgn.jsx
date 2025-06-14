"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CurrencyNgn = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1, }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    {' '}
    <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' d='M20.25 10.875h-1.125V4.312a1.125 1.125 0 1 0-2.25 0v6.563h-4.326L6.887 3.621a1.125 1.125 0 0 0-2.012.692v6.562H3.75a1.125 1.125 0 1 0 0 2.25h1.125v6.563a1.125 1.125 0 0 0 2.25 0v-6.563h4.326l5.662 7.254a1.125 1.125 0 0 0 2.012-.692v-6.562h1.125a1.125 1.125 0 1 0 0-2.25Zm-13.125 0V7.582l2.57 3.293h-2.57Zm9.75 5.543-2.57-3.293h2.57v3.293Z'/>{' '}
  </svg>);
exports.default = CurrencyNgn;
