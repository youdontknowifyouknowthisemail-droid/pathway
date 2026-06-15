// "Daily dose of code": one item per day, rotating across the WHOLE bank
// (challenges + quizzes) so it alternates types and an item only repeats once
// per full cycle (POOL.length days) — minimal repeats. Deterministic, so the
// same day shows the same item on every device.
import { parseKey } from '../dates'
import { CHALLENGES } from './challenges'
import { QUIZZES } from './quizzes'

const EPOCH = '2026-06-01'
const MS_DAY = 86400000

const POOL = [
  ...CHALLENGES.map((c) => ({ type: 'challenge', id: c.id })),
  ...QUIZZES.map((q) => ({ type: 'quiz', id: q.id })),
]

// Fisher–Yates shuffle driven by a seeded PRNG (mulberry32) — a fixed seed gives
// a stable pseudo-random order that spreads items (and types) evenly.
function shuffledOrder(n, seed) {
  const order = Array.from({ length: n }, (_, i) => i)
  let s = seed >>> 0
  const rand = () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    const tmp = order[i]
    order[i] = order[j]
    order[j] = tmp
  }
  return order
}

const ORDER = shuffledOrder(POOL.length, 0x9e3779b9)

function dayIndex(dateKey) {
  const d = Math.round((parseKey(dateKey) - parseKey(EPOCH)) / MS_DAY)
  return d < 0 ? 0 : d
}

// Returns { type: 'challenge' | 'quiz', id } for the given day.
export function dailyItem(dateKey) {
  if (POOL.length === 0) return null
  return POOL[ORDER[dayIndex(dateKey) % POOL.length]]
}
