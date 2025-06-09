"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ArrowFatLineLeft = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M16.5 6.375h-4.125V3a1.125 1.125 0 0 0-1.92-.796l-9 9a1.125 1.125 0 0 0 0 1.594l9 9a1.125 1.125 0 0 0 1.92-.798v-3.375H16.5a1.125 1.125 0 0 0 1.125-1.125v-9A1.125 1.125 0 0 0 16.5 6.375Zm-1.125 9H11.25a1.125 1.125 0 0 0-1.125 1.125v1.781L3.844 12l6.281-6.281V7.5a1.125 1.125 0 0 0 1.125 1.125h4.125v6.75Zm6-7.875v9a1.125 1.125 0 1 1-2.25 0v-9a1.125 1.125 0 1 1 2.25 0Z"/> </svg>);
exports.default = ArrowFatLineLeft;
