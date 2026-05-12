import { FiDownload } from 'react-icons/fi';
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
      className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[0.78rem] font-semibold text-aqua-light border border-aqua/30 transition-all hover:-translate-y-0.5"
      style={{
        background: 'linear-gradient(135deg, rgba(125, 211, 252, 0.15) 0%, rgba(56, 189, 248, 0.08) 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 4px 12px -2px rgba(56, 189, 248, 0.2)',
      }}
      aria-label={t('install.cta', { default: 'Install app' })}
    >
      <FiDownload size={14} />
      <span>{t('install.cta')}</span>
    </button>
  );
}
