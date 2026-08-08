"use client";

import { useState } from 'react';

export default function TrainView() {
  const [activeTab, setActiveTab] = useState('WORKOUT');

  const trainingLogs = [
    { title: 'Full Body Workout', type: 'WORKOUT', xp: 40, completed: false },
    { title: 'Study 1 Hour', type: 'STUDY', xp: 55, completed: false },
    { title: 'Learn a New Skill', type: 'SKILLS', xp: 30, completed: false },
  ];

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', letterSpacing: '2px', fontSize: '18px' }}>TRAINING</h2>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', border: '1px solid rgba(0, 200, 255, 0.2)', borderRadius: '4px', overflow: 'hidden', marginBottom: '30px' }}>
        {['WORKOUT', 'STUDY', 'SKILLS'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '10px 0',
              fontFamily: 'var(--font-sys)',
              fontSize: '10px',
              backgroundColor: activeTab === tab ? 'rgba(0, 200, 255, 0.2)' : 'transparent',
              color: activeTab === tab ? 'var(--neon-blue)' : 'var(--text-dim)',
              borderBottom: activeTab === tab ? '2px solid var(--neon-blue)' : '2px solid transparent'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Training List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
        {trainingLogs.filter(log => activeTab === 'WORKOUT' ? true : log.type === activeTab).map((log, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(0, 200, 255, 0.1)', paddingBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontWeight: '600' }}>{log.title}</div>
              <div style={{ backgroundColor: 'rgba(0, 200, 255, 0.1)', padding: '2px 6px', borderRadius: '4px', color: 'var(--neon-blue)', fontSize: '12px', fontFamily: 'var(--font-stats)' }}>
                +{log.xp} XP
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <button style={{ color: 'var(--neon-blue)', fontSize: '12px', fontFamily: 'var(--font-sys)' }}>Log {activeTab.toLowerCase()}</button>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontFamily: 'var(--font-stats)' }}>+{log.xp} XP</div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '6px solid var(--neon-blue)' }}></div>
          <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', letterSpacing: '1px' }}>STATS</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { label: 'Strength', val: 16, max: 20, color: '#FF3B3B' },
            { label: 'Intelligence', val: 12, max: 20, color: '#7B2FFF' },
            { label: 'Perception', val: 10, max: 20, color: '#00FF88' }
          ].map(stat => (
            <div key={stat.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '120px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: stat.color }}></div>
                <span style={{ color: 'var(--text-dim)', fontSize: '14px' }}>{stat.label}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-stats)', color: 'var(--text-primary)', width: '30px' }}>{stat.val}</div>
              <div style={{ flex: 1, height: '4px', backgroundColor: 'rgba(0,0,0,0.5)', margin: '0 15px', borderRadius: '2px' }}>
                <div style={{ width: `${(stat.val/stat.max)*100}%`, height: '100%', backgroundColor: stat.color, boxShadow: `0 0 5px ${stat.color}` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
