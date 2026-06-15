# Pathway 📈

A personal coding-learning tracker — from now until university. Single-user, runs entirely in the browser, no backend.

Built with **React 19 + Vite 8 + React Router (HashRouter)**, styled with a hand-rolled CSS design system (no Tailwind), matching the conventions of the sibling `a-levels-tracker` project. All data lives in `localStorage`.

## Run it

```bash
npm install
npm run dev      # http://localhost:5174
```

```bash
npm run build    # outputs static files to dist/
npm run preview  # preview the production build
```

Because `vite.config.js` sets `base: './'`, the built `dist/` works hosted at any path, and the build deploys to Vercel/Netlify/GitHub Pages as a static site with no configuration.

## Features

- **Dashboard** — current phase + 3-phase timeline, countdowns to A-levels (31 Dec 2026) and University (1 Jul 2027), today's-focus card (daily practice checkbox + note, pulls the next curriculum item), streak ring, and a GitHub-style practice heatmap.
- **Curriculum** — CS50x and CS50 Web pre-loaded; tick items off, add/edit/remove anything.
- **Projects** — portfolio cards (status, tech stack, GitHub + live links, notes).
- **Goals** — milestones with target dates and an on-track / due-soon / behind indicator.
- **Journal** — one freeform entry per day.
- **Settings** — reminder times, notification permission, and JSON export/import + reset.

## Notifications

The app uses the browser **Notification API** for daily (default 9:30 PM) and weekly (default Sun 2:00 PM) reminders.

**To enable:** open **Settings → Notifications → Enable** (or tap **Enable** on the dashboard banner) and accept the browser prompt. Permission must be granted from a click, so there's no auto-prompt on load.

**To test quickly:** in Settings, set the daily reminder time to a minute or two from now and keep the tab open — a notification fires at that time.

> ⚠️ Browser notifications only fire **while the app is open in a tab**. There's no reliable way to fire them when the tab/app is fully closed without a backend + push service. The always-visible **"Today's reminders"** banner on the dashboard is the fallback for that.

If you don't see a notification: check the lock icon in the address bar (site must be **Allowed**), make sure your OS "Do Not Disturb" / Focus mode is off, and note that `localhost` works but `file://` does not.

## Your data

Everything is stored locally in this browser only. Use **Settings → Export JSON** regularly to back up, and **Import JSON** to restore or move to another browser/device.
