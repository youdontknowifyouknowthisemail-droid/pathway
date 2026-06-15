// Copies the built web app (../dist) into ./app so Electron can package it.
// Run `npm run build` in the parent project first.
import { rm, cp, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.dirname(fileURLToPath(import.meta.url))
const src = path.join(dir, '..', 'dist')
const dest = path.join(dir, 'app')

try {
  await access(src)
} catch {
  console.error('No ../dist found. Run "npm run build" in the pathway/ project first.')
  process.exit(1)
}

await rm(dest, { recursive: true, force: true })
await cp(src, dest, { recursive: true })
console.log('copied dist -> desktop/app')
