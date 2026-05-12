import { useI18n } from '../i18n';

export default function LangSwitcher() {
  const { lang, setLang, langs, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t('a11y.changeLang')}
      className="inline-flex items-center gap-0.5 sm:gap-1"
    >
      {langs.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={code === lang}
          className={['sketch-chip', code === lang ? 'active' : ''].join(' ')}
          style={{
            padding: '0.15rem 0.45rem',
            fontSize: '0.72rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
