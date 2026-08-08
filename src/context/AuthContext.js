"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('shadow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username) => {
    const newUser = {
      username,
      level: 1,
      xp: 0,
      class: 'Shadow Trainee',
      stats: {
        strength: 10,
        intelligence: 10,
        perception: 10
      },
      // Mock past days logic
      habitHistory: [20, 50, 30, 80, 40, 60, 0] // 7 elements, last element is TODAY
    };
    localStorage.setItem('shadow_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('shadow_user');
    setUser(null);
  };

  const getXpMax = (level) => {
    if (level <= 5) return 100;
    if (level <= 15) return 250;
    return 600;
  };

  const addXpAndStats = (xpAmount, statChanges = {}) => {
    if (!user) return;
    
    setUser(prev => {
      let currentXp = prev.xp + xpAmount;
      let currentLevel = prev.level;
      let xpMax = getXpMax(currentLevel);
      
      while (currentXp >= xpMax) {
        currentLevel += 1;
        currentXp = currentXp - xpMax;
        xpMax = getXpMax(currentLevel);
      }

      const newStats = { ...prev.stats };
      if (statChanges.strength) newStats.strength += statChanges.strength;
      if (statChanges.intelligence) newStats.intelligence += statChanges.intelligence;
      if (statChanges.perception) newStats.perception += statChanges.perception;

      const newHistory = [...prev.habitHistory];
      newHistory[newHistory.length - 1] += xpAmount; // Add to today's tally

      const updatedUser = { 
        ...prev, 
        xp: currentXp, 
        level: currentLevel,
        stats: newStats,
        habitHistory: newHistory
      };
      
      localStorage.setItem('shadow_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addXpAndStats, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
