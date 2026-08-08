"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Zap, Award, Brain } from 'lucide-react';
import Badge from '../ui/Badge/Badge';
import Button from '../ui/Button/Button';
import HudGauge from '../ui/HudGauge/HudGauge';
import styles from './TrainingSystem.module.css';

export default function StudyTab({ onLogStudy }) {
  const sessions = [
    { id: 1, title: 'Distributed Systems & Microservices Architecture', duration: 60, intensity: 'HIGH', xp: 55, pr: 'PR: 3 Hrs Focus Block' },
    { id: 2, title: 'Advanced Algorithms & Graph Theory', duration: 90, intensity: 'EXTREME', xp: 80, pr: 'PR: 15 Hard Problems Solved' },
    { id: 3, title: 'Full Stack Performance Optimization', duration: 45, intensity: 'MEDIUM', xp: 40, pr: 'PR: 99/100 Lighthouse Benchmark' },
    { id: 4, title: 'Deep AI & Machine Learning Foundations', duration: 60, intensity: 'HIGH', xp: 60, pr: 'PR: Model Fine-tuning Completed' },
  ];

  return (
    <div className={styles.cardsGrid}>
      {sessions.map(s => (
        <motion.div
          key={s.id}
          className={styles.routineCard}
          whileHover={{ y: -4 }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
              <h3 style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '16px', color: 'var(--text-main)' }}>
                {s.title}
              </h3>
              <Badge variant="cyan" icon={BookOpen}>STUDY</Badge>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
              <Badge variant="muted" icon={Clock}>{s.duration} MINS</Badge>
              <Badge
                variant={s.intensity === 'EXTREME' ? 'purple' : s.intensity === 'HIGH' ? 'purple' : s.intensity === 'HARD' ? 'gold' : 'cyan'}
              >
                INTENSITY: {s.intensity}
              </Badge>
            </div>

            <div style={{ marginTop: '12px' }}>
              <HudGauge label="MASTERY PROGRESS" value={65} max={100} variant="purple" showValues={false} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
              <Award size={13} />
              <span>{s.pr}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: '14px', fontWeight: 800, color: 'var(--primary-neon)' }}>
              +{s.xp} XP
            </span>

            <Button
              variant="purple"
              size="sm"
              icon={Zap}
              onClick={() => onLogStudy && onLogStudy(s)}
            >
              LOG STUDY
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
