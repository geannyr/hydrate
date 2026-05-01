import { useEffect, useRef, useState } from 'react';
import { todayKey } from './utils.js';

/**
 * Returns the current day key and re-renders when the date rolls over.
 * Polls every minute (cheap) and additionally re-checks when the tab becomes
 * visible (in case the device was asleep through midnight).
 */
export function useToday() {
  const [day, setDay] = useState(() => todayKey());

  useEffect(() => {
    const tick = () => {
      const next = todayKey();
      setDay((prev) => (prev === next ? prev : next));
    };

    const id = setInterval(tick, 60 * 1000);
    const onVisibility = () => {
      if (document.visibilityState === 'visible') tick();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return day;
}

/**
 * Captures the PWA install prompt and exposes a function to trigger it.
 * Returns { canInstall, install } — `install()` returns true if accepted.
 */
export function useInstallPrompt() {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const onBeforeInstall = (e) => {
      e.preventDefault();
      setEvent(e);
    };
    const onInstalled = () => setEvent(null);

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = async () => {
    if (!event) return false;
    event.prompt();
    const { outcome } = await event.userChoice;
    setEvent(null);
    return outcome === 'accepted';
  };

  return { canInstall: !!event, install };
}

/**
 * Watches for the user returning to the tab. If they've been away for at least
 * `awayThresholdMs` AND haven't logged a sip recently, fires onTrigger.
 *
 * Tracks "last sip" via lastSipAt prop (timestamp ms or null).
 */
export function useReturnReminder({ lastSipAt, goalReached, awayThresholdMs = 60 * 60 * 1000, onTrigger }) {
  const lastHiddenAtRef = useRef(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const onVisibility = () => {
      const now = Date.now();
      if (document.visibilityState === 'hidden') {
        lastHiddenAtRef.current = now;
        return;
      }
      // visible
      const wasAway = lastHiddenAtRef.current !== null && now - lastHiddenAtRef.current >= awayThresholdMs;
      lastHiddenAtRef.current = null;
      if (!wasAway) return;
      if (goalReached) return;

      const sinceLastSip = lastSipAt ? now - lastSipAt : Infinity;
      if (sinceLastSip < 90 * 60 * 1000) return; // already drank in last 90min

      onTrigger?.({ sinceLastSip, awayMs: now - (lastHiddenAtRef.current || now) });
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [lastSipAt, goalReached, awayThresholdMs, onTrigger]);
}

/**
 * Returns true when the user prefers reduced motion.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return reduced;
}
