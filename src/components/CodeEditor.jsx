// Lightweight code editor: a monospace textarea with Tab → 2-space insertion.
// (Kept dependency-free; a full syntax-highlighting editor like CodeMirror is a
// possible future upgrade.)
export default function CodeEditor({ value, onChange, language, rows = 12 }) {
  const onKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const el = e.target
      const start = el.selectionStart
      const end = el.selectionEnd
      onChange(value.slice(0, start) + '  ' + value.slice(end))
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2
      })
    }
  }
  return (
    <textarea
      className="code-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      rows={rows}
      spellCheck={false}
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      aria-label={`${language} code editor`}
    />
  )
}
