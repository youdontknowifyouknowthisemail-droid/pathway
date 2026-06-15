import { useState } from 'react'
import { useApp } from '../context/AppData'
import { PageHead, Card, Tag, Modal, Field, Empty } from '../components/ui'
import { STATUSES } from '../lib/seed'
import { uid } from '../lib/util'

const statusTone = { 'Idea': '', 'In Progress': 'warn', 'Deployed': 'good', 'Documented': 'brand' }

function ProjectModal({ project, onSave, onClose }) {
  const [f, setF] = useState({ ...project, stackText: (project.stack || []).join(', ') })
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }))
  const save = () => {
    onSave({
      name: f.name.trim() || 'Untitled',
      desc: f.desc,
      status: f.status,
      github: f.github.trim(),
      deploy: f.deploy.trim(),
      notes: f.notes,
      stack: f.stackText.split(',').map((x) => x.trim()).filter(Boolean),
    })
  }
  return (
    <Modal title="Edit project" onClose={onClose} wide>
      <div className="form">
        <Field label="Name"><input className="input" value={f.name} onChange={(e) => set('name', e.target.value)} /></Field>
        <Field label="Description"><textarea className="input" rows={2} value={f.desc} onChange={(e) => set('desc', e.target.value)} /></Field>
        <div className="row gap wrap">
          <Field label="Status"><select className="input" value={f.status} onChange={(e) => set('status', e.target.value)}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Tech stack" hint="comma-separated"><input className="input" value={f.stackText} onChange={(e) => set('stackText', e.target.value)} placeholder="React, Tailwind, Supabase" /></Field>
        </div>
        <Field label="GitHub link"><input className="input" value={f.github} onChange={(e) => set('github', e.target.value)} placeholder="https://github.com/…" /></Field>
        <Field label="Live deploy link"><input className="input" value={f.deploy} onChange={(e) => set('deploy', e.target.value)} placeholder="https://…" /></Field>
        <Field label="Notes"><textarea className="input" rows={3} value={f.notes} onChange={(e) => set('notes', e.target.value)} /></Field>
        <div className="row end gap">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={save}>Save</button>
        </div>
      </div>
    </Modal>
  )
}

export default function Projects() {
  const { data, addProject, editProject, removeProject } = useApp()
  const [editingId, setEditingId] = useState(null)
  const editing = data.projects.find((p) => p.id === editingId)

  const handleAdd = () => {
    const id = uid()
    addProject({ id, name: 'New project' })
    setEditingId(id)
  }

  return (
    <div className="page">
      <PageHead title="Projects" sub="Your portfolio — track each project from idea to deployed & documented.">
        <button className="btn primary" onClick={handleAdd}>+ New project</button>
      </PageHead>

      {data.projects.length === 0 ? (
        <Empty icon="🧩" title="No projects yet">Add your first portfolio project.</Empty>
      ) : (
        <div className="grid cards">
          {data.projects.map((p) => (
            <Card key={p.id} className="card-pad proj">
              <div className="row between wrap proj-head">
                <div className="proj-name">{p.name}</div>
                <Tag tone={statusTone[p.status]}>{p.status}</Tag>
              </div>
              {p.desc && <p className="muted small">{p.desc}</p>}
              {p.stack?.length > 0 && <div className="row wrap gap stack">{p.stack.map((s, i) => <Tag key={i}>{s}</Tag>)}</div>}
              <div className="row wrap gap proj-links">
                {p.github ? <a className="link" href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a> : <span className="muted tiny">No GitHub link</span>}
                {p.deploy ? <a className="link" href={p.deploy} target="_blank" rel="noreferrer">Live ↗</a> : <span className="muted tiny">Not deployed</span>}
              </div>
              {p.notes && <div className="proj-notes muted small">{p.notes}</div>}
              <div className="row gap proj-actions">
                <button className="btn sm" onClick={() => setEditingId(p.id)}>Edit</button>
                <button className="btn sm ghost danger" onClick={() => removeProject(p.id)}>Delete</button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {editing && (
        <ProjectModal
          project={editing}
          onSave={(patch) => { editProject(editing.id, patch); setEditingId(null) }}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  )
}
