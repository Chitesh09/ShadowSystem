"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './HudPanel.module.css';

export default function HudPanel({
  children,
  title,
  action,
  glow = 'none',
  showCorners = true,
  className = '',
  icon: Icon,
}) {
  let glowClass = '';
  if (glow === 'primary') glowClass = styles.glowPrimary;
  if (glow === 'purple') glowClass = styles.glowPurple;
  if (glow === 'gold') glowClass = styles.glowGold;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${styles.panel} ${glowClass} ${showCorners ? styles.cornerAccents : ''} ${className}`}
    >
      {title && (
        <div className={styles.header}>
          <div className={styles.title}>
            {Icon && <Icon size={16} style={{ color: 'var(--primary-neon)' }} />}
            <span>{title}</span>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </motion.div>
  );
}
