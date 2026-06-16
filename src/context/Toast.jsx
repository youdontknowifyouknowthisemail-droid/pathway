// Tiny toast system for lightweight feedback (level-ups, achievements).
import { createContext, useCallback, useContext, useState } from 'react'
import { cx } from '../lib/util'

const Ctx = createContext({ toast: () => {} })
export const useToast = () => useContext(Ctx)

let counter = 0

export function ToastProvider({ children }) {
  const [items, setItems] = useState([])
  const toast = useCallback((text, tone = '') => {
    const id = ++counter
    setItems((l) => [...l, { id, text, tone }])
    setTimeout(() => setItems((l) => l.filter((t) => t.id !== id)), 3200)
  }, [])
  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <div className="toasts" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className={cx('toast-item', t.tone)}>{t.text}</div>
        ))}
      </div>
    </Ctx.Provider>
  )
}
