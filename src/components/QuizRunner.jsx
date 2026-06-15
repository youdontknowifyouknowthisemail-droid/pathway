import { useState } from 'react'
import { useApp } from '../context/AppData'
import { cx } from '../lib/util'

export default function QuizRunner({ questions, onDone }) {
  const { recordQuiz } = useApp()
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)

  const q = questions[idx]
  const last = idx === questions.length - 1
  const correct = picked === q.answer

  const choose = (i) => {
    if (answered) return
    setPicked(i)
    setAnswered(true)
    const ok = i === q.answer
    if (ok) setScore((s) => s + 1)
    recordQuiz(ok)
  }

  const next = () => {
    if (last) { onDone && onDone(score); return }
    setIdx((n) => n + 1)
    setPicked(null)
    setAnswered(false)
  }

  return (
    <div className="quiz">
      <div className="row between">
        <span className="muted small">Question {idx + 1} / {questions.length}</span>
        <span className="tag">{q.topic}</span>
      </div>
      <div className="quiz-q">{q.q}</div>
      <div className="quiz-options">
        {q.options.map((opt, i) => {
          const state = !answered ? '' : i === q.answer ? 'correct' : i === picked ? 'wrong' : ''
          return (
            <button key={i} className={cx('quiz-opt', state)} onClick={() => choose(i)} disabled={answered}>
              <span className="quiz-opt-key">{String.fromCharCode(65 + i)}</span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={cx('quiz-explain', correct ? 'good' : 'bad')}>
          <b>{correct ? 'Correct! ' : 'Not quite. '}</b>{q.explain}
        </div>
      )}
      {answered && (
        <div className="row between">
          <span className="muted small">Score: {score} / {idx + 1}</span>
          <button className="btn primary" onClick={next}>{last ? 'Finish' : 'Next →'}</button>
        </div>
      )}
    </div>
  )
}
