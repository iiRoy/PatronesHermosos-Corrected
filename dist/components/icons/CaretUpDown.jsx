"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CaretUpDown = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M17.296 15.704a1.125 1.125 0 0 1 0 1.594l-4.5 4.5a1.125 1.125 0 0 1-1.594 0l-4.5-4.5a1.127 1.127 0 1 1 1.594-1.594L12 19.406l3.704-3.705a1.124 1.124 0 0 1 1.592.003Zm-9-7.406L12 4.594l3.704 3.705a1.127 1.127 0 1 0 1.594-1.594l-4.5-4.5a1.125 1.125 0 0 0-1.594 0l-4.5 4.5a1.127 1.127 0 0 0 1.594 1.594l-.002-.001Z"/> </svg>);
exports.default = CaretUpDown;
