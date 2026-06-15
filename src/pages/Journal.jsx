import { useState } from 'react'
import { useApp } from '../context/AppData'
import { PageHead, Card, Empty } from '../components/ui'
import { todayKey, fmtDate } from '../lib/dates'

export default function Journal() {
  const { data, setJournal } = useApp()
  const [day, setDay] = useState(todayKey())
  const text = data.journal[day] || ''

  const entries = Object.entries(data.journal)
    .filter(([, v]) => v && v.trim())
    .sort((a, b) => b[0].localeCompare(a[0]))

  return (
    <div className="page">
      <PageHead title="Journal" sub="Reflections, blockers, things you learned. One entry per day — all optional." />

      <Card className="card-pad journal-editor">
        <div className="row between wrap">
          <div className="card-title">Entry</div>
          <input className="input date" type="date" value={day} max={todayKey()} onChange={(e) => setDay(e.target.value || todayKey())} />
        </div>
        <textarea
          className="input journal-text"
          rows={8}
          placeholder="How did it go today? What did you learn? What's blocking you?"
          value={text}
          onChange={(e) => setJournal(day, e.target.value)}
        />
        <div className="muted tiny">{fmtDate(day)} · saved automatically</div>
      </Card>

      <div className="card-title section">Past entries</div>
      {entries.length === 0 ? (
        <Empty icon="📓" title="No entries yet">Write your first reflection above.</Empty>
      ) : (
        <div className="grid journal-list">
          {entries.map(([k, v]) => (
            <Card key={k} className="card-pad journal-item clickable" onClick={() => setDay(k)}>
              <div className="row between">
                <b>{fmtDate(k)}</b>
                {k === todayKey() && <span className="tag good">today</span>}
              </div>
              <p className="muted small clamp">{v}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
