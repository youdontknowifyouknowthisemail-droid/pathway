// Runs the user's SQL in the browser via sql.js (SQLite compiled to WASM).
// Each exercise ships a `setup` script (CREATE + INSERT) that seeds a fresh
// in-memory database; the user's query runs against it. Loaded from a CDN on
// first use (needs internet that once; cached afterwards).
const VERSION = '1.10.3'
const CDN = `https://cdnjs.cloudflare.com/ajax/libs/sql.js/${VERSION}`

let sqlPromise = null

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

function getSql(onStatus) {
  if (!sqlPromise) {
    sqlPromise = (async () => {
      onStatus && onStatus('Loading SQL engine (one-time)…')
      await loadScript(`${CDN}/sql-wasm.js`)
      return globalThis.initSqlJs({ locateFile: (f) => `${CDN}/${f}` })
    })().catch((err) => {
      sqlPromise = null
      throw err
    })
  }
  return sqlPromise
}

// Returns { columns, values } of the FIRST result set, or { error }.
export async function runSql({ setup, query, onStatus }) {
  let SQL
  try {
    SQL = await getSql(onStatus)
  } catch {
    return { error: 'Could not load the SQL engine — an internet connection is needed the first time.' }
  }
  onStatus && onStatus('Running…')
  const db = new SQL.Database()
  try {
    if (setup) db.run(setup)
    const res = db.exec(query)
    const first = res[res.length - 1] || { columns: [], values: [] }
    return { columns: first.columns, values: first.values }
  } catch (err) {
    return { error: String(err.message || err) }
  } finally {
    try { db.close() } catch { /* noop */ }
  }
}
