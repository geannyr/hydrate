import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const translations = {
  en: {
    meta: {
      title: 'Hydrate · Water Tracker',
      description: 'Track your daily water intake — calculated from your weight and activity level.',
    },
    app: {
      brand: 'Hydrate',
      tagline: 'Stay hydrated, feel better.',
    },
    onboarding: {
      title: 'Welcome to Hydrate',
      subtitle: 'Let’s set up your daily goal in 10 seconds.',
      weightLabel: 'Your weight',
      weightUnit: 'kg',
      activityLabel: 'Activity level',
      activitySedentary: 'Sedentary',
      activitySedentaryHint: 'Little to no exercise',
      activityModerate: 'Moderate',
      activityModerateHint: '3–5 days per week',
      activityActive: 'Active',
      activityActiveHint: 'Daily exercise',
      goalPreview: 'Your daily goal',
      submitBtn: 'Start tracking',
      skipBtn: 'Skip for now',
    },
    home: {
      progress: '{current} of {goal} ml',
      pct: '{n}%',
      remaining: '{n} ml to go',
      goalReached: 'Goal reached — great job!',
      goalReachedShort: 'Goal reached',
      almostThere: 'Almost there!',
      keepGoing: 'Keep sipping',
      empty: 'Tap a button below to log your first sip.',
    },
    quickAdd: {
      label: 'Quick add',
      custom: 'Custom',
      customPlaceholder: 'ml',
      addBtn: 'Add',
      undo: 'Undo',
      reset: 'Reset day',
      resetConfirm: 'Reset today\'s progress?',
    },
    history: {
      title: 'Last 7 days',
      today: 'Today',
      yesterday: 'Yesterday',
      empty: 'Your weekly progress will show up here.',
      avg: 'Daily average',
      streak: 'Goal streak',
      streakDays: '{n} day{plural}',
    },
    settings: {
      title: 'Settings',
      sectionGoal: 'Daily goal',
      sectionReminders: 'Reminders',
      sectionPreferences: 'Preferences',
      weightLabel: 'Weight',
      activityLabel: 'Activity level',
      goalCalculated: 'Calculated goal',
      goalOverride: 'Custom goal (optional)',
      goalOverrideHint: 'Leave empty to use the calculated goal.',
      remindersEnabled: 'Enable reminders',
      remindersHint: 'Get a notification every {n}h between {start} and {end}.',
      reminderInterval: 'Every',
      reminderIntervalUnit: 'h',
      activeStart: 'From',
      activeEnd: 'To',
      saveBtn: 'Save changes',
      closeBtn: 'Close',
      notifPrompt: 'Allow notifications to receive reminders.',
      notifBlocked: 'Notifications are blocked. Enable them in your browser settings.',
      notifGranted: 'Notifications enabled',
      themeLabel: 'Theme',
      themeDark: 'Dark',
      themeLight: 'Light',
      langLabel: 'Language',
    },
    notifications: {
      title: 'Time to drink water',
      body: 'You\'re at {current} of {goal} ml today.',
      bodyDone: 'You crushed your goal today!',
    },
    units: {
      ml: 'ml',
      L: 'L',
    },
    portfolio: 'Portfolio',
    footer: { madeBy: 'Made by' },
    a11y: {
      toggleTheme: 'Toggle theme',
      changeLang: 'Change language',
      openSettings: 'Open settings',
      closeDialog: 'Close dialog',
      addAmount: 'Add {n} ml',
    },
  },

  pt: {
    meta: {
      title: 'Hydrate · Lembrete de Água',
      description: 'Acompanhe sua hidratação diária — meta calculada pelo seu peso e nível de atividade.',
    },
    app: {
      brand: 'Hydrate',
      tagline: 'Beba água, se sinta melhor.',
    },
    onboarding: {
      title: 'Bem-vindo ao Hydrate',
      subtitle: 'Vamos definir sua meta diária em 10 segundos.',
      weightLabel: 'Seu peso',
      weightUnit: 'kg',
      activityLabel: 'Nível de atividade',
      activitySedentary: 'Sedentário',
      activitySedentaryHint: 'Pouco ou nenhum exercício',
      activityModerate: 'Moderado',
      activityModerateHint: '3–5 dias por semana',
      activityActive: 'Ativo',
      activityActiveHint: 'Exercício diário',
      goalPreview: 'Sua meta diária',
      submitBtn: 'Começar',
      skipBtn: 'Pular por agora',
    },
    home: {
      progress: '{current} de {goal} ml',
      pct: '{n}%',
      remaining: 'faltam {n} ml',
      goalReached: 'Meta atingida — excelente!',
      goalReachedShort: 'Meta atingida',
      almostThere: 'Quase lá!',
      keepGoing: 'Continue bebendo',
      empty: 'Toque em um botão abaixo para registrar o primeiro gole.',
    },
    quickAdd: {
      label: 'Adicionar rápido',
      custom: 'Personalizado',
      customPlaceholder: 'ml',
      addBtn: 'Adicionar',
      undo: 'Desfazer',
      reset: 'Zerar o dia',
      resetConfirm: 'Zerar o progresso de hoje?',
    },
    history: {
      title: 'Últimos 7 dias',
      today: 'Hoje',
      yesterday: 'Ontem',
      empty: 'Seu progresso semanal aparecerá aqui.',
      avg: 'Média diária',
      streak: 'Sequência de metas',
      streakDays: '{n} dia{plural}',
    },
    settings: {
      title: 'Configurações',
      sectionGoal: 'Meta diária',
      sectionReminders: 'Lembretes',
      sectionPreferences: 'Preferências',
      weightLabel: 'Peso',
      activityLabel: 'Nível de atividade',
      goalCalculated: 'Meta calculada',
      goalOverride: 'Meta personalizada (opcional)',
      goalOverrideHint: 'Deixe vazio para usar a meta calculada.',
      remindersEnabled: 'Ativar lembretes',
      remindersHint: 'Receber notificação a cada {n}h entre {start} e {end}.',
      reminderInterval: 'A cada',
      reminderIntervalUnit: 'h',
      activeStart: 'Das',
      activeEnd: 'Às',
      saveBtn: 'Salvar',
      closeBtn: 'Fechar',
      notifPrompt: 'Permita notificações para receber lembretes.',
      notifBlocked: 'Notificações bloqueadas. Ative nas configurações do navegador.',
      notifGranted: 'Notificações ativadas',
      themeLabel: 'Tema',
      themeDark: 'Escuro',
      themeLight: 'Claro',
      langLabel: 'Idioma',
    },
    notifications: {
      title: 'Hora de beber água',
      body: 'Você está em {current} de {goal} ml hoje.',
      bodyDone: 'Você bateu sua meta de hoje!',
    },
    units: {
      ml: 'ml',
      L: 'L',
    },
    portfolio: 'Portfólio',
    footer: { madeBy: 'Feito por' },
    a11y: {
      toggleTheme: 'Alternar tema',
      changeLang: 'Alterar idioma',
      openSettings: 'Abrir configurações',
      closeDialog: 'Fechar diálogo',
      addAmount: 'Adicionar {n} ml',
    },
  },

  es: {
    meta: {
      title: 'Hydrate · Recordatorio de Agua',
      description: 'Sigue tu hidratación diaria — meta calculada según tu peso y nivel de actividad.',
    },
    app: {
      brand: 'Hydrate',
      tagline: 'Bebe agua, siéntete mejor.',
    },
    onboarding: {
      title: 'Bienvenida a Hydrate',
      subtitle: 'Vamos a definir tu meta diaria en 10 segundos.',
      weightLabel: 'Tu peso',
      weightUnit: 'kg',
      activityLabel: 'Nivel de actividad',
      activitySedentary: 'Sedentario',
      activitySedentaryHint: 'Poco o ningún ejercicio',
      activityModerate: 'Moderado',
      activityModerateHint: '3–5 días por semana',
      activityActive: 'Activo',
      activityActiveHint: 'Ejercicio diario',
      goalPreview: 'Tu meta diaria',
      submitBtn: 'Empezar',
      skipBtn: 'Saltar por ahora',
    },
    home: {
      progress: '{current} de {goal} ml',
      pct: '{n}%',
      remaining: 'faltan {n} ml',
      goalReached: '¡Meta alcanzada — excelente!',
      goalReachedShort: 'Meta alcanzada',
      almostThere: '¡Casi!',
      keepGoing: 'Sigue bebiendo',
      empty: 'Toca un botón abajo para registrar el primer sorbo.',
    },
    quickAdd: {
      label: 'Añadir rápido',
      custom: 'Personalizado',
      customPlaceholder: 'ml',
      addBtn: 'Añadir',
      undo: 'Deshacer',
      reset: 'Reiniciar día',
      resetConfirm: '¿Reiniciar el progreso de hoy?',
    },
    history: {
      title: 'Últimos 7 días',
      today: 'Hoy',
      yesterday: 'Ayer',
      empty: 'Tu progreso semanal aparecerá aquí.',
      avg: 'Promedio diario',
      streak: 'Racha de metas',
      streakDays: '{n} día{plural}',
    },
    settings: {
      title: 'Configuración',
      sectionGoal: 'Meta diaria',
      sectionReminders: 'Recordatorios',
      sectionPreferences: 'Preferencias',
      weightLabel: 'Peso',
      activityLabel: 'Nivel de actividad',
      goalCalculated: 'Meta calculada',
      goalOverride: 'Meta personalizada (opcional)',
      goalOverrideHint: 'Deja vacío para usar la meta calculada.',
      remindersEnabled: 'Activar recordatorios',
      remindersHint: 'Recibir notificación cada {n}h entre {start} y {end}.',
      reminderInterval: 'Cada',
      reminderIntervalUnit: 'h',
      activeStart: 'Desde',
      activeEnd: 'Hasta',
      saveBtn: 'Guardar',
      closeBtn: 'Cerrar',
      notifPrompt: 'Permite notificaciones para recibir recordatorios.',
      notifBlocked: 'Notificaciones bloqueadas. Actívalas en la configuración del navegador.',
      notifGranted: 'Notificaciones activadas',
      themeLabel: 'Tema',
      themeDark: 'Oscuro',
      themeLight: 'Claro',
      langLabel: 'Idioma',
    },
    notifications: {
      title: 'Hora de beber agua',
      body: 'Estás en {current} de {goal} ml hoy.',
      bodyDone: '¡Lograste tu meta de hoy!',
    },
    units: {
      ml: 'ml',
      L: 'L',
    },
    portfolio: 'Portafolio',
    footer: { madeBy: 'Hecho por' },
    a11y: {
      toggleTheme: 'Cambiar tema',
      changeLang: 'Cambiar idioma',
      openSettings: 'Abrir configuración',
      closeDialog: 'Cerrar diálogo',
      addAmount: 'Añadir {n} ml',
    },
  },
};

const STORAGE_KEY = 'hydrate.lang';
const HTML_LANG = { en: 'en', pt: 'pt-BR', es: 'es' };
const DEFAULT_LANG = 'en';

function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch (_) {}
  const nav = (navigator.language || DEFAULT_LANG).slice(0, 2).toLowerCase();
  return translations[nav] ? nav : DEFAULT_LANG;
}

function get(obj, path) {
  return path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectLang);

  const setLang = useCallback((next) => {
    if (!translations[next]) return;
    setLangState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (_) {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang] || lang;
    const dict = translations[lang];
    if (dict?.meta?.title) document.title = dict.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict?.meta?.description) {
      metaDesc.setAttribute('content', dict.meta.description);
    }
  }, [lang]);

  const t = useCallback((path, vars) => {
    let value = get(translations[lang], path) ?? get(translations[DEFAULT_LANG], path);
    if (typeof value !== 'string') return path;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        value = value.replaceAll(`{${k}}`, vars[k]);
      });
    }
    return value;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, langs: Object.keys(translations) }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
