// Catches render errors so a bug shows a friendly screen instead of a blank page.
import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="crash">
          <div className="crash-box">
            <div className="crash-ic">⚠️</div>
            <h1>Something went wrong</h1>
            <p className="muted">Your data is safe — it’s stored locally on this device. Try reloading.</p>
            <pre className="crash-err">{String(this.state.error?.message || this.state.error)}</pre>
            <button className="btn primary" onClick={() => window.location.reload()}>Reload</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
