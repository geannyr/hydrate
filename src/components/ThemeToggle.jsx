import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';

const THEME_KEY = 'hydrate.theme';

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (_) {}
  return 'light';
}

export default function ThemeToggle() {
  const { t } = useI18n();
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light', theme === 'light');
    root.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#1e2127' : '#faf6ec');
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((p) => (p === 'dark' ? 'light' : 'dark'))}
      aria-label={t('a11y.toggleTheme')}
      className="sketch-icon-btn"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'url(#sketch-soft)' }}>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3 V 5.5 M12 18.5 V 21 M3 12 H 5.5 M18.5 12 H 21 M5.5 5.5 L 7.3 7.3 M16.7 16.7 L 18.5 18.5 M5.5 18.5 L 7.3 16.7 M16.7 7.3 L 18.5 5.5" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'url(#sketch-soft)' }}>
      <path d="M20 14 A 8 8 0 0 1 10 4 A 8 8 0 1 0 20 14 Z" />
    </svg>
  );
}
