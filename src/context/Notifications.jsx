// Notification scheduling. Two paths:
//  - Web (browser / PWA): the Notification API, scheduled with timers while the
//    app is open. Fires only while a tab is open — hence the dashboard fallback
//    banner. Requires the page to be open.
//  - Native (Capacitor / Android): @capacitor/local-notifications schedules real
//    OS notifications that fire even when the app is fully closed.
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Capacitor } from '@capacitor/core'
import { useApp } from './AppData'

const isNative = Capacitor.isNativePlatform()
const webSupported = typeof window !== 'undefined' && 'Notification' in window
const supported = isNative || webSupported

const Ctx = createContext({ supported: false, permission: 'unsupported', request: async () => 'unsupported' })
export const useNotifications = () => useContext(Ctx)

// ---- web helpers ----
function msUntilTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  const now = new Date()
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0)
  if (next <= now) next.setDate(next.getDate() + 1)
  return next - now
}
function msUntilWeekly(timeStr, weekday) {
  const [h, m] = timeStr.split(':').map(Number)
  const now = new Date()
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0)
  let add = (weekday - now.getDay() + 7) % 7
  if (add === 0 && next <= now) add = 7
  next.setDate(next.getDate() + add)
  return next - now
}
function fireWeb(title, body) {
  if (Notification.permission !== 'granted') return
  try {
    new Notification(title, { body, icon: 'favicon.svg', tag: title })
  } catch {
    /* some browsers only allow notifications from a service worker — ignore */
  }
}

// ---- native (Capacitor) helpers ----
const mapDisplay = (d) => (d === 'granted' ? 'granted' : d === 'denied' ? 'denied' : 'default')

async function scheduleNative(s) {
  const { LocalNotifications } = await import('@capacitor/local-notifications')
  await LocalNotifications.cancel({ notifications: [{ id: 1 }, { id: 2 }] })
  const notifications = []
  if (s.dailyEnabled) {
    const [h, m] = s.dailyTime.split(':').map(Number)
    notifications.push({
      id: 1,
      title: 'Time for your coding practice block 💻',
      body: 'Just 20–30 minutes today. Open Pathway and tick it off.',
      schedule: { on: { hour: h, minute: m }, allowWhileIdle: true },
    })
  }
  if (s.weeklyEnabled) {
    const [h, m] = s.weeklyTime.split(':').map(Number)
    notifications.push({
      id: 2,
      title: 'Weekly project time 🗓️',
      body: 'Work on your portfolio & push something to GitHub.',
      // Capacitor weekday: 1 = Sunday .. 7 = Saturday (JS getDay is 0..6)
      schedule: { on: { weekday: s.weeklyDay + 1, hour: h, minute: m }, allowWhileIdle: true },
    })
  }
  if (notifications.length) await LocalNotifications.schedule({ notifications })
}

export function NotificationsProvider({ children }) {
  const { data } = useApp()
  const s = data.settings
  const [permission, setPermission] = useState(() =>
    isNative ? 'default' : webSupported ? Notification.permission : 'unsupported',
  )

  // On native, read the current permission once on mount.
  useEffect(() => {
    if (!isNative) return
    import('@capacitor/local-notifications')
      .then(({ LocalNotifications }) => LocalNotifications.checkPermissions())
      .then((p) => setPermission(mapDisplay(p.display)))
      .catch(() => {})
  }, [])

  // Native: (re)schedule OS notifications whenever settings or permission change.
  useEffect(() => {
    if (!isNative || permission !== 'granted') return
    scheduleNative(s).catch(() => {})
  }, [permission, s.dailyEnabled, s.dailyTime, s.weeklyEnabled, s.weeklyTime, s.weeklyDay])

  // Web: daily reminder (re-arms every 24h while the app is open).
  useEffect(() => {
    if (isNative || !webSupported || permission !== 'granted' || !s.dailyEnabled) return
    let timer
    const arm = () => {
      timer = setTimeout(() => {
        fireWeb('Time for your coding practice block 💻', 'Just 20–30 minutes today. Open Pathway and tick it off.')
        arm()
      }, msUntilTime(s.dailyTime))
    }
    arm()
    return () => clearTimeout(timer)
  }, [permission, s.dailyEnabled, s.dailyTime])

  // Web: weekly reminder.
  useEffect(() => {
    if (isNative || !webSupported || permission !== 'granted' || !s.weeklyEnabled) return
    let timer
    const arm = () => {
      timer = setTimeout(() => {
        fireWeb('Weekly project time 🗓️', 'Work on your portfolio & push something to GitHub.')
        arm()
      }, msUntilWeekly(s.weeklyTime, s.weeklyDay))
    }
    arm()
    return () => clearTimeout(timer)
  }, [permission, s.weeklyEnabled, s.weeklyTime, s.weeklyDay])

  const request = useCallback(async () => {
    if (!supported) return 'unsupported'
    if (isNative) {
      const { LocalNotifications } = await import('@capacitor/local-notifications')
      const p = mapDisplay((await LocalNotifications.requestPermissions()).display)
      setPermission(p)
      return p
    }
    let p = Notification.permission
    if (p === 'default') p = await Notification.requestPermission()
    setPermission(p)
    if (p === 'granted') fireWeb('Notifications on ✅', "You'll get practice reminders while Pathway is open.")
    return p
  }, [])

  return <Ctx.Provider value={{ supported, permission, request }}>{children}</Ctx.Provider>
}
