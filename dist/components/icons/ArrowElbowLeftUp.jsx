"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ArrowElbowLeftUp = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M22.875 18a1.125 1.125 0 0 1-1.125 1.125H8.25A1.125 1.125 0 0 1 7.125 18V7.219l-2.58 2.577a1.127 1.127 0 1 1-1.593-1.594l4.5-4.5a1.125 1.125 0 0 1 1.594 0l4.5 4.5a1.127 1.127 0 1 1-1.594 1.594L9.375 7.219v9.656H21.75A1.125 1.125 0 0 1 22.875 18Z"/> </svg>);
exports.default = ArrowElbowLeftUp;
