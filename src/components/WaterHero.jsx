import { useI18n } from '../i18n';
import { clamp } from '../utils.js';

/**
 * Water-drop hero. The drop is filled with a wave (clipped SVG) that rises
 * with the daily progress. Subtle bubbles drift upward inside the liquid.
 */
export default function WaterHero({ current, goal }) {
  const { t } = useI18n();
  const pct = clamp(goal > 0 ? (current / goal) * 100 : 0, 0, 100);
  const remaining = Math.max(goal - current, 0);
  const reached = current >= goal && goal > 0;

  // Drop path drawn in viewBox 200×240, used both for stroke and clip.
  const DROP_PATH =
    'M100 18 C 60 70, 30 110, 30 150 a 70 70 0 0 0 140 0 c 0 -40 -30 -80 -70 -132 z';

  // Water surface y (the lower the % the higher the value)
  const surfaceY = 240 - (240 * pct) / 100;

  return (
    <section className="glass-strong rounded-5xl p-7 sm:p-9 mb-6 text-center animate-fade-in relative overflow-hidden">
      {/* decorative halos */}
      <div className="pointer-events-none absolute -top-24 -right-20 w-72 h-72 rounded-full bg-aqua/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 w-72 h-72 rounded-full bg-aqua-deep/25 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-[260px] h-[300px] sm:w-[280px] sm:h-[320px] mb-7">
          {/* outer aura behind the drop */}
          <div
            className="absolute inset-4 rounded-full blur-3xl opacity-60 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(56,189,248,0.55) 0%, rgba(56,189,248,0) 70%)',
            }}
          />

          <svg viewBox="0 0 200 240" className="relative w-full h-full" aria-hidden="true">
            <defs>
              <clipPath id="drop-clip">
                <path d={DROP_PATH} />
              </clipPath>
              <linearGradient id="drop-stroke" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="water-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
              <linearGradient id="water-fill-2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#075985" />
              </linearGradient>
              <linearGradient id="drop-bg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(125, 211, 252, 0.06)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0.10)" />
              </linearGradient>
            </defs>

            {/* drop background */}
            <path
              d={DROP_PATH}
              fill="url(#drop-bg)"
              stroke="url(#drop-stroke)"
              strokeWidth="1.8"
            />

            {/* water + waves + bubbles, all clipped to drop shape */}
            <g clipPath="url(#drop-clip)">
              {/* solid water fill */}
              <rect
                x="-200"
                y={surfaceY}
                width="800"
                height="240"
                fill="url(#water-fill)"
                style={{ transition: 'y 0.9s cubic-bezier(0.22, 1, 0.36, 1)' }}
              />

              {/* back wave (slower, more transparent) */}
              <g
                className="animate-wave-slow"
                style={{
                  transform: `translateY(${surfaceY - 6}px)`,
                  transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <path
                  d="M0 12 Q 30 4, 60 12 T 120 12 T 180 12 T 240 12 T 300 12 T 360 12 T 420 12 V 30 H 0 Z"
                  fill="rgba(186, 230, 253, 0.55)"
                />
              </g>

              {/* front wave */}
              <g
                className="animate-wave"
                style={{
                  transform: `translateY(${surfaceY - 10}px)`,
                  transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <path
                  d="M0 14 Q 25 0, 50 14 T 100 14 T 150 14 T 200 14 T 250 14 T 300 14 T 350 14 T 400 14 V 30 H 0 Z"
                  fill="url(#water-fill-2)"
                  opacity="0.92"
                />
              </g>

              {/* bubbles drifting up inside the water */}
              {pct > 8 && (
                <g>
                  <circle cx="65" cy="200" r="3" fill="rgba(255,255,255,0.55)">
                    <animate attributeName="cy" values="210;60" dur="6.5s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="65;72;60;68" dur="6.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.6;0.6;0" keyTimes="0;0.15;0.85;1" dur="6.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="125" cy="220" r="2" fill="rgba(255,255,255,0.5)">
                    <animate attributeName="cy" values="230;70" dur="8s" begin="-2s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="125;132;120;128" dur="8s" begin="-2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.55;0.55;0" keyTimes="0;0.15;0.85;1" dur="8s" begin="-2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="100" cy="215" r="2.5" fill="rgba(255,255,255,0.5)">
                    <animate attributeName="cy" values="225;65" dur="10s" begin="-4s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="100;94;108;100" dur="10s" begin="-4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.5;0.5;0" keyTimes="0;0.15;0.85;1" dur="10s" begin="-4s" repeatCount="indefinite" />
                  </circle>
                </g>
              )}
            </g>

            {/* subtle highlight on the drop body */}
            <ellipse
              cx="74"
              cy="78"
              rx="9"
              ry="22"
              fill="rgba(255,255,255,0.30)"
              transform="rotate(-22 74 78)"
            />
            {/* tip glint */}
            <circle cx="100" cy="22" r="3" fill="rgba(255,255,255,0.6)" />
          </svg>

          {/* center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div
              className="font-heading font-bold text-[2.9rem] sm:text-[3.1rem] leading-none tracking-tight text-white"
              style={{ textShadow: '0 2px 16px rgba(8,38,68,0.55), 0 0 4px rgba(8,38,68,0.4)' }}
            >
              {Math.round(pct)}%
            </div>
            <div
              className="text-[0.84rem] text-white font-semibold tracking-wide mt-1.5 px-3 py-1 rounded-full"
              style={{
                background: 'rgba(8, 38, 68, 0.32)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            >
              {current.toLocaleString()} / {goal.toLocaleString()} ml
            </div>
          </div>
        </div>

        <p className="font-heading font-semibold text-[1.18rem] text-balance">
          {reached
            ? t('home.goalReached')
            : pct >= 75
            ? t('home.almostThere')
            : t('home.keepGoing')}
        </p>
        <p className="text-ink-muted text-[0.94rem] mt-1.5">
          {reached
            ? t('home.goalReachedShort')
            : t('home.remaining', { n: remaining.toLocaleString() })}
        </p>
      </div>
    </section>
  );
}
