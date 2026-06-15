import { useState } from 'react'
import { useApp } from '../context/AppData'
import { PageHead, Card, Check, Tag, Empty } from '../components/ui'
import { daysUntil } from '../lib/dates'

function statusOf(g) {
  if (g.done) return { tone: 'good', label: 'Done ✓' }
  if (!g.target) return { tone: '', label: 'No date — soon' }
  const d = daysUntil(g.target)
  if (d < 0) return { tone: 'bad', label: `Behind · ${Math.abs(d)}d over` }
  if (d <= 30) return { tone: 'warn', label: `Due soon · ${d}d` }
  return { tone: 'brand', label: `On track · ${d}d` }
}

export default function Goals() {
  const { data, addGoal, editGoal, toggleGoal, removeGoal } = useApp()
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState('')

  const add = () => {
    if (!title.trim()) return
    addGoal({ title: title.trim(), target: target || null })
    setTitle('')
    setTarget('')
  }

  return (
    <div className="page">
      <PageHead title="Goals" sub="The bigger milestones. Each shows whether you're on track based on today's date." />

      <Card className="card-pad goal-add">
        <input className="input grow" placeholder="New goal…" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} />
        <input className="input date" type="date" value={target} onChange={(e) => setTarget(e.target.value)} title="Target date (optional)" />
        <button className="btn primary" onClick={add}>Add</button>
      </Card>

      {data.goals.length === 0 ? (
        <Empty icon="🎯" title="No goals yet">Add a milestone above.</Empty>
      ) : (
        <div className="goal-list">
          {data.goals.map((g) => {
            const st = statusOf(g)
            return (
              <Card key={g.id} className="card-pad goal">
                <Check checked={g.done} onChange={() => toggleGoal(g.id)} title="Mark done" />
                <div className="grow goal-body">
                  <input className={'ghost-input goal-title' + (g.done ? ' done' : '')} value={g.title} onChange={(e) => editGoal(g.id, { title: e.target.value })} />
                  <div className="row gap wrap goal-meta">
                    <input className="ghost-input date" type="date" value={g.target || ''} onChange={(e) => editGoal(g.id, { target: e.target.value || null })} />
                    <Tag tone={st.tone}>{st.label}</Tag>
                  </div>
                </div>
                <button className="iconbtn ghost danger" onClick={() => removeGoal(g.id)} title="Remove">✕</button>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
