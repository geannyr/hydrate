/**
 * Cute pastel doodles scattered as page marginalia.
 * Hearts, drops, stars, sparkles in soft pastel colors at low opacity.
 * Hidden on small screens to keep the layout breathable.
 */
const DOODLES = [
  { top: '10%', left: '3%', kind: 'heart',   color: 'var(--blush)',   size: 26, rot: -10 },
  { top: '24%', left: '5%', kind: 'sparkle', color: 'var(--butter)',  size: 22, rot: 6 },
  { top: '46%', left: '2%', kind: 'drop',    color: 'var(--water)',   size: 28, rot: -4 },
  { top: '68%', left: '4%', kind: 'star',    color: 'var(--lilac)',   size: 26, rot: 12 },
  { bottom: '8%', left: '6%', kind: 'cloud', color: 'var(--mint)',    size: 38, rot: -6 },
  { top: '8%', right: '4%', kind: 'cloud',   color: 'var(--peach)',   size: 40, rot: 8 },
  { top: '32%', right: '3%', kind: 'heart',  color: 'var(--blush)',   size: 22, rot: 14 },
  { top: '54%', right: '4%', kind: 'star',   color: 'var(--butter)',  size: 28, rot: -10 },
  { bottom: '18%', right: '3%', kind: 'sparkle', color: 'var(--lilac)', size: 22, rot: 4 },
  { bottom: '5%', right: '8%', kind: 'drop', color: 'var(--water)',   size: 24, rot: 16 },
];

export default function BackgroundBubbles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {DOODLES.map((d, i) => (
        <span
          key={i}
          className="absolute hidden md:block motion-safe:animate-pulse-soft"
          style={{
            top: d.top,
            left: d.left,
            right: d.right,
            bottom: d.bottom,
            width: d.size,
            height: d.size,
            transform: `rotate(${d.rot}deg)`,
            opacity: 0.45,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          <Doodle kind={d.kind} color={d.color} />
        </span>
      ))}
    </div>
  );
}

function Doodle({ kind, color }) {
  const stroke = {
    fill: color,
    fillOpacity: 0.4,
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: { filter: 'url(#sketch-soft)' },
  };
  const line = { ...stroke, fill: 'none', fillOpacity: 0 };

  if (kind === 'heart') {
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d="M12 20 L 4 12 C 1 9, 5 3, 9 6 L 12 9 L 15 6 C 19 3, 23 9, 20 12 L 12 20 Z" {...stroke} />
      </svg>
    );
  }
  if (kind === 'star') {
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d="M12 3 L 14 10 L 21 11 L 15.5 15.5 L 17 22 L 12 18 L 7 22 L 8.5 15.5 L 3 11 L 10 10 Z" {...stroke} />
      </svg>
    );
  }
  if (kind === 'drop') {
    return (
      <svg viewBox="0 0 24 28" width="100%" height="100%">
        <path d="M12 2 C 7 9, 4 14, 5 17 C 6 20, 9 22, 12 22 C 15 22, 18 20, 19 17 C 20 14, 17 9, 12 2 Z" {...stroke} />
      </svg>
    );
  }
  if (kind === 'sparkle') {
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d="M12 3 V 21 M3 12 H 21 M5.5 5.5 L 18.5 18.5 M5.5 18.5 L 18.5 5.5" {...line} strokeWidth="1.4" />
      </svg>
    );
  }
  // cloud
  return (
    <svg viewBox="0 0 60 40" width="100%" height="100%">
      <path d="M12 30 C 6 30, 4 22, 10 20 C 10 14, 18 12, 22 16 C 26 10, 38 12, 40 20 C 48 18, 54 26, 50 32 Z" {...stroke} />
    </svg>
  );
}
