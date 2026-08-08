"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Target, Clock, Plus } from 'lucide-react';
import HudGauge from '../ui/HudGauge/HudGauge';
import HudDialog from '../ui/HudDialog/HudDialog';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';
import { useSystem } from '../../context/SystemContext';
import styles from './DashboardView.module.css';

export default function MetricsWidget() {
  const { playerProfile, setCurrentGoal } = useSystem();

  const streak = playerProfile.streak || 0;
  const currentGoal = playerProfile.currentGoal;
  const focusMinutes = playerProfile.focusTimeToday || 0;
  const maxFocus = 60;

  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [newGoalInput, setNewGoalInput] = useState('');

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    if (newGoalInput.trim()) {
      setCurrentGoal(newGoalInput.trim());
      setNewGoalInput('');
      setGoalModalOpen(false);
    }
  };

  return (
    <>
      <div className={styles.metricsGrid}>
        {/* Current Streak */}
        <motion.div
          className={styles.floatCard}
          whileHover={{ y: -4 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Flame size={20} style={{ color: '#FF9100', filter: 'drop-shadow(0 0 8px #FF9100)' }} />
            <span className={styles.sectionTitle} style={{ margin: 0 }}>CURRENT STREAK</span>
          </div>

          <div style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: '28px',
            fontWeight: 900,
            color: streak > 0 ? '#FFD700' : 'var(--text-muted)',
            textShadow: streak > 0 ? '0 0 15px rgba(255, 215, 0, 0.4)' : 'none'
          }}>
            {streak} DAYS ACTIVE
          </div>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {streak > 0 
              ? 'Habit Consistency Multiplier: 1.5x XP Boost' 
              : 'Complete your first mission to begin your streak.'}
          </p>
        </motion.div>

        {/* Current Goal */}
        <motion.div
          className={styles.floatCard}
          whileHover={{ y: -4 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Target size={20} style={{ color: 'var(--accent-purple)', filter: 'drop-shadow(0 0 8px var(--accent-purple-glow))' }} />
              <span className={styles.sectionTitle} style={{ margin: 0 }}>CURRENT GOAL</span>
            </div>

            <Button variant="outline" size="sm" icon={Plus} onClick={() => setGoalModalOpen(true)}>
              {currentGoal ? 'CHANGE' : 'SET GOAL'}
            </Button>
          </div>

          <div style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '15px', color: currentGoal ? 'var(--text-main)' : 'var(--text-muted)' }}>
            {currentGoal ? currentGoal : 'No active goal.'}
          </div>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', marginBottom: '10px' }}>
            {currentGoal ? 'Target System Elevation' : 'Click Set Goal to define your focus objective.'}
          </p>

          <HudGauge value={playerProfile.currentXP || 0} max={1000} variant="purple" showValues={false} />
        </motion.div>

        {/* Today's Focus Time */}
        <motion.div
          className={styles.floatCard}
          whileHover={{ y: -4 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Clock size={20} style={{ color: 'var(--primary-neon)', filter: 'drop-shadow(0 0 8px var(--primary-neon-glow))' }} />
            <span className={styles.sectionTitle} style={{ margin: 0 }}>TODAY'S FOCUS TIME</span>
          </div>

          <div style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: '24px',
            fontWeight: 800,
            color: focusMinutes > 0 ? 'var(--primary-neon)' : 'var(--text-muted)',
            textShadow: focusMinutes > 0 ? '0 0 12px var(--primary-neon-glow)' : 'none'
          }}>
            {focusMinutes} / {maxFocus} MINS
          </div>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', marginBottom: '8px' }}>
            {focusMinutes > 0 ? 'Daily Focus Target Progress' : 'No focus sessions today.'}
          </p>

          <HudGauge value={focusMinutes} max={maxFocus} variant="primary" showValues={false} />
        </motion.div>
      </div>

      {/* Set Goal Modal */}
      <HudDialog
        isOpen={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        title="SET SYSTEM ELEVATION GOAL"
      >
        <form onSubmit={handleGoalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="GOAL OBJECTIVE"
            placeholder="e.g. Reach Level 10 & Complete 50 Focus Blocks"
            value={newGoalInput}
            onChange={(e) => setNewGoalInput(e.target.value)}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button variant="outline" size="sm" type="button" onClick={() => setGoalModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">SAVE GOAL</Button>
          </div>
        </form>
      </HudDialog>
    </>
  );
}
