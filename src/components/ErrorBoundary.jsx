import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-10">
          <p className="text-red-500 font-semibold text-lg mb-2">
            Failed to load this page
          </p>
          <p className="text-gray-400 text-sm mb-4">
            {this.state.error?.message}
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary