"use client"

import { Component, ReactNode } from "react"
import { AlertCircle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen w-full bg-white flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={40} className="text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">出现了一些问题</h2>
              <p className="text-gray-500 mb-1">
                {this.state.error?.message || "未知错误"}
              </p>
              <p className="text-sm text-gray-400">
                请刷新页面重试，或联系技术支持
              </p>
            </div>
            <button
              onClick={this.handleReset}
              className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw size={18} />
              重试
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

