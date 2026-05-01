import { useI18n } from '../i18n';

export default function LangSwitcher() {
  const { lang, setLang, langs, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t('a11y.changeLang')}
      className="inline-flex items-center gap-0.5 p-1 rounded-full glass"
    >
      {langs.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          className={[
            'px-3 py-1.5 rounded-full text-[0.72rem] font-bold tracking-wider uppercase transition-all duration-200',
            code === lang
              ? 'bg-aqua text-[#04243d] shadow-glow-soft'
              : 'text-ink-subtle hover:text-ink-text',
          ].join(' ')}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
