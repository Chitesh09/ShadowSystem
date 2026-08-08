"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Sparkles, CheckCircle2, Zap, Flame, ShieldAlert } from 'lucide-react';
import Button from '../ui/Button/Button';
import Badge from '../ui/Badge/Badge';
import styles from './ChallengeSystem.module.css';

export default function BossCompletionModal({
  isOpen,
  onClose,
  challenge
}) {
  if (!isOpen || !challenge) return null;

  return (
    <AnimatePresence>
      <div className={styles.bossOverlay}>
        <motion.div
          className={styles.bossModal}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {/* Glowing Boss Emblem */}
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'rgba(212, 175, 55, 0.15)',
            border: '3px solid var(--accent-gold)',
            boxShadow: '0 0 40px var(--accent-gold-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-gold)'
          }}>
            <Trophy size={48} />
          </div>

          <div>
            <Badge variant="purple" icon={Flame}>RAID EVENT CLEARED</Badge>
            <h2 style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '24px',
              fontWeight: 900,
              color: 'var(--accent-gold)',
              letterSpacing: '0.15em',
              marginTop: '10px',
              textShadow: '0 0 15px var(--accent-gold-glow)',
              textTransform: 'uppercase'
            }}>
              BOSS SLAIN / CHALLENGE CLEARED!
            </h2>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 600,
              fontSize: '15px',
              color: 'var(--text-main)',
              marginTop: '6px'
            }}>
              {challenge.title}
            </p>
          </div>

          <div style={{
            padding: '12px 28px',
            background: 'rgba(0, 200, 255, 0.15)',
            border: '1px solid var(--primary-neon)',
            borderRadius: '20px',
            fontFamily: 'var(--font-orbitron)',
            fontSize: '18px',
            fontWeight: 900,
            color: 'var(--primary-neon)',
            boxShadow: '0 0 20px var(--primary-neon-glow)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Zap size={20} />
            <span>+{challenge.xp} XP RECLAIMED</span>
          </div>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-muted)'
          }}>
            SYSTEM RAID REWARD DISPATCHED TO OPERATIVE HEADQUARTERS.
          </p>

          <Button variant="gold" size="lg" icon={CheckCircle2} onClick={onClose}>
            CLAIM RAID REWARDS
          </Button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
