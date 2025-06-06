import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log error if needed
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ color: "#dc3545", padding: 16 }}>Xatolik yuz berdi: {this.state.error?.message || "Noma'lum xatolik"}</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
