import { useRef, useState } from 'react'
import { useApp } from '../context/AppData'
import { useNotifications } from '../context/Notifications'
import { PageHead, Card, Toggle, Field } from '../components/ui'
import { downloadBackup, parseImport } from '../lib/storage'
import { useInstallPrompt } from '../hooks/useInstallPrompt'
import InstallQR from '../components/InstallQR'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Settings() {
  const { data, setSettings, replaceAll, resetAll } = useApp()
  const { supported, permission, request } = useNotifications()
  const { canInstall, installed, install } = useInstallPrompt()
  const s = data.settings
  const links = s.links || {}
  const fileRef = useRef(null)
  const [msg, setMsg] = useState('')

  const onImport = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      replaceAll(parseImport(await file.text()))
      setMsg('Imported ✓')
    } catch {
      setMsg('Could not read that file — is it a Pathway backup?')
    }
    e.target.value = ''
  }

  const permBadge = !supported
    ? 'Not supported in this browser'
    : permission === 'granted'
    ? 'Enabled ✓'
    : permission === 'denied'
    ? 'Blocked — re-enable in your browser site settings'
    : 'Not enabled yet'

  return (
    <div className="page">
      <PageHead title="Settings" sub="Install, reminders, notifications, and your data." />

      <Card className="card-pad">
        <div className="card-title">Install app</div>
        {installed ? (
          <p className="muted small">✅ Pathway is installed and runs offline.</p>
        ) : (
          <>
            <p className="muted small">Add Pathway to your home screen / desktop — it works offline and opens like a native app, no app store needed.</p>
            {canInstall && (
              <button className="btn primary" onClick={install} style={{ margin: '4px 0 12px' }}>⬇ Install on this device</button>
            )}
            <InstallQR />
            <p className="muted tiny" style={{ marginTop: 10 }}>
              On iPhone, open the link in <b>Safari</b> → Share → <b>Add to Home Screen</b>. On Android / desktop Chrome or Edge, choose <b>Install app</b> from the menu.
            </p>
          </>
        )}
      </Card>

      <Card className="card-pad">
        <div className="card-title">Notifications</div>
        <div className="row between wrap setting-row">
          <div className="grow">
            <b>Browser notifications</b>
            <div className="muted small">Status: {permBadge}</div>
          </div>
          {supported && permission !== 'granted' && permission !== 'denied' && (
            <button className="btn primary" onClick={request}>Enable</button>
          )}
        </div>
        <p className="muted tiny note">
          Note: browser notifications only fire while Pathway is open in a tab. When it's closed, the
          “Today’s reminders” banner on the dashboard is your fallback. For alerts when the app is fully
          closed you'd need to install it as a PWA with a push service (a possible future upgrade).
        </p>
      </Card>

      <Card className="card-pad">
        <div className="card-title">Daily reminder</div>
        <Toggle label="Remind me to do my coding practice" hint="A nudge for your 20–30 min block" checked={s.dailyEnabled} onChange={(v) => setSettings({ dailyEnabled: v })} />
        <Field label="Time">
          <input className="input time" type="time" value={s.dailyTime} onChange={(e) => setSettings({ dailyTime: e.target.value })} disabled={!s.dailyEnabled} />
        </Field>
      </Card>

      <Card className="card-pad">
        <div className="card-title">Weekly reminder</div>
        <Toggle label="Remind me to work on my portfolio" hint="Push something to GitHub" checked={s.weeklyEnabled} onChange={(v) => setSettings({ weeklyEnabled: v })} />
        <div className="row gap wrap">
          <Field label="Day">
            <select className="input" value={s.weeklyDay} onChange={(e) => setSettings({ weeklyDay: Number(e.target.value) })} disabled={!s.weeklyEnabled}>
              {WEEKDAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
            </select>
          </Field>
          <Field label="Time">
            <input className="input time" type="time" value={s.weeklyTime} onChange={(e) => setSettings({ weeklyTime: e.target.value })} disabled={!s.weeklyEnabled} />
          </Field>
        </div>
      </Card>

      <Card className="card-pad">
        <div className="card-title">Your links</div>
        <p className="muted small">Handy links to your coding profiles — stored locally on this device.</p>
        <Field label="GitHub"><input className="input" value={links.github || ''} onChange={(e) => setSettings({ links: { ...links, github: e.target.value } })} placeholder="https://github.com/you" /></Field>
        <Field label="CS50 / edX"><input className="input" value={links.edx || ''} onChange={(e) => setSettings({ links: { ...links, edx: e.target.value } })} placeholder="https://cs50.harvard.edu/x/" /></Field>
        <Field label="LeetCode / other"><input className="input" value={links.other || ''} onChange={(e) => setSettings({ links: { ...links, other: e.target.value } })} placeholder="https://…" /></Field>
        {(links.github || links.edx || links.other) && (
          <div className="row wrap gap" style={{ marginTop: 6 }}>
            {links.github && <a className="btn sm" href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
            {links.edx && <a className="btn sm" href={links.edx} target="_blank" rel="noreferrer">CS50 ↗</a>}
            {links.other && <a className="btn sm" href={links.other} target="_blank" rel="noreferrer">Open ↗</a>}
          </div>
        )}
        <div className="field-label" style={{ marginTop: 14 }}>Keep learning</div>
        <div className="row wrap gap">
          <a className="btn sm ghost" href="https://cs50.harvard.edu/x/" target="_blank" rel="noreferrer">CS50x</a>
          <a className="btn sm ghost" href="https://exercism.org" target="_blank" rel="noreferrer">Exercism</a>
          <a className="btn sm ghost" href="https://www.w3schools.com" target="_blank" rel="noreferrer">W3Schools</a>
          <a className="btn sm ghost" href="https://developer.mozilla.org" target="_blank" rel="noreferrer">MDN</a>
        </div>
        <div className="field-label" style={{ marginTop: 14 }}>Share &amp; download</div>
        <div className="row wrap gap">
          <a className="btn sm" href="start.html" target="_blank" rel="noreferrer">📥 Download / share page</a>
          <a className="btn sm ghost" href="https://github.com/youdontknowifyouknowthisemail-droid/pathway/releases" target="_blank" rel="noreferrer">APK releases ↗</a>
        </div>
      </Card>

      <Card className="card-pad">
        <div className="card-title">Your data</div>
        <p className="muted small">Everything is stored locally in this browser only. Export regularly to keep a backup.</p>
        <div className="row gap wrap">
          <button className="btn" onClick={() => downloadBackup(data)}>⬇ Export JSON</button>
          <button className="btn" onClick={() => fileRef.current?.click()}>⬆ Import JSON</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={onImport} />
          <button className="btn ghost danger" onClick={() => { if (confirm('Reset ALL data back to the starting template? This cannot be undone.')) resetAll() }}>Reset everything</button>
        </div>
        {msg && <div className="muted small" style={{ marginTop: 8 }}>{msg}</div>}
      </Card>
    </div>
  )
}
