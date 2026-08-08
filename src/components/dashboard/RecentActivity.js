"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock } from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import styles from './DashboardView.module.css';

export default function RecentActivity() {
  const { playerProfile } = useSystem();
  const displayLogs = playerProfile.recentActivity || [];

  return (
    <div className={styles.floatCard}>
      <div className={styles.sectionTitle} style={{ marginBottom: '16px' }}>
        <Activity size={16} style={{ color: 'var(--primary-neon)' }} />
        <span>RECENT SYSTEM ACTIVITY</span>
      </div>

      <div className={styles.timeline}>
        {displayLogs.length === 0 ? (
          <div style={{
            padding: '30px 20px',
            textAlign: 'center',
            background: 'var(--bg-secondary)',
            border: '1px border-color var(--border-color)',
            borderRadius: '8px'
          }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>
              Your activity log will appear here.
            </p>
          </div>
        ) : (
          displayLogs.map(log => (
            <motion.div
              key={log.id}
              className={styles.timelineItem}
              whileHover={{ x: 4 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={13} style={{ color: 'var(--text-dim)' }} />
                <div>
                  <span className={styles.timelineTime}>{log.time}</span>
                  <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{log.title}</div>
                </div>
              </div>

              <div style={{ color: 'var(--primary-neon)', fontWeight: 700 }}>
                +{log.xp} XP
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
