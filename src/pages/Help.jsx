import { PageHead, Card } from '../components/ui'

const FEATURES = [
  { icon: '🏠', title: 'Dashboard', body: "Your daily hub: today's reminders, the daily dose, your level & streak, countdowns to A-levels and university, the phase timeline, and your practice heatmap." },
  { icon: '🧪', title: 'Practice', body: 'Daily (a rotating challenge or quiz), Quiz (pick a topic, answer randomized questions), Challenges (write & run JavaScript, Python or SQL against tests), and Lessons. Everything earns XP.' },
  { icon: '📆', title: 'Calendar', body: 'A month view of your practice with key dates and your phase. Tap a past day to backfill it, or plan a future study session.' },
  { icon: '📚', title: 'Curriculum', body: 'Track CS50x and CS50 Web. Tick items off, add or edit your own.' },
  { icon: '🧩', title: 'Projects', body: 'Your portfolio — status, tech stack, GitHub & live links, notes.' },
  { icon: '🎯', title: 'Goals', body: 'Milestones with target dates and an on-track / due-soon / behind indicator.' },
  { icon: '📓', title: 'Journal', body: 'A freeform entry per day for reflections, blockers, and wins.' },
  { icon: '📊', title: 'Stats', body: 'Level, XP, streaks, quiz accuracy, weekly activity, and your achievements.' },
  { icon: '⚙️', title: 'Settings', body: 'Install the app, set reminder times & notifications, save profile links, and export/import your data.' },
]

export default function Help() {
  return (
    <div className="page">
      <PageHead title="Guide" sub="How Pathway works, and how to get the most out of it." />

      <Card className="card-pad">
        <div className="card-title">Getting started</div>
        <ol className="help-steps">
          <li>On the <b>welcome screen</b>, set your reminder time (and enable notifications if you like).</li>
          <li><b>Install</b> Pathway to your home screen / desktop — Settings → Install, or your browser's “Install / Add to Home Screen”.</li>
          <li>Do the <b>Daily dose</b> each day to build your streak.</li>
          <li>Work through <b>Curriculum</b>, log <b>Projects</b> & <b>Goals</b>, reflect in the <b>Journal</b>.</li>
          <li><b>Back up</b> regularly: Settings → Export JSON.</li>
        </ol>
      </Card>

      <div className="card-title section">Features</div>
      {FEATURES.map((f) => (
        <Card key={f.title} className="card-pad help-feat">
          <div className="help-feat-icon">{f.icon}</div>
          <div>
            <div className="help-feat-title">{f.title}</div>
            <div className="muted small">{f.body}</div>
          </div>
        </Card>
      ))}

      <Card className="card-pad">
        <div className="card-title">Notifications</div>
        <p className="muted small">Daily and weekly reminders fire while the app is open in a tab. On the installed Android app they fire even when it's closed. Enable them in Settings → Notifications.</p>
      </Card>

      <Card className="card-pad">
        <div className="card-title">Your data & privacy</div>
        <p className="muted small">Everything is stored locally on your device — no account, nothing uploaded. Use Export / Import (Settings) to back up or move between devices. See the <a className="link" href="privacy.html" target="_blank" rel="noreferrer">privacy policy</a>.</p>
      </Card>

      <Card className="card-pad">
        <div className="card-title">Share &amp; install</div>
        <p className="muted small">Send others the <a className="link" href="start.html" target="_blank" rel="noreferrer">download &amp; setup page</a>, or grab the Android APK from <a className="link" href="https://github.com/youdontknowifyouknowthisemail-droid/pathway/releases" target="_blank" rel="noreferrer">Releases</a>.</p>
      </Card>
    </div>
  )
}
