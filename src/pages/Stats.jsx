import { useApp } from '../context/AppData'
import { PageHead, Card, Bar, Ring } from '../components/ui'
import { ACHIEVEMENTS } from '../lib/practice/achievements'
import { CHALLENGES } from '../lib/practice/challenges'
import { keyOf, addDays, startOfDay } from '../lib/dates'
import { cx } from '../lib/util'

const CH_LANG = Object.fromEntries(CHALLENGES.map((c) => [c.id, c.lang]))

export default function Stats() {
  const { data, streak, level } = useApp()
  const solved = data.practice.solved
  const jsSolved = solved.filter((id) => CH_LANG[id] === 'js').length
  const pySolved = solved.filter((id) => CH_LANG[id] === 'py').length
  const acc = data.practice.quizAnswered ? Math.round((data.practice.quizCorrect / data.practice.quizAnswered) * 100) : 0
  const curDone = data.curriculum.filter((c) => c.done).length
  const unlocked = data.achievements || {}
  const unlockedCount = Object.keys(unlocked).length

  const today = startOfDay(new Date())
  const week = []
  for (let i = 6; i >= 0; i--) {
    const d = addDays(today, -i)
    const k = keyOf(d)
    week.push({ k, label: 'SMTWTFS'[d.getDay()], done: !!data.daily[k]?.done })
  }

  const stats = [
    { label: 'Current streak', value: `${streak.current}d`, icon: '🔥' },
    { label: 'Longest streak', value: `${streak.longest}d`, icon: '🏆' },
    { label: 'Days practiced', value: streak.total, icon: '📅' },
    { label: 'Challenges solved', value: solved.length, icon: '🧩' },
    { label: 'Quiz accuracy', value: `${acc}%`, icon: '🎯' },
    { label: 'Curriculum done', value: curDone, icon: '📚' },
  ]

  return (
    <div className="page">
      <PageHead title="Your stats" sub="Progress, streaks, and achievements." />

      <Card className="card-pad level-hero">
        <Ring value={level.pct} color="var(--brand)" size={104}>
          <div className="lvl-num">{level.level}</div>
          <div className="muted tiny">level</div>
        </Ring>
        <div className="grow">
          <div className="card-title">⭐ Level {level.level}</div>
          <Bar value={level.pct * 100} color="var(--brand)" />
          <div className="muted small">{level.intoLevel}/{level.perLevel} XP to level {level.level + 1} · {level.total} XP total</div>
        </div>
      </Card>

      <div className="grid stat-grid">
        {stats.map((s) => (
          <Card key={s.label} className="card-pad stat-cell">
            <div className="stat-ic">{s.icon}</div>
            <div className="stat-val">{s.value}</div>
            <div className="muted tiny">{s.label}</div>
          </Card>
        ))}
      </div>

      <Card className="card-pad">
        <div className="card-title">This week</div>
        <div className="week-row">
          {week.map((d) => (
            <div key={d.k} className="week-day">
              <div className={cx('week-dot', d.done && 'on')} />
              <span className="muted tiny">{d.label}</span>
            </div>
          ))}
        </div>
        <div className="muted small" style={{ marginTop: 8 }}>Solved: {jsSolved} JavaScript · {pySolved} Python</div>
      </Card>

      <Card className="card-pad">
        <div className="row between wrap">
          <div className="card-title">Achievements</div>
          <span className="muted small">{unlockedCount}/{ACHIEVEMENTS.length}</span>
        </div>
        <div className="ach-grid">
          {ACHIEVEMENTS.map((a) => {
            const got = !!unlocked[a.id]
            return (
              <div key={a.id} className={cx('ach', got ? 'got' : 'locked')}>
                <div className="ach-ic">{got ? a.icon : '🔒'}</div>
                <div className="ach-title">{a.title}</div>
                <div className="muted tiny">{a.desc}</div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
