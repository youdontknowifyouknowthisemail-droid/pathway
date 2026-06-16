// First-run welcome: a quick intro + set the reminder time + enable notifications.
import { useApp } from '../context/AppData'
import { useNotifications } from '../context/Notifications'
import { Modal, Field } from './ui'

export default function Onboarding() {
  const { data, setSettings } = useApp()
  const { supported, permission, request } = useNotifications()
  const s = data.settings

  if (s.onboarded) return null
  const finish = () => setSettings({ onboarded: true })

  return (
    <Modal title="Welcome to Pathway 📈" onClose={finish}>
      <div className="form onboard">
        <p className="muted small">
          Your personal coding-learning tracker — daily practice, runnable challenges, quizzes, and your
          pathway to university. Everything stays on your device.
        </p>
        <Field label="When should we remind you to practice?">
          <input className="input time" type="time" value={s.dailyTime} onChange={(e) => setSettings({ dailyTime: e.target.value })} />
        </Field>
        {supported && permission !== 'granted' && permission !== 'denied' && (
          <button className="btn" onClick={request}>🔔 Enable reminder notifications</button>
        )}
        <div className="onboard-tips muted small">
          <div>🧪 Do the <b>daily dose</b> each day to build a streak.</div>
          <div>⭐ Earn <b>XP</b> and unlock <b>achievements</b> as you practise.</div>
        </div>
        <button className="btn primary" onClick={finish}>Get started →</button>
      </div>
    </Modal>
  )
}
