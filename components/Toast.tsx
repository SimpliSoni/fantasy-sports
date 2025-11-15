import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClear: () => void;
  duration?: number;
}

const Toast = ({ message, onClear, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClear();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClear]);

  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg animate-bounce z-50">
      {message}
    </div>
  );
};

export default Toast;