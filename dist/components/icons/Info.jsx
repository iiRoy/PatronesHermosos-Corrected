"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Info = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1 }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" d="M10.125 7.875a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm12 4.125A10.124 10.124 0 1 1 12 1.875 10.136 10.136 0 0 1 22.125 12Zm-2.25 0A7.875 7.875 0 1 0 12 19.875 7.883 7.883 0 0 0 19.875 12Zm-6.75 3.439v-3.064A1.875 1.875 0 0 0 11.25 10.5a1.125 1.125 0 0 0-.375 2.186v3.064a1.875 1.875 0 0 0 1.875 1.875 1.125 1.125 0 0 0 .375-2.186Z"/> </svg>);
exports.default = Info;
