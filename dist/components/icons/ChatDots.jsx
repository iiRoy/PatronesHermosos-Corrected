"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ChatDots = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M8.25 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM22.125 6v12a1.875 1.875 0 0 1-1.875 1.875H7.92l-2.951 2.547-.012.01a1.867 1.867 0 0 1-1.998.265A1.858 1.858 0 0 1 1.875 21V6A1.875 1.875 0 0 1 3.75 4.125h16.5A1.875 1.875 0 0 1 22.125 6Zm-2.25.375H4.125v13.803l2.64-2.28c.204-.177.465-.274.735-.273h12.375V6.375Z"/> </svg>);
exports.default = ChatDots;
