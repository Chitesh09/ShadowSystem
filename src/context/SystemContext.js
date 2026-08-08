"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { systemService, ZERO_PLAYER_PROFILE } from '../lib/services/systemService';
import { getRequiredXp, getRankForLevel, getTitleForLevel } from '../lib/progressionEngine';

const SystemContext = createContext({
  userId: 'default_hunter',
  systemStatus: 'ONLINE',
  playerProfile: ZERO_PLAYER_PROFILE,
  loadProfile: async () => {},
  createProfile: async () => {},
  updatePlayerProfile: () => {},
  addXp: () => {},
  toggleQuest: () => {},
  addQuest: () => {},
  logFocusSession: () => {},
  setCurrentGoal: () => {},
});

export function SystemProvider({ children }) {
  const [userId, setUserId] = useState('default_hunter');
  const [systemStatus, setSystemStatus] = useState('ONLINE');
  const [playerProfile, setPlayerProfile] = useState(ZERO_PLAYER_PROFILE);

  // Initialize current user profile on app startup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentId = localStorage.getItem('shadow_current_user_id') || 'default_hunter';
      setUserId(currentId);
      systemService.getProfile(currentId).then(res => {
        if (res.exists && res.profile) {
          setPlayerProfile(res.profile);
        }
      });
    }
  }, []);

  const loadProfile = async (id) => {
    setUserId(id);
    const res = await systemService.getProfile(id);
    if (res.exists && res.profile) {
      setPlayerProfile(res.profile);
      return { exists: true, profile: res.profile };
    }
    return { exists: false, profile: null };
  };

  const createProfile = async (id, customFields = {}) => {
    setUserId(id);
    const newProfile = await systemService.createProfile(id, customFields);
    setPlayerProfile(newProfile);
    return newProfile;
  };

  const updatePlayerProfile = (patch) => {
    setPlayerProfile(prev => {
      const updated = { ...prev, ...patch };
      systemService.updateProfile(userId, updated);
      return updated;
    });
  };

  // Real-Time XP & Progression Engine Updates
  const addXp = (amount, logTitle = '') => {
    if (amount <= 0) return;

    setPlayerProfile(prev => {
      let nextTotalXp = prev.xp + amount;
      let nextCurrentXp = prev.currentXP + amount;
      let nextLevel = prev.level;
      let requiredXp = getRequiredXp(nextLevel);

      while (nextCurrentXp >= requiredXp) {
        nextCurrentXp -= requiredXp;
        nextLevel += 1;
        requiredXp = getRequiredXp(nextLevel);
      }

      const rankObj = getRankForLevel(nextLevel);
      const titleObj = getTitleForLevel(nextLevel);

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newLog = {
        id: Date.now(),
        time: timeStr,
        title: logTitle || `Earned +${amount} XP System Reward`,
        xp: amount
      };

      const updated = {
        ...prev,
        xp: nextTotalXp,
        currentXP: nextCurrentXp,
        level: nextLevel,
        rank: rankObj.rank,
        titles: prev.titles.includes(titleObj.title) ? prev.titles : [...prev.titles, titleObj.title],
        recentActivity: [newLog, ...(prev.recentActivity || [])]
      };

      systemService.updateProfile(userId, updated);
      return updated;
    });
  };

  // Toggle quest completion real-time
  const toggleQuest = (questId) => {
    setPlayerProfile(prev => {
      let earnedXp = 0;
      let questTitle = '';

      const updatedQuests = (prev.quests || []).map(q => {
        if (q.id === questId) {
          const nextState = !q.done;
          if (nextState) {
            earnedXp = q.xp;
            questTitle = q.title;
          }
          return { ...q, done: nextState };
        }
        return q;
      });

      let nextTotalXp = prev.xp + earnedXp;
      let nextCurrentXp = prev.currentXP + earnedXp;
      let nextLevel = prev.level;
      let requiredXp = getRequiredXp(nextLevel);

      while (nextCurrentXp >= requiredXp) {
        nextCurrentXp -= requiredXp;
        nextLevel += 1;
        requiredXp = getRequiredXp(nextLevel);
      }

      const rankObj = getRankForLevel(nextLevel);
      const titleObj = getTitleForLevel(nextLevel);

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newActivity = earnedXp > 0 ? [
        { id: Date.now(), time: timeStr, title: `Completed mission: ${questTitle}`, xp: earnedXp },
        ...(prev.recentActivity || [])
      ] : (prev.recentActivity || []);

      const updated = {
        ...prev,
        quests: updatedQuests,
        xp: nextTotalXp,
        currentXP: nextCurrentXp,
        level: nextLevel,
        rank: rankObj.rank,
        completedTasks: earnedXp > 0 ? prev.completedTasks + 1 : prev.completedTasks,
        recentActivity: newActivity
      };

      systemService.updateProfile(userId, updated);
      return updated;
    });
  };

  // Add new custom quest real-time
  const addQuest = (newQuest) => {
    setPlayerProfile(prev => {
      const updatedQuests = [
        ...(prev.quests || []),
        { id: Date.now(), ...newQuest, done: false }
      ];

      const updated = { ...prev, quests: updatedQuests };
      systemService.updateProfile(userId, updated);
      return updated;
    });
  };

  // Log focus session real-time
  const logFocusSession = (minutes, xpGain) => {
    setPlayerProfile(prev => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newLog = {
        id: Date.now(),
        time: timeStr,
        title: `Completed ${minutes}m Focus Session`,
        xp: xpGain
      };

      const updated = {
        ...prev,
        focusTimeToday: (prev.focusTimeToday || 0) + minutes,
        recentActivity: [newLog, ...(prev.recentActivity || [])]
      };

      systemService.updateProfile(userId, updated);
      return updated;
    });

    addXp(xpGain, `Completed ${minutes}m Focus Session`);
  };

  // Set Current Goal real-time
  const setCurrentGoal = (goalTitle) => {
    updatePlayerProfile({ currentGoal: goalTitle });
  };

  return (
    <SystemContext.Provider
      value={{
        userId,
        systemStatus,
        playerProfile,
        loadProfile,
        createProfile,
        updatePlayerProfile,
        addXp,
        toggleQuest,
        addQuest,
        logFocusSession,
        setCurrentGoal,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  return useContext(SystemContext);
}
