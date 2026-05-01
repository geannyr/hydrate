import { useEffect } from 'react';
import { FiX, FiDroplet } from 'react-icons/fi';

export default function Toast({ message, onClose, duration = 8000 }) {
  useEffect(() => {
    if (!duration) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [duration, onClose]);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] animate-slide-down px-4">
      <div className="glass-strong rounded-3xl px-5 py-3.5 flex items-center gap-3 shadow-card max-w-sm">
        <span className="text-aqua-light shrink-0">
          <FiDroplet size={20} />
        </span>
        <p className="text-[0.92rem] text-balance">{message}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="icon-btn !w-8 !h-8 shrink-0"
        >
          <FiX size={15} />
        </button>
      </div>
    </div>
  );
}
