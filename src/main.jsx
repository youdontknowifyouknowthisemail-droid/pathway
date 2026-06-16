import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { AppProvider } from './context/AppData.jsx'
import { NotificationsProvider } from './context/Notifications.jsx'
import { ToastProvider } from './context/Toast.jsx'

// Apply the saved theme before first paint (default to dark — used mostly at night).
const theme = localStorage.getItem('pathway-theme') || 'dark'
if (theme !== 'auto') document.documentElement.setAttribute('data-theme', theme)

// Register the service worker for offline use (production + http/https only, not file://).
if ('serviceWorker' in navigator && import.meta.env.PROD && /^https?:$/.test(location.protocol)) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}))
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <ToastProvider>
          <AppProvider>
            <NotificationsProvider>
              <App />
            </NotificationsProvider>
          </AppProvider>
        </ToastProvider>
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>,
)
