"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ArrowDownRight = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M19.125 8.25V18A1.125 1.125 0 0 1 18 19.125H8.25a1.125 1.125 0 1 1 0-2.25h7.031L5.204 6.795a1.127 1.127 0 1 1 1.594-1.594l10.077 10.08V8.25a1.125 1.125 0 1 1 2.25 0Z"/> </svg>);
exports.default = ArrowDownRight;
