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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md glass-strong rounded-5xl p-7 animate-slide-up"
      >
        <div className="text-center mb-7">
          <div className="text-5xl mb-3">💧</div>
          <h2 className="font-heading font-bold text-[1.7rem] leading-tight text-balance">
            {t('onboarding.title')}
          </h2>
          <p className="text-ink-muted mt-2 text-[0.95rem] text-balance">
            {t('onboarding.subtitle')}
          </p>
        </div>

        {/* Weight */}
        <div className="mb-6">
          <label htmlFor="onb-weight" className="block text-[0.78rem] font-semibold tracking-wider uppercase text-ink-muted mb-2">
            {t('onboarding.weightLabel')}
          </label>
          <div className="relative">
            <input
              id="onb-weight"
              type="number"
              inputMode="numeric"
              min="30"
              max="250"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="input-base pr-12 text-[1.4rem] font-heading font-bold py-4"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-ink-subtle font-medium pointer-events-none">
              {t('onboarding.weightUnit')}
            </span>
          </div>
        </div>

        {/* Activity */}
        <div className="mb-7">
          <label className="block text-[0.78rem] font-semibold tracking-wider uppercase text-ink-muted mb-2">
            {t('onboarding.activityLabel')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {ACTIVITY_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setActivity(level)}
                className={[
                  'flex flex-col items-center justify-center gap-1.5 py-4 px-2 rounded-3xl transition-all duration-200',
                  activity === level
                    ? 'bg-aqua text-[#04243d] shadow-glow-soft -translate-y-0.5'
                    : 'glass glass-hover text-ink-muted hover:-translate-y-0.5',
                ].join(' ')}
              >
                <span className="text-2xl">{ACTIVITY_EMOJI[level]}</span>
                <span className="font-semibold text-[0.85rem]">
                  {t(`onboarding.activity${level.charAt(0).toUpperCase() + level.slice(1)}`)}
                </span>
                <span className={['text-[0.68rem] leading-tight text-center', activity === level ? 'text-[#04243d]/75' : 'text-ink-subtle'].join(' ')}>
                  {t(`onboarding.activity${level.charAt(0).toUpperCase() + level.slice(1)}Hint`)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Goal preview */}
        <div className="mb-7 text-center py-5 px-4 rounded-3xl bg-aqua-subtle border border-aqua/20">
          <div className="text-[0.72rem] font-semibold tracking-wider uppercase text-aqua-light mb-1">
            {t('onboarding.goalPreview')}
          </div>
          <div className="font-heading font-bold text-[2rem] text-aqua-light leading-none">
            {previewGoal.toLocaleString()}
            <span className="text-ink-muted text-[1rem] font-normal ml-1">ml</span>
          </div>
          <div className="text-[0.78rem] text-ink-subtle mt-1">
            {weight} kg × {ACTIVITY_MULTIPLIER[activity]} ml/kg
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button type="submit" className="btn-primary w-full py-4 text-[1.05rem]">
            {t('onboarding.submitBtn')}
          </button>
          {onSkip && (
            <button type="button" onClick={onSkip} className="text-ink-subtle text-[0.85rem] py-2 hover:text-ink-text transition-colors">
              {t('onboarding.skipBtn')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
