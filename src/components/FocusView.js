"use client";

import { useState } from 'react';

export default function FocusView() {
  const [activeTab, setActiveTab] = useState('Pomodoro');

  return (
    <div style={{ padding: '20px', paddingBottom: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', letterSpacing: '2px', fontSize: '18px' }}>FOCUS MODE</h2>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '40px' }}>
        {['Pomodoro', 'Deep Work', 'Custom'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              fontFamily: 'var(--font-sys)',
              fontSize: '12px',
              border: `1px solid ${activeTab === tab ? 'var(--neon-blue)' : 'transparent'}`,
              color: activeTab === tab ? 'var(--neon-blue)' : 'var(--text-dim)',
              backgroundColor: activeTab === tab ? 'rgba(0,200,255,0.1)' : 'transparent'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Circle Timer */}
      <div style={{
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        border: '4px solid rgba(0, 200, 255, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: '0 0 30px rgba(0, 200, 255, 0.1), inset 0 0 30px rgba(0, 200, 255, 0.1)',
        marginBottom: '40px'
      }}>
        {/* Glow Ring pseudo-element effect handled via CSS inline for now */}
        <div style={{
          position: 'absolute',
          top: '-4px', left: '-4px', right: '-4px', bottom: '-4px',
          borderRadius: '50%',
          borderTop: '4px solid var(--neon-blue)',
          borderRight: '4px solid transparent',
          borderBottom: '4px solid transparent',
          borderLeft: '4px solid transparent',
          transform: 'rotate(-45deg)'
        }}></div>
        
        <div style={{ fontFamily: 'var(--font-stats)', fontSize: '48px', color: 'var(--text-primary)', textShadow: '0 0 10px var(--neon-blue)' }}>
          25:00
        </div>
      </div>

      <button className="neon-button" style={{ width: '200px', fontSize: '20px' }}>
        START
      </button>
      
      <div style={{ marginTop: '20px', fontFamily: 'var(--font-sys)', color: 'var(--text-dim)', fontSize: '12px' }}>
        +30 XP / SESSION
      </div>
    </div>
  );
}
