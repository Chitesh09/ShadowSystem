"use client";

import React from 'react';
import { motion } from 'framer-motion';
import PlayerCard from './PlayerCard';
import MissionsWidget from './MissionsWidget';
import QuickActions from './QuickActions';
import MetricsWidget from './MetricsWidget';
import RecentActivity from './RecentActivity';
import { useSystem } from '../../context/SystemContext';
import styles from './DashboardView.module.css';

export default function DashboardView() {
  const { addXp, logFocusSession } = useSystem();

  const handleQuickAction = (actionId) => {
    if (actionId === 'start_focus') {
      logFocusSession(25, 30);
    } else if (actionId === 'log_workout') {
      addXp(40, 'Logged physical training workout');
    } else if (actionId === 'claim_rewards') {
      addXp(50, 'Claimed system reward bonus');
    }
  };

  return (
    <motion.div
      className={styles.dashboardContainer}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 1. Player Card (Avatar, Level, XP, Rank, Aura) - 100% Real-Time Driven */}
      <PlayerCard />

      {/* 2. Quick Actions Bar */}
      <QuickActions onAction={handleQuickAction} />

      {/* 3. Metrics Row (Streak, Current Goal, Today's Focus Time) - 100% Real-Time Driven */}
      <MetricsWidget />

      {/* 4. Missions Widget & Recent Activity Log Grid - 100% Real-Time Driven */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        <MissionsWidget />
        <RecentActivity />
      </div>
    </motion.div>
  );
}
