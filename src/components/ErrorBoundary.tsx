import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
  info: string
}

/**
 * Catches render/lifecycle errors so a crash shows a readable message
 * instead of a blank white page (which is what mobile users were seeing).
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, info: '' }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught render error:', error, info)
    this.setState({ info: info.componentStack ?? '' })
  }

  render() {
    const { error, info } = this.state
    if (!error) return this.props.children

    return (
      <div
        style={{
          padding: '1.5rem',
          margin: '1rem auto',
          maxWidth: 640,
          textAlign: 'left',
          font: '14px/1.5 system-ui, sans-serif',
          color: '#c92a2a',
          background: '#fff5f5',
          border: '1px solid #ffc9c9',
          borderRadius: 12,
        }}
      >
        <h2 style={{ margin: '0 0 .5rem', fontSize: '1.1rem' }}>Something broke on this page</h2>
        <p style={{ margin: '0 0 .75rem', color: '#495057' }}>
          The error below is what went wrong — copy it if you want to report it.
        </p>
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            background: '#fff',
            border: '1px solid #ffe3e3',
            borderRadius: 8,
            padding: '.75rem',
            margin: '0 0 .75rem',
            maxHeight: 260,
            overflow: 'auto',
            fontSize: 12,
            color: '#343a40',
          }}
        >
          {error.name}: {error.message}
          {error.stack ? `\n\n${error.stack}` : ''}
          {info ? `\n\nComponent stack:${info}` : ''}
        </pre>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            padding: '.5rem 1rem',
            borderRadius: 8,
            border: '1px solid #ffc9c9',
            background: '#fff',
            color: '#c92a2a',
            cursor: 'pointer',
          }}
        >
          Reload page
        </button>
      </div>
    )
  }
}
