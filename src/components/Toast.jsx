import { useEffect } from 'react';
import { useI18n } from '../i18n';

export default function Toast({ message, onClose, duration = 8000 }) {
  const { t } = useI18n();
  useEffect(() => {
    if (!duration) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [duration, onClose]);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] animate-slide-down px-4 w-full max-w-md">
      <div className="sketch-card v2 tone-butter flex items-center gap-3 tilt-mini" style={{ padding: '0.85rem 1.1rem' }}>
        <DropletIcon />
        <p className="font-hand text-[1.05rem] text-ink leading-snug text-balance flex-1">
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('a11y.closeDialog')}
          className="sketch-icon-btn shrink-0"
          style={{ width: '2rem', height: '2rem' }}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

function DropletIcon() {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" aria-hidden="true" style={{ filter: 'url(#sketch-1)' }}>
      <path
        d="M11 2 C 6 9, 3 14, 4 17 C 5 20, 8 22, 11 22 C 14 22, 17 20, 18 17 C 19 14, 16 9, 11 2 Z"
        fill="var(--water-soft)"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" style={{ filter: 'url(#sketch-soft)' }}>
      <path d="M3 3 L 11 11 M11 3 L 3 11" />
    </svg>
  );
}
