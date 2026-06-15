import { useApp } from '../context/AppData'
import { useNotifications } from '../context/Notifications'
import { todayKey } from '../lib/dates'
import { cx } from '../lib/util'

// In-app "Today's reminders" — the always-visible fallback for browser
// notifications (which only fire while the app is open).
export default function ReminderBanner() {
  const { data, toggleToday } = useApp()
  const { supported, permission, request } = useNotifications()
  const s = data.settings
  const doneToday = !!data.daily[todayKey()]?.done
  const isWeeklyDay = new Date().getDay() === s.weeklyDay

  const rows = []
  if (s.dailyEnabled && !doneToday) {
    rows.push({ icon: '💻', tone: 'brand', text: 'Time for your coding practice block — 20–30 minutes today.', action: { label: 'Mark done', onClick: toggleToday } })
  }
  if (s.weeklyEnabled && isWeeklyDay) {
    rows.push({ icon: '🗓️', tone: 'good', text: 'Weekly project time — work on your portfolio & push to GitHub.' })
  }
  if (!rows.length && doneToday) {
    rows.push({ icon: '✅', tone: 'good', text: "Nice — today's practice is done. Your streak is safe." })
  }

  const showEnable = supported && permission === 'default'

  return (
    <div className="reminders">
      {showEnable && (
        <div className="reminder enable">
          <span className="reminder-ic">🔔</span>
          <span className="grow">Turn on browser reminders and Pathway will nudge you at your set times.</span>
          <button className="btn sm primary" onClick={request}>Enable</button>
        </div>
      )}
      {rows.map((r, i) => (
        <div key={i} className={cx('reminder', r.tone)}>
          <span className="reminder-ic">{r.icon}</span>
          <span className="grow">{r.text}</span>
          {r.action && <button className="btn sm" onClick={r.action.onClick}>{r.action.label}</button>}
        </div>
      ))}
    </div>
  )
}
