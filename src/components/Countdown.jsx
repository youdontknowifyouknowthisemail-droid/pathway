import { Ring } from './ui'
import { daysUntil, fmtDate, parseKey, startOfDay } from '../lib/dates'
import { clamp01 } from '../lib/util'

// A single countdown widget: progress ring + days remaining + target date.
export default function Countdown({ label, date, color = 'var(--brand)', icon, anchor = '2026-06-01' }) {
  const days = daysUntil(date)
  const start = parseKey(anchor)
  const end = parseKey(date)
  const frac = clamp01((startOfDay(new Date()) - start) / (end - start))
  const past = days != null && days < 0

  return (
    <div className="card card-pad countdown">
      <Ring value={past ? 1 : frac} color={color} size={104}>
        <div className="cd-num">{past ? '✓' : days}</div>
        <div className="cd-unit muted tiny">{past ? 'reached' : days === 1 ? 'day' : 'days'}</div>
      </Ring>
      <div className="cd-meta">
        <div className="cd-label">{icon} {label}</div>
        <div className="muted small">{fmtDate(date)}</div>
        {!past && days != null && (
          <div className="muted tiny">≈ {Math.round(days / 7)} weeks · {(days / 30.4).toFixed(1)} months</div>
        )}
      </div>
    </div>
  )
}
