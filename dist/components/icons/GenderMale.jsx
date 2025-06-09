"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const GenderMale = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M20.25 2.625h-4.5a1.125 1.125 0 0 0 0 2.25h1.781l-3.067 3.07a7.875 7.875 0 1 0 1.594 1.593l3.067-3.07V8.25a1.125 1.125 0 1 0 2.25 0v-4.5a1.125 1.125 0 0 0-1.125-1.125Zm-6.524 15.606a5.624 5.624 0 1 1 0-7.957 5.634 5.634 0 0 1 0 7.957Z"/> </svg>);
exports.default = GenderMale;
