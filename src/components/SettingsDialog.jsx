import { useState } from 'react';
import { FiX } from 'react-icons/fi';
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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <form
        onSubmit={handleSave}
        className="relative w-full max-w-lg glass-strong rounded-5xl p-7 animate-slide-up max-h-[92vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-bold text-[1.4rem]">{t('settings.title')}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('a11y.closeDialog')}
            className="icon-btn"
          >
            <FiX size={18} />
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
              className="input-base"
            />
          </Field>

          <div>
            <label className="block text-[0.78rem] font-semibold tracking-wider uppercase text-ink-muted mb-2">
              {t('settings.activityLabel')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ACTIVITY_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => update({ activity: level })}
                  className={['chip py-3 rounded-2xl', draft.activity === level ? 'active' : ''].join(' ')}
                >
                  {t(`onboarding.activity${level.charAt(0).toUpperCase() + level.slice(1)}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 py-3 rounded-2xl bg-aqua-subtle border border-aqua/20">
            <div className="text-[0.72rem] font-semibold tracking-wider uppercase text-aqua-light">
              {t('settings.goalCalculated')}
            </div>
            <div className="font-heading font-bold text-[1.4rem] text-aqua-light">
              {calculatedGoal.toLocaleString()} <span className="text-ink-muted text-[0.85rem] font-normal">ml</span>
            </div>
            <div className="text-[0.74rem] text-ink-subtle mt-0.5">
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
              className="input-base"
            />
          </Field>
        </Section>

        {/* Reminders */}
        <Section title={t('settings.sectionReminders')}>
          <label className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl glass cursor-pointer">
            <span className="font-medium">{t('settings.remindersEnabled')}</span>
            <Toggle
              checked={!!draft.reminders.enabled}
              onChange={(enabled) => {
                updateReminders({ enabled });
                if (enabled && notifPermission === 'default' && onRequestNotif) onRequestNotif();
              }}
            />
          </label>

          {draft.reminders.enabled && (
            <>
              <p className="text-[0.84rem] text-ink-muted px-1">
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
                    className="input-base"
                  />
                </Field>
                <Field label={t('settings.activeStart')}>
                  <select
                    value={draft.reminders.startH}
                    onChange={(e) => updateReminders({ startH: Number(e.target.value) })}
                    className="input-base"
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
                    className="input-base"
                  >
                    {Array.from({ length: 24 }, (_, h) => (
                      <option key={h} value={h}>{formatHour(h)}</option>
                    ))}
                  </select>
                </Field>
              </div>
              {notifPermission === 'denied' && (
                <p className="text-[0.84rem] text-rose-300 px-1">{t('settings.notifBlocked')}</p>
              )}
              {notifPermission === 'default' && (
                <p className="text-[0.84rem] text-ink-muted px-1">{t('settings.notifPrompt')}</p>
              )}
            </>
          )}
        </Section>

        <div className="flex gap-3 mt-2">
          <button type="button" onClick={onClose} className="btn-secondary flex-1">
            {t('settings.closeBtn')}
          </button>
          <button type="submit" className="btn-primary flex-[2]">
            {t('settings.saveBtn')}
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h3 className="font-heading font-semibold text-[0.74rem] tracking-[0.18em] uppercase text-ink-subtle mb-3">
        {title}
      </h3>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

function Field({ label, hint, suffix, children }) {
  return (
    <div>
      <label className="block text-[0.78rem] font-semibold tracking-wider uppercase text-ink-muted mb-2">
        {label}
      </label>
      <div className="relative">
        {children}
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-subtle text-sm font-medium pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-[0.78rem] text-ink-subtle mt-1.5 px-1">{hint}</p>}
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
      className={[
        'relative shrink-0 w-[52px] h-[30px] rounded-full transition-colors duration-300 outline-none',
        'focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-ink-bg',
        checked ? 'bg-aqua shadow-[0_0_16px_rgba(56,189,250,0.45)]' : 'bg-ink-border-hover',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className="absolute top-[3px] left-[3px] w-6 h-6 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ transform: checked ? 'translateX(22px)' : 'translateX(0px)' }}
      />
    </button>
  );
}
