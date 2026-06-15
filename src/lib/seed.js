// Default data used the first time the app runs (and as the base for migrations).
import { uid } from './util'

export const STATUSES = ['Idea', 'In Progress', 'Deployed', 'Documented']
export const COURSES = ['CS50x', 'CS50 Web']

const item = (course, title, extra = {}) => ({ id: uid(), course, title, done: false, date: null, ...extra })

const CS50X = [
  'Week 0: Scratch',
  'Week 1: C',
  'Week 2: Arrays',
  'Week 3: Algorithms',
  'Week 4: Memory',
  'Week 5: Data Structures',
  'Week 6: Python',
  'Week 7: SQL',
  'Week 8: HTML/CSS/JS',
  'Week 9: Flask',
  'Final Project',
]

const CS50_WEB = [
  'Lecture 0: Git',
  'Lecture 1: HTML/CSS',
  'Lecture 2: Django',
  'Lecture 3: JavaScript',
  'Lecture 4: User Interfaces',
  'Lecture 5: Testing/CI',
  'Lecture 6: Scalability',
  'Lecture 7: Security',
  'Final Project',
]

export function SEED() {
  return {
    daily: {},
    journal: {},
    curriculum: [
      ...CS50X.map((t) => item('CS50x', t)),
      item('CS50x', 'Pay for verified certificate', { cert: true }),
      ...CS50_WEB.map((t) => item('CS50 Web', t)),
    ],
    projects: [
      {
        id: uid(),
        name: 'Group Outing Planner App',
        desc: 'Coordinate group outings — dates, venues, who is in. Already built; needs polishing + deployment.',
        stack: ['React'],
        status: 'In Progress',
        github: '',
        deploy: '',
        notes: 'Polish the UI, write a README, then deploy and add the links here.',
      },
      {
        id: uid(),
        name: 'SAF Medical Documentation App',
        desc: 'Tool for documenting medical records/status. Already built; needs polishing + deployment.',
        stack: ['React'],
        status: 'In Progress',
        github: '',
        deploy: '',
        notes: 'Tidy up, document, and add a live deploy link.',
      },
    ],
    goals: [
      { id: uid(), title: 'Finish CS50x', target: '2027-04-30', done: false },
      { id: uid(), title: 'Finish CS50 Web', target: '2027-06-30', done: false },
      { id: uid(), title: 'Deploy 2–3 portfolio projects with READMEs', target: '2027-06-30', done: false },
      { id: uid(), title: 'Participate in 1 hackathon', target: '2027-06-30', done: false },
      { id: uid(), title: 'Set up GitHub profile properly', target: null, done: false },
    ],
    settings: {
      dailyEnabled: true,
      dailyTime: '21:30',
      weeklyEnabled: true,
      weeklyTime: '14:00',
      weeklyDay: 0, // Sunday
    },
  }
}
