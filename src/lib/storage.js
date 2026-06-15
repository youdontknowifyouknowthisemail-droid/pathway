// localStorage persistence + JSON backup/restore. No backend required.
import { SEED } from './seed'
import { todayKey } from './dates'

export const STORAGE_KEY = 'pathway-data-v1'

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return SEED()
    return migrate(JSON.parse(raw))
  } catch {
    return SEED()
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // storage full or unavailable — fail quietly rather than crash the app
  }
}

// Keep old saves working as the shape evolves: fill in any missing top-level
// keys and merge in new settings fields, without clobbering user data.
function migrate(data) {
  const base = SEED()
  return {
    ...base,
    ...data,
    settings: { ...base.settings, ...(data.settings || {}) },
  }
}

export function downloadBackup(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pathway-backup-${todayKey()}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

// Parse + lightly validate an imported backup. Throws on anything unusable.
export function parseImport(text) {
  const parsed = JSON.parse(text)
  if (!parsed || typeof parsed !== 'object') throw new Error('Not a Pathway backup file.')
  return migrate(parsed)
}
