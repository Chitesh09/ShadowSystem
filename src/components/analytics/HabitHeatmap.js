"use client";

import React, { useState } from 'react';
import styles from './AnalyticsSystem.module.css';

export default function HabitHeatmap() {
  const [hoveredDay, setHoveredDay] = useState(null);

  // 28-day habit completion data (0 = None, 1 = Low, 2 = Medium, 3 = Complete)
  const days = [
    { day: 1, level: 3, label: 'Day 1: 100% Complete (+120 XP)' },
    { day: 2, level: 2, label: 'Day 2: 75% Complete (+90 XP)' },
    { day: 3, level: 3, label: 'Day 3: 100% Complete (+150 XP)' },
    { day: 4, level: 1, label: 'Day 4: 25% Complete (+30 XP)' },
    { day: 5, level: 3, label: 'Day 5: 100% Complete (+140 XP)' },
    { day: 6, level: 2, label: 'Day 6: 75% Complete (+95 XP)' },
    { day: 7, level: 3, label: 'Day 7: 100% Complete (+180 XP)' },

    { day: 8, level: 3, label: 'Day 8: 100% Complete (+160 XP)' },
    { day: 9, level: 3, label: 'Day 9: 100% Complete (+150 XP)' },
    { day: 10, level: 2, label: 'Day 10: 75% Complete (+100 XP)' },
    { day: 11, level: 3, label: 'Day 11: 100% Complete (+175 XP)' },
    { day: 12, level: 3, label: 'Day 12: 100% Complete (+190 XP)' },
    { day: 13, level: 1, label: 'Day 13: 25% Complete (+35 XP)' },
    { day: 14, level: 3, label: 'Day 14: 100% Complete (+200 XP)' },

    { day: 15, level: 2, label: 'Day 15: 75% Complete (+110 XP)' },
    { day: 16, level: 3, label: 'Day 16: 100% Complete (+150 XP)' },
    { day: 17, level: 3, label: 'Day 17: 100% Complete (+165 XP)' },
    { day: 18, level: 3, label: 'Day 18: 100% Complete (+180 XP)' },
    { day: 19, level: 2, label: 'Day 19: 75% Complete (+105 XP)' },
    { day: 20, level: 3, label: 'Day 20: 100% Complete (+195 XP)' },
    { day: 21, level: 3, label: 'Day 21: 100% Complete (+210 XP)' },

    { day: 22, level: 3, label: 'Day 22: 100% Complete (+160 XP)' },
    { day: 23, level: 2, label: 'Day 23: 75% Complete (+115 XP)' },
    { day: 24, level: 3, label: 'Day 24: 100% Complete (+185 XP)' },
    { day: 25, level: 3, label: 'Day 25: 100% Complete (+220 XP)' },
    { day: 26, level: 1, label: 'Day 26: 25% Complete (+40 XP)' },
    { day: 27, level: 3, label: 'Day 27: 100% Complete (+200 XP)' },
    { day: 28, level: 3, label: 'Day 28: 100% Complete (+250 XP)' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {hoveredDay && (
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '10px',
          padding: '4px 10px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--primary-neon)',
          borderRadius: '4px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--primary-neon)',
          boxShadow: '0 0 10px var(--primary-neon-glow)'
        }}>
          {hoveredDay.label}
        </div>
      )}

      <div className={styles.heatmapGrid}>
        {days.map(d => (
          <div
            key={d.day}
            className={`${styles.heatmapTile} ${styles[`level${d.level}`]}`}
            onMouseEnter={() => setHoveredDay(d)}
            onMouseLeave={() => setHoveredDay(null)}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
        <span>28-DAY CONSISTENCY MATRIX</span>
        <span>IMPROVED +18% THIS MONTH</span>
      </div>
    </div>
  );
}
