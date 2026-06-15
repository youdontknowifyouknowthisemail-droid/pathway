// Runs the user's JavaScript inside a terminable Web Worker, so an infinite
// loop or crash can't take down the page. Returns per-test results + console logs.
const WORKER_SRC = `
self.onmessage = (e) => {
  const { code, fnName, tests } = e.data
  const logs = []
  const realLog = console.log
  console.log = (...a) => { try { logs.push(a.map(x => typeof x === 'object' ? JSON.stringify(x) : String(x)).join(' ')) } catch { logs.push(String(a)) } }
  let fn
  try {
    fn = new Function(code + "\\nreturn typeof " + fnName + " === 'function' ? " + fnName + " : undefined;")()
  } catch (err) {
    self.postMessage({ error: 'Could not run your code: ' + err.message, logs }); return
  }
  if (typeof fn !== 'function') { self.postMessage({ error: 'Define a function named ' + fnName + '().', logs }); return }
  const results = []
  for (const t of tests) {
    let got, pass = false, error = null
    try { got = fn.apply(null, t.args); pass = JSON.stringify(got) === JSON.stringify(t.expected) }
    catch (err) { error = err.message }
    results.push({ args: t.args, expected: t.expected, got, pass, error })
  }
  console.log = realLog
  self.postMessage({ results, logs })
}
`

export function runJS({ code, fnName, tests, timeoutMs = 4000 }) {
  return new Promise((resolve) => {
    let url
    let worker
    try {
      const blob = new Blob([WORKER_SRC], { type: 'application/javascript' })
      url = URL.createObjectURL(blob)
      worker = new Worker(url)
    } catch {
      resolve({ error: 'Could not start the sandbox.', logs: [] })
      return
    }
    const cleanup = () => {
      try { worker.terminate() } catch { /* noop */ }
      if (url) URL.revokeObjectURL(url)
    }
    const timer = setTimeout(() => {
      cleanup()
      resolve({ error: 'Timed out after 4s — possible infinite loop.', logs: [] })
    }, timeoutMs)
    worker.onmessage = (e) => { clearTimeout(timer); cleanup(); resolve(e.data) }
    worker.onerror = (e) => { clearTimeout(timer); cleanup(); resolve({ error: e.message || 'Sandbox error', logs: [] }) }
    worker.postMessage({ code, fnName, tests })
  })
}
