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
      className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full text-[0.78rem] font-semibold text-aqua-light border border-aqua/30 bg-aqua-subtle hover:bg-aqua/20 hover:-translate-y-0.5 transition-all"
      aria-label={t('install.cta', { default: 'Install app' })}
    >
      <FiDownload size={14} />
      <span>{t('install.cta')}</span>
    </button>
  );
}
