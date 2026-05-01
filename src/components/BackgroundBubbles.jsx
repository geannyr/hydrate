/**
 * Decorative bubbles drifting upward across the viewport.
 * Pure CSS animation — fixed-positioned, behind the app.
 * Hidden when the user prefers reduced motion.
 */
const BUBBLES = [
  { left: '4%',  size: 64,  delay: 0,    dur: 28, opacity: 0.55 },
  { left: '12%', size: 28,  delay: 5,    dur: 22, opacity: 0.45 },
  { left: '20%', size: 48,  delay: 12,   dur: 34, opacity: 0.4  },
  { left: '85%', size: 80,  delay: 2,    dur: 32, opacity: 0.45 },
  { left: '93%', size: 36,  delay: 9,    dur: 26, opacity: 0.5  },
  { left: '78%', size: 22,  delay: 16,   dur: 24, opacity: 0.5  },
  { left: '50%', size: 18,  delay: 7,    dur: 30, opacity: 0.35 },
];

export default function BackgroundBubbles() {
  return (
    <div
      aria-hidden="true"
      className="motion-safe:block motion-reduce:hidden pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-aqua/10 backdrop-blur-3xl animate-bubble-rise"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            animationDelay: `-${b.delay}s`,
            animationDuration: `${b.dur}s`,
            background:
              'radial-gradient(circle at 30% 30%, rgba(125, 211, 252, 0.35) 0%, rgba(56, 189, 248, 0.12) 60%, transparent 100%)',
            border: '1px solid rgba(125, 211, 252, 0.2)',
          }}
        />
      ))}
    </div>
  );
}
