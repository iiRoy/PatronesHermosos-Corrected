"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FolderSimpleLock = ({ width = 24, height = 24, strokeColor = 'currentColor', fillColor = 'none', strokeWidth = 1, }) => (<svg width={width} height={height} stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    {' '}
    <path stroke={strokeColor} fill={fillColor} strokeWidth={strokeWidth} vectorEffect='non-scaling-stroke' d='M22.125 8.25v.375a1.125 1.125 0 1 1-2.25 0H12.25c-.405 0-.8-.132-1.125-.375l-2.5-1.875h-4.5v12H9.75a1.125 1.125 0 1 1 0 2.25h-6a1.875 1.875 0 0 1-1.875-1.875V6A1.875 1.875 0 0 1 3.75 4.125h5c.405 0 .8.132 1.125.375l2.5 1.875h7.875a1.875 1.875 0 0 1 1.875 1.875Zm0 7.125V19.5A1.125 1.125 0 0 1 21 20.625h-6.75a1.125 1.125 0 0 1-1.125-1.125v-4.125a1.125 1.125 0 0 1 1.125-1.125h.375v-.375a3 3 0 0 1 6 0v.375H21a1.125 1.125 0 0 1 1.125 1.125Zm-5.25-1.125h1.5v-.375a.75.75 0 1 0-1.5 0v.375Zm3 2.25h-4.5v1.875h4.5V16.5Z'/>{' '}
  </svg>);
exports.default = FolderSimpleLock;
