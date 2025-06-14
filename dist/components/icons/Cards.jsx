"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Cards = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1, }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    {' '}
    <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' d='M16.875 6.75h-13.5A1.875 1.875 0 0 0 1.5 8.625v10.5A1.875 1.875 0 0 0 3.375 21h13.5a1.875 1.875 0 0 0 1.875-1.875v-10.5a1.875 1.875 0 0 0-1.875-1.875Zm-.375 12H3.75V9H16.5v9.75Zm6-13.875V16.5a1.125 1.125 0 1 1-2.25 0V5.25H6A1.125 1.125 0 0 1 6 3h14.625A1.875 1.875 0 0 1 22.5 4.875Z'/>{' '}
  </svg>);
exports.default = Cards;
