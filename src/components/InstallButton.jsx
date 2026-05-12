import { useI18n } from '../i18n';
import { useInstallPrompt } from '../hooks';

export default function InstallButton() {
  const { t } = useI18n();
  const { canInstall, install } = useInstallPrompt();

  if (!canInstall) return null;

  return (
    <button
      type="button"
      onClick={install}
      className="hidden sm:inline-flex sketch-btn water"
      style={{ padding: '0.4rem 0.9rem', fontSize: '0.95rem' }}
      aria-label={t('install.cta', { default: 'Install app' })}
    >
      <DownloadIcon />
      <span>{t('install.cta')}</span>
    </button>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ filter: 'url(#sketch-soft)' }}>
      <path d="M8 2 V 11" />
      <path d="M4 7 L 8 11 L 12 7" />
      <path d="M3 14 H 13" />
    </svg>
  );
}
