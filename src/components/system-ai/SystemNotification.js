"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Terminal, CheckCircle2, Zap } from 'lucide-react';
import Badge from '../ui/Badge/Badge';
import styles from './SystemAi.module.css';

export default function SystemNotification({
  code = 'DIRECTIVE-0700',
  title = 'SYSTEM MORNING BRIEFING',
  directives = [],
  status = 'OPTIMAL',
  recommendation = ''
}) {
  return (
    <motion.div
      className={styles.alertBanner}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.bannerHeader}>
        <div className={styles.bannerCode}>
          <Terminal size={18} />
          <span>[{code}] {title}</span>
        </div>

        <Badge variant={status === 'OPTIMAL' ? 'cyan' : 'purple'} icon={ShieldAlert}>
          STATUS: {status}
        </Badge>
      </div>

      <div className={styles.directiveList}>
        {directives.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ color: 'var(--primary-neon)' }}>&gt;</span>
            <span>{d}</span>
          </div>
        ))}
      </div>

      {recommendation && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--accent-gold)',
          letterSpacing: '0.06em',
          marginTop: '2px'
        }}>
          {recommendation}
        </div>
      )}
    </motion.div>
  );
}
