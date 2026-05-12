import { useState } from 'react';
import { useI18n } from '../i18n';
import { ACTIVITY_MULTIPLIER, calcGoal, formatHour } from '../utils.js';

const ACTIVITY_LEVELS = ['sedentary', 'moderate', 'active'];

export default function SettingsDialog({ user, onSave, onClose, notifPermission, onRequestNotif }) {
  const { t } = useI18n();
  const [draft, setDraft] = useState({
    ...user,
    reminders: { ...user.reminders },
  });

  const calculatedGoal = calcGoal({ ...draft, goalOverride: null });

  const update = (patch) => setDraft((d) => ({ ...d, ...patch }));
  const updateReminders = (patch) =>
    setDraft((d) => ({ ...d, reminders: { ...d.reminders, ...patch } }));

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...draft,
      weight: Number(draft.weight) || 60,
      goalOverride:
        draft.goalOverride && Number(draft.goalOverride) > 0
          ? Number(draft.goalOverride)
          : null,
      reminders: {
        enabled: !!draft.reminders.enabled,
        intervalH: Math.max(1, Math.min(8, Number(draft.reminders.intervalH) || 2)),
        startH: Math.max(0, Math.min(23, Number(draft.reminders.startH) || 8)),
        endH: Math.max(0, Math.min(23, Number(draft.reminders.endH) || 22)),
      },
    };
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0" style={{ background: 'rgba(90, 74, 54, 0.35)', backdropFilter: 'blur(3px)' }} onClick={onClose} />
      <form
        onSubmit={handleSave}
        className="sketch-card relative w-full max-w-lg animate-slide-up max-h-[92vh] overflow-y-auto"
        style={{ padding: '1.75rem' }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-[2rem] text-ink leading-none">
            <span className="marker">{t('settings.title')}</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('a11y.closeDialog')}
            className="sketch-icon-btn"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Goal */}
        <Section title={t('settings.sectionGoal')}>
          <Field label={t('settings.weightLabel')} suffix="kg">
            <input
              type="number"
              inputMode="numeric"
              min="30"
              max="250"
              step="0.5"
              value={draft.weight}
              onChange={(e) => update({ weight: e.target.value })}
              className="sketch-input pr-12"
            />
          </Field>

          <div>
            <label className="block font-label text-[0.92rem] text-ink-muted mb-2">
              {t('settings.activityLabel')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ACTIVITY_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => update({ activity: level })}
                  className={['sketch-chip flex-1', draft.activity === level ? 'active' : ''].join(' ')}
                  style={{ padding: '0.5rem 0.6rem' }}
                >
                  {t(`onboarding.activity${level.charAt(0).toUpperCase() + level.slice(1)}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="sketch-card v3 tone-water text-center" style={{ padding: '0.85rem' }}>
            <div className="font-label text-[0.85rem] text-ink-muted">
              {t('settings.goalCalculated')}
            </div>
            <div className="font-display font-bold text-[1.9rem] text-ink leading-none mt-0.5">
              {calculatedGoal.toLocaleString()} <span className="font-hand text-[0.95rem] text-ink-muted">ml</span>
            </div>
            <div className="font-hand text-[0.88rem] text-ink-muted mt-0.5">
              {Number(draft.weight) || 60} kg × {ACTIVITY_MULTIPLIER[draft.activity]} ml/kg
            </div>
          </div>

          <Field label={t('settings.goalOverride')} suffix="ml" hint={t('settings.goalOverrideHint')}>
            <input
              type="number"
              inputMode="numeric"
              min="500"
              max="10000"
              step="50"
              value={draft.goalOverride ?? ''}
              onChange={(e) => update({ goalOverride: e.target.value })}
              placeholder={String(calculatedGoal)}
              className="sketch-input pr-12"
            />
          </Field>
        </Section>

        {/* Reminders */}
        <Section title={t('settings.sectionReminders')}>
          <div className="sketch-card v2 flex items-center justify-between gap-3" style={{ padding: '0.7rem 0.95rem' }}>
            <span className="font-hand text-[1.05rem] text-ink">{t('settings.remindersEnabled')}</span>
            <Toggle
              checked={!!draft.reminders.enabled}
              onChange={(enabled) => {
                updateReminders({ enabled });
                if (enabled && notifPermission === 'default' && onRequestNotif) onRequestNotif();
              }}
            />
          </div>

          {draft.reminders.enabled && (
            <>
              <p className="font-hand text-[0.95rem] text-ink-muted px-1">
                {t('settings.remindersHint', {
                  n: draft.reminders.intervalH,
                  start: formatHour(draft.reminders.startH),
                  end: formatHour(draft.reminders.endH),
                })}
              </p>
              <div className="grid grid-cols-3 gap-3">
                <Field label={t('settings.reminderInterval')} suffix="h">
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={draft.reminders.intervalH}
                    onChange={(e) => updateReminders({ intervalH: e.target.value })}
                    className="sketch-input"
                  />
                </Field>
                <Field label={t('settings.activeStart')}>
                  <select
                    value={draft.reminders.startH}
                    onChange={(e) => updateReminders({ startH: Number(e.target.value) })}
                    className="sketch-input"
                  >
                    {Array.from({ length: 24 }, (_, h) => (
                      <option key={h} value={h}>{formatHour(h)}</option>
                    ))}
                  </select>
                </Field>
                <Field label={t('settings.activeEnd')}>
                  <select
                    value={draft.reminders.endH}
                    onChange={(e) => updateReminders({ endH: Number(e.target.value) })}
                    className="sketch-input"
                  >
                    {Array.from({ length: 24 }, (_, h) => (
                      <option key={h} value={h}>{formatHour(h)}</option>
                    ))}
                  </select>
                </Field>
              </div>
              {notifPermission === 'denied' && (
                <p className="font-hand text-[0.92rem] text-red-pencil px-1">{t('settings.notifBlocked')}</p>
              )}
              {notifPermission === 'default' && (
                <p className="font-hand text-[0.92rem] text-ink-muted px-1">{t('settings.notifPrompt')}</p>
              )}
            </>
          )}
        </Section>

        <div className="flex gap-3 mt-4">
          <button type="button" onClick={onClose} className="sketch-btn flex-1">
            {t('settings.closeBtn')}
          </button>
          <button type="submit" className="sketch-btn primary flex-[2]">
            {t('settings.saveBtn')}
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-5">
      <h3 className="font-display font-bold text-[1.35rem] text-ink leading-none mb-3">
        {title}
      </h3>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

function Field({ label, hint, suffix, children }) {
  return (
    <div>
      <label className="block font-label text-[0.92rem] text-ink-muted mb-2">
        {label}
      </label>
      <div className="sketch-input-wrap relative">
        {children}
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label text-ink-muted text-[0.95rem] pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="font-hand text-[0.88rem] text-ink-muted mt-1.5 px-1">{hint}</p>}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative shrink-0 outline-none"
      style={{ width: '54px', height: '30px' }}
    >
      <svg viewBox="0 0 54 30" width="54" height="30" aria-hidden="true">
        <rect
          x="2" y="2" width="50" height="26" rx="13"
          fill={checked ? 'var(--water-wash)' : 'var(--paper)'}
          stroke="var(--ink)"
          strokeWidth="1.8"
          style={{ filter: 'url(#sketch-2)' }}
        />
        <circle
          cx={checked ? 39 : 15}
          cy="15"
          r="9"
          fill={checked ? 'var(--water)' : 'var(--paper-alt)'}
          stroke="var(--ink)"
          strokeWidth="1.8"
          style={{ filter: 'url(#sketch-soft)', transition: 'cx 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
      </svg>
    </button>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ filter: 'url(#sketch-soft)' }}>
      <path d="M3 3 L 11 11 M11 3 L 3 11" />
    </svg>
  );
}
