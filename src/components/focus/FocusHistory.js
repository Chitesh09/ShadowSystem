"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import styles from './FocusMode.module.css';

export default function FocusHistory({ history = [], totalMinutes = 0, totalSessions = 0 }) {
  return (
    <div className={styles.statsGrid}>
      {/* Metrics Card */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', color: 'var(--primary-neon)', letterSpacing: '0.1em' }}>
          TODAY'S FOCUS STATS
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '22px', fontWeight: 800, color: 'var(--primary-neon)' }}>
              {totalMinutes} MINS
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              TOTAL TIME TODAY
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '22px', fontWeight: 800, color: 'var(--accent-purple)' }}>
              {totalSessions} SESSIONS
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              COMPLETED BLOCKS
            </div>
          </div>
        </div>
      </div>

      {/* History Log Feed */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', color: 'var(--primary-neon)', letterSpacing: '0.1em' }}>
          SESSION LOG FEED
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {history.length === 0 ? (
            <div style={{
              padding: '20px 14px',
              textAlign: 'center',
              background: 'var(--bg-secondary)',
              borderRadius: '6px',
              border: '1px solid var(--border-color)'
            }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                No focus sessions logged yet.
              </p>
            </div>
          ) : (
            history.map(h => (
              <motion.div
                key={h.id}
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  padding: '10px 14px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={14} style={{ color: 'var(--text-dim)' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                      {h.mode || 'FOCUS'} ({h.duration || '25 Mins'})
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                      {h.time}
                    </div>
                  </div>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--status-success)' }}>
                  +{h.xp} XP
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
