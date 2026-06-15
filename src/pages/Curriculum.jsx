import { useMemo, useState } from 'react'
import { useApp } from '../context/AppData'
import { PageHead, Card, Bar, Check, Tag } from '../components/ui'
import { COURSES } from '../lib/seed'
import { fmtDate } from '../lib/dates'

function Item({ c, onToggle, onEdit, onRemove }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(c.title)
  const save = () => {
    const t = text.trim()
    if (t) onEdit({ title: t })
    else setText(c.title)
    setEditing(false)
  }
  return (
    <div className="cur-item">
      <Check checked={c.done} onChange={onToggle} title="Mark complete" />
      {editing ? (
        <input
          className="input grow"
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            if (e.key === 'Escape') { setText(c.title); setEditing(false) }
          }}
        />
      ) : (
        <button className={'cur-title grow' + (c.done ? ' done' : '')} onClick={() => setEditing(true)} title="Click to edit">
          <span>{c.title}</span>
          {c.cert && <Tag tone="warn">certificate</Tag>}
        </button>
      )}
      {c.done && c.date && <span className="muted tiny nowrap">{fmtDate(c.date)}</span>}
      <button className="iconbtn ghost danger" onClick={onRemove} title="Remove">✕</button>
    </div>
  )
}

function AddItem({ onAdd }) {
  const [t, setT] = useState('')
  const add = () => {
    if (!t.trim()) return
    onAdd(t)
    setT('')
  }
  return (
    <div className="cur-add">
      <input className="input grow" placeholder="Add an item…" value={t} onChange={(e) => setT(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} />
      <button className="btn sm" onClick={add}>Add</button>
    </div>
  )
}

export default function Curriculum() {
  const { data, toggleCurriculum, editCurriculum, removeCurriculum, addCurriculum } = useApp()

  const groups = useMemo(() => {
    const order = [...COURSES]
    for (const c of data.curriculum) if (!order.includes(c.course)) order.push(c.course)
    return order
      .map((course) => ({ course, items: data.curriculum.filter((c) => c.course === course) }))
      .filter((g) => g.items.length)
  }, [data.curriculum])

  return (
    <div className="page">
      <PageHead title="Curriculum" sub="CS50x and CS50 Web. Tick lectures off as you finish — add, edit or remove anything, it's just a starting template." />
      {groups.map(({ course, items }) => {
        const done = items.filter((i) => i.done).length
        return (
          <Card key={course} className="card-pad cur-group">
            <div className="row between wrap">
              <div className="card-title">{course}</div>
              <span className="muted small">{done}/{items.length} done</span>
            </div>
            <Bar value={items.length ? (done / items.length) * 100 : 0} color="var(--good)" />
            <div className="cur-list">
              {items.map((c) => (
                <Item
                  key={c.id}
                  c={c}
                  onToggle={() => toggleCurriculum(c.id)}
                  onEdit={(p) => editCurriculum(c.id, p)}
                  onRemove={() => removeCurriculum(c.id)}
                />
              ))}
            </div>
            <AddItem onAdd={(t) => addCurriculum(course, t)} />
          </Card>
        )
      })}
    </div>
  )
}
