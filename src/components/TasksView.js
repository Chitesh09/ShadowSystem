"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Check } from 'lucide-react';

export default function TasksView() {
  const { user, updateStats } = useAuth();
  
  // Hardcoded quests for MVP. In reality, fetch from database.
  const [quests, setQuests] = useState([
    { id: 1, title: 'Drink 2L of Water', difficulty: 'Easy', xp: 10, completed: false },
    { id: 2, title: 'Study 1 Hour', difficulty: 'Medium', xp: 25, completed: false },
    { id: 3, title: 'Complete Workout', difficulty: 'Hard', xp: 50, completed: false }
  ]);

  // Load completed quests state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('shadow_quests_state');
    if (saved) {
      setQuests(JSON.parse(saved));
    }
  }, []);

  const handleComplete = (id) => {
    const quest = quests.find(q => q.id === id);
    if (quest.completed) return;

    const newQuests = quests.map(q => q.id === id ? { ...q, completed: true } : q);
    setQuests(newQuests);
    localStorage.setItem('shadow_quests_state', JSON.stringify(newQuests));

    // Handle XP and Level Up Logic
    let currentXp = user.xp + quest.xp;
    let currentLevel = user.level;
    
    const getXpMax = (level) => {
      if (level <= 5) return 100;
      if (level <= 15) return 250;
      return 600;
    };

    let xpMax = getXpMax(currentLevel);
    if (currentXp >= xpMax) {
      currentLevel += 1;
      currentXp = currentXp - xpMax;
      // You can trigger a level up flash here
    }

    updateStats({ xp: currentXp, level: currentLevel });
  };

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', letterSpacing: '2px', fontSize: '18px' }}>DAILY QUESTS</h2>
        <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontFamily: 'var(--font-sys)' }}>Resets in 23h</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {quests.map(quest => (
          <div 
            key={quest.id} 
            className="neon-panel"
            style={{ 
              opacity: quest.completed ? 0.6 : 1,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button 
                onClick={() => handleComplete(quest.id)}
                style={{
                  width: '24px', 
                  height: '24px', 
                  border: `2px solid ${quest.completed ? 'var(--neon-blue)' : 'var(--text-dim)'}`,
                  backgroundColor: quest.completed ? 'rgba(0, 200, 255, 0.2)' : 'transparent',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: quest.completed ? 'default' : 'pointer'
                }}
              >
                {quest.completed && <Check size={16} color="var(--neon-blue)" />}
              </button>
              
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px', color: quest.completed ? 'var(--text-dim)' : 'var(--text-primary)', textDecoration: quest.completed ? 'line-through' : 'none' }}>
                  {quest.title}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center' }}>
                  <span style={{ 
                    fontSize: '10px', 
                    color: quest.difficulty === 'Easy' ? 'var(--success-green)' : quest.difficulty === 'Medium' ? 'var(--neon-blue)' : 'var(--accent-purple)',
                    fontFamily: 'var(--font-sys)'
                  }}>
                    {quest.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ fontFamily: 'var(--font-stats)', color: quest.completed ? 'var(--text-dim)' : 'var(--neon-blue)', fontSize: '16px' }}>
              +{quest.xp} XP
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
         <button className="neon-button" style={{ flex: 1, fontSize: '12px' }}>ADD TASK</button>
         <button className="neon-button" style={{ flex: 1, fontSize: '12px', borderColor: 'var(--success-green)', color: 'var(--success-green)' }}>CLAIM ALL</button>
      </div>
    </div>
  );
}
