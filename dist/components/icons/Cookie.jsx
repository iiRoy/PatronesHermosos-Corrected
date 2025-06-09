"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Cookie = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M15.685 15.065a1.5 1.5 0 1 1-2.12 2.122 1.5 1.5 0 0 1 2.12-2.122Zm-8.12-.75a1.5 1.5 0 1 0 2.12 2.122 1.5 1.5 0 0 0-2.12-2.122Zm1.37-3.13a1.5 1.5 0 1 0-2.12-2.122 1.5 1.5 0 0 0 2.12 2.122Zm4.5-.62a1.5 1.5 0 1 0-2.122 2.12 1.5 1.5 0 0 0 2.122-2.12ZM22.125 12A10.124 10.124 0 1 1 12 1.875 1.125 1.125 0 0 1 13.125 3 3.375 3.375 0 0 0 16.5 6.375 1.125 1.125 0 0 1 17.625 7.5 3.375 3.375 0 0 0 21 10.875 1.125 1.125 0 0 1 22.125 12Zm-2.313.998a5.64 5.64 0 0 1-4.343-4.467A5.64 5.64 0 0 1 11 4.19 7.875 7.875 0 1 0 19.813 13v-.003Z"/> </svg>);
exports.default = Cookie;
