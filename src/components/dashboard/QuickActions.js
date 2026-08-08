"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Target, Dumbbell, Award, Zap } from 'lucide-react';
import Button from '../ui/Button/Button';
import styles from './DashboardView.module.css';

export default function QuickActions({ onAction }) {
  const actions = [
    { id: 'add_mission', label: 'ADD MISSION', icon: Plus, variant: 'primary' },
    { id: 'start_focus', label: 'START FOCUS', icon: Target, variant: 'purple' },
    { id: 'log_workout', label: 'LOG WORKOUT', icon: Dumbbell, variant: 'outline' },
    { id: 'claim_rewards', label: 'CLAIM REWARDS', icon: Award, variant: 'gold' },
  ];

  return (
    <div className={styles.floatCard}>
      <div className={styles.sectionTitle} style={{ marginBottom: '16px' }}>
        <Zap size={16} style={{ color: 'var(--primary-neon)' }} />
        <span>QUICK ACTIONS</span>
      </div>

      <div className={styles.actionsGrid}>
        {actions.map(act => (
          <Button
            key={act.id}
            variant={act.variant}
            icon={act.icon}
            size="md"
            onClick={() => onAction && onAction(act.id)}
          >
            {act.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
