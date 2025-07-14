import { Component, ReactNode } from 'react';
import toast from '../lib/toast';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    toast.error('Something went wrong');
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something broke.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
