import { useEffect, useState } from 'react'
import { useApp } from '../context/AppData'
import CodeEditor from './CodeEditor'
import { runJS } from '../lib/runners/jsRunner'
import { runPy } from '../lib/runners/pyRunner'
import { CHALLENGE_LANGS } from '../lib/practice/challenges'
import { cx } from '../lib/util'

const fmt = (v) => {
  if (v === undefined) return 'undefined'
  try { return JSON.stringify(v) } catch { return String(v) }
}

export default function ChallengeRunner({ challenge, onSolved }) {
  const { data, solveChallenge } = useApp()
  const [code, setCode] = useState(challenge.starter)
  const [status, setStatus] = useState('')
  const [running, setRunning] = useState(false)
  const [out, setOut] = useState(null)
  const [showHints, setShowHints] = useState(false)
  const alreadySolved = data.practice.solved.includes(challenge.id)

  useEffect(() => {
    setCode(challenge.starter)
    setOut(null)
    setStatus('')
    setShowHints(false)
  }, [challenge.id, challenge.starter])

  const run = async () => {
    setRunning(true)
    setOut(null)
    setStatus('Running…')
    const args = { code, fnName: challenge.fn, tests: challenge.tests }
    const res = challenge.lang === 'py' ? await runPy({ ...args, onStatus: setStatus }) : await runJS(args)
    setRunning(false)
    setStatus('')
    setOut(res)
    if (res.results && res.results.length && res.results.every((r) => r.pass)) {
      solveChallenge(challenge.id)
      onSolved && onSolved(challenge.id)
    }
  }

  const allPass = out?.results && out.results.every((r) => r.pass)
  const passCount = out?.results ? out.results.filter((r) => r.pass).length : 0

  return (
    <div className="runner">
      <div className="row gap wrap">
        <span className={cx('tag', challenge.lang === 'py' ? 'brand' : 'warn')}>{CHALLENGE_LANGS[challenge.lang]}</span>
        <span className="tag">{challenge.difficulty}</span>
        {alreadySolved && <span className="tag good">solved ✓</span>}
      </div>
      <p className="runner-prompt">{challenge.prompt}</p>

      <CodeEditor value={code} onChange={setCode} language={challenge.lang} />

      <div className="row gap wrap runner-actions">
        <button className="btn primary" onClick={run} disabled={running}>{running ? (status || 'Running…') : '▶ Run tests'}</button>
        <button className="btn" onClick={() => { setCode(challenge.starter); setOut(null) }} disabled={running}>Reset</button>
        {challenge.hints?.length > 0 && (
          <button className="btn ghost" onClick={() => setShowHints((s) => !s)}>{showHints ? 'Hide hint' : '💡 Hint'}</button>
        )}
      </div>

      {showHints && <ul className="hints">{challenge.hints.map((h, i) => <li key={i} className="muted small">{h}</li>)}</ul>}

      {out?.error && <pre className="run-error">{out.error}</pre>}

      {out?.results && (
        <div className="results">
          <div className={cx('results-head', allPass ? 'pass' : 'fail')}>
            {allPass ? '✓ All tests passed — challenge solved!' : `${passCount}/${out.results.length} tests passed`}
          </div>
          {out.results.map((r, i) => (
            <div key={i} className={cx('test', r.pass ? 'pass' : 'fail')}>
              <span className="test-ic">{r.pass ? '✓' : '✕'}</span>
              <code className="test-io">{challenge.fn}({r.args.map(fmt).join(', ')}) → {fmt(r.expected)}</code>
              {!r.pass && <span className="muted tiny test-got">{r.error ? `error: ${r.error}` : `got ${fmt(r.got)}`}</span>}
            </div>
          ))}
        </div>
      )}

      {out?.logs?.length > 0 && (
        <div className="console">
          <div className="muted tiny">console output</div>
          {out.logs.map((l, i) => <div key={i} className="console-line">{l}</div>)}
        </div>
      )}
    </div>
  )
}
