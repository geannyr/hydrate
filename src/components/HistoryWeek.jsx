import { useI18n } from '../i18n';
import { lastNDaysKeys, formatDayLabel, calcStreak, todayKey, clamp } from '../utils.js';

export default function HistoryWeek({ history, goal }) {
  const { t, lang } = useI18n();
  const days = lastNDaysKeys(7);
  const today = todayKey();

  const values = days.map((key) => history[key] || 0);
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
    <section className="sketch-card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-[1.5rem] text-ink leading-none">
          <span className="marker-mint">{t('history.title')}</span>
        </h3>
      </div>

      {/* Bullet-journal habit tracker — 7 mini droplets in a row */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5 mb-5">
        {days.map((key, idx) => {
          const value = values[idx];
          const pct = clamp(goal > 0 ? (value / goal) * 100 : 0, 0, 100);
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
            <div
              key={key}
              className={[
                'flex flex-col items-center gap-1.5',
                idx % 2 === 0 ? 'tilt-mini' : '',
              ].join(' ')}
              title={`${value.toLocaleString()} ml`}
            >
              <HabitDroplet
                keyId={key}
                pct={pct}
                reached={reached}
                isToday={isToday}
                value={value}
                empty={value === 0}
              />
              <div
                className={[
                  'font-hand text-[0.78rem] sm:text-[0.88rem] text-center leading-tight max-w-full',
                  isToday ? 'text-ink font-bold' : value === 0 ? 'text-ink-subtle' : 'text-ink-muted',
                ].join(' ')}
              >
                {isToday ? (
                  <span className="bg-butter-soft px-1.5 py-0.5 rounded-md inline-block">
                    {dayLabel}
                  </span>
                ) : (
                  dayLabel
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend — tiny visual key */}
      <div className="flex items-center justify-center gap-4 mb-5 font-hand text-[0.85rem] text-ink-muted">
        <LegendDot state="empty" label={t('history.legendEmpty')} />
        <LegendDot state="partial" label={t('history.legendPartial')} />
        <LegendDot state="full" label={t('history.legendFull')} />
      </div>

      {/* Stats — average + streak */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SketchStat
          label={t('history.avg')}
          value={avg.toLocaleString()}
          unit="ml"
          variant="v2"
          tone="water"
          icon={<TrendIcon />}
        />
        <SketchStat
          label={t('history.streak')}
          value={streak}
          unit={streakUnit}
          variant="v3"
          tone="mint"
          icon={<HeartIcon />}
        />
      </div>
    </section>
  );
}

function LegendDot({ state, label }) {
  const fill =
    state === 'empty' ? 'transparent'
    : state === 'partial' ? 'var(--water-soft)'
    : 'var(--mint-soft)';
  const dash = state === 'empty' ? '2.5 2.5' : undefined;
  const opacity = state === 'empty' ? 0.5 : 0.9;
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <svg width="14" height="16" viewBox="0 0 22 24" aria-hidden="true">
        <path
          d="M11 2 C 6 9, 3 14, 4 17 C 5 20, 8 22, 11 22 C 14 22, 17 20, 18 17 C 19 14, 16 9, 11 2 Z"
          fill={fill}
          stroke="var(--ink)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeDasharray={dash}
          opacity={opacity}
          style={{ filter: 'url(#sketch-soft)' }}
        />
        {state === 'full' && (
          <path d="M11 0 L 13 5 L 9 5 Z" fill="var(--blush)" stroke="var(--ink)" strokeWidth="0.9" />
        )}
      </svg>
      <span>{label}</span>
    </span>
  );
}

/**
 * A single day cell: small droplet that fills with baby-blue water dots
 * based on progress. Mint when goal reached. Empty = dashed faint outline.
 */
function HabitDroplet({ keyId, pct, reached, isToday, value, empty }) {
  const DROP = 'M22 3 C 14 13, 7 22, 8 28 C 9 35, 15 39, 22 39 C 29 39, 35 35, 36 28 C 37 22, 30 13, 22 3 Z';
  const surfaceY = 40 - (40 * pct) / 100;
  const clipId = `hclip-${keyId}`;

  return (
    <div className="relative">
      <svg viewBox="0 0 44 44" width="100%" style={{ maxWidth: 58 }} aria-label={`${value.toLocaleString()} ml`}>
        <defs>
          <clipPath id={clipId}>
            <path d={DROP} />
          </clipPath>
        </defs>

        {/* Today background ring — soft butter halo */}
        {isToday && (
          <circle
            cx="22" cy="22" r="20"
            fill="var(--butter-soft)"
            opacity="0.55"
          />
        )}

        {/* Empty drop background */}
        {!empty && (
          <path
            d={DROP}
            fill={reached ? 'var(--mint-soft)' : 'var(--water-soft)'}
          />
        )}

        {/* Filled portion (water rising) */}
        {!empty && !reached && (
          <g clipPath={`url(#${clipId})`}>
            <rect x="0" y={surfaceY} width="44" height="44" fill="var(--water-soft)" />
            <g style={{ color: 'var(--water-deep)' }}>
              <rect x="0" y={surfaceY} width="44" height="44" fill="url(#dots-water-dense)" opacity="0.55" />
            </g>
          </g>
        )}

        {/* Dotted overlay on full state for visual richness */}
        {reached && (
          <g clipPath={`url(#${clipId})`} style={{ color: 'var(--mint-deep)' }}>
            <rect x="0" y="0" width="44" height="44" fill="url(#dots-water-dense)" opacity="0.4" />
          </g>
        )}

        {/* Outline */}
        <path
          d={DROP}
          fill="none"
          stroke={empty ? 'var(--ink-muted)' : reached ? 'var(--mint-deep)' : 'var(--ink)'}
          strokeWidth={reached ? 2.1 : isToday ? 2 : 1.7}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray={empty ? '3 3' : undefined}
          opacity={empty ? 0.5 : 0.95}
          style={{ filter: 'url(#sketch-2)' }}
        />

        {/* Cute heart on top when goal reached */}
        {reached && (
          <g transform="translate(15, -5)" style={{ filter: 'url(#sketch-soft)' }}>
            <path
              d="M7 12 L 2 7 C 0 5, 2 1, 5 3 L 7 5 L 9 3 C 12 1, 14 5, 12 7 L 7 12 Z"
              fill="var(--blush)"
              stroke="var(--ink)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </g>
        )}
      </svg>

      {/* Today value badge — shown below today's drop for quick reading */}
      {isToday && value > 0 && (
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 font-label font-bold text-[0.7rem] text-ink whitespace-nowrap px-1.5 py-0.5 rounded-full"
          style={{
            background: 'var(--paper)',
            border: '1.2px solid var(--ink)',
            boxShadow: '1.5px 1.5px 0 rgba(90, 74, 54, 0.35)',
          }}
        >
          {value.toLocaleString()}
        </div>
      )}
    </div>
  );
}

function SketchStat({ label, value, unit, variant = 'v1', tone = 'water', icon }) {
  return (
    <div className={`sketch-card ${variant} tone-${tone} flex items-center gap-3`} style={{ padding: '0.9rem 1.05rem' }}>
      <div className="shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="font-label text-[0.85rem] text-ink-muted leading-none">{label}</div>
        <div className="font-display font-bold text-[1.55rem] text-ink leading-none mt-1">
          {value}
          <span className="font-hand text-[0.85rem] text-ink-muted ml-1">{unit}</span>
        </div>
      </div>
    </div>
  );
}

function TrendIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" style={{ filter: 'url(#sketch-2)' }}>
      <path
        d="M3 21 L 9 14 L 14 16 L 19 9 L 25 12"
        stroke="var(--ink)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="19" cy="9" r="2.2" fill="var(--butter)" stroke="var(--ink)" strokeWidth="1.1" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" style={{ filter: 'url(#sketch-2)' }}>
      <path
        d="M14 23 L 5 14 C 2 11, 6 4, 10 7 L 14 11 L 18 7 C 22 4, 26 11, 23 14 L 14 23 Z"
        fill="var(--blush)"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
