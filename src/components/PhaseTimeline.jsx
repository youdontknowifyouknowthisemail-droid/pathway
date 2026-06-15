import { PHASES, KEY_DATES, currentPhase, runwayProgress, fmtDate } from '../lib/dates'
import { cx, pct } from '../lib/util'

export default function PhaseTimeline() {
  const active = currentPhase()
  const runway = runwayProgress()

  return (
    <div className="timeline">
      <div className="timeline-track">
        {PHASES.map((p) => {
          const state = p.id < active.id ? 'done' : p.id === active.id ? 'active' : 'todo'
          return (
            <div key={p.id} className={cx('phase-seg', state)}>
              <div className="phase-seg-head">
                <span className="phase-ic">{p.icon}</span>
                <span className="phase-name">{p.name}</span>
              </div>
              <div className="muted tiny">{p.tag}</div>
            </div>
          )
        })}
      </div>

      <div className="timeline-bar">
        <div className="timeline-fill" style={{ width: pct(runway) }} />
        <div className="timeline-dot" style={{ left: pct(runway) }} title="You are here" />
      </div>

      <div className="row between tiny muted timeline-scale">
        <span>{fmtDate(PHASES[0].start, { monthYear: true })}</span>
        <span>{pct(runway)} of the runway to university</span>
        <span>{fmtDate(KEY_DATES.university, { monthYear: true })}</span>
      </div>
    </div>
  )
}
