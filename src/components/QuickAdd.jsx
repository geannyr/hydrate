import { useState } from 'react';
import { FiPlus, FiRotateCcw, FiTrash2 } from 'react-icons/fi';
import { useI18n } from '../i18n';

const PRESETS = [
  { ml: 200, Icon: GlassSm },
  { ml: 300, Icon: GlassMd },
  { ml: 500, Icon: BottleSm },
  { ml: 750, Icon: BottleLg },
];

export default function QuickAdd({ onAdd, onUndo, onReset, canUndo, hasProgress }) {
  const { t } = useI18n();
  const [custom, setCustom] = useState('');

  const handleCustom = (e) => {
    e.preventDefault();
    const n = parseInt(custom, 10);
    if (Number.isFinite(n) && n > 0 && n <= 5000) {
      onAdd(n);
      setCustom('');
    }
  };

  const handleReset = () => {
    if (window.confirm(t('quickAdd.resetConfirm'))) onReset();
  };

  return (
    <section className="glass rounded-4xl p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-heading font-semibold text-[0.78rem] tracking-[0.16em] uppercase text-ink-muted">
          {t('quickAdd.label')}
        </h3>
        <div className="flex items-center gap-1">
          {canUndo && (
            <button
              type="button"
              onClick={onUndo}
              className="icon-btn"
              aria-label={t('quickAdd.undo')}
              title={t('quickAdd.undo')}
            >
              <FiRotateCcw size={16} />
            </button>
          )}
          {hasProgress && (
            <button
              type="button"
              onClick={handleReset}
              className="icon-btn hover:!text-rose-400"
              aria-label={t('quickAdd.reset')}
              title={t('quickAdd.reset')}
            >
              <FiTrash2 size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {PRESETS.map(({ ml, Icon }) => (
          <button
            key={ml}
            type="button"
            onClick={() => onAdd(ml)}
            className="group relative flex flex-col items-center justify-center gap-2 py-5 rounded-3xl glass glass-hover transition-all duration-300 hover:-translate-y-1 active:scale-95 overflow-hidden"
            aria-label={t('a11y.addAmount', { n: ml })}
          >
            <span className="absolute inset-0 bg-gradient-to-b from-aqua/0 via-aqua/0 to-aqua/0 group-hover:from-aqua/0 group-hover:to-aqua/10 transition-all duration-300 pointer-events-none" />
            <Icon className="w-9 h-10 text-aqua-light transition-transform duration-300 group-hover:-translate-y-0.5 group-active:scale-90" />
            <span className="font-heading font-bold text-[1.05rem] relative">
              +{ml}
              <span className="text-ink-muted text-[0.74rem] font-normal ml-0.5">ml</span>
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleCustom} className="flex items-stretch gap-2">
        <div className="flex-1 relative">
          <input
            type="number"
            inputMode="numeric"
            min="1"
            max="5000"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder={t('quickAdd.customPlaceholder')}
            className="input-base pr-12"
            aria-label={t('quickAdd.custom')}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-subtle text-sm font-medium pointer-events-none">
            ml
          </span>
        </div>
        <button
          type="submit"
          className="btn-primary px-5"
          disabled={!custom || parseInt(custom, 10) <= 0}
        >
          <FiPlus size={16} />
          {t('quickAdd.addBtn')}
        </button>
      </form>
    </section>
  );
}

/* ---------- Inline SVG icons (consistent line-art water glasses/bottles) ---------- */

function GlassSm({ className }) {
  return (
    <svg viewBox="0 0 32 36" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gsm-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {/* glass outline (slightly tapered cup) */}
      <path
        d="M9 8 H23 L21 30 a3 3 0 0 1 -3 2.5 H14 a3 3 0 0 1 -3 -2.5 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      {/* water inside (~60% full) */}
      <path
        d="M10 16 H22 L21 30 a3 3 0 0 1 -3 2.5 H14 a3 3 0 0 1 -3 -2.5 Z"
        fill="url(#gsm-fill)"
      />
      {/* meniscus */}
      <path d="M10 16 q6 -2 12 0" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" fill="none" />
    </svg>
  );
}

function GlassMd({ className }) {
  return (
    <svg viewBox="0 0 32 36" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gmd-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path
        d="M7 6 H25 L23 31 a3 3 0 0 1 -3 2.5 H12 a3 3 0 0 1 -3 -2.5 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 13 H24 L23 31 a3 3 0 0 1 -3 2.5 H12 a3 3 0 0 1 -3 -2.5 Z"
        fill="url(#gmd-fill)"
      />
      <path d="M8 13 q8 -2 16 0" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" fill="none" />
    </svg>
  );
}

function BottleSm({ className }) {
  return (
    <svg viewBox="0 0 32 36" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bsm-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="13" y="2" width="6" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.3" />
      {/* neck */}
      <path d="M13.5 5.5 V9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18.5 5.5 V9" stroke="currentColor" strokeWidth="1.5" />
      {/* bottle body */}
      <path
        d="M11 9 H21 Q24 11 24 14 V30 a3 3 0 0 1 -3 3 H11 a3 3 0 0 1 -3 -3 V14 Q8 11 11 9 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      {/* water (~70%) */}
      <path
        d="M8.5 16 H23.5 V30 a3 3 0 0 1 -3 3 H11.5 a3 3 0 0 1 -3 -3 Z"
        fill="url(#bsm-fill)"
      />
      <path d="M8.5 16 q7.5 -1.5 15 0" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" fill="none" />
    </svg>
  );
}

function BottleLg({ className }) {
  return (
    <svg viewBox="0 0 32 36" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="blg-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="11" y="1" width="10" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.3" />
      {/* shoulders */}
      <path
        d="M11 5 H21 V8 Q25 10 25 13 V31 a3 3 0 0 1 -3 3 H10 a3 3 0 0 1 -3 -3 V13 Q7 10 11 8 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      {/* water (~85%) */}
      <path
        d="M7 13 H25 V31 a3 3 0 0 1 -3 3 H10 a3 3 0 0 1 -3 -3 Z"
        fill="url(#blg-fill)"
      />
      <path d="M7 13 q9 -1.5 18 0" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" fill="none" />
      {/* drop highlight */}
      <ellipse cx="11" cy="22" rx="1.2" ry="3" fill="white" fillOpacity="0.25" />
    </svg>
  );
}
