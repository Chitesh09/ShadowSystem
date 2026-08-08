"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Flame, Award, Sparkles } from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { getRequiredXp } from '../../lib/progressionEngine';
import HudGauge from '../ui/HudGauge/HudGauge';
import Badge from '../ui/Badge/Badge';
import styles from './DashboardView.module.css';

export default function PlayerCard(props) {
  const { playerProfile } = useSystem();

  const designation = props.designation || playerProfile.designation || 'Shadow Operative';
  const level = props.level !== undefined ? props.level : (playerProfile.level || 1);
  const xp = props.xp !== undefined ? props.xp : (playerProfile.currentXP || playerProfile.xp || 0);
  const maxXp = props.maxXp || getRequiredXp(level);
  const rank = props.rank || playerProfile.rank || 'F-Rank Initiate';
  const streak = props.streak !== undefined ? props.streak : (playerProfile.streak || 0);

  return (
    <motion.div
      className={`${styles.floatCard} ${styles.playerCard}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Avatar Box with Shadow Aura */}
      <div className={styles.avatarBox}>
        <div className={styles.auraPulse} />
        <div className={styles.avatarGraphic}>
          <Shield size={58} style={{ color: 'rgba(0, 200, 255, 0.4)' }} />
          <div className={styles.eyesGlow}>
            <div className={styles.eyeDot} />
            <div className={styles.eyeDot} />
          </div>
        </div>
      </div>

      {/* Player Meta & Level Progress */}
      <div className={styles.playerDetails}>
        <div className={styles.playerHeader}>
          <div>
            <h2 className={styles.designationTitle}>{designation}</h2>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span className={styles.rankBadge}>
                <Award size={13} />
                <span>{rank}</span>
              </span>
              <Badge variant="purple" icon={Flame}>{streak} DAY STREAK</Badge>
            </div>
          </div>

          <div style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: '18px',
            fontWeight: 800,
            color: 'var(--primary-neon)',
            textShadow: '0 0 10px var(--primary-neon-glow)'
          }}>
            LEVEL {level}
          </div>
        </div>

        {/* XP Progress Bar */}
        <HudGauge
          label="SYSTEM EXP SYNCHRONIZATION"
          value={xp}
          max={maxXp}
          variant="primary"
          showValues={true}
        />
      </div>
    </motion.div>
  );
}
