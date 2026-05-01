import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from './i18n';
import {
  loadHistory,
  loadOnboarded,
  loadUser,
  saveHistory,
  saveOnboarded,
  saveUser,
} from './storage.js';
import { calcGoal, todayKey } from './utils.js';

import TopBar from './components/TopBar';
import WaterHero from './components/WaterHero';
import QuickAdd from './components/QuickAdd';
import HistoryWeek from './components/HistoryWeek';
import OnboardingDialog from './components/OnboardingDialog';
import SettingsDialog from './components/SettingsDialog';

const REMINDER_LAST_KEY = 'hydrate.reminderLast';

function getNotifPermission() {
  if (typeof Notification === 'undefined') return 'unsupported';
  return Notification.permission;
}

export default function App() {
  const { t } = useI18n();

  const [user, setUser] = useState(loadUser);
  const [history, setHistory] = useState(loadHistory);
  const [onboarded, setOnboarded] = useState(loadOnboarded);
  const [showSettings, setShowSettings] = useState(false);
  const [lastEntry, setLastEntry] = useState(null); // {amount} for undo
  const [notifPermission, setNotifPermission] = useState(getNotifPermission);

  const goal = useMemo(() => calcGoal(user), [user]);
  const todayK = todayKey();
  const current = history[todayK] || 0;

  useEffect(() => { saveUser(user); }, [user]);
  useEffect(() => { saveHistory(history); }, [history]);
  useEffect(() => { saveOnboarded(onboarded); }, [onboarded]);

  const handleAdd = (amount) => {
    setHistory((prev) => ({ ...prev, [todayK]: (prev[todayK] || 0) + amount }));
    setLastEntry({ amount });
  };

  const handleUndo = () => {
    if (!lastEntry) return;
    setHistory((prev) => ({
      ...prev,
      [todayK]: Math.max((prev[todayK] || 0) - lastEntry.amount, 0),
    }));
    setLastEntry(null);
  };

  const handleReset = () => {
    setHistory((prev) => {
      const copy = { ...prev };
      delete copy[todayK];
      return copy;
    });
    setLastEntry(null);
  };

  const handleOnboardComplete = ({ weight, activity }) => {
    setUser((u) => ({ ...u, weight, activity }));
    setOnboarded(true);
  };

  const handleOnboardSkip = () => {
    setOnboarded(true);
  };

  const handleSaveSettings = (newUser) => {
    setUser(newUser);
    setShowSettings(false);
  };

  const handleRequestNotif = async () => {
    if (typeof Notification === 'undefined') return;
    try {
      const result = await Notification.requestPermission();
      setNotifPermission(result);
    } catch (_) {}
  };

  // Reminder loop — re-runs whenever user.reminders or goal changes
  const reminderRef = useRef(null);
  useEffect(() => {
    if (reminderRef.current) {
      clearInterval(reminderRef.current);
      reminderRef.current = null;
    }

    const { enabled, intervalH, startH, endH } = user.reminders;
    if (!enabled) return;
    if (typeof Notification === 'undefined') return;
    if (Notification.permission !== 'granted') return;

    const tick = () => {
      const now = new Date();
      const hour = now.getHours();
      const inWindow = startH <= endH ? hour >= startH && hour < endH : hour >= startH || hour < endH;
      if (!inWindow) return;

      const lastStr = localStorage.getItem(REMINDER_LAST_KEY);
      const last = lastStr ? Number(lastStr) : 0;
      const intervalMs = intervalH * 60 * 60 * 1000;
      if (now.getTime() - last < intervalMs) return;

      const today = todayKey();
      const currentNow = (loadHistory()[today] || 0);
      const goalNow = calcGoal(loadUser());
      const reached = currentNow >= goalNow;

      try {
        new Notification(t('notifications.title'), {
          body: reached
            ? t('notifications.bodyDone')
            : t('notifications.body', { current: currentNow.toLocaleString(), goal: goalNow.toLocaleString() }),
          icon: '/favicon.svg',
          tag: 'hydrate-reminder',
        });
        localStorage.setItem(REMINDER_LAST_KEY, String(now.getTime()));
      } catch (_) {}
    };

    // Tick immediately then every minute (cheap; gated by interval check above)
    tick();
    reminderRef.current = setInterval(tick, 60 * 1000);

    return () => {
      if (reminderRef.current) clearInterval(reminderRef.current);
    };
  }, [user.reminders, goal, t]);

  // Auto-clear "lastEntry" undo after some seconds
  useEffect(() => {
    if (!lastEntry) return;
    const id = setTimeout(() => setLastEntry(null), 8000);
    return () => clearTimeout(id);
  }, [lastEntry]);

  if (!onboarded) {
    return (
      <div className="min-h-screen">
        <main className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
          <div className="opacity-30">
            <TopBar onOpenSettings={() => {}} />
          </div>
        </main>
        <OnboardingDialog onComplete={handleOnboardComplete} onSkip={handleOnboardSkip} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <TopBar onOpenSettings={() => setShowSettings(true)} />

        <WaterHero current={current} goal={goal} />

        <QuickAdd
          onAdd={handleAdd}
          onUndo={handleUndo}
          onReset={handleReset}
          canUndo={!!lastEntry}
          hasProgress={current > 0}
        />

        <HistoryWeek history={history} goal={goal} />

        <footer className="mt-10 pt-6 border-t border-ink-border text-center text-[0.82rem] text-ink-subtle">
          <p>
            {t('footer.madeBy')}{' '}
            <a
              href="https://geannyr.github.io/curriculo2/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink-muted hover:text-aqua-light transition-colors"
            >
              Geanny Rodrigues
            </a>
          </p>
        </footer>
      </main>

      {showSettings && (
        <SettingsDialog
          user={user}
          onSave={handleSaveSettings}
          onClose={() => setShowSettings(false)}
          notifPermission={notifPermission}
          onRequestNotif={handleRequestNotif}
        />
      )}
    </div>
  );
}
