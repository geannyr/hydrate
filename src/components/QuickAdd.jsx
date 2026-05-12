import { useState } from 'react';
import { useI18n } from '../i18n';

const PRESETS = [
  { ml: 200, Icon: GlassSm, tone: 'mint',   variant: 'v1' },
  { ml: 300, Icon: GlassMd, tone: 'water',  variant: 'v2' },
  { ml: 500, Icon: BottleSm,tone: 'lilac',  variant: 'v3' },
  { ml: 750, Icon: BottleLg,tone: 'blush',  variant: 'v1' },
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
    <section className="sketch-card v3 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-[1.5rem] text-ink leading-none">
          <span className="marker">{t('quickAdd.label')}</span>
        </h3>
        <div className="flex items-center gap-1">
          {canUndo && (
            <button
              type="button"
              onClick={onUndo}
              className="sketch-icon-btn"
              aria-label={t('quickAdd.undo')}
              title={t('quickAdd.undo')}
            >
              <UndoSketch />
            </button>
          )}
          {hasProgress && (
            <button
              type="button"
              onClick={handleReset}
              className="sketch-icon-btn"
              aria-label={t('quickAdd.reset')}
              title={t('quickAdd.reset')}
              style={{ color: 'var(--red)' }}
            >
              <TrashSketch />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-5">
        {PRESETS.map(({ ml, Icon, variant, tone }, idx) => (
          <button
            key={ml}
            type="button"
            onClick={() => onAdd(ml)}
            className={[
              'sketch-card preset-card relative flex flex-col items-center justify-center gap-1.5',
              variant,
              `tone-${tone}`,
              idx % 2 === 0 ? 'tilt-left' : 'tilt-right',
            ].join(' ')}
            style={{ padding: '0.95rem 0.5rem' }}
            aria-label={t('a11y.addAmount', { n: ml })}
          >
            <Icon />
            <span className="font-display font-bold text-[1.5rem] text-ink leading-none">
              +{ml}
              <span className="font-hand text-[0.78rem] text-ink-muted ml-0.5">ml</span>
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleCustom} className="flex items-stretch gap-2.5">
        <div className="flex-1 sketch-input-wrap">
          <input
            type="number"
            inputMode="numeric"
            min="1"
            max="5000"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder={t('quickAdd.customPlaceholder')}
            className="sketch-input pr-10"
            aria-label={t('quickAdd.custom')}
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-label text-ink-muted text-[0.95rem] pointer-events-none">
            ml
          </span>
        </div>
        <button
          type="submit"
          className="sketch-btn primary"
          disabled={!custom || parseInt(custom, 10) <= 0}
        >
          <PlusSketch />
          <span>{t('quickAdd.addBtn')}</span>
        </button>
      </form>
    </section>
  );
}

/* ---------- Cute icons ---------- */

function PlusSketch() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" aria-hidden="true" style={{ filter: 'url(#sketch-soft)' }}>
      <path d="M9 3 V 15" />
      <path d="M3 9 H 15" />
    </svg>
  );
}

function UndoSketch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'url(#sketch-soft)' }}>
      <path d="M3 7 V 13 H 9" />
      <path d="M21 17 A 8 8 0 0 0 7 11" />
    </svg>
  );
}

function TrashSketch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'url(#sketch-soft)' }}>
      <path d="M4 7 H 20" />
      <path d="M9 4 H 15 L 16 7 H 8 Z" />
      <path d="M6 7 L 7 21 H 17 L 18 7" />
      <path d="M10 11 V 17 M14 11 V 17" />
    </svg>
  );
}

/* Rounded, cute glass/bottle icons */

