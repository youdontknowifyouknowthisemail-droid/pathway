// Shared presentational primitives used across pages.
import { useEffect } from 'react'
import { cx, clamp01 } from '../lib/util'

export function PageHead({ title, sub, children }) {
  return (
    <div className="pagehead">
      <div className="grow">
        <h1>{title}</h1>
        {sub && <p className="muted sub">{sub}</p>}
      </div>
      {children && <div className="row wrap gap">{children}</div>}
    </div>
  )
}

export function Card({ children, className, onClick, ...rest }) {
  return (
    <div className={cx('card', onClick && 'clickable', className)} onClick={onClick} {...rest}>
      {children}
    </div>
  )
}

// Linear progress bar. `value` is a percentage (0–100).
export function Bar({ value = 0, color, className }) {
  return (
    <div className={cx('bar', className)}>
      <i style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }} />
    </div>
  )
}

// Circular progress ring. `value` is a fraction (0–1).
export function Ring({ value = 0, size = 96, stroke = 9, color = 'var(--brand)', children }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - clamp01(value))
  const c = size / 2
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle
          cx={c} cy={c} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform={`rotate(-90 ${c} ${c})`} style={{ transition: 'stroke-dashoffset .5s ease' }}
        />
      </svg>
      <div className="ring-label">{children}</div>
    </div>
  )
}

export function Tag({ children, tone, onRemove }) {
  return (
    <span className={cx('tag', tone)}>
      {children}
      {onRemove && <button type="button" className="tag-x" onClick={onRemove} aria-label="Remove">×</button>}
    </span>
  )
}

export function Check({ checked, onChange, title }) {
  return (
    <button
      type="button"
      className={cx('check', checked && 'on')}
      onClick={onChange}
      role="checkbox"
      aria-checked={checked}
      title={title}
    >
      {checked && (
        <svg viewBox="0 0 24 24" width="14" height="14">
          <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

export function Toggle({ checked, onChange, label, hint }) {
  return (
    <div className="toggle">
      <div className="toggle-text">
        <span>{label}</span>
        {hint && <span className="muted tiny">{hint}</span>}
      </div>
      <button
        type="button"
        className={cx('switch', checked && 'on')}
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <i />
      </button>
    </div>
  )
}

export function Field({ label, children, hint }) {
  return (
    <label className="field">
      {label && <span className="field-label">{label}</span>}
      {children}
      {hint && <span className="muted tiny">{hint}</span>}
    </label>
  )
}

export function Empty({ icon, title, children }) {
  return (
    <div className="empty">
      {icon && <div className="empty-ic">{icon}</div>}
      {title && <div className="empty-title">{title}</div>}
      {children && <div className="muted small">{children}</div>}
    </div>
  )
}

export function Modal({ title, onClose, children, wide }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <div className="modal-bg" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={cx('modal', wide && 'wide')}>
        <div className="modal-head">
          <h2>{title}</h2>
          <button type="button" className="iconbtn" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
