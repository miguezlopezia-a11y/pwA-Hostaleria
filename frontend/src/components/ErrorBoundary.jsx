import { Component } from "react";

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-lg font-semibold text-slate-900">Algo salió mal.</p>
          <a href="/" className="text-sm text-blue-600 hover:text-blue-700">Volver al inicio</a>
        </div>
      );
    }
    return this.props.children;
  }
}
