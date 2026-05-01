import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { useReturnReminder, useToday } from './hooks';

import TopBar from './components/TopBar';
import WaterHero from './components/WaterHero';
import QuickAdd from './components/QuickAdd';
import HistoryWeek from './components/HistoryWeek';
import OnboardingDialog from './components/OnboardingDialog';
import SettingsDialog from './components/SettingsDialog';
import BackgroundBubbles from './components/BackgroundBubbles';
import Toast from './components/Toast';

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
  const [lastEntry, setLastEntry] = useState(null);
  const [notifPermission, setNotifPermission] = useState(getNotifPermission);
  const [celebrating, setCelebrating] = useState(false);
  const [toast, setToast] = useState(null);
  const [lastSipAt, setLastSipAt] = useState(null);

  const todayK = useToday();
  const goal = useMemo(() => calcGoal(user), [user]);
  const current = history[todayK] || 0;

  useEffect(() => { saveUser(user); }, [user]);
  useEffect(() => { saveHistory(history); }, [history]);
  useEffect(() => { saveOnboarded(onboarded); }, [onboarded]);

  // Detect goal-cross to trigger celebration once
  const wasReachedRef = useRef(current >= goal && goal > 0);
  useEffect(() => {
    const reached = current >= goal && goal > 0;
    if (reached && !wasReachedRef.current) {
      setCelebrating(true);
      setToast({ message: t('celebrate'), duration: 5000 });
      const id = setTimeout(() => setCelebrating(false), 4000);
      return () => clearTimeout(id);
    }
    wasReachedRef.current = reached;
  }, [current, goal, t]);

  // Contextual return reminder
  const goalReached = current >= goal && goal > 0;
  const handleReturn = useCallback(() => {
    setToast({ message: t('returnReminder'), duration: 8000 });
  }, [t]);

  useReturnReminder({
    lastSipAt,
    goalReached,
    awayThresholdMs: 60 * 60 * 1000, // 1h away
    onTrigger: handleReturn,
  });

  const handleAdd = (amount) => {
    setHistory((prev) => ({ ...prev, [todayK]: (prev[todayK] || 0) + amount }));
    setLastEntry({ amount });
    setLastSipAt(Date.now());
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

  const handleOnboardSkip = () => setOnboarded(true);

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

  // Reminder loop
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

    tick();
    reminderRef.current = setInterval(tick, 60 * 1000);

    return () => {
      if (reminderRef.current) clearInterval(reminderRef.current);
    };
  }, [user.reminders, goal, t]);

  // Auto-clear undo
  useEffect(() => {
    if (!lastEntry) return;
    const id = setTimeout(() => setLastEntry(null), 8000);
    return () => clearTimeout(id);
  }, [lastEntry]);

  if (!onboarded) {
    return (
      <>
        <BackgroundBubbles />
        <div className="min-h-screen">
          <main className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
            <div className="opacity-30">
              <TopBar onOpenSettings={() => {}} />
            </div>
          </main>
          <OnboardingDialog onComplete={handleOnboardComplete} onSkip={handleOnboardSkip} />
        </div>
      </>
    );
  }

  return (
    <>
      <BackgroundBubbles />
      <div className="min-h-screen">
        <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <TopBar onOpenSettings={() => setShowSettings(true)} />

          <div className="lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8 lg:items-start">
            <div className="lg:sticky lg:top-8">
              <WaterHero current={current} goal={goal} celebrating={celebrating} />
            </div>

            <div className="flex flex-col">
              <QuickAdd
                onAdd={handleAdd}
                onUndo={handleUndo}
                onReset={handleReset}
                canUndo={!!lastEntry}
                hasProgress={current > 0}
              />

              <HistoryWeek history={history} goal={goal} />

              <footer className="mt-4 pt-6 border-t border-ink-border text-center text-[0.82rem] text-ink-subtle">
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
            </div>
          </div>
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

        {toast && (
          <Toast
            message={toast.message}
            duration={toast.duration}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </>
  );
}
