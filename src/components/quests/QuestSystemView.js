"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Target, CheckCircle2, Zap, Award, Sparkles, Filter } from 'lucide-react';
import QuestCard from './QuestCard';
import QuestFilterBar from './QuestFilterBar';
import QuestModal from './QuestModal';
import QuestCompletionModal from './QuestCompletionModal';
import HudGauge from '../ui/HudGauge/HudGauge';
import Button from '../ui/Button/Button';
import styles from './QuestSystem.module.css';

export default function QuestSystemView({ onAddXp }) {
  // Initial Quests Data Across Frequencies, Difficulties & Categories
  const [quests, setQuests] = useState([
    { id: 1, title: 'Morning Hydration & Electrolytes Target', category: 'HEALTH', frequency: 'DAILY', difficulty: 'EASY', timeMinutes: 5, xp: 10, completed: true },
    { id: 2, title: 'Read 20 Pages of Software Architecture', category: 'READING', frequency: 'DAILY', difficulty: 'MEDIUM', timeMinutes: 30, xp: 25, completed: false },
    { id: 3, title: 'Complete 1 Hour Deep Work Coding Session', category: 'CODING', frequency: 'DAILY', difficulty: 'HARD', timeMinutes: 60, xp: 50, completed: false },
    { id: 4, title: 'Full Body Conditioning & Core Workout', category: 'FITNESS', frequency: 'DAILY', difficulty: 'HARD', timeMinutes: 45, xp: 50, completed: false },
    { id: 5, title: '15 Mins Mindful Meditation & Breathing', category: 'MEDITATION', frequency: 'DAILY', difficulty: 'EASY', timeMinutes: 15, xp: 10, completed: true },
    { id: 6, title: 'Weekly Codebase Refactoring & Audit', category: 'CODING', frequency: 'WEEKLY', difficulty: 'EXTREME', timeMinutes: 120, xp: 100, completed: false },
    { id: 7, title: 'Read 1 Technical Book This Month', category: 'READING', frequency: 'MONTHLY', difficulty: 'EXTREME', timeMinutes: 300, xp: 150, completed: false },
  ]);

  // Filter & Search Controls State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFrequency, setActiveFrequency] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('XP_DESC');

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [editQuest, setEditQuest] = useState(null);
  const [completionModalQuest, setCompletionModalQuest] = useState(null);

  // Filter & Sort Logic
  const filteredQuests = useMemo(() => {
    return quests.filter(q => {
      // Search
      const matchesSearch = !searchQuery || 
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Frequency
      const matchesFreq = activeFrequency === 'ALL' || q.frequency === activeFrequency;

      // Category
      const matchesCat = activeCategory === 'ALL' || q.category === activeCategory;

      return matchesSearch && matchesFreq && matchesCat;
    }).sort((a, b) => {
      if (sortBy === 'XP_DESC') return b.xp - a.xp;
      if (sortBy === 'TIME_ASC') return a.timeMinutes - b.timeMinutes;
      if (sortBy === 'STATUS') return (a.completed === b.completed ? 0 : a.completed ? 1 : -1);
      if (sortBy === 'DIFFICULTY') {
        const order = { EXTREME: 4, HARD: 3, MEDIUM: 2, EASY: 1 };
        return (order[b.difficulty] || 0) - (order[a.difficulty] || 0);
      }
      return 0;
    });
  }, [quests, searchQuery, activeFrequency, activeCategory, sortBy]);

  // Complete / Uncomplete Toggle
  const handleToggleComplete = (id, newCompletedState) => {
    let completedItem = null;
    setQuests(prev =>
      prev.map(q => {
        if (q.id === id) {
          if (newCompletedState) completedItem = q;
          return { ...q, completed: newCompletedState };
        }
        return q;
      })
    );

    if (newCompletedState && completedItem) {
      if (onAddXp) onAddXp(completedItem.xp);
      setCompletionModalQuest(completedItem);
    }
  };

  // CRUD Save
  const handleSaveQuest = (savedQuest) => {
    if (editQuest) {
      setQuests(prev => prev.map(q => q.id === savedQuest.id ? savedQuest : q));
    } else {
      setQuests(prev => [savedQuest, ...prev]);
    }
    setEditQuest(null);
  };

  // Delete
  const handleDeleteQuest = (id) => {
    setQuests(prev => prev.filter(q => q.id !== id));
  };

  // Stats Calculations
  const completedCount = quests.filter(q => q.completed).length;
  const totalXpEarned = quests.filter(q => q.completed).reduce((sum, q) => sum + q.xp, 0);
  const completionPercentage = quests.length > 0 ? Math.round((completedCount / quests.length) * 100) : 0;

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header Summary Box */}
      <div className={styles.headerBox}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: '18px', color: 'var(--primary-neon)', letterSpacing: '0.1em' }}>
            SYSTEM QUEST MATRIX
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Daily, Weekly & Monthly Life RPG Missions
          </p>
        </div>

        <div className={styles.statGrid}>
          <div className={styles.statItem}>
            <span className={styles.statVal}>{completedCount} / {quests.length}</span>
            <span className={styles.statLabel}>QUESTS COMPLETED</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statVal} style={{ color: 'var(--status-success)', textShadow: '0 0 10px rgba(0, 230, 118, 0.4)' }}>
              +{totalXpEarned} XP
            </span>
            <span className={styles.statLabel}>TOTAL XP RECLAIMED</span>
          </div>
        </div>

        <Button
          variant="purple"
          size="md"
          icon={Plus}
          onClick={() => { setEditQuest(null); setModalOpen(true); }}
        >
          INITIALIZE QUEST
        </Button>
      </div>

      {/* Progress Bar */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '16px 20px' }}>
        <HudGauge
          label="QUEST MATRIX COMPLETION RATE"
          value={completedCount}
          max={quests.length || 1}
          variant="primary"
        />
      </div>

      {/* Filter & Search Bar */}
      <QuestFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFrequency={activeFrequency}
        onFrequencyChange={setActiveFrequency}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Quest Grid Display */}
      {filteredQuests.length > 0 ? (
        <div className={styles.questGrid}>
          <AnimatePresence>
            {filteredQuests.map(q => (
              <QuestCard
                key={q.id}
                quest={q}
                onToggleComplete={handleToggleComplete}
                onEdit={(questToEdit) => { setEditQuest(questToEdit); setModalOpen(true); }}
                onDelete={handleDeleteQuest}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '48px 20px',
          background: 'var(--bg-card)',
          border: '1px dashed var(--border-color)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-muted)'
        }}>
          <Filter size={32} style={{ color: 'var(--text-dim)', marginBottom: '12px' }} />
          <h3 style={{ fontFamily: 'var(--font-orbitron)', fontSize: '15px', color: 'var(--text-main)' }}>NO MATCHING QUESTS FOUND</h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', marginTop: '6px' }}>Try adjusting your search criteria or category filter.</p>
        </div>
      )}

      {/* Add / Edit Quest Modal */}
      <QuestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveQuest}
        editQuest={editQuest}
      />

      {/* Celebration Completion Modal */}
      <QuestCompletionModal
        isOpen={Boolean(completionModalQuest)}
        onClose={() => setCompletionModalQuest(null)}
        completedQuest={completionModalQuest}
      />
    </motion.div>
  );
}
