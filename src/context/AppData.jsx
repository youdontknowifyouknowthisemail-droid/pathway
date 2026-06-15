// App-wide state: one data object persisted to localStorage, plus typed
// update actions and a couple of derived values (streak, current phase).
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadData, saveData } from '../lib/storage'
import { SEED } from '../lib/seed'
import { computeStreak, currentPhase, todayKey } from '../lib/dates'
import { uid } from '../lib/util'

const Ctx = createContext(null)

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}

export function AppProvider({ children }) {
  const [data, setData] = useState(loadData)

  // Persist on every change.
  useEffect(() => {
    saveData(data)
  }, [data])

  // Actions. setData is stable, so these never need to be recreated.
  const actions = useMemo(() => {
    const mapList = (key, id, patch) => (d) => ({
      ...d,
      [key]: d[key].map((x) => (x.id === id ? { ...x, ...patch } : x)),
    })
    const removeFrom = (key, id) => (d) => ({ ...d, [key]: d[key].filter((x) => x.id !== id) })

    return {
      // Daily practice
      toggleToday() {
        const k = todayKey()
        setData((d) => {
          const cur = d.daily[k] || { done: false, note: '' }
          return { ...d, daily: { ...d.daily, [k]: { ...cur, done: !cur.done } } }
        })
      },
      setDayNote(key, note) {
        setData((d) => {
          const cur = d.daily[key] || { done: false, note: '' }
          return { ...d, daily: { ...d.daily, [key]: { ...cur, note } } }
        })
      },
      setDay(key, patch) {
        setData((d) => {
          const cur = d.daily[key] || { done: false, note: '' }
          return { ...d, daily: { ...d.daily, [key]: { ...cur, ...patch } } }
        })
      },

      // Curriculum
      toggleCurriculum(id) {
        setData((d) => ({
          ...d,
          curriculum: d.curriculum.map((c) =>
            c.id === id ? { ...c, done: !c.done, date: !c.done ? todayKey() : null } : c,
          ),
        }))
      },
      addCurriculum(course, title) {
        if (!title.trim()) return
        setData((d) => ({ ...d, curriculum: [...d.curriculum, { id: uid(), course, title: title.trim(), done: false, date: null }] }))
      },
      editCurriculum(id, patch) {
        setData(mapList('curriculum', id, patch))
      },
      removeCurriculum(id) {
        setData(removeFrom('curriculum', id))
      },

      // Projects
      addProject(p) {
        setData((d) => ({ ...d, projects: [{ id: uid(), name: 'New project', desc: '', stack: [], status: 'Idea', github: '', deploy: '', notes: '', ...p }, ...d.projects] }))
      },
      editProject(id, patch) {
        setData(mapList('projects', id, patch))
      },
      removeProject(id) {
        setData(removeFrom('projects', id))
      },

      // Goals
      addGoal(g) {
        setData((d) => ({ ...d, goals: [...d.goals, { id: uid(), title: 'New goal', target: null, done: false, ...g }] }))
      },
      editGoal(id, patch) {
        setData(mapList('goals', id, patch))
      },
      toggleGoal(id) {
        setData((d) => ({ ...d, goals: d.goals.map((g) => (g.id === id ? { ...g, done: !g.done } : g)) }))
      },
      removeGoal(id) {
        setData(removeFrom('goals', id))
      },

      // Journal
      setJournal(key, text) {
        setData((d) => ({ ...d, journal: { ...d.journal, [key]: text } }))
      },

      // Settings
      setSettings(patch) {
        setData((d) => ({ ...d, settings: { ...d.settings, ...patch } }))
      },

      // Data management
      replaceAll(next) {
        setData(next)
      },
      resetAll() {
        setData(SEED())
      },
    }
  }, [])

  const streak = useMemo(() => computeStreak(data.daily), [data.daily])
  const phase = currentPhase()

  const value = useMemo(() => ({ data, streak, phase, ...actions }), [data, streak, phase, actions])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
