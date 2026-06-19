import { useMemo, useState } from 'react'
import { useApp } from '../context/AppData'
import { PageHead, Card } from '../components/ui'
import { keyOf, todayKey, fmtDate, currentPhase, KEY_DATES } from '../lib/dates'
import { cx } from '../lib/util'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function Calendar() {
  const { data, setDay } = useApp()
  const today = new Date()
  const tKey = todayKey()
  const [ym, setYm] = useState({ y: today.getFullYear(), m: today.getMonth() })
  const [selected, setSelected] = useState(tKey)

  const cells = useMemo(() => {
    const startDow = new Date(ym.y, ym.m, 1).getDay()
    const daysInMonth = new Date(ym.y, ym.m + 1, 0).getDate()
    const arr = []
    for (let i = 0; i < startDow; i++) arr.push(null)
    for (let d = 1; d <= daysInMonth; d++) arr.push(new Date(ym.y, ym.m, d))
    return arr
  }, [ym])

  const keyDates = {
    [KEY_DATES.alevels]: { icon: '📝', label: 'A-level retake' },
    [KEY_DATES.university]: { icon: '🎓', label: 'University starts' },
  }

  const monthPhase = currentPhase(new Date(ym.y, ym.m, 15))
  const prev = () => setYm(({ y, m }) => (m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 }))
  const next = () => setYm(({ y, m }) => (m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 }))
  const goToday = () => { setYm({ y: today.getFullYear(), m: today.getMonth() }); setSelected(tKey) }

  const sel = data.daily[selected] || { done: false, note: '' }
  const selJournal = data.journal[selected] || ''
  const selPast = selected <= tKey

  return (
    <div className="page">
      <PageHead title="Calendar" sub="Your practice month-by-month, with key dates and your phase. Tap a past day to backfill it.">
        <button className="btn sm" onClick={goToday}>Today</button>
      </PageHead>

      <Card className="card-pad">
        <div className="cal-head">
          <button className="iconbtn" onClick={prev} aria-label="Previous month">‹</button>
          <div className="cal-title">
            <div className="cal-month">{MONTHS[ym.m]} {ym.y}</div>
            <div className="muted tiny">{monthPhase.icon} {monthPhase.name}</div>
          </div>
          <button className="iconbtn" onClick={next} aria-label="Next month">›</button>
        </div>

        <div className="cal-dow">{DOW.map((d, i) => <span key={i}>{d}</span>)}</div>
        <div className="cal-grid">
          {cells.map((d, i) => {
            if (!d) return <span key={i} className="cal-cell empty" />
            const k = keyOf(d)
            const done = !!data.daily[k]?.done
            const hasJournal = !!data.journal[k]?.trim()
            const kd = keyDates[k]
            return (
              <button
                key={i}
                className={cx('cal-cell', done && 'done', k === tKey && 'today', k === selected && 'sel')}
                onClick={() => setSelected(k)}
                title={kd?.label || k}
              >
                <span className="cal-num">{d.getDate()}</span>
                {kd && <span className="cal-kd">{kd.icon}</span>}
                <span className="cal-marks">
                  {done && <i className="cal-dot done" />}
                  {hasJournal && <i className="cal-dot note" />}
                </span>
              </button>
            )
          })}
        </div>

        <div className="cal-legend muted tiny">
          <span><i className="cal-dot done" /> practiced</span>
          <span><i className="cal-dot note" /> journal</span>
          <span>📝🎓 key dates</span>
        </div>
      </Card>

      <Card className="card-pad">
        <div className="row between wrap">
          <div className="card-title">{fmtDate(selected)}</div>
          {keyDates[selected] && <span className="tag warn">{keyDates[selected].icon} {keyDates[selected].label}</span>}
        </div>
        <div className="row between wrap" style={{ marginTop: 10 }}>
          <div className="muted small">{sel.done ? '✓ Practiced this day' : selPast ? 'Not marked as practiced' : 'Upcoming day'}</div>
          {selPast && <button className="btn sm" onClick={() => setDay(selected, { done: !sel.done })}>{sel.done ? 'Unmark' : 'Mark practiced'}</button>}
        </div>
        {sel.note && <div className="muted small" style={{ marginTop: 8 }}>📝 {sel.note}</div>}
        {selJournal && <div className="cal-journal muted small">{selJournal}</div>}
        {!sel.note && !selJournal && selPast && <div className="muted tiny" style={{ marginTop: 8 }}>No note yet — add reflections in the Journal.</div>}
      </Card>
    </div>
  )
}
