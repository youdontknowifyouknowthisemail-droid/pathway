// Deterministic "daily dose of code": the same challenge for everyone on a given
// day, rotating through the bank by date so it changes each day.
import { CHALLENGES } from './challenges'

function hashKey(key) {
  let h = 2166136261
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function dailyChallenge(dateKey) {
  return CHALLENGES[hashKey(dateKey) % CHALLENGES.length]
}
