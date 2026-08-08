"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lock, CheckCircle2, Shield, Eye } from 'lucide-react';
import Badge from '../ui/Badge/Badge';
import styles from './ProfileSystem.module.css';

export default function CosmeticCustomizer({
  activeAura = 'cyan',
  onAuraChange,
  activeBackground = 'grid',
  onBackgroundChange,
  activeStage = 2,
  onStageChange,
  playerLevel = 9
}) {
  const auras = [
    { id: 'cyan', name: 'Neon Cyan Energy', minLevel: 1, color: '#00C8FF' },
    { id: 'purple', name: 'Shadow Purple Aura', minLevel: 5, color: '#7B27FF' },
    { id: 'gold', name: 'Golden Monarch Aura', minLevel: 10, color: '#FFD700' },
    { id: 'crimson', name: 'Crimson Fire Aura', minLevel: 15, color: '#FF1744' },
  ];

  const backgrounds = [
    { id: 'grid', name: 'Void Cyber Grid', desc: 'Classic holographic grid matrix' },
    { id: 'city', name: 'Cyberpunk Metropolis', desc: 'Neon city skyline backdrop' },
    { id: 'nebula', name: 'Cosmic Nebula Void', desc: 'Drifting interstellar starfield' },
    { id: 'shadow', name: 'Shadow Realm Core', desc: 'Monarch shadow portal backdrop' },
  ];

  const stages = [
    { stage: 1, name: 'Stage 1: Initiate', minLevel: 1, title: 'Shadow Trainee' },
    { stage: 2, name: 'Stage 2: Operative', minLevel: 5, title: 'System Specialist' },
    { stage: 3, name: 'Stage 3: Sovereign', minLevel: 15, title: 'Focus Virtuoso' },
    { stage: 4, name: 'Stage 4: Monarch', minLevel: 30, title: 'Monarch of Shadows' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Aura Customizer */}
      <div>
        <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', color: 'var(--primary-neon)', letterSpacing: '0.1em', marginBottom: '12px' }}>
          CUSTOMIZE AURA ENERGY FLARES
        </div>
        <div className={styles.cosmeticsGrid}>
          {auras.map(a => {
            const isUnlocked = playerLevel >= a.minLevel;
            const isActive = activeAura === a.id;

            return (
              <div
                key={a.id}
                className={`${styles.cosmeticCard} ${isActive ? styles.cosmeticCardActive : ''} ${!isUnlocked ? styles.cosmeticCardLocked : ''}`}
                onClick={() => isUnlocked && onAuraChange(a.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: a.color, boxShadow: `0 0 10px ${a.color}` }} />
                    <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: '12px', fontWeight: 700, color: 'var(--text-main)' }}>
                      {a.name}
                    </span>
                  </div>

                  {isUnlocked ? (
                    isActive && <CheckCircle2 size={16} style={{ color: 'var(--primary-neon)' }} />
                  ) : (
                    <Lock size={14} style={{ color: 'var(--text-dim)' }} />
                  )}
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {isUnlocked ? 'UNLOCKED & READY' : `Unlocks at Level ${a.minLevel}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Character Evolution Stages */}
      <div>
        <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', color: 'var(--accent-gold)', letterSpacing: '0.1em', marginBottom: '12px' }}>
          CHARACTER EVOLUTION STAGES
        </div>
        <div className={styles.cosmeticsGrid}>
          {stages.map(s => {
            const isUnlocked = playerLevel >= s.minLevel;
            const isActive = activeStage === s.stage;

            return (
              <div
                key={s.stage}
                className={`${styles.cosmeticCard} ${isActive ? styles.cosmeticCardActive : ''} ${!isUnlocked ? styles.cosmeticCardLocked : ''}`}
                onClick={() => isUnlocked && onStageChange(s.stage)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: '12px', fontWeight: 700, color: 'var(--accent-gold)' }}>
                    {s.name}
                  </span>
                  {isUnlocked ? (
                    isActive && <CheckCircle2 size={16} style={{ color: 'var(--accent-gold)' }} />
                  ) : (
                    <Lock size={14} style={{ color: 'var(--text-dim)' }} />
                  )}
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  Title: {s.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
