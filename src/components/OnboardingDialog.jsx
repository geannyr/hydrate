import { useState } from 'react';
import { useI18n } from '../i18n';
import { ACTIVITY_MULTIPLIER, calcGoal } from '../utils.js';

const ACTIVITY_LEVELS = ['sedentary', 'moderate', 'active'];
const ACTIVITY_EMOJI = { sedentary: '🪑', moderate: '🚶', active: '🏃' };

export default function OnboardingDialog({ onComplete, onSkip }) {
  const { t } = useI18n();
  const [weight, setWeight] = useState(60);
  const [activity, setActivity] = useState('moderate');

  const previewGoal = calcGoal({ weight, activity });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (weight < 30 || weight > 250) return;
    onComplete({ weight: Number(weight), activity });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0" style={{ background: 'rgba(90, 74, 54, 0.35)', backdropFilter: 'blur(3px)' }} />
      <form
        onSubmit={handleSubmit}
        className="sketch-card v2 relative w-full max-w-md animate-slide-up"
        style={{ padding: '1.75rem' }}
      >
        <div className="text-center mb-6">
          <div className="inline-block mb-3">
            <DropletBig />
          </div>
          <h2 className="font-display font-bold text-[2.1rem] text-ink leading-tight text-balance">
            {t('onboarding.title')}
          </h2>
          <p className="font-hand text-ink-muted mt-1.5 text-[1.05rem] text-balance">
            {t('onboarding.subtitle')}
          </p>
        </div>

        {/* Weight */}
        <div className="mb-5">
          <label htmlFor="onb-weight" className="block font-label text-[0.95rem] text-ink-muted mb-2">
            {t('onboarding.weightLabel')}
          </label>
          <div className="sketch-input-wrap relative">
            <input
              id="onb-weight"
              type="number"
              inputMode="numeric"
              min="30"
              max="250"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="sketch-input pr-12 font-display text-[1.7rem] py-3"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label text-ink-muted pointer-events-none">
              {t('onboarding.weightUnit')}
            </span>
          </div>
        </div>

        {/* Activity */}
        <div className="mb-6">
          <label className="block font-label text-[0.95rem] text-ink-muted mb-2">
            {t('onboarding.activityLabel')}
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {ACTIVITY_LEVELS.map((level, idx) => {
              const tones = ['mint', 'water', 'lilac'];
              const selectedTone = tones[idx];
              return (
              <button
                key={level}
                type="button"
                onClick={() => setActivity(level)}
                className={[
                  'sketch-card flex flex-col items-center justify-center gap-1.5 py-3 px-2',
                  idx === 0 ? 'v1' : idx === 1 ? 'v2' : 'v3',
                  activity === level ? `tone-${selectedTone}` : '',
                  idx % 2 === 0 ? 'tilt-mini' : '',
                ].join(' ')}
                style={{ padding: '0.85rem 0.5rem' }}
              >
                <span className="text-2xl">{ACTIVITY_EMOJI[level]}</span>
                <span className="font-display font-bold text-[1.1rem] text-ink leading-none">
                  {t(`onboarding.activity${level.charAt(0).toUpperCase() + level.slice(1)}`)}
                </span>
                <span className="font-hand text-[0.78rem] text-ink-muted text-center leading-tight">
                  {t(`onboarding.activity${level.charAt(0).toUpperCase() + level.slice(1)}Hint`)}
                </span>
              </button>
            )})}
          </div>
        </div>

        {/* Goal preview */}
        <div className="sketch-card v3 tone-water mb-6 text-center" style={{ padding: '1rem' }}>
          <div className="font-label text-[0.85rem] text-ink-muted">
            {t('onboarding.goalPreview')}
          </div>
          <div className="font-display font-bold text-[2.4rem] text-ink leading-none mt-1">
            {previewGoal.toLocaleString()}
            <span className="font-hand text-[1rem] text-ink-muted ml-1.5">ml</span>
          </div>
          <div className="font-hand text-[0.9rem] text-ink-muted mt-1">
            {weight} kg × {ACTIVITY_MULTIPLIER[activity]} ml/kg
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button type="submit" className="sketch-btn primary w-full" style={{ padding: '0.85rem 1.3rem', fontSize: '1.1rem' }}>
            {t('onboarding.submitBtn')}
          </button>
          {onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="font-hand text-ink-muted text-[0.95rem] py-2 hover:text-ink transition-colors underline decoration-dashed underline-offset-4"
            >
              {t('onboarding.skipBtn')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function DropletBig() {
  return (
    <svg width="60" height="66" viewBox="0 0 46 50" aria-hidden="true">
      <path
        d="M23 4 C 14 16, 6 26, 7 32 C 8 41, 16 46, 23 46 C 30 46, 39 41, 39 32 C 39 25, 31 16, 23 4 Z"
        fill="var(--water-soft)"
        stroke="var(--ink)"
        strokeWidth="2.2"
        strokeLinejoin="round"
        style={{ filter: 'url(#sketch-1)' }}
      />
      <ellipse cx="18" cy="22" rx="2.4" ry="6" fill="var(--paper)" opacity="0.85" transform="rotate(-20 18 22)" />
    </svg>
  );
}
