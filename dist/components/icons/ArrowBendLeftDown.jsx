"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ArrowBendLeftDown = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M19.875 3a1.125 1.125 0 0 1-1.125 1.125A7.883 7.883 0 0 0 10.875 12v6.281l2.58-2.58a1.127 1.127 0 1 1 1.593 1.594l-4.5 4.5a1.125 1.125 0 0 1-1.594 0l-4.5-4.5a1.127 1.127 0 1 1 1.594-1.594l2.577 2.58V12A10.136 10.136 0 0 1 18.75 1.875 1.125 1.125 0 0 1 19.875 3Z"/> </svg>);
exports.default = ArrowBendLeftDown;
