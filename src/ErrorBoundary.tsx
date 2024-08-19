import { Component, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full flex-col items-center justify-center bg-white p-4 text-center">
          <h1 className="text-3xl font-bold">Error</h1>
          <p className="text-lg">An error occurred. Please refresh the page.</p>
          <p className="text-sm text-gray-500">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }
}

export default ErrorBoundary;
