"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Clock, Zap, Award, Flame } from 'lucide-react';
import Badge from '../ui/Badge/Badge';
import Button from '../ui/Button/Button';
import HudGauge from '../ui/HudGauge/HudGauge';
import styles from './TrainingSystem.module.css';

export default function WorkoutTab({ onLogWorkout }) {
  const routines = [
    { id: 1, title: 'Full Body Conditioning & Core', duration: 45, intensity: 'HARD', xp: 45, pr: 'PR: 45 Mins Non-Stop' },
    { id: 2, title: 'Heavy Strength & Resistance Training', duration: 60, intensity: 'EXTREME', xp: 60, pr: 'PR: 100KG Bench Press' },
    { id: 3, title: 'HIIT Cardio & Sprint Intervals', duration: 30, intensity: 'HIGH', xp: 35, pr: 'PR: 5KM Sprint in 22m' },
    { id: 4, title: 'Daily Pushup & Bodyweight Mastery', duration: 20, intensity: 'MEDIUM', xp: 25, pr: 'PR: 100 Pushups Set' },
  ];

  return (
    <div className={styles.cardsGrid}>
      {routines.map(r => (
        <motion.div
          key={r.id}
          className={styles.routineCard}
          whileHover={{ y: -4 }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
              <h3 style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '16px', color: 'var(--text-main)' }}>
                {r.title}
              </h3>
              <Badge variant="purple" icon={Dumbbell}>WORKOUT</Badge>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
              <Badge variant="muted" icon={Clock}>{r.duration} MINS</Badge>
              <Badge
                variant={r.intensity === 'EXTREME' ? 'purple' : r.intensity === 'HIGH' ? 'purple' : r.intensity === 'HARD' ? 'gold' : 'cyan'}
              >
                INTENSITY: {r.intensity}
              </Badge>
            </div>

            <div style={{ marginTop: '12px' }}>
              <HudGauge label="WEEKLY ROUTINE GOAL" value={75} max={100} variant="primary" showValues={false} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
              <Award size={13} />
              <span>{r.pr}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: '14px', fontWeight: 800, color: 'var(--primary-neon)' }}>
              +{r.xp} XP
            </span>

            <Button
              variant="primary"
              size="sm"
              icon={Zap}
              onClick={() => onLogWorkout && onLogWorkout(r)}
            >
              LOG WORKOUT
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
