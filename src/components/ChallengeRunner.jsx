import { useEffect, useRef, useState } from 'react'
import { useApp } from '../context/AppData'
import CodeEditor from './CodeEditor'
import { runJS } from '../lib/runners/jsRunner'
import { runPy } from '../lib/runners/pyRunner'
import { runSql } from '../lib/runners/sqlRunner'
import { runHtmlChecks } from '../lib/runners/htmlChecks'
import { CHALLENGE_LANGS, LANG_TONE } from '../lib/practice/challenges'
import { cx } from '../lib/util'

const fmt = (v) => {
  if (v === undefined) return 'undefined'
  try { return JSON.stringify(v) } catch { return String(v) }
}

const sortRows = (rows) => [...(rows || [])].map((r) => JSON.stringify(r)).sort()

function SqlTable({ columns, values }) {
  if (!values || !values.length) return <div className="muted tiny">(no rows)</div>
  return (
    <div className="sql-table-wrap">
      <table className="sql-table">
        <thead><tr>{(columns || []).map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
        <tbody>
          {values.map((row, ri) => (
            <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell === null ? 'NULL' : String(cell)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ChallengeRunner({ challenge, onSolved }) {
  const { data, solveChallenge } = useApp()
  const [code, setCode] = useState(challenge.starter)
  const [status, setStatus] = useState('')
  const [running, setRunning] = useState(false)
  const [out, setOut] = useState(null)
  const [showHints, setShowHints] = useState(false)
  const frameRef = useRef(null)
  const isSql = challenge.lang === 'sql'
  const isHtml = challenge.lang === 'html'
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
    let res
    if (isHtml) {
      const doc = frameRef.current?.contentDocument
      res = doc ? { checks: runHtmlChecks(doc, challenge.checks) } : { error: 'Preview not ready — try again.' }
    } else if (isSql) {
      res = await runSql({ setup: challenge.setup, query: code, onStatus: setStatus })
      if (!res.error) res.pass = JSON.stringify(sortRows(res.values)) === JSON.stringify(sortRows(challenge.expected.values))
    } else if (challenge.lang === 'py') {
      res = await runPy({ code, fnName: challenge.fn, tests: challenge.tests, onStatus: setStatus })
    } else {
      res = await runJS({ code, fnName: challenge.fn, tests: challenge.tests })
    }
    setRunning(false)
    setStatus('')
    setOut(res)
    const passed = isHtml
      ? res.checks && res.checks.every((c) => c.pass)
      : isSql
      ? res.pass
      : res.results && res.results.length && res.results.every((r) => r.pass)
    if (passed) {
      solveChallenge(challenge.id)
      onSolved && onSolved(challenge.id)
    }
  }

  const runLabel = isHtml ? '▶ Run checks' : isSql ? '▶ Run query' : '▶ Run tests'
  const allPass = !isSql && !isHtml && out?.results && out.results.every((r) => r.pass)
  const passCount = out?.results ? out.results.filter((r) => r.pass).length : 0

  return (
    <div className="runner">
      <div className="row gap wrap">
        <span className={cx('tag', LANG_TONE[challenge.lang])}>{CHALLENGE_LANGS[challenge.lang]}</span>
        <span className="tag">{challenge.difficulty}</span>
        {alreadySolved && <span className="tag good">solved ✓</span>}
      </div>
      <p className="runner-prompt">{challenge.prompt}</p>

      <CodeEditor value={code} onChange={setCode} language={challenge.lang} />

      {isHtml && <iframe ref={frameRef} className="html-preview" title="Live preview" sandbox="allow-same-origin" srcDoc={code} />}

      <div className="row gap wrap runner-actions">
        <button className="btn primary" onClick={run} disabled={running}>{running ? (status || 'Running…') : runLabel}</button>
        <button className="btn" onClick={() => { setCode(challenge.starter); setOut(null) }} disabled={running}>Reset</button>
        {challenge.hints?.length > 0 && (
          <button className="btn ghost" onClick={() => setShowHints((s) => !s)}>{showHints ? 'Hide hint' : '💡 Hint'}</button>
        )}
      </div>

      {showHints && <ul className="hints">{challenge.hints.map((h, i) => <li key={i} className="muted small">{h}</li>)}</ul>}

      {out?.error && <pre className="run-error">{out.error}</pre>}

      {isHtml && out?.checks && (
        <div className="results">
          <div className={cx('results-head', out.checks.every((c) => c.pass) ? 'pass' : 'fail')}>
            {out.checks.every((c) => c.pass) ? '✓ All checks passed — solved!' : `${out.checks.filter((c) => c.pass).length}/${out.checks.length} checks passed`}
          </div>
          {out.checks.map((c, i) => (
            <div key={i} className={cx('test', c.pass ? 'pass' : 'fail')}>
              <span className="test-ic">{c.pass ? '✓' : '✕'}</span>
              <span>{c.desc}</span>
            </div>
          ))}
        </div>
      )}

      {isSql && out && !out.error && (
        <div className="results">
          <div className={cx('results-head', out.pass ? 'pass' : 'fail')}>{out.pass ? '✓ Correct result — solved!' : "Result doesn't match yet"}</div>
          <div className="muted tiny">Your result:</div>
          <SqlTable columns={out.columns} values={out.values} />
          {!out.pass && (
            <>
              <div className="muted tiny">Expected:</div>
              <SqlTable columns={challenge.expected.columns} values={challenge.expected.values} />
            </>
          )}
        </div>
      )}

      {!isSql && !isHtml && out?.results && (
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
