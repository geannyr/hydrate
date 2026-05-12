import { FiSettings, FiArrowLeft } from 'react-icons/fi';
import { useI18n } from '../i18n';
import LangSwitcher from './LangSwitcher';
import ThemeToggle from './ThemeToggle';
import InstallButton from './InstallButton';

export default function TopBar({ onOpenSettings }) {
  const { t } = useI18n();
  return (
    <header className="flex items-center justify-between gap-3 mb-8 sm:mb-10">
      <div className="flex items-center gap-3 min-w-0">
        <Brand />
        <a
          href="https://geannyr.github.io/curriculo2/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.74rem] font-medium text-ink-subtle hover:text-ink-text border border-ink-border hover:border-ink-border-hover transition-all"
        >
          <FiArrowLeft size={12} />
          {t('portfolio')}
        </a>
      </div>

      <div className="flex items-center gap-1.5">
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

function Brand() {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-aqua/40 blur-md motion-safe:animate-pulse-soft" aria-hidden="true" />
        <div
          className="relative w-9 h-9 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0284c7 100%)',
            boxShadow: '0 4px 14px rgba(56, 189, 248, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.45)',
          }}
        >
          <DropletGlyph />
        </div>
      </div>
      <div className="leading-tight">
        <div className="font-heading font-bold text-[1.05rem] tracking-tight text-ink-text">
          {t('app.brand')}
        </div>
        <div className="text-[0.66rem] font-medium tracking-[0.18em] uppercase text-ink-subtle hidden xs:block">
          {t('app.tagline')}
        </div>
      </div>
    </div>
  );
}

function DropletGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2 C 8 7, 5 11, 5 15 a 7 7 0 0 0 14 0 c 0 -4 -3 -8 -7 -13 z"
        fill="rgba(255, 255, 255, 0.95)"
      />
      <ellipse cx="9.5" cy="9" rx="1.4" ry="3" fill="rgba(255, 255, 255, 0.7)" transform="rotate(-20 9.5 9)" />
    </svg>
  );
}
