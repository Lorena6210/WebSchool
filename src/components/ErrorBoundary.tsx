"use client";
import { cn } from "../lib/utils";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem", backgroundColor: "var(--background)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "32rem", padding: "2rem" }}>
            <AlertTriangle
            style={{ color: "var(--destructive)", marginBottom:"1.5rem", flexShrink: 0 }}
              size={48}
            />

            <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Ocorreu um erro inesperado.</h2>

            <div style={{ padding: "1rem", width: "100%", borderRadius: "0.5rem", backgroundColor: "var(--muted)", overflow: "auto", marginBottom: "1.5rem" }}>
              <pre style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", whiteSpace: "pre-wrap" }}>
                {this.state.error?.stack}
              </pre>
            </div>

            <button
              onClick={() => window.location.reload()}
              style={{
                display:"flex", alignItems:"center", padding:"0.5rem 1rem", borderRadius:"0.5rem", backgroundColor:"var(--primary)", color:"var(--primary-foreground)", border:"none", cursor:"pointer"
              }}
            >
              <RotateCcw size={16} />
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
