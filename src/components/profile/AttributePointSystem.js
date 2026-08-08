"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Brain, Target, Heart, Shield, Plus, Award } from 'lucide-react';
import HudGauge from '../ui/HudGauge/HudGauge';
import Badge from '../ui/Badge/Badge';
import Button from '../ui/Button/Button';
import { useSystem } from '../../context/SystemContext';
import styles from './ProfileSystem.module.css';

export default function AttributePointSystem() {
  const { playerProfile, updatePlayerProfile } = useSystem();

  const stats = {
    strength: playerProfile.strength || 0,
    intelligence: playerProfile.intelligence || 0,
    focus: playerProfile.focus || 0,
    vitality: playerProfile.vitality || 0,
    discipline: playerProfile.disciplineScore || 0,
  };

  const level = playerProfile.level || 1;
  const totalAllocated = stats.strength + stats.intelligence + stats.focus + stats.vitality + stats.discipline;
  const maxAvailablePoints = Math.max(0, level * 5 - totalAllocated);

  const allocatePoint = (statKey) => {
    if (maxAvailablePoints <= 0) return;
    const currentVal = playerProfile[statKey] || 0;
    updatePlayerProfile({
      [statKey]: currentVal + 1
    });
  };

  const attributesList = [
    { key: 'strength', name: 'STRENGTH (STR)', val: stats.strength, icon: Dumbbell, desc: 'Increases workout power & physical capacity' },
    { key: 'intelligence', name: 'INTELLIGENCE (INT)', val: stats.intelligence, icon: Brain, desc: 'Increases study efficiency & problem-solving' },
    { key: 'focus', name: 'FOCUS (FOC)', val: stats.focus, icon: Target, desc: 'Increases focus session duration & XP bonus' },
    { key: 'vitality', name: 'VITALITY (VIT)', val: stats.vitality, icon: Heart, desc: 'Boosts energy recovery & daily stamina' },
    { key: 'disciplineScore', name: 'DISCIPLINE (DIS)', val: stats.discipline, icon: Shield, desc: 'Enhances daily mission streak multipliers' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '14px', fontWeight: 700, color: 'var(--primary-neon)', letterSpacing: '0.1em' }}>
          ATTRIBUTE POINT DISTRIBUTION
        </div>

        <Badge variant={maxAvailablePoints > 0 ? 'gold' : 'muted'} icon={Award}>
          {maxAvailablePoints} UNALLOCATED STAT POINTS
        </Badge>
      </div>

      <div className={styles.statsList}>
        {attributesList.map(attr => {
          const Icon = attr.icon;

          return (
            <motion.div
              key={attr.key}
              className={styles.statRow}
              whileHover={{ x: 4 }}
            >
              <div className={styles.statInfo}>
                <Icon size={18} style={{ color: 'var(--primary-neon)' }} />
                <div>
                  <div className={styles.statName}>{attr.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>{attr.desc}</div>
                </div>
              </div>

              <div style={{ flex: 1, maxWidth: '240px' }}>
                <HudGauge value={attr.val} max={50} variant="primary" showValues={false} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className={styles.statValue}>{attr.val}</span>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={maxAvailablePoints <= 0}
                  icon={Plus}
                  onClick={() => allocatePoint(attr.key)}
                >
                  UPGRADE
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
