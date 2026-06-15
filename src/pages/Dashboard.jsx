import { Link } from 'react-router-dom'
import { useApp } from '../context/AppData'
import { PageHead, Card, Ring, Check } from '../components/ui'
import { dailyItem } from '../lib/practice/daily'
import { CHALLENGES } from '../lib/practice/challenges'
import { QUIZZES } from '../lib/practice/quizzes'
import Countdown from '../components/Countdown'
import PhaseTimeline from '../components/PhaseTimeline'
import Heatmap from '../components/Heatmap'
import ReminderBanner from '../components/ReminderBanner'
import { KEY_DATES, todayKey, fmtDate } from '../lib/dates'

export default function Dashboard() {
  const { data, phase, streak, toggleToday, setDayNote } = useApp()
  const k = todayKey()
  const today = data.daily[k] || { done: false, note: '' }
  const nextItem = data.curriculum.find((c) => !c.done)
  const dose = dailyItem(k)
  const doseDone = !!data.practice.dailyDone[k]
  const doseLabel = dose?.type === 'challenge'
    ? `Today: ${CHALLENGES.find((c) => c.id === dose.id)?.title}`
    : `Today: a ${QUIZZES.find((q) => q.id === dose.id)?.topic} quiz`

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="page">
      <PageHead title={`${greeting} 👋`} sub={`You're in Phase ${phase.id} — ${phase.name}.`} />

      <ReminderBanner />

      <Link to="/practice" className="card card-pad clickable daily-dose">
        <div className="row between wrap">
          <div className="grow">
            <div className="card-title">🧪 Daily dose of code</div>
            <div className="muted small">{doseDone ? 'Done today — nice work.' : doseLabel}</div>
          </div>
          <span className="pill">{doseDone ? 'done ✓' : 'Solve →'}</span>
        </div>
      </Link>

      <div className="grid dash-top">
        <Card className="card-pad focus-card">
          <div className="card-title">Today’s focus</div>
          <div className="daily-row">
            <Check checked={today.done} onChange={toggleToday} title="Mark today's practice done" />
            <div className="grow">
              <div className="daily-q">Did I do my coding practice today?</div>
              <div className="muted small">20–30 min · {fmtDate(k)}</div>
            </div>
          </div>
          {nextItem ? (
            <div className="focus-suggest">
              <span className="muted tiny">Up next in your curriculum</span>
              <div className="focus-next">{nextItem.course} — {nextItem.title}</div>
            </div>
          ) : (
            <div className="muted small">🎉 Curriculum complete — pick a project to push forward.</div>
          )}
          <input
            className="input"
            placeholder="What did you work on? (optional)"
            value={today.note}
            onChange={(e) => setDayNote(k, e.target.value)}
          />
        </Card>

        <Card className="card-pad streak-card">
          <Ring value={Math.min(1, streak.current / 30)} color="var(--good)" size={120}>
            <div className="streak-num">{streak.current}</div>
            <div className="muted tiny">day streak 🔥</div>
          </Ring>
          <div className="muted small streak-meta">Longest {streak.longest}d · {streak.total} days total</div>
        </Card>
      </div>

      <div className="grid two-col">
        <Countdown label="Days until A-levels" date={KEY_DATES.alevels} icon="📝" color="var(--warn)" />
        <Countdown label="Days until University" date={KEY_DATES.university} icon="🎓" color="var(--brand)" />
      </div>

      <Card className="card-pad">
        <div className="card-title">Your pathway</div>
        <p className="muted small phase-blurb">{phase.icon} {phase.blurb}</p>
        <PhaseTimeline />
      </Card>

      <Card className="card-pad">
        <div className="row between wrap">
          <div className="card-title">Practice history</div>
          <span className="muted small">{streak.total} days practiced</span>
        </div>
        <Heatmap daily={data.daily} />
      </Card>
    </div>
  )
}
