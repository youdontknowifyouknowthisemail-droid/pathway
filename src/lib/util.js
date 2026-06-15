// Tiny shared helpers.

export const cx = (...parts) => parts.filter(Boolean).join(' ')

export const clamp01 = (x) => Math.max(0, Math.min(1, x))

export const pct = (x) => `${Math.round(clamp01(x) * 100)}%`

export const plural = (n, word, suffix = 's') => `${n} ${word}${n === 1 ? '' : suffix}`

// Stable unique id. Uses crypto.randomUUID when available, falls back otherwise.
export function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'id-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
