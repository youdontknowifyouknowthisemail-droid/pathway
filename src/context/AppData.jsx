// App-wide state: one data object persisted to localStorage, plus typed
// update actions and a couple of derived values (streak, current phase).
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadData, saveData } from '../lib/storage'
import { SEED } from '../lib/seed'
import { computeStreak, currentPhase, todayKey } from '../lib/dates'
import { levelInfo, XP } from '../lib/practice/achievements'
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
    const markToday = (daily, note) => {
      const k = todayKey()
      const cur = daily[k] || { done: false, note: '' }
      return { ...daily, [k]: { ...cur, done: true, note: cur.note || note } }
    }

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
        setData((d) => {
          const item = d.curriculum.find((c) => c.id === id)
          const awarding = item && !item.done
          return {
            ...d,
            curriculum: d.curriculum.map((c) =>
              c.id === id ? { ...c, done: !c.done, date: !c.done ? todayKey() : null } : c,
            ),
            practice: awarding ? { ...d.practice, xp: (d.practice.xp || 0) + XP.curriculum } : d.practice,
          }
        })
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

      // Calendar study-session plans
      setPlan(key, text) {
        setData((d) => ({ ...d, plans: { ...(d.plans || {}), [key]: text } }))
      },

      // Practice
      recordQuiz(correct) {
        setData((d) => ({ ...d, practice: { ...d.practice, quizAnswered: d.practice.quizAnswered + 1, quizCorrect: d.practice.quizCorrect + (correct ? 1 : 0), xp: (d.practice.xp || 0) + (correct ? XP.quiz : 0) } }))
      },
      solveChallenge(id) {
        setData((d) => {
          const newly = !d.practice.solved.includes(id)
          const solved = newly ? [...d.practice.solved, id] : d.practice.solved
          return { ...d, practice: { ...d.practice, solved, xp: (d.practice.xp || 0) + (newly ? XP.challenge : 0) }, daily: markToday(d.daily, 'Solved a code challenge') }
        })
      },
      completeDaily(dateKey) {
        setData((d) => {
          const already = d.practice.dailyDone[dateKey]
          return {
            ...d,
            practice: { ...d.practice, dailyDone: { ...d.practice.dailyDone, [dateKey]: true }, xp: (d.practice.xp || 0) + (already ? 0 : XP.daily) },
            daily: markToday(d.daily, 'Daily dose of code'),
          }
        })
      },
      unlockAchievements(ids) {
        setData((d) => {
          const cur = d.achievements || {}
          const next = { ...cur }
          let changed = false
          for (const id of ids) if (!next[id]) { next[id] = todayKey(); changed = true }
          return changed ? { ...d, achievements: next } : d
        })
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
  const level = levelInfo(data.practice.xp || 0)

  // level is derived from data, so [data] in deps keeps the cached value correct.
  const value = useMemo(() => ({ data, streak, phase, level, ...actions }), [data, streak, phase, actions])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
