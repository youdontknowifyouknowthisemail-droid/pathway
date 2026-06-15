import { useEffect, useState } from 'react'

// Captures the browser's install prompt so we can offer an in-app "Install"
// button (Chrome/Edge/Android). iOS Safari has no programmatic prompt — there
// the user installs via Share → "Add to Home Screen".
export function useInstallPrompt() {
  const [promptEvt, setPromptEvt] = useState(null)
  const [installed, setInstalled] = useState(
    typeof window !== 'undefined' &&
      (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true),
  )

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault()
      setPromptEvt(e)
    }
    const onInstalled = () => {
      setInstalled(true)
      setPromptEvt(null)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const install = async () => {
    if (!promptEvt) return
    promptEvt.prompt()
    await promptEvt.userChoice
    setPromptEvt(null)
  }

  return { canInstall: !!promptEvt, installed, install }
}
