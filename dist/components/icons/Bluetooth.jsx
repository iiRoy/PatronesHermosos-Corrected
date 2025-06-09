"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Bluetooth = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="m18.675 15.6-4.8-3.6 4.8-3.6a1.125 1.125 0 0 0 0-1.8l-6-4.5a1.125 1.125 0 0 0-1.8.9v6.75l-4.2-3.15a1.125 1.125 0 1 0-1.35 1.8l4.8 3.6-4.8 3.6a1.125 1.125 0 1 0 1.35 1.8l4.2-3.15V21a1.125 1.125 0 0 0 1.8.9l6-4.5a1.125 1.125 0 0 0 0-1.8Zm-5.55-10.35 3 2.25-3 2.25v-4.5Zm0 13.5v-4.5l3 2.25-3 2.25Z"/> </svg>);
exports.default = Bluetooth;
