"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, Shield, Trophy, User } from 'lucide-react';
import AttributePointSystem from './AttributePointSystem';
import CosmeticCustomizer from './CosmeticCustomizer';
import HudPanel from '../ui/HudPanel/HudPanel';
import HudGauge from '../ui/HudGauge/HudGauge';
import Badge from '../ui/Badge/Badge';
import { useSystem } from '../../context/SystemContext';
import { getRankForLevel, getTitleForLevel, getRequiredXp } from '../../lib/progressionEngine';
import styles from './ProfileSystem.module.css';

export default function ProfileView() {
  const { playerProfile } = useSystem();

  const level = playerProfile.level || 1;
  const xp = playerProfile.currentXP || 0;
  const designation = playerProfile.designation || 'Shadow Operative';

  const [activeAura, setActiveAura] = useState('cyan');
  const [activeStage, setActiveStage] = useState(1);

  const currentRank = getRankForLevel(level);
  const currentTitleObj = getTitleForLevel(level);
  const requiredXp = getRequiredXp(level);

  const achievements = playerProfile.achievements || [];

  // Aura Class Resolver
  let auraClass = styles.auraCyan;
  if (activeAura === 'purple') auraClass = styles.auraPurple;
  if (activeAura === 'gold') auraClass = styles.auraGold;
  if (activeAura === 'crimson') auraClass = styles.auraCrimson;

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 1. Hero Character Stage Card */}
      <div className={styles.heroCard}>
        {/* Avatar Frame with Customizable Aura */}
        <div className={styles.avatarContainer}>
          <div className={auraClass} />
          <div className={styles.avatarGraphic}>
            <Shield size={64} style={{ color: 'rgba(0, 200, 255, 0.4)' }} />
            <div className={styles.eyesGlow}>
              <div className={styles.eyeDot} />
              <div className={styles.eyeDot} />
            </div>
            <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: '11px', fontWeight: 800, color: 'var(--primary-neon)', marginTop: '8px' }}>
              STAGE {activeStage}
            </span>
          </div>
        </div>

        {/* Character Information & Rank Gauge */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: '22px', fontWeight: 900, color: 'var(--text-main)' }}>
                  {designation}
                </h2>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Badge variant="gold" icon={Award}>{playerProfile.rank || currentRank.rank}</Badge>
                  <Badge variant="purple" icon={Sparkles}>{currentTitleObj.title}</Badge>
                </div>
              </div>

              <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '24px', fontWeight: 900, color: 'var(--primary-neon)' }}>
                LEVEL {level}
              </div>
            </div>
          </div>

          <HudGauge
            label="RANK ELEVATION EXP PROGRESS"
            value={xp}
            max={requiredXp}
            variant="primary"
          />
        </div>
      </div>

      {/* 2. Attribute Point Allocation System */}
      <HudPanel glow="primary" title="CHARACTER STAT ATTRIBUTES (STR, INT, FOC, VIT, DIS)" icon={User}>
        <AttributePointSystem availablePoints={playerProfile.level > 1 ? playerProfile.level * 2 : 0} />
      </HudPanel>

      {/* 3. Unlockable Cosmetics & Evolution Customizer */}
      <HudPanel glow="purple" title="COSMETICS, AURAS & EVOLUTION CUSTOMIZER" icon={Sparkles}>
        <CosmeticCustomizer
          activeAura={activeAura}
          onAuraChange={setActiveAura}
          activeStage={activeStage}
          onStageChange={setActiveStage}
          playerLevel={level}
        />
      </HudPanel>

      {/* 4. Achievements Grid Widget */}
      <HudPanel title="SYSTEM ACHIEVEMENTS & TROPHIES" icon={Trophy}>
        <div className={styles.achievementsGrid}>
          {achievements.length === 0 ? (
            <div style={{
              width: '100%',
              padding: '30px 20px',
              textAlign: 'center',
              background: 'var(--bg-secondary)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)'
            }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>
                No achievements unlocked. Complete daily quests & leveling milestones to earn trophies.
              </p>
            </div>
          ) : (
            achievements.map(ach => (
              <div
                key={ach.id}
                className={styles.achievementCard}
                style={{ opacity: ach.unlocked ? 1 : 0.5 }}
              >
                <Trophy size={24} style={{ color: ach.unlocked ? 'var(--accent-gold)' : 'var(--text-dim)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '12px', fontWeight: 700, color: ach.unlocked ? 'var(--accent-gold)' : 'var(--text-dim)' }}>
                    {ach.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {ach.desc}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </HudPanel>
    </motion.div>
  );
}
