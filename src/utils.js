// Activity → multiplier (ml per kg per day)
export const ACTIVITY_MULTIPLIER = {
  sedentary: 30,
  moderate: 35,
  active: 40,
};

export const DEFAULT_USER = {
  weight: 60,
  activity: 'moderate',
  goalOverride: null,
  reminders: {
    enabled: false,
    intervalH: 2,
    startH: 8,
    endH: 22,
  },
};

export function calcGoal(user) {
  if (!user) return 2000;
  if (user.goalOverride && user.goalOverride > 0) {
    return Math.round(user.goalOverride);
  }
  const mult = ACTIVITY_MULTIPLIER[user.activity] || 35;
  const ml = (user.weight || 60) * mult;
  // Round to nearest 50ml for nicer numbers
  return Math.round(ml / 50) * 50;
}

export function todayKey(date = new Date()) {
  // YYYY-MM-DD in local time
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function lastNDaysKeys(n = 7) {
  const out = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    out.push(todayKey(d));
  }
  return out;
}

export function formatDayLabel(isoDay, lang = 'en') {
  const today = todayKey();
  if (isoDay === today) return null; // caller can show "today"
  const yesterday = todayKey(new Date(Date.now() - 86400000));
  if (isoDay === yesterday) return 'yesterday';
  // Format like "15 Apr" / "15 abr"
  const d = new Date(isoDay + 'T00:00:00');
  return d.toLocaleDateString(
    lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US',
    { day: '2-digit', month: 'short' },
  );
}

export function calcStreak(history, goal) {
  // Streak of consecutive days (ending today or yesterday) where intake >= goal
  if (!history || !goal) return 0;
  const today = todayKey();
  const cursor = new Date();
  let streak = 0;
  let firstCheck = true;

  while (true) {
    const key = todayKey(cursor);
    const value = history[key] || 0;
    if (value >= goal) {
      streak++;
    } else if (firstCheck && key === today) {
      // Today is incomplete — don't break streak based on it, just step back
    } else {
      break;
    }
    firstCheck = false;
    cursor.setDate(cursor.getDate() - 1);
    if (streak > 365) break;
  }
  return streak;
}

export function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

export function formatHour(h) {
  return String(h).padStart(2, '0') + ':00';
}
