import { useEffect, useMemo, useRef } from 'react'
import { keyOf, addDays, startOfDay, todayKey } from '../lib/dates'
import { cx } from '../lib/util'

const WEEKS = 53 // ~ last year, GitHub-style

// Contribution-style grid of daily practice. Columns = weeks (Sun→Sat).
export default function Heatmap({ daily }) {
  const scroller = useRef(null)

  const days = useMemo(() => {
    const today = startOfDay(new Date())
    const end = addDays(today, 6 - today.getDay()) // Saturday of the current week
    const start = addDays(end, -(WEEKS * 7 - 1)) // a Sunday
    const arr = []
    for (let d = start; d <= end; d = addDays(d, 1)) arr.push(new Date(d))
    return arr
  }, [])

  // Start scrolled to the most recent weeks.
  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [])

  const today = startOfDay(new Date())
  const tKey = todayKey()

  return (
    <div className="heatmap-wrap">
      <div className="heatmap" ref={scroller}>
        <div className="hm-grid">
          {days.map((d) => {
            const k = keyOf(d)
            const e = daily[k]
            const future = d > today
            const cls = future ? 'future' : e?.done ? 'done' : e?.note ? 'note' : 'none'
            const tip = future ? k : `${k}${e?.done ? ' · practiced' : ''}${e?.note ? ` — ${e.note}` : ''}`
            return <span key={k} className={cx('hm-cell', cls, k === tKey && 'today')} title={tip} />
          })}
        </div>
      </div>
      <div className="hm-legend muted tiny">
        <span>Less</span>
        <span className="hm-cell none" />
        <span className="hm-cell note" />
        <span className="hm-cell done" />
        <span>More</span>
      </div>
    </div>
  )
}
