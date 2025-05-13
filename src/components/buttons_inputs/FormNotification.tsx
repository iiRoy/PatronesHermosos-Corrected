'use client';
import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  messages: string[];
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, messages }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-500">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white focus:outline-none"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        <div className="mb-4">
          {messages.map((message, index) => (
            <p key={index} className="text-white">{message}</p>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-dismiss after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <p>{message}</p>
      </div>
    </div>
  );
};