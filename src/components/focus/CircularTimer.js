"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './FocusMode.module.css';

export default function CircularTimer({
  secondsLeft = 1500,
  totalSeconds = 1500,
  status = 'STANDBY',
  modeLabel = 'POMODORO'
}) {
  const radius = 120;
  const circumference = 2 * Math.PI * radius; // ~753.98
  const progress = Math.max(0, Math.min(1, secondsLeft / totalSeconds));
  const strokeDashoffset = circumference * (1 - progress);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className={styles.timerStage}>
      <svg className={styles.timerSvg} viewBox="0 0 280 280">
        {/* Background Dial Track */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          className={styles.timerTrack}
          fill="none"
        />

        {/* Animated Progress Ring */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          className={styles.timerProgress}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      {/* Digital Timer Center Content */}
      <div className={styles.timerCenterContent}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          {modeLabel}
        </div>

        <div className={styles.digits}>
          {formattedTime}
        </div>

        <div className={styles.statusText}>
          {status}
        </div>
      </div>
    </div>
  );
}
