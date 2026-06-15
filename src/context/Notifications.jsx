// Browser-notification scheduling. Lives in a provider so the timers are armed
// exactly once, while the permission state is shared by the dashboard + settings.
//
// NOTE: browser notifications only fire while the app is open in a tab. There is
// no reliable way to fire them when the tab/app is fully closed without a backend
// + push service, so the dashboard also shows an in-app reminder banner as a
// fallback. See ReminderBanner.
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useApp } from './AppData'

const supported = typeof window !== 'undefined' && 'Notification' in window
const Ctx = createContext({ supported: false, permission: 'unsupported', request: async () => 'unsupported' })

export const useNotifications = () => useContext(Ctx)

// ms from now until the next HH:MM (today or tomorrow).
function msUntilTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  const now = new Date()
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0)
  if (next <= now) next.setDate(next.getDate() + 1)
  return next - now
}

// ms from now until the next HH:MM that falls on the given weekday (0 = Sun).
function msUntilWeekly(timeStr, weekday) {
  const [h, m] = timeStr.split(':').map(Number)
  const now = new Date()
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0)
  let add = (weekday - now.getDay() + 7) % 7
  if (add === 0 && next <= now) add = 7
  next.setDate(next.getDate() + add)
  return next - now
}

function fire(title, body) {
  if (!supported || Notification.permission !== 'granted') return
  try {
    new Notification(title, { body, icon: 'favicon.svg', tag: title })
  } catch {
    // some browsers throw if called outside a SW context — ignore
  }
}

export function NotificationsProvider({ children }) {
  const { data } = useApp()
  const s = data.settings
  const [permission, setPermission] = useState(supported ? Notification.permission : 'unsupported')

  // Daily reminder (re-arms itself every 24h).
  useEffect(() => {
    if (!supported || permission !== 'granted' || !s.dailyEnabled) return
    let timer
    const arm = () => {
      timer = setTimeout(() => {
        fire('Time for your coding practice block 💻', 'Just 20–30 minutes today. Open Pathway and tick it off.')
        arm()
      }, msUntilTime(s.dailyTime))
    }
    arm()
    return () => clearTimeout(timer)
  }, [permission, s.dailyEnabled, s.dailyTime])

  // Weekly reminder.
  useEffect(() => {
    if (!supported || permission !== 'granted' || !s.weeklyEnabled) return
    let timer
    const arm = () => {
      timer = setTimeout(() => {
        fire('Weekly project time 🗓️', 'Work on your portfolio & push something to GitHub.')
        arm()
      }, msUntilWeekly(s.weeklyTime, s.weeklyDay))
    }
    arm()
    return () => clearTimeout(timer)
  }, [permission, s.weeklyEnabled, s.weeklyTime, s.weeklyDay])

  const request = useCallback(async () => {
    if (!supported) return 'unsupported'
    let p = Notification.permission
    if (p === 'default') p = await Notification.requestPermission()
    setPermission(p)
    if (p === 'granted') fire('Notifications on ✅', "You'll get practice reminders while Pathway is open.")
    return p
  }, [])

  return <Ctx.Provider value={{ supported, permission, request }}>{children}</Ctx.Provider>
}
