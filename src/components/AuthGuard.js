"use client";

import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function AuthGuard({ children }) {
  const { user, loading, login } = useAuth();
  const [usernameInput, setUsernameInput] = useState('');

  if (loading) {
    return (
      <div className="system-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--font-sys)', color: 'var(--neon-blue)', animation: 'pulse 2s infinite' }}>System Booting...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="system-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--neon-blue)', fontSize: '2rem', marginBottom: '10px' }}>SYSTEM AUTHENTICATION</h1>
        <p style={{ fontFamily: 'var(--font-sys)', color: 'var(--text-dim)', marginBottom: '30px' }}>Enter your designation to begin.</p>
        
        <input 
          type="text" 
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          placeholder="Player Name"
          style={{
            background: 'var(--panel-color)',
            border: '1px solid var(--neon-blue)',
            color: 'var(--text-primary)',
            padding: '10px 15px',
            borderRadius: '4px',
            marginBottom: '20px',
            fontFamily: 'var(--font-sys)'
          }}
        />
        
        <button 
          className="neon-button" 
          onClick={() => {
            if (usernameInput.trim()) login(usernameInput.trim());
          }}
        >
          ARISE
        </button>
      </div>
    );
  }

  return children;
}
