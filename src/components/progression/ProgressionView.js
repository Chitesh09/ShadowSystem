"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, Lock, CheckCircle2, Zap, Layers, Flame } from 'lucide-react';
import HudPanel from '../ui/HudPanel/HudPanel';
import HudGauge from '../ui/HudGauge/HudGauge';
import Badge from '../ui/Badge/Badge';
import Button from '../ui/Button/Button';
import LevelUpModal from './LevelUpModal';
import { useSystem } from '../../context/SystemContext';
import { 
  RANKS, UNLOCKS, getRequiredXp, getRankForLevel, getTitleForLevel, getXpMultiplier 
} from '../../lib/progressionEngine';
import styles from './ProgressionView.module.css';

export default function ProgressionView() {
  const { playerProfile, addXp } = useSystem();

  const level = playerProfile.level || 1;
  const currentXp = playerProfile.currentXP || 0;
  const requiredXp = getRequiredXp(level);
  const streak = playerProfile.streak || 0;

  const currentRankObj = getRankForLevel(level);
  const currentTitleObj = getTitleForLevel(level);

  // Level Up Modal State
  const [levelUpModalOpen, setLevelUpModalOpen] = useState(false);
  const [levelUpData, setLevelUpData] = useState({
    newLevel: level + 1,
    newRank: currentRankObj.rank,
    newTitle: currentTitleObj.title,
    unlockedFeatures: []
  });

  const handleAddXp = (amount) => {
    const prevLevel = level;
    addXp(amount, `Progression Bench Test (+${amount} XP)`);

    const nextLevel = level + 1;
    if (nextLevel > prevLevel) {
      setLevelUpData({
        newLevel: nextLevel,
        newRank: getRankForLevel(nextLevel).rank,
        newTitle: getTitleForLevel(nextLevel).title,
        unlockedFeatures: UNLOCKS.filter(u => u.level === nextLevel).map(u => u.name)
      });
      setLevelUpModalOpen(true);
    }
  };

  const currentMultiplier = getXpMultiplier(streak);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 1. Hero Progression Card */}
      <div className={styles.heroCard}>
        <div className={styles.levelCircle}>
          <span className={styles.levelNum}>{level}</span>
          <span className={styles.levelLbl}>LEVEL</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: '20px', fontWeight: 800, color: 'var(--text-main)' }}>
                  {playerProfile.rank || currentRankObj.rank}
                </span>
                <Badge variant="purple" icon={Sparkles}>{currentTitleObj.title}</Badge>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                System Elevation Status: Active | Multiplier: <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{currentMultiplier}x XP</span>
              </p>
            </div>

            <Badge variant="gold" icon={Flame}>{streak} DAY STREAK ({currentMultiplier}x MULTIPLIER)</Badge>
          </div>

          <HudGauge
            label="LEVEL ASCENSION EXP SYNCHRONIZATION"
            value={currentXp}
            max={requiredXp}
            variant="primary"
          />
        </div>
      </div>

      {/* 2. Interactive Test XP Booster Controls */}
      <HudPanel glow="purple" title="PROGRESSION ENGINE XP BOOSTER TEST BENCH" icon={Zap}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            Simulate real-life RPG progression. Adding XP automatically calculates streak multipliers and computes level overflow rollover!
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Button variant="outline" size="sm" onClick={() => handleAddXp(50)}>+50 Base XP</Button>
            <Button variant="primary" size="sm" onClick={() => handleAddXp(150)}>+150 Base XP</Button>
            <Button variant="gold" size="sm" icon={Zap} onClick={() => handleAddXp(350)}>BOOST +350 XP (TRIGGER LEVEL UP)</Button>
          </div>
        </div>
      </HudPanel>

      {/* 3. Rank Progression Tier Map */}
      <HudPanel title="SYSTEM HUNTER RANK TIER MAP" icon={Award}>
        <div className={styles.ranksGrid}>
          {RANKS.map(r => {
            const isCurrent = level >= r.minLevel && level <= r.maxLevel;
            const isUnlocked = level >= r.minLevel;

            return (
              <div
                key={r.rank}
                className={`${styles.rankCard} ${isCurrent ? styles.rankCardActive : ''}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', fontWeight: 800, color: r.color }}>
                    {r.rank}
                  </span>
                  {isUnlocked ? (
                    <CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} />
                  ) : (
                    <Lock size={16} style={{ color: 'var(--text-dim)' }} />
                  )}
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  Levels {r.minLevel} - {r.maxLevel === 999 ? '100+' : r.maxLevel}
                </div>
              </div>
            );
          })}
        </div>
      </HudPanel>

      {/* 4. Feature Unlocks Matrix */}
      <HudPanel title="SYSTEM FEATURE UNLOCKS MATRIX" icon={Layers}>
        <div className={styles.unlocksGrid}>
          {UNLOCKS.map(u => {
            const isUnlocked = level >= u.level;

            return (
              <div
                key={u.level}
                className={`${styles.unlockCard} ${!isUnlocked ? styles.unlockCardLocked : ''}`}
              >
                {isUnlocked ? (
                  <CheckCircle2 size={20} style={{ color: 'var(--primary-neon)', flexShrink: 0 }} />
                ) : (
                  <Lock size={20} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
                )}

                <div>
                  <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '12px', fontWeight: 700, color: isUnlocked ? 'var(--text-main)' : 'var(--text-dim)' }}>
                    Level {u.level}: {u.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {u.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </HudPanel>

      {/* Cinematic Level Up Modal */}
      <LevelUpModal
        isOpen={levelUpModalOpen}
        onClose={() => setLevelUpModalOpen(false)}
        newLevel={levelUpData.newLevel}
        newRank={levelUpData.newRank}
        newTitle={levelUpData.newTitle}
        unlockedFeatures={levelUpData.unlockedFeatures}
        onPlaySound={() => {}}
      />
    </motion.div>
  );
}
