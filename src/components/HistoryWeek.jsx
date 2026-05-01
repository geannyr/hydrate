import { useI18n } from '../i18n';
import { lastNDaysKeys, formatDayLabel, calcStreak, todayKey } from '../utils.js';

export default function HistoryWeek({ history, goal }) {
  const { t, lang } = useI18n();
  const days = lastNDaysKeys(7);
  const today = todayKey();

  const values = days.map((key) => history[key] || 0);
  const max = Math.max(goal, ...values, 1);

  const total = values.reduce((acc, v) => acc + v, 0);
  const avg = Math.round(total / 7);
  const streak = calcStreak(history, goal);

  return (
    <section className="glass rounded-4xl p-6 mb-6">
      <div className="flex items-baseline justify-between mb-5">
        <h3 className="font-heading font-semibold text-[0.78rem] tracking-[0.18em] uppercase text-ink-muted">
          {t('history.title')}
        </h3>
      </div>

      <div className="flex items-end justify-between gap-2 h-36 mb-5">
        {days.map((key, idx) => {
          const value = values[idx];
          const heightPct = max > 0 ? (value / max) * 100 : 0;
          const goalPct = max > 0 ? (goal / max) * 100 : 0;
          const reached = value >= goal && goal > 0;
          const isToday = key === today;
          const label = formatDayLabel(key, lang);
          const dayLabel =
            label === null
              ? t('history.today')
              : label === 'yesterday'
              ? t('history.yesterday')
              : label;

          return (
            <div key={key} className="flex-1 flex flex-col items-center gap-2 min-w-0">
              <div className="relative w-full flex-1 flex items-end">
                {/* Goal line */}
                {goal > 0 && (
                  <div
                    className="absolute left-0 right-0 border-t border-dashed border-ink-border-hover"
                    style={{ bottom: `${goalPct}%` }}
                    aria-hidden="true"
                  />
                )}
                {/* Bar */}
                <div
                  className={[
                    'w-full rounded-xl transition-all duration-500 relative overflow-hidden',
                    value === 0
                      ? 'bg-ink-surface'
                      : reached
                      ? 'bg-gradient-to-t from-aqua-deep to-aqua-light shadow-glow-soft'
                      : 'bg-gradient-to-t from-aqua-deep/70 to-aqua/70',
                    isToday && value > 0 ? 'ring-2 ring-aqua/50' : '',
                  ].join(' ')}
                  style={{ height: `${Math.max(heightPct, value === 0 ? 4 : 8)}%`, minHeight: value === 0 ? '4px' : '8px' }}
                />
              </div>
              <span className={['text-[0.7rem] font-medium truncate', isToday ? 'text-aqua-light' : 'text-ink-subtle'].join(' ')}>
                {dayLabel}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-ink-border">
        <div>
          <div className="text-[0.7rem] tracking-wider uppercase text-ink-subtle font-semibold">
            {t('history.avg')}
          </div>
          <div className="font-heading font-bold text-[1.2rem] mt-1">
            {avg.toLocaleString()}
            <span className="text-ink-muted text-[0.78rem] font-normal ml-1">ml</span>
          </div>
        </div>
        <div>
          <div className="text-[0.7rem] tracking-wider uppercase text-ink-subtle font-semibold">
            {t('history.streak')}
          </div>
          <div className="font-heading font-bold text-[1.2rem] mt-1 text-aqua-light">
            {t('history.streakDays', { n: streak, plural: streak === 1 ? '' : lang === 'en' ? 's' : '' })}
          </div>
        </div>
      </div>
    </section>
  );
}
