// The actual CodeMirror editor. Loaded lazily by CodeEditor.jsx so CodeMirror
// (~0.5 MB) is only fetched when a challenge is opened, not on first page load.
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { sql } from '@codemirror/lang-sql'
import { html } from '@codemirror/lang-html'

const EXT = { js: [javascript()], py: [python()], sql: [sql()], html: [html()] }

export default function CodeMirrorEditor({ value, onChange, language }) {
  return (
    <CodeMirror
      className="cm-wrap"
      value={value}
      onChange={(val) => onChange(val)}
      extensions={EXT[language] || []}
      theme="dark"
      basicSetup={{ lineNumbers: true, highlightActiveLine: true, autocompletion: false, tabSize: 2 }}
    />
  )
}
