// Lazy wrapper so CodeMirror is code-split into its own chunk and only loaded
// when an editor is actually rendered (keeps the initial mobile load light).
import { lazy, Suspense } from 'react'

const CodeMirrorEditor = lazy(() => import('./CodeMirrorEditor'))

export default function CodeEditor(props) {
  return (
    <Suspense fallback={<div className="cm-loading muted small">Loading editor…</div>}>
      <CodeMirrorEditor {...props} />
    </Suspense>
  )
}
