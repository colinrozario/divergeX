import { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const types = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`${types[type]} px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md animate-slide-in`}>
      <span className="text-2xl" aria-hidden="true">{icons[type]}</span>
      <p className="flex-1">{message}</p>
      <button 
        onClick={onClose}
        className="text-white hover:opacity-80 text-xl font-bold"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
