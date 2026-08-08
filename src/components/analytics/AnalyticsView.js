"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Award, Calendar } from 'lucide-react';
import WeeklyXpChart from './WeeklyXpChart';
import RadarChart from './RadarChart';
import HabitHeatmap from './HabitHeatmap';
import Badge from '../ui/Badge/Badge';
import { useSystem } from '../../context/SystemContext';
import styles from './AnalyticsSystem.module.css';

export default function AnalyticsView() {
  const { playerProfile } = useSystem();

  const totalXp = playerProfile.xp || 0;
  const level = playerProfile.level || 1;
  const streak = playerProfile.streak || 0;
  const focusMins = playerProfile.focusTimeToday || 0;

  const levelTimeline = [
    { level: level, title: `Current Level ${level} Elevation`, date: 'Today' }
  ];

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 1. Performance Overview Row */}
      <div className={styles.overviewGrid}>
        <div className={styles.overviewCard}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>SYSTEM EFFICIENCY RATING</div>
          <div className={styles.metricValue}>{totalXp > 0 ? '94.2%' : '0.0%'}</div>
          <Badge variant={totalXp > 0 ? 'cyan' : 'muted'}>{totalXp > 0 ? 'ACTIVE MATRIX' : 'No data available yet.'}</Badge>
        </div>

        <div className={styles.overviewCard}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>TOTAL RECLAIMED EXP</div>
          <div className={styles.metricValue} style={{ color: 'var(--status-success)', textShadow: '0 0 12px rgba(0, 230, 118, 0.4)' }}>
            +{totalXp} XP
          </div>
          <Badge variant="gold">{streak > 0 ? `${streak} DAY STREAK BOOST` : '0 DAY STREAK'}</Badge>
        </div>

        <div className={styles.overviewCard}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>TODAY'S FOCUS TIME</div>
          <div className={styles.metricValue} style={{ color: 'var(--accent-purple)', textShadow: '0 0 12px var(--accent-purple-glow)' }}>
            {focusMins} MINS
          </div>
          <Badge variant="purple">{focusMins > 0 ? `${Math.round((focusMins/60)*100)}% GOAL MET` : 'No focus sessions today.'}</Badge>
        </div>

        <div className={styles.overviewCard}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>CURRENT HUNTER RANK</div>
          <div className={styles.metricValue} style={{ color: 'var(--accent-gold)', textShadow: '0 0 12px var(--accent-gold-glow)' }}>
            {playerProfile.rank || 'F'}
          </div>
          <Badge variant="muted">LEVEL {level}</Badge>
        </div>
      </div>

      {/* 2. Charts Grid Row 1 (Weekly XP Line Chart & Stat Radar Chart) */}
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', color: 'var(--primary-neon)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={16} />
              <span>WEEKLY EXP ACCUMULATION</span>
            </div>
            <Badge variant="cyan">7 DAYS</Badge>
          </div>

          <WeeklyXpChart />
        </div>

        <div className={styles.chartCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', color: 'var(--accent-purple)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={16} />
              <span>CHARACTER STAT BALANCE RADAR</span>
            </div>
            <Badge variant="purple">5 AXES</Badge>
          </div>

          <RadarChart stats={{
            strength: playerProfile.strength || 0,
            intelligence: playerProfile.intelligence || 0,
            focus: playerProfile.focus || 0,
            vitality: playerProfile.vitality || 0,
            discipline: playerProfile.disciplineScore || 0
          }} />
        </div>
      </div>

      {/* 3. Charts Grid Row 2 (Habit Consistency Heatmap & Level Timeline) */}
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', color: 'var(--primary-neon)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} />
              <span>HABIT CONSISTENCY HEATMAP</span>
            </div>
            <Badge variant="gold">28 DAYS</Badge>
          </div>

          <HabitHeatmap />
        </div>

        <div className={styles.chartCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', color: 'var(--accent-gold)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={16} />
              <span>LEVEL ASCENSION TIMELINE</span>
            </div>
            <Badge variant="muted">CHRONOLOGICAL</Badge>
          </div>

          <div className={styles.timelineFeed}>
            {levelTimeline.map((item, i) => (
              <div key={i} className={styles.timelineNode}>
                <div className={styles.nodeDot} />
                <div>
                  <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', fontWeight: 800, color: 'var(--accent-gold)' }}>
                    LEVEL {item.level}: {item.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {item.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
