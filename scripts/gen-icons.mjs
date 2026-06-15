// One-off PWA icon generator. Run with: npm run icons
// Rasterises the Pathway logo (rising line + dot) into the PNG sizes a PWA
// needs. Requires the dev dependency `sharp`.
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const outDir = fileURLToPath(new URL('../public/', import.meta.url))

const glyph = (stroke) => `
  <path d="M14 42 L27 29 L36 38 L50 22" fill="none" stroke="#38bdf8" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="50" cy="22" r="5.5" fill="#34d399"/>`

// Standard icon: rounded dark tile with the glyph.
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="15" fill="#0b1120"/>${glyph(5)}</svg>`

// Maskable: full-bleed background (no rounding) + glyph scaled into the safe zone.
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#0b1120"/>
  <g transform="translate(11.52 11.52) scale(0.64)">${glyph(7)}</g></svg>`

async function png(svg, size, name) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(path.join(outDir, name))
  console.log('wrote', name, `${size}x${size}`)
}

await png(iconSvg, 192, 'icon-192.png')
await png(iconSvg, 512, 'icon-512.png')
await png(maskableSvg, 512, 'icon-512-maskable.png')
await png(maskableSvg, 180, 'apple-touch-icon-180.png')
