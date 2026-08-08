"use client";

import { useAuth } from '../context/AuthContext';

export default function StatsView() {
  const { user } = useAuth();
  
  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', letterSpacing: '2px', fontSize: '18px' }}>STATS</h2>
      </div>

      <div style={{ border: '1px solid rgba(0, 200, 255, 0.2)', borderRadius: '8px', padding: '20px', backgroundColor: 'var(--panel-color)', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontFamily: 'var(--font-stats)', color: 'var(--text-primary)', marginBottom: '20px' }}>
          <span>LEVEL {user?.level || 1}</span>
          <span style={{ color: 'var(--text-dim)' }}>{user?.xp || 0}/1000</span>
        </div>
        
        {/* Placeholder for Rank Icon */}
        <div style={{ width: '80px', height: '80px', backgroundColor: 'transparent', border: '1px solid var(--accent-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)' }}>
           <div style={{ width: '40px', height: '40px', borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)', transform: 'rotate(-45deg)' }}></div>
        </div>
        
        <h3 style={{ marginTop: '15px', fontFamily: 'var(--font-heading)', color: 'var(--accent-gold)' }}>Bronze Rank</h3>
      </div>

      <div className="neon-panel" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: 'var(--neon-blue)', fontFamily: 'var(--font-stats)', fontSize: '24px' }}>+12%</span>
          <div style={{ color: 'var(--text-dim)', fontSize: '12px' }}>
            <div>Weekly</div>
            <div>Performance</div>
          </div>
        </div>
        
        {/* Fake Line Chart */}
        <div style={{ height: '80px', position: 'relative', marginTop: '20px' }}>
           <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
             <polyline 
               points="0,30 20,35 40,20 60,25 80,10 100,5" 
               fill="none" 
               stroke="var(--neon-blue)" 
               strokeWidth="2" 
             />
             {[0, 20, 40, 60, 80, 100].map((x, i) => (
                <circle key={i} cx={x} cy={[30,35,20,25,10,5][i]} r="2" fill="var(--bg-color)" stroke="var(--neon-blue)" strokeWidth="1" />
             ))}
           </svg>
        </div>
      </div>

      <div className="neon-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
           <span>Habit Consistency</span>
           <span style={{ backgroundColor: 'rgba(0, 200, 255, 0.2)', color: 'var(--neon-blue)', padding: '2px 6px', fontSize: '10px', borderRadius: '4px', fontFamily: 'var(--font-stats)' }}>250 XP</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', height: '80px', alignItems: 'flex-end', gap: '8px' }}>
           {[30, 45, 20, 60, 80, 50, 90].map((h, i) => (
             <div key={i} style={{ flex: 1, backgroundColor: 'rgba(0, 200, 255, 0.2)', height: '100%', position: 'relative', borderRadius: '4px' }}>
               <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${h}%`, backgroundColor: h > 60 ? 'var(--neon-blue)' : 'var(--text-dim)', borderRadius: '4px', boxShadow: h > 60 ? '0 0 10px var(--neon-blue)' : 'none' }}></div>
             </div>
           ))}
        </div>
        <div style={{ marginTop: '15px', fontSize: '10px', color: 'var(--text-dim)', textAlign: 'center' }}>
          Keep it up. You improved <span style={{ color: 'var(--text-primary)' }}>18%</span> this week.
        </div>
      </div>
    </div>
  );
}
