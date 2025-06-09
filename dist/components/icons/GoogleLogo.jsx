"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const GoogleLogo = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M21.375 12a9.375 9.375 0 1 1-2.143-5.966 1.126 1.126 0 0 1-1.735 1.432 7.126 7.126 0 1 0 1.539 5.659H12a1.125 1.125 0 1 1 0-2.25h8.25A1.125 1.125 0 0 1 21.375 12Z"/> </svg>);
exports.default = GoogleLogo;
