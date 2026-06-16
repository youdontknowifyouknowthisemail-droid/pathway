// Watches derived progress and fires level-up / achievement toasts, and persists
// newly-earned achievements. Renders nothing. Mounted once inside the app.
import { useEffect, useRef } from 'react'
import { useApp } from '../context/AppData'
import { useToast } from '../context/Toast'
import { CHALLENGES } from '../lib/practice/challenges'
import { ACHIEVEMENT_BY_ID, earnedAchievements } from '../lib/practice/achievements'

const CH_LANG = Object.fromEntries(CHALLENGES.map((c) => [c.id, c.lang]))

export default function RetentionWatcher() {
  const { data, streak, level, unlockAchievements } = useApp()
  const { toast } = useToast()
  const seeded = useRef(false) // skip toasts on the first pass (existing progress)
  const prevLevel = useRef(level.level)

  const solved = data.practice.solved
  const achievements = data.achievements

  useEffect(() => {
    const ctx = {
      solvedCount: solved.length,
      jsSolved: solved.some((id) => CH_LANG[id] === 'js'),
      pySolved: solved.some((id) => CH_LANG[id] === 'py'),
      quizAnswered: data.practice.quizAnswered,
      quizCorrect: data.practice.quizCorrect,
      streakLongest: streak.longest,
      daysPracticed: streak.total,
      level: level.level,
      curriculumDone: data.curriculum.filter((c) => c.done).length,
    }
    const earned = earnedAchievements(ctx)
    const newly = earned.filter((id) => !achievements[id])
    if (newly.length) {
      unlockAchievements(earned)
      if (seeded.current) newly.forEach((id) => toast(`🏅 ${ACHIEVEMENT_BY_ID[id].title}`, 'good'))
    }
    if (seeded.current && level.level > prevLevel.current) {
      toast(`⭐ Level ${level.level}!`, 'brand')
    }
    prevLevel.current = level.level
    seeded.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solved, achievements, data.practice.quizAnswered, data.practice.quizCorrect, data.curriculum, streak.longest, streak.total, level.level])

  return null
}
