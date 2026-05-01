import { DEFAULT_USER } from './utils.js';

const KEYS = {
  user: 'hydrate.user',
  history: 'hydrate.history',
  theme: 'hydrate.theme',
  onboarded: 'hydrate.onboarded',
};

function safeRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch (_) {
    return fallback;
  }
}

function safeWrite(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_) {}
}

export function loadUser() {
  const raw = safeRead(KEYS.user, null);
  if (!raw) return { ...DEFAULT_USER };
  return {
    ...DEFAULT_USER,
    ...raw,
    reminders: { ...DEFAULT_USER.reminders, ...(raw.reminders || {}) },
  };
}

export function saveUser(user) {
  safeWrite(KEYS.user, user);
}

export function loadHistory() {
  return safeRead(KEYS.history, {});
}

export function saveHistory(history) {
  safeWrite(KEYS.history, history);
}

export function loadOnboarded() {
  return safeRead(KEYS.onboarded, false);
}

export function saveOnboarded(value) {
  safeWrite(KEYS.onboarded, value);
}
