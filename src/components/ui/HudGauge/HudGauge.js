"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './HudGauge.module.css';

export default function HudGauge({
  label,
  value = 0,
  max = 100,
  variant = 'primary',
  showValues = true,
  className = ''
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  let fillClass = styles.fillPrimary;
  if (variant === 'purple') fillClass = styles.fillPurple;
  if (variant === 'gold') fillClass = styles.fillGold;

  return (
    <div className={`${styles.container} ${className}`}>
      {(label || showValues) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {showValues && (
            <span className={styles.value}>
              {value} / {max}
            </span>
          )}
        </div>
      )}
      <div className={styles.track}>
        <motion.div
          className={`${styles.fill} ${fillClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
