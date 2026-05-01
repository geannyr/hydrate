import { useI18n } from '../i18n';
import { clamp } from '../utils.js';

/**
 * Hero with an animated water drop that fills based on progress.
 * The wave inside the drop is a clipped SVG path that translates horizontally.
 */
export default function WaterHero({ current, goal }) {
  const { t } = useI18n();
  const pct = clamp(goal > 0 ? (current / goal) * 100 : 0, 0, 100);
  const remaining = Math.max(goal - current, 0);
  const reached = current >= goal && goal > 0;

  // Drop shape (M..Z) — also used as clipPath for the wave
  // viewBox 200x240; drop centered at (100, 130), radius ~80
  const DROP_PATH = 'M100 18 C 60 70, 30 110, 30 150 a 70 70 0 0 0 140 0 c 0 -40 -30 -80 -70 -132 z';

  return (
    <section className="glass-strong rounded-5xl p-8 mb-6 text-center animate-fade-in relative overflow-hidden">
      {/* Decorative blur halo */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-aqua/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 w-56 h-56 rounded-full bg-aqua-deep/20 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-[220px] h-[260px] mb-6">
          <svg viewBox="0 0 200 240" className="w-full h-full" aria-hidden="true">
            <defs>
              <clipPath id="drop-clip">
                <path d={DROP_PATH} />
              </clipPath>
              <linearGradient id="drop-stroke" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="water-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="water-fill-2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#075985" />
              </linearGradient>
            </defs>

            {/* Drop background (subtle inner) */}
            <path
              d={DROP_PATH}
              fill="rgba(56, 189, 248, 0.06)"
              stroke="url(#drop-stroke)"
              strokeWidth="1.5"
            />

            {/* Water fill, clipped by drop. Positioned by translate-y based on pct. */}
            <g clipPath="url(#drop-clip)">
              {/* Fill rectangle */}
              <rect
                x="-200"
                y={240 - (240 * pct) / 100}
                width="800"
                height="240"
                fill="url(#water-fill)"
                style={{ transition: 'y 0.8s cubic-bezier(0.22, 1, 0.36, 1)' }}
              />
              {/* Wave on top — duplicated to enable seamless looping translate */}
              <g
                className="animate-wave"
                style={{
                  transform: `translateY(${240 - (240 * pct) / 100 - 8}px)`,
                  transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <path
                  d="M0 12 Q 25 0, 50 12 T 100 12 T 150 12 T 200 12 T 250 12 T 300 12 T 350 12 T 400 12 V 30 H 0 Z"
                  fill="url(#water-fill-2)"
                  opacity="0.85"
                />
              </g>
              {/* Slower wave layer for parallax */}
              <g
                className="animate-wave-slow"
                style={{
                  transform: `translateY(${240 - (240 * pct) / 100 - 4}px)`,
                  transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <path
                  d="M0 12 Q 30 4, 60 12 T 120 12 T 180 12 T 240 12 T 300 12 T 360 12 T 420 12 V 30 H 0 Z"
                  fill="rgba(125, 211, 252, 0.55)"
                />
              </g>
            </g>

            {/* Highlight ellipse */}
            <ellipse
              cx="76"
              cy="80"
              rx="10"
              ry="22"
              fill="rgba(255,255,255,0.25)"
              transform="rotate(-20 76 80)"
            />
          </svg>

          {/* Percent label centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="font-heading font-bold text-[2.6rem] leading-none drop-shadow-md text-white"
                 style={{ textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}>
              {Math.round(pct)}%
            </div>
            <div className="text-[0.78rem] text-white/85 font-semibold tracking-wide mt-1">
              {current.toLocaleString()} / {goal.toLocaleString()} ml
            </div>
          </div>
        </div>

        <p className="font-heading font-semibold text-[1.1rem] text-balance">
          {reached
            ? t('home.goalReached')
            : pct >= 75
            ? t('home.almostThere')
            : t('home.keepGoing')}
        </p>
        <p className="text-ink-muted text-[0.92rem] mt-1">
          {reached
            ? t('home.goalReachedShort')
            : t('home.remaining', { n: remaining.toLocaleString() })}
        </p>
      </div>
    </section>
  );
}
