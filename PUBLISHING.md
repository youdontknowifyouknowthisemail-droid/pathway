# Publishing Pathway to the Google Play Store

You already have everything the build needs: a signed **AAB** (Android App Bundle) produced by the
`Build Android APK` GitHub Action, and the release keystore. This guide covers the Play Console steps.

## 0. One-time prerequisites
- A **Google Play Developer account** — US$25, one-time: https://play.google.com/console/signup
- The signed **`app-release.aab`** from the repo's **Releases → Pathway Android (latest)**
  (run the `Build Android APK` workflow first — see the README).
- Your **keystore** (`pathway-release.jks`) and password backed up. Google's **Play App Signing** will
  manage the final signing key, but your keystore is the *upload key* — keep it safe.

## 1. Create the app
1. Open the [Play Console](https://play.google.com/console) → **Create app**.
2. Name **Pathway**, default language, app type **App**, **Free**. Accept the declarations.

## 2. Fill the required sections (Dashboard → "Set up your app")
- **App access** — all features are available without login → "All functionality is available without special access".
- **Ads** — No ads.
- **Content rating** — fill the questionnaire (Pathway is a productivity/education app → rated Everyone).
- **Target audience** — pick your age groups.
- **Data safety** — Pathway stores everything **locally on the device** and collects/transmits **no** user
  data, so declare "No data collected". (If you later add Supabase sync, update this.)
- **Privacy policy** — required. A one-paragraph page is fine; host it anywhere (e.g. add a `privacy.html`
  to the site → `https://youdontknowifyouknowthisemail-droid.github.io/pathway/privacy.html`). State that
  the app stores data locally and collects nothing.

## 3. Store listing
- Short description (≤80 chars) and full description.
- **App icon** 512×512 (use `public/icon-512.png`).
- **Feature graphic** 1024×500.
- **Screenshots** — at least 2 phone screenshots (take them from the installed app or the browser at a
  phone size).
- Category: **Education**.

## 4. Create a release
1. Start with **Testing → Internal testing** (fastest; add your own email as a tester) to sanity-check on a
   real device, then promote to **Production** when happy.
2. **Create new release** → upload `app-release.aab`.
3. On first upload, accept **Play App Signing** (Google generates/holds the app signing key; your keystore
   stays the upload key).
4. Add release notes → **Review release** → **Roll out**.

## 5. Review
First-time apps go through Google review (often a few days). Once approved, Pathway is live on Play.

## Updating later
1. Bump the version in the Android project. Capacitor regenerates `android/`, so set it in
   `capacitor.config.json` is **not** enough for the version code — easiest is to edit
   `android/app/build.gradle` (`versionCode` / `versionName`) before building, or add a small Gradle
   override. Increment `versionCode` every upload.
2. Re-run the `Build Android APK` workflow, download the new AAB, upload a new release. **Always sign with
   the same upload keystore.**

> Note: the same signed AAB/APK is a normal Android app — you can also just sideload the APK forever and
> skip the Play Store entirely. The store only matters if you want public discovery / easy updates.
