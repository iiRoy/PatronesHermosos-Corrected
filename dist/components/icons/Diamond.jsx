"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Diamond = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="m22.328 10.677-9.006-9.005a1.875 1.875 0 0 0-2.645 0l-9 9.005a1.875 1.875 0 0 0 0 2.646l9.005 9.005a1.875 1.875 0 0 0 2.645 0l9-9.005a1.875 1.875 0 0 0 0-2.646ZM12 20.468 3.532 12 12 3.532 20.468 12 12 20.468Z"/> </svg>);
exports.default = Diamond;
