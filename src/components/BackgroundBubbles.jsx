/**
 * Decorative bubbles drifting upward across the viewport.
 * Pure CSS animation — fixed-positioned, behind the app.
 * Hidden when the user prefers reduced motion.
 */
const BUBBLES = [
  { left: '4%',  size: 64,  delay: 0,    dur: 28, opacity: 0.5, tone: 'aqua' },
  { left: '12%', size: 28,  delay: 5,    dur: 22, opacity: 0.45, tone: 'aqua' },
  { left: '22%', size: 48,  delay: 12,   dur: 34, opacity: 0.4, tone: 'iris' },
  { left: '38%', size: 18,  delay: 18,   dur: 26, opacity: 0.3, tone: 'aqua' },
  { left: '52%', size: 22,  delay: 7,    dur: 30, opacity: 0.4, tone: 'marine' },
  { left: '68%', size: 36,  delay: 14,   dur: 24, opacity: 0.45, tone: 'aqua' },
  { left: '78%', size: 22,  delay: 16,   dur: 24, opacity: 0.5, tone: 'iris' },
  { left: '86%', size: 80,  delay: 2,    dur: 32, opacity: 0.42, tone: 'aqua' },
  { left: '95%', size: 30,  delay: 9,    dur: 26, opacity: 0.45, tone: 'marine' },
];

const TONE_BG = {
  aqua: 'radial-gradient(circle at 30% 30%, rgba(125, 211, 252, 0.4) 0%, rgba(56, 189, 248, 0.14) 60%, transparent 100%)',
  iris: 'radial-gradient(circle at 30% 30%, rgba(196, 181, 253, 0.32) 0%, rgba(167, 139, 250, 0.1) 60%, transparent 100%)',
  marine: 'radial-gradient(circle at 30% 30%, rgba(94, 234, 212, 0.35) 0%, rgba(45, 212, 191, 0.1) 60%, transparent 100%)',
};

const TONE_BORDER = {
  aqua: 'rgba(125, 211, 252, 0.22)',
  iris: 'rgba(196, 181, 253, 0.22)',
  marine: 'rgba(94, 234, 212, 0.22)',
};

export default function BackgroundBubbles() {
  return (
    <div
      aria-hidden="true"
      className="motion-safe:block motion-reduce:hidden pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="absolute block rounded-full backdrop-blur-3xl animate-bubble-rise"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            animationDelay: `-${b.delay}s`,
            animationDuration: `${b.dur}s`,
            background: TONE_BG[b.tone],
            border: `1px solid ${TONE_BORDER[b.tone]}`,
          }}
        />
      ))}
    </div>
  );
}
