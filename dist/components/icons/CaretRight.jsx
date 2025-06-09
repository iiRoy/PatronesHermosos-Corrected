"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CaretRight = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="m17.296 12.796-7.5 7.5a1.127 1.127 0 1 1-1.594-1.594L14.906 12 8.204 5.296a1.127 1.127 0 1 1 1.594-1.594l7.5 7.5a1.125 1.125 0 0 1-.002 1.594Z"/> </svg>);
exports.default = CaretRight;
