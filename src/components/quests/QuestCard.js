"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, Dumbbell, BookOpen, Brain, Book, Code, Heart, Sparkles, Clock, Edit2, Trash2, Calendar 
} from 'lucide-react';
import Badge from '../ui/Badge/Badge';
import styles from './QuestSystem.module.css';

export default function QuestCard({
  quest,
  onToggleComplete,
  onEdit,
  onDelete
}) {
  const [showFloatingXp, setShowFloatingXp] = useState(false);

  // Category Icon Resolver
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'fitness': return Dumbbell;
      case 'study': return BookOpen;
      case 'meditation': return Brain;
      case 'reading': return Book;
      case 'coding': return Code;
      case 'health': return Heart;
      default: return Sparkles;
    }
  };

  const CategoryIcon = getCategoryIcon(quest.category);

  // Difficulty Class Resolver
  let diffClass = styles.diffEasy;
  if (quest.difficulty === 'MEDIUM') diffClass = styles.diffMedium;
  if (quest.difficulty === 'HARD') diffClass = styles.diffHard;
  if (quest.difficulty === 'EXTREME') diffClass = styles.diffExtreme;

  const handleCheck = () => {
    const nextState = !quest.completed;
    if (nextState) {
      setShowFloatingXp(true);
      setTimeout(() => setShowFloatingXp(false), 1200);
    }
    if (onToggleComplete) {
      onToggleComplete(quest.id, nextState);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className={`${styles.questCard} ${diffClass} ${quest.completed ? styles.questCardCompleted : ''}`}
    >
      {/* Floating XP Particle Burst */}
      <AnimatePresence>
        {showFloatingXp && (
          <div className={styles.floatingXp}>
            +{quest.xp} XP!
          </div>
        )}
      </AnimatePresence>

      <div className={styles.questTop}>
        <div
          className={`${styles.checkbox} ${quest.completed ? styles.checkboxDone : ''}`}
          onClick={handleCheck}
        >
          {quest.completed && <Check size={14} style={{ color: 'var(--primary-neon)' }} />}
        </div>

        <div style={{ flex: 1 }}>
          <div className={`${styles.questTitle} ${quest.completed ? styles.titleDone : ''}`}>
            {quest.title}
          </div>

          <div className={styles.questMeta}>
            <Badge variant="cyan" icon={CategoryIcon}>
              {quest.category?.toUpperCase() || 'CUSTOM'}
            </Badge>

            <Badge
              variant={
                quest.difficulty === 'EXTREME' ? 'purple' :
                quest.difficulty === 'HARD' ? 'purple' :
                quest.difficulty === 'MEDIUM' ? 'gold' : 'cyan'
              }
            >
              {quest.difficulty}
            </Badge>

            <Badge variant="muted" icon={Calendar}>
              {quest.frequency?.toUpperCase() || 'DAILY'}
            </Badge>

            {quest.timeMinutes && (
              <Badge variant="muted" icon={Clock}>
                {quest.timeMinutes} MINS
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className={styles.questBottom}>
        <div className={styles.xpBadge}>
          +{quest.xp} XP
        </div>

        <div className={styles.actionBtns}>
          <button className={styles.iconBtn} onClick={() => onEdit(quest)} title="Edit Quest">
            <Edit2 size={15} />
          </button>
          <button className={`${styles.iconBtn} ${styles.iconBtnDanger}`} onClick={() => onDelete(quest.id)} title="Delete Quest">
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
