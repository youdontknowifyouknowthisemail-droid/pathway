// Runs the user's Python in the browser via Pyodide (CPython compiled to WASM).
// Pyodide (~10 MB) is loaded from a CDN on first use — needs internet that once,
// then the browser caches it.
const PYODIDE_VERSION = 'v0.26.4'
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`

let pyodidePromise = null

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const el = document.createElement('script')
    el.src = src
    el.onload = () => resolve()
    el.onerror = () => reject(new Error('script load failed'))
    document.head.appendChild(el)
  })
}

function getPyodide(onStatus) {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      onStatus && onStatus('Downloading Python (one-time, ~10 MB)…')
      await loadScript(INDEX_URL + 'pyodide.js')
      const py = await globalThis.loadPyodide({ indexURL: INDEX_URL })
      return py
    })().catch((err) => {
      pyodidePromise = null // allow a retry next time
      throw err
    })
  }
  return pyodidePromise
}

export async function runPy({ code, fnName, tests, onStatus }) {
  let py
  try {
    py = await getPyodide(onStatus)
  } catch {
    return { error: 'Could not load Python — an internet connection is needed the first time.', logs: [] }
  }
  onStatus && onStatus('Running…')

  const logs = []
  try {
    py.setStdout({ batched: (s) => logs.push(s) })
    py.setStderr({ batched: (s) => logs.push(s) })
  } catch { /* older pyodide — ignore */ }

  const harness = `
import json as __json
__results = []
__cases = __tests.to_py() if hasattr(__tests, 'to_py') else __tests
for __case in __cases:
    __args = list(__case['args'])
    __exp = __case['expected']
    try:
        __got = ${fnName}(*__args)
        __results.append({'got': __got, 'expected': __exp, 'pass': bool(__got == __exp), 'error': None})
    except Exception as __e:
        __results.append({'got': None, 'expected': __exp, 'pass': False, 'error': str(__e)})
__json.dumps(__results, default=str)
`

  try {
    py.globals.set('__tests', tests)
    await py.runPythonAsync(code) // define the user's function
    const out = await py.runPythonAsync(harness)
    const parsed = JSON.parse(out).map((r, i) => ({ ...r, args: tests[i].args }))
    return { results: parsed, logs }
  } catch (err) {
    return { error: 'Could not run your code: ' + (err && err.message ? err.message.split('\n').slice(-3).join('\n') : String(err)), logs }
  } finally {
    try { py.globals.delete('__tests') } catch { /* noop */ }
  }
}
