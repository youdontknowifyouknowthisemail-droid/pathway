// Gamification: XP rewards, a simple level curve, and unlockable achievements.

// XP awarded per action.
export const XP = { quiz: 10, challenge: 25, daily: 15, curriculum: 20 }

const XP_PER_LEVEL = 100

// Flat curve: every level costs 100 XP. Predictable and easy to read.
export function levelInfo(xp = 0) {
  const x = Math.max(0, xp || 0)
  const level = Math.floor(x / XP_PER_LEVEL) + 1
  const intoLevel = x % XP_PER_LEVEL
  return { level, intoLevel, perLevel: XP_PER_LEVEL, pct: intoLevel / XP_PER_LEVEL, total: x }
}

// Each achievement's `test` receives a derived context object (see RetentionWatcher).
export const ACHIEVEMENTS = [
  { id: 'first-step', icon: '🌱', title: 'First step', desc: 'Solve your first challenge', test: (c) => c.solvedCount >= 1 },
  { id: 'solver-5', icon: '⚡', title: 'Getting going', desc: 'Solve 5 challenges', test: (c) => c.solvedCount >= 5 },
  { id: 'solver-15', icon: '🛠️', title: 'Problem solver', desc: 'Solve 15 challenges', test: (c) => c.solvedCount >= 15 },
  { id: 'solver-30', icon: '🤖', title: 'Code machine', desc: 'Solve 30 challenges', test: (c) => c.solvedCount >= 30 },
  { id: 'polyglot', icon: '🌐', title: 'Polyglot', desc: 'Solve a JavaScript and a Python challenge', test: (c) => c.jsSolved && c.pySolved },
  { id: 'quiz-10', icon: '❓', title: 'Curious', desc: 'Answer 10 quiz questions', test: (c) => c.quizAnswered >= 10 },
  { id: 'quiz-50', icon: '🧠', title: 'Quiz master', desc: 'Answer 50 quiz questions', test: (c) => c.quizAnswered >= 50 },
  { id: 'sharp', icon: '🎯', title: 'Sharp mind', desc: '80%+ quiz accuracy (20+ answered)', test: (c) => c.quizAnswered >= 20 && c.quizCorrect / c.quizAnswered >= 0.8 },
  { id: 'streak-3', icon: '🔥', title: 'On a roll', desc: '3-day practice streak', test: (c) => c.streakLongest >= 3 },
  { id: 'streak-7', icon: '🔥', title: 'Week warrior', desc: '7-day practice streak', test: (c) => c.streakLongest >= 7 },
  { id: 'streak-30', icon: '🏆', title: 'Unstoppable', desc: '30-day practice streak', test: (c) => c.streakLongest >= 30 },
  { id: 'level-5', icon: '⭐', title: 'Level 5', desc: 'Reach level 5', test: (c) => c.level >= 5 },
  { id: 'scholar', icon: '📚', title: 'Scholar', desc: 'Complete 5 curriculum items', test: (c) => c.curriculumDone >= 5 },
  { id: 'dedicated', icon: '📅', title: 'Dedicated', desc: 'Practice on 25 different days', test: (c) => c.daysPracticed >= 25 },
]

export const ACHIEVEMENT_BY_ID = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]))

export function earnedAchievements(ctx) {
  return ACHIEVEMENTS.filter((a) => a.test(ctx)).map((a) => a.id)
}
