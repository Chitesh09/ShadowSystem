"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Sparkles, Shield, CheckCircle2, Zap } from 'lucide-react';
import Button from '../ui/Button/Button';
import Badge from '../ui/Badge/Badge';
import styles from './LevelUpModal.module.css';

export default function LevelUpModal({
  isOpen,
  onClose,
  newLevel,
  newRank,
  newTitle,
  unlockedFeatures = [],
  onPlaySound
}) {
  useEffect(() => {
    if (isOpen && onPlaySound) {
      onPlaySound('levelUp');
    }
  }, [isOpen, onPlaySound]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={styles.overlay}>
        {/* Screen Flash FX */}
        <div className={styles.screenFlash} />

        <motion.div
          className={styles.modalCard}
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 30 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div className={styles.bloomAura} />

          {/* Ascended Level Emblem */}
          <div className={styles.levelBadge}>
            {newLevel}
          </div>

          <div>
            <h2 className={styles.ascendTitle}>LEVEL UP!</h2>
            <p className={styles.subTitle}>SYSTEM LEVEL ASCENSION ACCOMPLISHED</p>
          </div>

          {/* Rank & Title Reveal */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Badge variant="gold" icon={Award}>{newRank}</Badge>
            <Badge variant="purple" icon={Sparkles}>{newTitle}</Badge>
          </div>

          {/* Unlocked Features List */}
          {unlockedFeatures.length > 0 && (
            <div className={styles.unlocksBox}>
              <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '11px', color: 'var(--primary-neon)', letterSpacing: '0.08em', marginBottom: '4px' }}>
                NEW SYSTEM UNLOCKS:
              </div>
              {unlockedFeatures.map((u, i) => (
                <div key={i} className={styles.unlockItem}>
                  <CheckCircle2 size={15} style={{ color: 'var(--status-success)', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{u.name}: </span>
                    <span style={{ color: 'var(--text-muted)' }}>{u.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button
            variant="gold"
            size="lg"
            icon={Zap}
            onClick={onClose}
          >
            CLAIM ASCENSION REWARDS
          </Button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
