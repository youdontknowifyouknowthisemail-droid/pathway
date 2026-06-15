// Date + phase + streak logic. All dates are handled in LOCAL time and keyed
// as 'YYYY-MM-DD' to avoid UTC off-by-one surprises.
import { clamp01 } from './util'

const MS_DAY = 86400000
const pad = (n) => String(n).padStart(2, '0')
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function keyOf(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function todayKey() {
  return keyOf(new Date())
}

// Parse 'YYYY-MM-DD' as LOCAL midnight.
export function parseKey(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function addDays(d, n) {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

// Whole days from today until target (negative if the date has passed).
export function daysUntil(dateStr) {
  if (!dateStr) return null
  return Math.round((parseKey(dateStr) - startOfDay(new Date())) / MS_DAY)
}

// 'Apr 2027' (monthYear) or '31 Dec 2026'.
export function fmtDate(dateStr, { monthYear = false } = {}) {
  if (!dateStr) return ''
  const d = parseKey(dateStr)
  return monthYear ? `${MONTHS[d.getMonth()]} ${d.getFullYear()}` : `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

// ---- Pathway timeline -------------------------------------------------------

export const PHASES = [
  {
    id: 1,
    name: 'Maintenance Mode',
    tag: 'Now – Dec 2026',
    blurb: 'A-level retake is the priority. Keep coding light — 20–30 min a day.',
    icon: '🌱',
    start: '2026-06-01',
    end: '2026-12-31',
  },
  {
    id: 2,
    name: 'Build Phase',
    tag: 'Jan – Jun 2027',
    blurb: 'The main runway. CS50x + CS50 Web, portfolio projects, hackathons.',
    icon: '🚀',
    start: '2027-01-01',
    end: '2027-06-30',
  },
  {
    id: 3,
    name: 'University',
    tag: 'Jul 2027 onward',
    blurb: 'Join clubs, keep contributing to GitHub, keep building.',
    icon: '🎓',
    start: '2027-07-01',
    end: null,
  },
]

export const KEY_DATES = {
  alevels: '2026-12-31',
  university: '2027-07-01',
}

export function currentPhase(now = new Date()) {
  const t = startOfDay(now)
  if (t < parseKey(PHASES[0].start)) return PHASES[0]
  for (const p of PHASES) {
    const start = parseKey(p.start)
    const end = p.end ? parseKey(p.end) : null
    if (t >= start && (!end || t <= end)) return p
  }
  return PHASES[PHASES.length - 1]
}

// Fraction (0..1) of today along the runway from phase 1 start to university.
export function runwayProgress(now = new Date()) {
  const start = parseKey(PHASES[0].start)
  const end = parseKey(KEY_DATES.university)
  return clamp01((startOfDay(now) - start) / (end - start))
}

// Per-phase progress (0..1) for the active phase; 1 for past phases, 0 for future.
export function phaseProgress(phase, now = new Date()) {
  if (!phase.end) return null // open-ended (University)
  const start = parseKey(phase.start)
  const end = parseKey(phase.end)
  return clamp01((startOfDay(now) - start) / (end - start))
}

// ---- Streaks ----------------------------------------------------------------

export function computeStreak(daily) {
  const done = (k) => daily[k] && daily[k].done

  // Current streak: consecutive completed days ending today. If today isn't
  // ticked yet, count up to yesterday so the streak doesn't read 0 all day.
  let current = 0
  let cursor = startOfDay(new Date())
  if (!done(keyOf(cursor))) cursor = addDays(cursor, -1)
  while (done(keyOf(cursor))) {
    current++
    cursor = addDays(cursor, -1)
  }

  // Longest streak + total days across all completed entries.
  const keys = Object.keys(daily).filter(done).sort()
  let longest = 0
  let run = 0
  let prev = null
  for (const k of keys) {
    const d = parseKey(k)
    run = prev && Math.round((d - prev) / MS_DAY) === 1 ? run + 1 : 1
    if (run > longest) longest = run
    prev = d
  }

  return { current, longest, total: keys.length }
}
