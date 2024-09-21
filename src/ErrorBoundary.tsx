import { Component, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSetUser } from "./appContext";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

const ReloadButtons = () => {
  const navigate = useNavigate();
  const setUser = useSetUser();

  return (
    <>
      <button
        className="mt-10 w-64 rounded-md bg-bdazzled-700 px-4 py-2 font-semibold text-white"
        onClick={() => window.location.reload()}
      >
        Neuladen
      </button>
      <button
        className="mt-4 w-64 rounded-md border border-vermilion-700 px-4 py-2 font-semibold text-vermilion-700"
        onClick={() => {
          setUser(null);
          navigate("/");
        }}
      >
        Abmelden
      </button>
    </>
  );
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
          <h1 className="mb-1 text-3xl font-bold">Fehler</h1>
          <p className="text-lg">Das hätte nicht passieren dürfen.</p>
          {typeof this.state.error?.message === "string" ? (
            <code className="mt-8 max-h-96 overflow-scroll text-left text-sm text-gray-500">
              {this.state.error?.message}
            </code>
          ) : null}
          <ReloadButtons />
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
