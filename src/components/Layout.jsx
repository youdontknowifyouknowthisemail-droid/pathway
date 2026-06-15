import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppData'
import { daysUntil, KEY_DATES } from '../lib/dates'

const NAV = [
  { to: '/', ic: '🏠', label: 'Dashboard', end: true },
  { to: '/curriculum', ic: '📚', label: 'Curriculum' },
  { to: '/projects', ic: '🧩', label: 'Projects' },
  { to: '/goals', ic: '🎯', label: 'Goals' },
  { to: '/journal', ic: '📓', label: 'Journal' },
  { to: '/settings', ic: '⚙️', label: 'Settings' },
]

const THEMES = ['dark', 'light', 'auto']
const themeIcon = (t) => (t === 'dark' ? '🌙' : t === 'light' ? '☀️' : '🌓')

export default function Layout({ children }) {
  const { phase, streak } = useApp()
  const [theme, setTheme] = useState(() => localStorage.getItem('pathway-theme') || 'dark')
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    if (theme === 'auto') document.documentElement.removeAttribute('data-theme')
    else document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pathway-theme', theme)
  }, [theme])

  const cycleTheme = () => setTheme((t) => THEMES[(THEMES.indexOf(t) + 1) % THEMES.length])
  const closeNav = () => setNavOpen(false)
  const linkClass = ({ isActive }) => 'navlink' + (isActive ? ' active' : '')
  const dUni = daysUntil(KEY_DATES.university)

  return (
    <div className="app">
      <aside className={'sidebar' + (navOpen ? ' open' : '')}>
        <div className="brand">
          <div className="logo">📈</div>
          <div className="brand-text">
            <b>Pathway</b>
            <small>Code your way to uni</small>
          </div>
        </div>
        <nav className="navlist">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} onClick={closeNav} className={linkClass}>
              <span className="ic">{n.ic}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidefoot">
          <div className="sidefoot-streak">
            <span>🔥 Current streak</span>
            <b>{streak.current}d</b>
          </div>
          <div className="muted tiny">{phase.icon} Phase {phase.id} · {phase.name}</div>
        </div>
      </aside>

      <div className={'scrim' + (navOpen ? ' show' : '')} onClick={closeNav} />

      <div className="main">
        <header className="topbar">
          <button className="iconbtn hamburger" onClick={() => setNavOpen((o) => !o)} aria-label="Open menu">☰</button>
          <div className="grow brand-mini">
            <b>Pathway</b>
            <span className="muted small">{phase.icon} {phase.name}</span>
          </div>
          <span className="pill ghost" title="Days until university">🎓 {dUni}d</span>
          <button className="iconbtn" onClick={cycleTheme} title={`Theme: ${theme} (tap to switch)`}>{themeIcon(theme)}</button>
        </header>
        <main className="content">{children}</main>
      </div>

      <nav className="bottomnav">
        {NAV.slice(0, 5).map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => 'bn-item' + (isActive ? ' active' : '')}>
            <span className="bn-ic">{n.ic}</span>
            <span>{n.label}</span>
          </NavLink>
        ))}
        <button className="bn-item" onClick={() => setNavOpen(true)}>
          <span className="bn-ic">⚙️</span>
          <span>More</span>
        </button>
      </nav>
    </div>
  )
}
