import { useI18n } from '../i18n';
import { clamp } from '../utils.js';
import { usePrefersReducedMotion } from '../hooks';

/**
 * Cute hand-drawn water drop. Pastel baby-blue fill that rises with progress,
 * polka-dotted instead of cross-hatched, with surrounding sparkles and hearts.
 */
export default function WaterHero({ current, goal, celebrating }) {
  const { t } = useI18n();
  const reducedMotion = usePrefersReducedMotion();
  const pct = clamp(goal > 0 ? (current / goal) * 100 : 0, 0, 100);
  const remaining = Math.max(goal - current, 0);
  const reached = current >= goal && goal > 0;

  const DROP_OUTLINE =
    'M100 18 C 60 70, 32 110, 34 152 C 35 191, 66 220, 100 220 C 135 220, 166 192, 166 152 C 166 110, 140 70, 100 18 Z';
  const surfaceY = 240 - (240 * pct) / 100;

  const statusLabel = reached
    ? t('home.goalReached')
    : pct >= 75
    ? t('home.almostThere')
    : t('home.keepGoing');

  return (
    <section className="sketch-card v2 p-6 sm:p-9 mb-6 lg:mb-0 text-center animate-fade-in relative overflow-hidden">
      {/* Cute scattered decorations */}
      <Decor top="6%"   left="6%"  rot={-10} type="heart"  color="var(--blush)"  size={20} />
      <Decor top="8%"   right="8%" rot={14}  type="star"   color="var(--butter)" size={22} />
      <Decor top="38%"  left="4%"  rot={-4}  type="sparkle" color="var(--lilac)" size={18} />
      <Decor top="50%"  right="5%" rot={6}   type="droplet" color="var(--water-deep)" size={16} />
      <Decor bottom="14%" left="6%" rot={8}  type="star"   color="var(--mint-deep)" size={16} />
      <Decor bottom="6%"  right="10%" rot={-6} type="heart" color="var(--peach)" size={18} />

      <div className="relative z-10 flex flex-col items-center">
        {/* "Today" badge — like a washi tape label */}
        <div className="relative inline-block mb-4 tilt-left">
          <span className="font-label font-bold text-[0.95rem] text-ink px-3 py-0.5 bg-butter-soft rounded-full inline-block">
            ✿ {t('history.today')}
          </span>
        </div>

        {celebrating && <Sparkles />}

        <div
          className={[
            'relative w-[240px] h-[280px] sm:w-[270px] sm:h-[310px] mb-5',
            celebrating ? 'motion-safe:animate-celebrate' : 'motion-safe:animate-float',
          ].join(' ')}
        >
          <svg viewBox="0 0 200 240" className="relative w-full h-full" aria-hidden="true">
            <defs>
              <clipPath id="drop-clip-cute">
                <path d={DROP_OUTLINE} />
              </clipPath>
            </defs>

            {/* Very light wash behind everything */}
            <path d={DROP_OUTLINE} fill="var(--water-soft)" opacity="0.55" />

            {/* Water fill — solid pastel blue rising */}
            <g clipPath="url(#drop-clip-cute)">
              <rect
                x="0"
                y={surfaceY}
                width="200"
                height="240"
                fill="var(--water-soft)"
                style={{ transition: 'y 0.9s cubic-bezier(0.22, 1, 0.36, 1)' }}
              />
              {/* Polka dots inside water — friendlier than hatching */}
              <g style={{ color: 'var(--water-deep)' }}>
                <rect
                  x="0"
                  y={surfaceY}
                  width="200"
                  height="240"
                  fill="url(#dots-water)"
                  opacity="0.55"
                  style={{ transition: 'y 0.9s cubic-bezier(0.22, 1, 0.36, 1)' }}
                />
              </g>

              {/* Wavy surface — soft */}
              <g
                className={reducedMotion ? '' : 'animate-wave-slow'}
                style={{
                  transform: `translateY(${surfaceY - 3}px)`,
                  transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <path
                  d="M-10 6 Q 25 -1, 55 6 T 115 6 T 175 6 T 235 6 T 295 6 T 355 6"
                  fill="none"
                  stroke="var(--water-deep)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.85"
                  style={{ filter: 'url(#sketch-2)' }}
                />
              </g>
              <g
                className={reducedMotion ? '' : 'animate-wave'}
                style={{
                  transform: `translateY(${surfaceY + 4}px)`,
                  transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <path
                  d="M-10 6 Q 30 0, 60 6 T 120 6 T 180 6 T 240 6 T 300 6 T 360 6"
                  fill="none"
                  stroke="var(--water-deep)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.55"
                  style={{ filter: 'url(#sketch-3)' }}
                />
              </g>

              {/* Cute bubbles inside */}
              {pct > 8 && (
                <g style={{ filter: 'url(#sketch-soft)' }}>
                  <circle cx="64" cy="195" r="4.5" fill="var(--paper)" stroke="var(--water-deep)" strokeWidth="1.2" opacity="0.9" />
                  <circle cx="118" cy="200" r="2.6" fill="var(--paper)" stroke="var(--water-deep)" strokeWidth="1" opacity="0.8" />
                  <circle cx="146" cy="178" r="3.6" fill="var(--paper)" stroke="var(--water-deep)" strokeWidth="1.1" opacity="0.85" />
                  <circle cx="82" cy="160" r="2.2" fill="var(--paper)" stroke="var(--water-deep)" strokeWidth="1" opacity="0.7" />
                </g>
              )}
            </g>

            {/* Outline pass — warm brown, single soft stroke */}
            <path
              d={DROP_OUTLINE}
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{ filter: 'url(#sketch-1)' }}
              opacity="0.9"
            />

            {/* Smile face — cute! */}
            {pct < 100 ? (
              <g style={{ filter: 'url(#sketch-soft)' }}>
                {/* eyes */}
                <circle cx="80" cy="135" r="2.6" fill="var(--ink)" />
                <circle cx="120" cy="135" r="2.6" fill="var(--ink)" />
                {/* eye highlights */}
                <circle cx="81" cy="134" r="0.8" fill="var(--paper)" />
                <circle cx="121" cy="134" r="0.8" fill="var(--paper)" />
                {/* smile */}
                <path
                  d="M85 150 Q 100 158, 115 150"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                {/* blush */}
                <ellipse cx="68" cy="148" rx="5" ry="3" fill="var(--blush)" opacity="0.55" />
                <ellipse cx="132" cy="148" rx="5" ry="3" fill="var(--blush)" opacity="0.55" />
              </g>
            ) : (
              /* Celebrating face: closed happy eyes ^_^ */
              <g style={{ filter: 'url(#sketch-soft)' }}>
                <path d="M73 135 Q 80 130, 87 135" stroke="var(--ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M113 135 Q 120 130, 127 135" stroke="var(--ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M82 150 Q 100 162, 118 150" stroke="var(--ink)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <ellipse cx="68" cy="148" rx="5.5" ry="3.2" fill="var(--blush)" opacity="0.7" />
                <ellipse cx="132" cy="148" rx="5.5" ry="3.2" fill="var(--blush)" opacity="0.7" />
              </g>
            )}

            {/* Specular highlight */}
            <ellipse
              cx="72"
              cy="68"
              rx="5"
              ry="14"
              fill="var(--paper)"
              opacity="0.85"
              transform="rotate(-22 72 68)"
            />
            <circle cx="92" cy="44" r="2.2" fill="var(--paper)" opacity="0.9" />
          </svg>

          {/* Percentage overlay (above the drop, not centered) */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none">
            <div
              className="relative font-display font-bold text-ink leading-none tilt-mini"
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 2.8rem)',
                background: 'var(--paper)',
                padding: '0.05em 0.5em',
                borderRadius: '999px',
                border: '1.6px solid var(--ink)',
                boxShadow: '2px 2px 0 rgba(90, 74, 54, 0.45)',
              }}
            >
              {Math.round(pct)}%
            </div>
          </div>
        </div>

        {/* Current / goal */}
        <div className="font-hand text-[1.1rem] text-ink-soft mb-3">
          <span className="font-display text-[1.7rem] text-ink leading-none">{current.toLocaleString()}</span>
          <span className="mx-1.5 text-ink-muted">/</span>
          <span className="text-ink-muted">{goal.toLocaleString()} ml</span>
        </div>

        {/* Status text */}
        <p className="font-display font-bold text-[1.7rem] sm:text-[1.85rem] text-ink leading-tight">
          {statusLabel} {reached ? '🎉' : ''}
        </p>
        <p className="font-hand text-[1.05rem] text-ink-muted mt-1">
          {reached
            ? t('home.goalReachedShort')
            : t('home.remaining', { n: remaining.toLocaleString() })}
        </p>

        {/* Sketched progress bar */}
        <div className="w-full max-w-sm mt-6" aria-hidden="true">
          <SketchProgressBar pct={pct} reached={reached} />
          <div className="flex justify-between mt-1.5 font-label text-[0.85rem] text-ink-muted">
            <span>0</span>
            <span>{goal.toLocaleString()} ml</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SketchProgressBar({ pct, reached }) {
  return (
    <svg viewBox="0 0 300 24" width="100%" height="24" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <clipPath id="bar-clip">
          <rect x="2" y="4" width="296" height="16" rx="8" />
        </clipPath>
      </defs>
      <rect
        x="2" y="4" width="296" height="16" rx="8"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="1.6"
        style={{ filter: 'url(#sketch-3)', opacity: 0.9 }}
      />
      <g clipPath="url(#bar-clip)">
        <rect
          x="2"
          y="4"
          width={Math.max(0, (296 * pct) / 100)}
          height="16"
          fill={reached ? 'var(--mint-soft)' : 'var(--water-soft)'}
          rx="8"
        />
        <g style={{ color: reached ? 'var(--mint-deep)' : 'var(--water-deep)' }}>
          <rect
            x="2"
            y="4"
            width={Math.max(0, (296 * pct) / 100)}
            height="16"
            fill="url(#dots-water-dense)"
            opacity="0.55"
          />
        </g>
      </g>
    </svg>
  );
}

function Decor({ top, left, right, bottom, rot = 0, type, color, size = 18 }) {
  const common = {
    fill: 'none',
    stroke: color,
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: { filter: 'url(#sketch-soft)' },
  };
  let content;
  if (type === 'heart') {
    content = (
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d="M12 20 L 4 12 C 1 9, 5 3, 9 6 L 12 9 L 15 6 C 19 3, 23 9, 20 12 L 12 20 Z" {...common} fill={color} fillOpacity="0.55" />
      </svg>
    );
  } else if (type === 'star') {
    content = (
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d="M12 3 L 14 10 L 21 11 L 15.5 15.5 L 17 22 L 12 18 L 7 22 L 8.5 15.5 L 3 11 L 10 10 Z" {...common} fill={color} fillOpacity="0.55" />
      </svg>
    );
  } else if (type === 'sparkle') {
    content = (
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d="M12 3 V 21 M3 12 H 21 M5.5 5.5 L 18.5 18.5 M5.5 18.5 L 18.5 5.5" {...common} strokeWidth="1.4" />
      </svg>
    );
  } else if (type === 'droplet') {
    content = (
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d="M12 2 C 7 9, 4 14, 5 17 C 6 20, 9 22, 12 22 C 15 22, 18 20, 19 17 C 20 14, 17 9, 12 2 Z" {...common} fill={color} fillOpacity="0.5" />
      </svg>
    );
  } else {
    content = null;
  }

  return (
    <span
      aria-hidden="true"
      className="absolute pointer-events-none motion-safe:animate-pulse-soft"
      style={{ top, left, right, bottom, width: size, height: size, transform: `rotate(${rot}deg)` }}
    >
      {content}
    </span>
  );
}

function Sparkles() {
  const POSITIONS = [
    { top: '4%', left: '12%', size: 18, delay: 0, color: 'var(--butter)' },
    { top: '10%', right: '14%', size: 22, delay: 0.2, color: 'var(--blush)' },
    { top: '42%', left: '2%', size: 16, delay: 0.5, color: 'var(--mint-deep)' },
    { top: '48%', right: '4%', size: 18, delay: 0.7, color: 'var(--lilac)' },
    { bottom: '8%', left: '14%', size: 14, delay: 0.3, color: 'var(--peach)' },
    { bottom: '12%', right: '20%', size: 20, delay: 0.6, color: 'var(--water-deep)' },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {POSITIONS.map((p, i) => (
        <span
          key={i}
          className="absolute motion-safe:animate-sparkle"
          style={{ top: p.top, left: p.left, right: p.right, bottom: p.bottom, width: p.size, height: p.size, animationDelay: `${p.delay}s` }}
          aria-hidden="true"
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2" strokeLinecap="round" style={{ filter: 'url(#sketch-soft)' }}>
            <path d="M12 3 V 21 M3 12 H 21 M5.5 5.5 L 18.5 18.5 M18.5 5.5 L 5.5 18.5" />
          </svg>
        </span>
      ))}
    </div>
  );
}
