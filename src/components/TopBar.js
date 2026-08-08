"use client";

import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';

export default function TopBar() {
  const { user } = useAuth();

  if (!user) return null;

  // Level thresholds based on PRD (approximate scaling)
  const getXpMax = (level) => {
    if (level <= 5) return 100;
    if (level <= 15) return 250;
    return 600;
  };
  
  const xpMax = getXpMax(user.level);
  const xpPercent = Math.min((user.xp / xpMax) * 100, 100);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', borderBottom: '1px solid rgba(0, 200, 255, 0.1)', backgroundColor: 'var(--panel-color)' }}>
      {/* Avatar Placeholder */}
      <div style={{ 
        width: '50px', 
        height: '50px', 
        borderRadius: '8px', 
        backgroundColor: '#000',
        border: '1px solid var(--neon-blue)',
        boxShadow: '0 0 10px rgba(0, 200, 255, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <User color="var(--neon-blue)" />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-dim)', fontFamily: 'var(--font-sys)' }}>{user.class}</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>{user.username}</div>
          </div>
          <div style={{ fontFamily: 'var(--font-stats)', color: 'var(--neon-blue)', fontSize: '14px' }}>
            <span style={{ color: 'var(--text-primary)', fontSize: '10px', marginRight: '4px' }}>LEVEL</span>
            <span style={{ fontSize: '18px' }}>{user.level}</span>
          </div>
        </div>
        
        {/* XP Bar */}
        <div style={{ position: 'relative', width: '100%', height: '8px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ 
            width: `${xpPercent}%`, 
            height: '100%', 
            backgroundColor: 'var(--neon-blue)',
            boxShadow: '0 0 10px var(--neon-blue)',
            transition: 'width 0.5s ease-out'
          }}></div>
        </div>
        <div style={{ fontSize: '10px', display: 'flex', justifyContent: 'space-between', marginTop: '4px', color: 'var(--text-dim)', fontFamily: 'var(--font-stats)' }}>
          <span>EXP</span>
          <span>{user.xp} / {xpMax}</span>
        </div>
      </div>
    </div>
  );
}
