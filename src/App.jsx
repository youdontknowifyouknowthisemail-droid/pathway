import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Practice from './pages/Practice'
import Calendar from './pages/Calendar'
import Curriculum from './pages/Curriculum'
import Projects from './pages/Projects'
import Goals from './pages/Goals'
import Journal from './pages/Journal'
import Settings from './pages/Settings'
import Stats from './pages/Stats'
import Help from './pages/Help'
import RetentionWatcher from './components/RetentionWatcher'
import Onboarding from './components/Onboarding'

export default function App() {
  return (
    <Layout>
      <RetentionWatcher />
      <Onboarding />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/help" element={<Help />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
