"use client";

import React, { Component } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import Button from '../Button/Button';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('System Matrix Anomaly:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100%',
          maxWidth: '600px',
          margin: '40px auto',
          padding: '36px 28px',
          background: 'rgba(13, 24, 38, 0.95)',
          border: '2px solid #FF1744',
          borderRadius: '12px',
          boxShadow: '0 0 30px rgba(255, 23, 68, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '16px'
        }}>
          <ShieldAlert size={48} style={{ color: '#FF1744' }} />
          <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: '20px', color: '#FF1744', letterSpacing: '0.1em' }}>
            SYSTEM MATRIX ANOMALY DETECTED
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
            THE SYSTEM HAS ENCOUNTERED AN UNEXPECTED EXCEPTION. DISPATCHING RECOVERY MATRIX.
          </p>

          <Button variant="outline" size="md" icon={RefreshCw} onClick={this.handleReset}>
            REBOOT SYSTEM MATRIX
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
