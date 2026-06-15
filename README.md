# Pathway 📈

A personal coding-learning tracker — from now until university. Single-user, runs entirely client-side, no backend.

**🌐 Live:** https://youdontknowifyouknowthisemail-droid.github.io/pathway/
**📦 Repo:** https://github.com/youdontknowifyouknowthisemail-droid/pathway

Built with **React 19 + Vite 8 + React Router (HashRouter)** and a hand-rolled CSS design system (no Tailwind), matching the sibling `a-levels-tracker` project. All data lives in `localStorage`. The same codebase ships as a **website, an installable PWA, a desktop app, and an Android app**.

## Quick start (development)

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # static site → dist/
npm run preview    # serve the production build locally
```

`vite.config.js` sets `base: './'`, so the build works hosted at any path, under `file://`, and inside Electron.

---

## The four ways to run it

### 1. Website (hosted) ✅ already live
Deployed to **GitHub Pages** from the `gh-pages` branch. To redeploy after changes:

```bash
npm run deploy     # builds, then publishes dist/ to the gh-pages branch
```

- The live URL is above. First load must be online; after that the service worker serves it offline.
- *Optional CI:* `.github/workflows/deploy.yml` auto-deploys on every push, but pushing it needs the `workflow` token scope. Enable once with `gh auth refresh -s workflow`, then un-ignore `.github/workflows/` and push.
- *Other hosts:* `netlify.toml` and `vercel.json` are included — drag `dist/` onto [Netlify Drop](https://app.netlify.com/drop), or run `vercel`.

### 2. Install as an app (PWA) — phone & desktop, no app store
Open the live URL, then:
- **Android / desktop Chrome or Edge:** menu → **Install app** (or the install icon in the address bar). There's also an **Install** button in Settings.
- **iPhone (Safari):** Share → **Add to Home Screen**.

💡 **Settings → Install app** shows a scannable **QR code** + copy-link — handy for jumping from desktop to phone.

Installs without a file download, works offline (service worker in `public/sw.js`), and opens full-screen like a native app. Requires the **https** site — install won't offer from a local file.

### 3. Desktop app (.exe / .dmg / AppImage)
Electron wrapper in `desktop/` (loads the built web app locally — fully offline).

```bash
npm run build                 # build the web app first
cd desktop
npm install
npm run dist                  # → desktop/dist/Pathway Setup 1.0.0.exe
npm start                     # or just run it in a dev window
```

Windows produces an NSIS installer; `build.mac` / `build.linux` targets are configured too (build on the matching OS).

### 4. Android app (.apk) — for reliable closed-app notifications
Capacitor project (regenerated into `android/`). Unlike the web/PWA build, the Android app uses **native local notifications** (`@capacitor/local-notifications`), so daily/weekly reminders fire **even when the app is fully closed** (and survive reboots). Two ways to get the APK:

**A) Build in the cloud — recommended, no Android Studio needed.**
`.github/workflows/android-apk.yml` builds a debug APK on GitHub's runners (which have JDK 17 + the Android SDK) and attaches it to a Release. Pushing CI files needs the `workflow` token scope, so enable it once:

```bash
gh auth refresh -s workflow                       # one-time, approve in browser
git add -f .github/workflows/android-apk.yml
git commit -m "Add Android APK build workflow"
git push
gh workflow run "Build Android APK"               # or: repo → Actions → Run workflow
```

Then on your phone, open the repo's **Releases → Pathway APK (latest)**, download `app-debug.apk`, and install (allow install from this source). It's debug-signed — fine for personal sideloading.

**B) Build locally with Android Studio** (bundles JDK 17 + SDK; this machine only has Java 8):

```bash
npm run build
npm run cap -- sync android
npm run cap -- open android   # Android Studio → Build → Build APK / run on device
```

---

## Notifications by platform

| Platform | Mechanism | Fires when app closed? |
|---|---|---|
| Website / PWA | Web Notification API, timed while open | No — the dashboard "Today's reminders" banner is the fallback |
| Desktop (Electron) | Web Notification API → native OS toast | Only while the app is running |
| Android (Capacitor) | Native local notifications | **Yes** |

Enable from **Settings → Notifications → Enable** (must be triggered by a tap). To test: set the daily time a minute ahead. Default times: daily 9:30 PM, weekly Sunday 2:00 PM — all editable.

## Your data

Stored locally only. **Settings → Export JSON** to back up; **Import JSON** to restore or move devices. No data leaves the device.

## Project layout

```
src/            React app (pages/, components/, context/, lib/, hooks/)
public/         manifest, service worker, icons, .nojekyll
scripts/        gen-icons.mjs (PWA icon generator)
desktop/        Electron wrapper (separate package.json)
android/        Capacitor Android project (regenerate with: npm run cap -- add android)
.github/        Pages deploy workflow (kept local until 'workflow' scope is added)
```
