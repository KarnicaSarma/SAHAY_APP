import React from 'react';
import { AlertTriangle, RefreshCw, LayoutDashboard, ChevronDown, ChevronUp } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDetails: false 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null, showDetails: false });
  };

  handleBackToDashboard = () => {
    this.handleReset();
    if (this.props.onNavigateDashboard) {
      this.props.onNavigateDashboard();
    } else {
      window.location.hash = '#dashboard';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-[#FCFAF6] border-2 border-[#7A1F2B]/40 rounded-xl p-6 sm:p-8 max-w-2xl mx-auto my-8 shadow-lg text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-[#7A1F2B]/10 text-[#7A1F2B] flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h2 className="font-serif font-bold text-xl text-[#7A1F2B]">
              Something went wrong
            </h2>
            <p className="text-xs text-[#6E6A64]">
              This module encountered an unexpected error.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={this.handleReset}
              className="px-4 py-2 rounded-md bg-[#7A1F2B] text-white font-medium text-xs hover:bg-[#651925] cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <button
              onClick={this.handleBackToDashboard}
              className="px-4 py-2 rounded-md bg-[#F7F4EE] border border-[#E8E0D3] text-[#24221F] font-medium text-xs hover:bg-stone-200 cursor-pointer flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-4 h-4 text-[#7A1F2B]" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          {/* Technical Error Details Accordion (for Demo Debugging) */}
          <div className="pt-4 border-t border-[#E8E0D3]">
            <button
              onClick={() => this.setState(prev => ({ showDetails: !prev.showDetails }))}
              className="text-[11px] font-semibold text-[#6E6A64] hover:text-[#7A1F2B] flex items-center gap-1 mx-auto cursor-pointer"
            >
              <span>Technical Error Details</span>
              {this.state.showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {this.state.showDetails && (
              <div className="mt-3 p-3 bg-[#24221F] text-red-300 rounded text-left font-mono text-[10px] overflow-x-auto max-h-40 leading-relaxed">
                <div><strong>Error:</strong> {this.state.error?.toString()}</div>
                {this.state.errorInfo?.componentStack && (
                  <div className="mt-1 text-stone-400">
                    <strong>Stack:</strong> {this.state.errorInfo.componentStack}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
