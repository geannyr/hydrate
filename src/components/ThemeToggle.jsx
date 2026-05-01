import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useI18n } from '../i18n';

const THEME_KEY = 'hydrate.theme';

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (_) {}
  return 'dark';
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
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a1525' : '#dbeefb');
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((p) => (p === 'dark' ? 'light' : 'dark'))}
      aria-label={t('a11y.toggleTheme')}
      className="icon-btn"
    >
      {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}
