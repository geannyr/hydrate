import { FiSettings } from 'react-icons/fi';
import { useI18n } from '../i18n';
import LangSwitcher from './LangSwitcher';
import ThemeToggle from './ThemeToggle';
import InstallButton from './InstallButton';

export default function TopBar({ onOpenSettings }) {
  const { t } = useI18n();
  return (
    <header className="flex items-center justify-between gap-3 mb-8">
      <a
        href="https://geannyr.github.io/curriculo2/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.78rem] font-medium text-ink-subtle hover:text-ink-text hover:bg-ink-surface transition-all"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {t('portfolio')}
      </a>

      <div className="flex items-center gap-2">
        <InstallButton />
        <ThemeToggle />
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label={t('a11y.openSettings')}
          className="icon-btn"
        >
          <FiSettings size={18} />
        </button>
        <LangSwitcher />
      </div>
    </header>
  );
}
