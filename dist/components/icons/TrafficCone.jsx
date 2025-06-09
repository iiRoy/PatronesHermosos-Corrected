"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TrafficCone = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M21.75 19.125H20.3l-5.563-15.99a1.875 1.875 0 0 0-1.77-1.26h-1.934a1.875 1.875 0 0 0-1.77 1.26L3.7 19.124H2.25a1.125 1.125 0 1 0 0 2.25h19.5a1.125 1.125 0 1 0 0-2.25Zm-12.537-9h5.574l1.304 3.75H7.91l1.304-3.75Zm2.087-6h1.4l1.304 3.75H9.996l1.304-3.75Zm-4.175 12h9.75l1.043 3H6.083l1.042-3Z"/> </svg>);
exports.default = TrafficCone;
