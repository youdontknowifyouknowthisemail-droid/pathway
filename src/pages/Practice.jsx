import { useMemo, useState } from 'react'
import { useApp } from '../context/AppData'
import { PageHead, Card, Tag } from '../components/ui'
import ChallengeRunner from '../components/ChallengeRunner'
import QuizRunner from '../components/QuizRunner'
import { CHALLENGES, CHALLENGE_LANGS, LANG_TONE, DIFFICULTIES } from '../lib/practice/challenges'
import { QUIZZES, QUIZ_TOPICS } from '../lib/practice/quizzes'
import { LESSONS, LESSON_TOPICS } from '../lib/practice/lessons'
import { dailyItem } from '../lib/practice/daily'
import { todayKey } from '../lib/dates'
import { cx } from '../lib/util'

const TABS = ['Daily', 'Quiz', 'Challenges', 'Lessons']

function pickN(arr, n) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, Math.min(n, a.length))
}

function DailyTab() {
  const { data, completeDaily } = useApp()
  const today = todayKey()
  const item = useMemo(() => dailyItem(today), [today])
  const done = !!data.practice.dailyDone[today]
  const challenge = item?.type === 'challenge' ? CHALLENGES.find((c) => c.id === item.id) : null
  const question = item?.type === 'quiz' ? QUIZZES.find((q) => q.id === item.id) : null
  return (
    <Card className="card-pad">
      <div className="row between wrap">
        <div className="card-title">🧪 Daily dose of code</div>
        {done ? <Tag tone="good">done today ✓</Tag> : <Tag tone="warn">not done</Tag>}
      </div>
      <p className="muted small">A different challenge or quiz question each day — finishing it ticks off today’s practice and keeps your streak alive.</p>
      {challenge && <ChallengeRunner challenge={challenge} onSolved={() => completeDaily(today)} />}
      {question && <QuizRunner questions={[question]} onDone={() => completeDaily(today)} />}
    </Card>
  )
}

function QuizTab() {
  const { data } = useApp()
  const [topic, setTopic] = useState('All')
  const [session, setSession] = useState(null)
  const [result, setResult] = useState(null)

  const start = () => {
    const pool = topic === 'All' ? QUIZZES : QUIZZES.filter((q) => q.topic === topic)
    setSession(pickN(pool, 8))
    setResult(null)
  }

  if (session) {
    return (
      <Card className="card-pad">
        <QuizRunner questions={session} onDone={(score) => { setResult({ score, total: session.length }); setSession(null) }} />
      </Card>
    )
  }

  const { quizAnswered, quizCorrect } = data.practice
  const acc = quizAnswered ? Math.round((quizCorrect / quizAnswered) * 100) : 0
  return (
    <Card className="card-pad">
      <div className="card-title">Quiz</div>
      {result && <div className="quiz-explain good"><b>Quiz complete: </b>{result.score} / {result.total} correct.</div>}
      <p className="muted small">A fresh set of up to 8 questions, randomized each time. Pick a topic:</p>
      <div className="row wrap gap">
        {['All', ...QUIZ_TOPICS].map((t) => (
          <button key={t} className={cx('chip', topic === t && 'on')} onClick={() => setTopic(t)}>{t}</button>
        ))}
      </div>
      <button className="btn primary" onClick={start} style={{ marginTop: 12 }}>Start quiz →</button>
      <div className="muted tiny" style={{ marginTop: 10 }}>Lifetime: {quizCorrect}/{quizAnswered} correct ({acc}%)</div>
    </Card>
  )
}

function ChallengesTab() {
  const { data } = useApp()
  const [sel, setSel] = useState(null)
  const [lang, setLang] = useState('All')
  const [diff, setDiff] = useState('All')

  if (sel) {
    const ch = CHALLENGES.find((c) => c.id === sel)
    return (
      <Card className="card-pad">
        <button className="btn sm ghost" onClick={() => setSel(null)}>← All challenges</button>
        <div className="card-title" style={{ margin: '10px 0 2px' }}>{ch.title}</div>
        <ChallengeRunner challenge={ch} />
      </Card>
    )
  }

  const filtered = CHALLENGES.filter(
    (c) => (lang === 'All' || CHALLENGE_LANGS[c.lang] === lang) && (diff === 'All' || c.difficulty === diff),
  )

  return (
    <>
      <div className="practice-filters">
        <div className="row wrap gap">
          {['All', 'JavaScript', 'Python', 'SQL'].map((l) => (
            <button key={l} className={cx('chip', lang === l && 'on')} onClick={() => setLang(l)}>{l}</button>
          ))}
        </div>
        <div className="row wrap gap">
          {['All', ...DIFFICULTIES].map((d) => (
            <button key={d} className={cx('chip', diff === d && 'on')} onClick={() => setDiff(d)}>{d}</button>
          ))}
        </div>
        <div className="muted tiny">{data.practice.solved.length} solved · {filtered.length} shown</div>
      </div>
      <div className="grid cards">
        {filtered.map((c) => {
          const solved = data.practice.solved.includes(c.id)
          return (
            <Card key={c.id} className="card-pad clickable challenge-card" onClick={() => setSel(c.id)}>
              <div className="row between wrap">
                <div className="proj-name">{c.title}</div>
                {solved && <Tag tone="good">✓</Tag>}
              </div>
              <div className="row gap wrap">
                <Tag tone={LANG_TONE[c.lang]}>{CHALLENGE_LANGS[c.lang]}</Tag>
                <Tag>{c.difficulty}</Tag>
              </div>
              <p className="muted small">{c.prompt}</p>
            </Card>
          )
        })}
      </div>
    </>
  )
}

function LessonsTab() {
  const [open, setOpen] = useState(null)
  return (
    <div className="lesson-list">
      {LESSON_TOPICS.map((topic) => {
        const items = LESSONS.filter((l) => l.topic === topic)
        if (!items.length) return null
        return (
          <div key={topic} className="lesson-group">
            <div className="lesson-group-title">{topic}</div>
            {items.map((l) => (
              <Card key={l.id} className="card-pad">
                <button className="lesson-head" onClick={() => setOpen(open === l.id ? null : l.id)}>
                  <div className="lesson-title">{l.title}</div>
                  <span className="lesson-toggle">{open === l.id ? '−' : '+'}</span>
                </button>
                {open === l.id && (
                  <div className="lesson-body">
                    <p className="small">{l.body}</p>
                    <pre className="lesson-example">{l.example}</pre>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default function Practice() {
  const [tab, setTab] = useState('Daily')
  return (
    <div className="page">
      <PageHead title="Practice" sub="Daily challenges, quizzes, runnable exercises, and quick lessons — your daily dose of code." />
      <div className="segmented">
        {TABS.map((t) => (
          <button key={t} className={cx('seg-btn', tab === t && 'on')} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      {tab === 'Daily' && <DailyTab />}
      {tab === 'Quiz' && <QuizTab />}
      {tab === 'Challenges' && <ChallengesTab />}
      {tab === 'Lessons' && <LessonsTab />}
    </div>
  )
}
