import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

// The live site. Scanning the QR opens it on a phone, where it can be installed.
export const SITE_URL = 'https://youdontknowifyouknowthisemail-droid.github.io/pathway/'

export default function InstallQR() {
  const [src, setSrc] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    QRCode.toDataURL(SITE_URL, { margin: 1, width: 200, color: { dark: '#0b1120', light: '#ffffff' } })
      .then(setSrc)
      .catch(() => {})
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard blocked — the link is shown below to copy manually */
    }
  }

  return (
    <div className="install-qr">
      {src && <img className="qr-img" src={src} alt="QR code to open Pathway" width={148} height={148} />}
      <div className="grow install-qr-side">
        <div className="muted small">Scan with your phone’s camera to open Pathway, then add it to your home screen.</div>
        <code className="qr-url">{SITE_URL}</code>
        <div className="row gap">
          <button className="btn sm" onClick={copy}>{copied ? 'Copied ✓' : 'Copy link'}</button>
          <a className="btn sm" href={SITE_URL} target="_blank" rel="noreferrer">Open ↗</a>
        </div>
      </div>
    </div>
  )
}
