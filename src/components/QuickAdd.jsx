import { useState } from 'react';
import { FiPlus, FiRotateCcw, FiTrash2 } from 'react-icons/fi';
import { useI18n } from '../i18n';

const PRESETS = [200, 300, 500, 750];

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
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-[0.78rem] tracking-[0.18em] uppercase text-ink-muted">
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {PRESETS.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => onAdd(amount)}
            className="group flex flex-col items-center justify-center gap-1.5 py-5 rounded-3xl glass glass-hover transition-all hover:-translate-y-1 active:scale-95"
            aria-label={t('a11y.addAmount', { n: amount })}
          >
            <span className="text-2xl group-hover:animate-pop">
              {amount <= 250 ? '🥤' : amount <= 500 ? '🥛' : '🧊'}
            </span>
            <span className="font-heading font-bold text-[1.05rem]">
              +{amount}
              <span className="text-ink-muted text-[0.78rem] font-normal ml-0.5">ml</span>
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleCustom} className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="number"
            inputMode="numeric"
            min="1"
            max="5000"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder={t('quickAdd.customPlaceholder')}
            className="input-base pr-14"
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