function GlassSm() {
  return (
    <svg width="36" height="40" viewBox="0 0 36 40" fill="none" aria-hidden="true">
      <path
        d="M10 8 H26 L24 32 a3 3 0 0 1 -3 2.6 H15 a3 3 0 0 1 -3 -2.6 Z"
        fill="var(--water-soft)"
        stroke="var(--ink)"
        strokeWidth="1.7"
        strokeLinejoin="round"
        style={{ filter: 'url(#sketch-2)', opacity: 0.95 }}
      />
      <path d="M12 18 Q 18 16 24 18" stroke="var(--water-deep)" strokeWidth="1.3" fill="none" strokeLinecap="round" style={{ filter: 'url(#sketch-3)' }} />
      <circle cx="15" cy="24" r="1.4" fill="var(--water-deep)" opacity="0.6" />
      <circle cx="19" cy="28" r="1.6" fill="var(--water-deep)" opacity="0.55" />
      <circle cx="22" cy="22" r="1.1" fill="var(--water-deep)" opacity="0.65" />
    </svg>
  );
}

function GlassMd() {
  return (
    <svg width="36" height="40" viewBox="0 0 36 40" fill="none" aria-hidden="true">
      <path
        d="M8 6 H28 L25 33 a3 3 0 0 1 -3 2.6 H14 a3 3 0 0 1 -3 -2.6 Z"
        fill="var(--water-soft)"
        stroke="var(--ink)"
        strokeWidth="1.7"
        strokeLinejoin="round"
        style={{ filter: 'url(#sketch-1)', opacity: 0.95 }}
      />
      <path d="M10 15 Q 18 13 26 15" stroke="var(--water-deep)" strokeWidth="1.3" fill="none" strokeLinecap="round" style={{ filter: 'url(#sketch-3)' }} />
      {[13, 17, 21, 24].map((x, i) => (
        <circle key={i} cx={x} cy={20 + (i % 2) * 6} r="1.4" fill="var(--water-deep)" opacity="0.6" />
      ))}
    </svg>
  );
}

function BottleSm() {
  return (
    <svg width="36" height="40" viewBox="0 0 36 40" fill="none" aria-hidden="true">
      <rect x="14" y="2" width="8" height="4" rx="2" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" style={{ filter: 'url(#sketch-2)' }} />
      <path d="M14.5 6 V 10 M21.5 6 V 10" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M11 10 H 25 Q 28 12 28 16 V 33 a 3 3 0 0 1 -3 3 H 11 a 3 3 0 0 1 -3 -3 V 16 Q 8 12 11 10 Z"
        fill="var(--water-soft)"
        stroke="var(--ink)"
        strokeWidth="1.7"
        strokeLinejoin="round"
        style={{ filter: 'url(#sketch-1)', opacity: 0.95 }}
      />
      <path d="M10 18 Q 18 16 26 18" stroke="var(--water-deep)" strokeWidth="1.3" fill="none" strokeLinecap="round" style={{ filter: 'url(#sketch-3)' }} />
      {[13, 17, 21, 24].map((x, i) => (
        <circle key={i} cx={x} cy={22 + (i % 2) * 5} r="1.3" fill="var(--water-deep)" opacity="0.6" />
      ))}
    </svg>
  );
}

function BottleLg() {
  return (
    <svg width="36" height="40" viewBox="0 0 36 40" fill="none" aria-hidden="true">
      <rect x="12" y="1" width="12" height="4.5" rx="2" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" style={{ filter: 'url(#sketch-2)' }} />
      <path
        d="M12 5.5 H 24 V 8 Q 29 10 29 14 V 34 a 3 3 0 0 1 -3 3 H 10 a 3 3 0 0 1 -3 -3 V 14 Q 7 10 12 8 Z"
        fill="var(--water-soft)"
        stroke="var(--ink)"
        strokeWidth="1.7"
        strokeLinejoin="round"
        style={{ filter: 'url(#sketch-1)', opacity: 0.95 }}
      />
      <path d="M9 14 Q 18 12 27 14" stroke="var(--water-deep)" strokeWidth="1.3" fill="none" strokeLinecap="round" style={{ filter: 'url(#sketch-3)' }} />
      {[11, 15, 19, 23, 25].map((x, i) => (
        <circle key={i} cx={x} cy={20 + (i % 3) * 5} r="1.3" fill="var(--water-deep)" opacity="0.6" />
      ))}
    </svg>
  );
}
