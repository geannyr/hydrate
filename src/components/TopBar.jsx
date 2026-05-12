import { useI18n } from '../i18n';
import LangSwitcher from './LangSwitcher';
import ThemeToggle from './ThemeToggle';
import InstallButton from './InstallButton';

export default function TopBar({ onOpenSettings }) {
  const { t } = useI18n();
  return (
    <header className="flex items-center justify-between gap-3 mb-7 sm:mb-10">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <Brand />
        <a
          href="https://geannyr.github.io/curriculo2/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-1.5 font-label text-[0.95rem] text-ink-muted hover:text-ink transition-colors shrink-0"
        >
          <ArrowLeftSketch />
          <span>{t('portfolio')}</span>
        </a>
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <InstallButton />
        <ThemeToggle />
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label={t('a11y.openSettings')}
          className="sketch-icon-btn"
        >
          <GearSketch />
        </button>
        <LangSwitcher />
      </div>
    </header>
  );
}

function Brand() {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
      <DropletBrand />
      <div className="leading-none min-w-0">
        <div className="font-display font-bold text-[1.7rem] sm:text-[2.1rem] lg:text-[2.3rem] text-ink leading-none truncate">
          {t('app.brand')}
        </div>
        <div className="hidden sm:block font-hand text-[0.92rem] text-ink-muted mt-0.5 truncate">
          {t('app.tagline')}
        </div>
      </div>
    </div>
  );
}

function DropletBrand() {
  return (
    <span className="relative inline-block shrink-0">
      <svg width="40" height="44" viewBox="0 0 46 50" className="sm:w-[46px] sm:h-[50px]" aria-hidden="true">
        <path
          d="M23 4 C 14 16, 6 26, 7 32 C 8 41, 16 46, 23 46 C 30 46, 39 41, 39 32 C 39 25, 31 16, 23 4 Z"
          fill="var(--water-soft)"
          stroke="var(--ink)"
          strokeWidth="1.8"
          strokeLinejoin="round"
          style={{ filter: 'url(#sketch-1)', opacity: 0.95 }}
        />
        <ellipse cx="18" cy="22" rx="2.2" ry="5" fill="var(--paper)" opacity="0.85" transform="rotate(-20 18 22)" />
        <circle cx="20" cy="32" r="1" fill="var(--ink)" />
        <circle cx="26" cy="32" r="1" fill="var(--ink)" />
        <path d="M21 36 Q 23 38, 25 36" stroke="var(--ink)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </svg>
      <span className="absolute -top-1 -right-1" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 14 14" className="sm:w-[14px] sm:h-[14px]">
          <path d="M7 1 V 13 M1 7 H 13 M3 3 L 11 11 M11 3 L 3 11" stroke="var(--butter)" strokeWidth="1.4" strokeLinecap="round" style={{ filter: 'url(#sketch-soft)' }} />
        </svg>
      </span>
    </span>
  );
}

function ArrowLeftSketch() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'url(#sketch-soft)' }}>
      <path d="M13 8 H3" />
      <path d="M7 4 L3 8 L7 12" />
    </svg>
  );
}

function GearSketch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'url(#sketch-soft)' }}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3 v 2.5 M12 18.5 v 2.5 M3 12 h 2.5 M18.5 12 h 2.5 M5.5 5.5 l 1.8 1.8 M16.7 16.7 l 1.8 1.8 M5.5 18.5 l 1.8 -1.8 M16.7 7.3 l 1.8 -1.8" />
    </svg>
  );
}
