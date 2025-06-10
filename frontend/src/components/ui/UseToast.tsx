import React, { useEffect } from 'react';

interface ToastProps {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number; // milliseconds, default 3000ms
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded shadow-lg flex flex-col space-y-1 ${typeStyles[type]}`}
      role="alert"
    >
      <strong className="font-semibold">{title}</strong>
      {description && <span className="text-sm">{description}</span>}
      <button
        onClick={onClose}
        className="self-end mt-1 text-white hover:opacity-75 focus:outline-none"
        aria-label="Close toast"
      >
        ✕
      </button>
    </div>
  );
};