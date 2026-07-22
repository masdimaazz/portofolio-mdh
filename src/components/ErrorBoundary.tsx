import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

// Menangkap error render agar situs tidak "white-screen"; tampilkan fallback.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('UI error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="font-head text-3xl font-black uppercase">Something went wrong</h1>
          <p className="max-w-sm text-sm text-muted">
            An unexpected error occurred. Please reload the page.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-ink-fg"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
