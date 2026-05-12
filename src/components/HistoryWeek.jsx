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

  const streakStr = t('history.streakDays', {
    n: streak,
    plural: streak === 1 ? '' : lang === 'en' ? 's' : '',
  });
  const firstSpace = streakStr.indexOf(' ');
  const streakUnit = firstSpace >= 0 ? streakStr.slice(firstSpace + 1) : '';

  return (
    <section className="glass premium-card rounded-4xl p-5 sm:p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <span className="w-1 h-5 rounded-full bg-grad-iris" aria-hidden="true" />
          <h3 className="font-heading font-semibold text-[0.78rem] tracking-[0.18em] uppercase text-ink-muted">
            {t('history.title')}
          </h3>
        </div>
      </div>

      <div className="relative h-44 mb-5">
        {/* Gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none" aria-hidden="true">
          {[100, 75, 50, 25, 0].map((p) => (
            <div
              key={p}
              className="border-t border-dashed border-white/[0.06]"
              style={p === 0 ? { borderTopStyle: 'solid', borderTopColor: 'rgba(255,255,255,0.08)' } : undefined}
            />
          ))}
        </div>

        {/* Goal line */}
        {goal > 0 && (
          <div
            className="absolute left-0 right-0 flex items-center pointer-events-none"
            style={{ bottom: `${(goal / max) * 100}%` }}
            aria-hidden="true"
          >
            <div className="flex-1 border-t-[1.5px] border-dashed border-aqua/40" />
            <span className="ml-2 text-[0.6rem] font-semibold tracking-wider uppercase text-aqua-light/80 px-1.5 py-0.5 rounded-md bg-aqua/10 border border-aqua/20">
              goal
            </span>
          </div>
        )}

        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-between gap-1.5 sm:gap-2">
          {days.map((key, idx) => {
            const value = values[idx];
            const heightPct = max > 0 ? (value / max) * 100 : 0;
            const reached = value >= goal && goal > 0;
            const isToday = key === today;
            const label = formatDayLabel(key, lang);
            const dayLabel =
              label === null
                ? t('history.today')
                : label === 'yesterday'
                ? t('history.yesterday')
                : label;

            const minHeight = value === 0 ? 4 : 10;

            return (
              <div key={key} className="flex-1 flex flex-col items-center gap-2 min-w-0 h-full justify-end">
                <div className="relative w-full flex items-end justify-center flex-1">
                  {/* Value tooltip on hover */}
                  {value > 0 && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      <span className="text-[0.65rem] font-bold text-ink-text bg-ink-bg/95 px-1.5 py-0.5 rounded-md border border-ink-border">
                        {value.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div
                    className={[
                      'group w-full max-w-[36px] relative rounded-t-xl transition-all duration-500 origin-bottom',
                      value === 0
                        ? 'bg-white/[0.04]'
                        : reached
                        ? 'shadow-[0_0_18px_-2px_rgba(56,189,248,0.5)]'
                        : '',
                      isToday && value > 0 ? 'ring-2 ring-aqua/40 ring-offset-2 ring-offset-transparent' : '',
                    ].join(' ')}
                    style={{
                      height: `${Math.max(heightPct, value === 0 ? 1 : 4)}%`,
                      minHeight: `${minHeight}px`,
                      background: value === 0
                        ? undefined
                        : reached
                        ? 'linear-gradient(180deg, #bae6fd 0%, #38bdf8 45%, #0284c7 100%)'
                        : 'linear-gradient(180deg, rgba(125, 211, 252, 0.85) 0%, rgba(56, 189, 248, 0.7) 50%, rgba(2, 132, 199, 0.6) 100%)',
                      boxShadow: value > 0 && !reached
                        ? 'inset 0 1px 0 rgba(255,255,255,0.25)'
                        : reached
                        ? 'inset 0 1px 0 rgba(255,255,255,0.45), 0 0 18px -2px rgba(56,189,248,0.5)'
                        : undefined,
                    }}
                    title={`${value.toLocaleString()} ml`}
                  >
                    {/* Inner highlight */}
                    {value > 0 && (
                      <span
                        className="absolute inset-x-1 top-0.5 h-3 rounded-t-xl pointer-events-none"
                        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4), transparent)' }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>

                <div
                  className={[
                    'text-[0.7rem] font-semibold truncate px-2 py-0.5 rounded-full',
                    isToday ? 'text-aqua-light bg-aqua/10 border border-aqua/20' : 'text-ink-subtle',
                  ].join(' ')}
                >
                  {dayLabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <StatCard
          icon={<AvgIcon />}
          label={t('history.avg')}
          value={avg.toLocaleString()}
          unit="ml"
          tone="aqua"
        />
        <StatCard
          icon={<FlameIcon />}
          label={t('history.streak')}
          value={streak}
          unit={streakUnit}
          tone="marine"
        />
      </div>
    </section>
  );
}

function StatCard({ icon, label, value, unit, tone = 'aqua' }) {
  const accent =
    tone === 'marine'
      ? { ring: 'text-marine-light', glow: 'rgba(45, 212, 191, 0.35)' }
      : { ring: 'text-aqua-light', glow: 'rgba(56, 189, 248, 0.35)' };

  return (
    <div className="stat-tile flex items-center gap-3">
      <div
        className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center ${accent.ring}`}
        style={{
          background: `radial-gradient(circle at 30% 30%, ${accent.glow} 0%, rgba(255,255,255,0.04) 70%)`,
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[0.66rem] tracking-[0.14em] uppercase text-ink-subtle font-semibold truncate">
          {label}
        </div>
        <div className="font-heading font-bold text-[1.15rem] mt-0.5 leading-none tabular-nums">
          {value}
          <span className="text-ink-muted text-[0.74rem] font-normal ml-1">{unit}</span>
        </div>
      </div>
    </div>
  );
}

function AvgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 17 L8 12 L12 14 L16 8 L21 11" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2 C 12 6, 8 7, 8 12 C 8 16, 10 17, 11 17 C 10 15, 11 13, 13 12 C 13 14, 15 14, 15 16 C 16 14, 17 13, 17 12 C 17 7, 13 6, 12 2 Z" opacity="0.95" />
      <path d="M12 17 C 9 17, 7 19, 7 21 C 9 21.5, 11 21, 12 21 C 13 21, 15 21.5, 17 21 C 17 19, 15 17, 12 17 Z" opacity="0.5" />
    </svg>
  );
}
