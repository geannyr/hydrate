# Hydrate · Water Tracker

> Track your daily water intake — daily goal calculated from your weight and activity level. Apple-style glassmorphism, animated water drop, 3 languages, PWA installable.

## Features

- **Smart goal**: calculated from weight × activity multiplier (sedentary 30 / moderate 35 / active 40 ml per kg) — overridable
- **Animated water drop hero** (SVG) that fills with a wave as you log sips
- **Quick add**: 200 / 300 / 500 / 750 ml + custom amount
- **Undo** the last entry, **reset** the day with confirmation
- **7-day history** with bar chart, daily average and goal streak
- **Reminders**: web notifications every X hours within an active window (e.g. 08:00–22:00)
- **i18n**: English (default), Português, Español — auto-detected
- **Theme**: dark by default, light optional
- **Persistence**: everything in `localStorage`
- **PWA**: installable, offline-ready service worker

## Stack

React 18 · Vite · Tailwind CSS · vite-plugin-pwa · React Icons

## Local development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Deploy

Configured for Netlify out of the box (`netlify.toml`). Connect the repo at [app.netlify.com](https://app.netlify.com) → New site from Git.

---

Made by [Geanny Rodrigues](https://geannyr.github.io/curriculo2/)
