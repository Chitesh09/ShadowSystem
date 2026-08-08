"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Lock, CheckCircle2, Zap, Flame, Users, Sparkles, HelpCircle } from 'lucide-react';
import HudGauge from '../ui/HudGauge/HudGauge';
import Badge from '../ui/Badge/Badge';
import Button from '../ui/Button/Button';
import styles from './ChallengeSystem.module.css';

export default function ChallengeCard({
  challenge,
  onProgress,
  onClaim
}) {
  const [revealed, setRevealed] = useState(!challenge.isHidden);

  let categoryBadgeVariant = 'cyan';
  if (challenge.type === 'SPECIAL') categoryBadgeVariant = 'purple';
  if (challenge.type === 'COMMUNITY') categoryBadgeVariant = 'cyan';
  if (challenge.type === 'HIDDEN') categoryBadgeVariant = 'gold';
  if (challenge.type === 'SEASONAL') categoryBadgeVariant = 'gold';

  const isCompleted = challenge.currentProgress >= challenge.targetProgress;

  return (
    <motion.div
      className={`${styles.challengeCard} 
        ${challenge.type === 'SPECIAL' ? styles.cardSpecial : ''} 
        ${challenge.type === 'HIDDEN' ? styles.cardHidden : ''} 
        ${isCompleted ? styles.cardCompleted : ''}`}
      whileHover={{ y: -4 }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '15px', color: 'var(--text-main)' }}>
              {challenge.isHidden && !revealed ? '??? HIDDEN SYSTEM CHALLENGE' : challenge.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {challenge.isHidden && !revealed ? 'Complete 5 Extreme Quests to reveal mystery objective.' : challenge.desc}
            </p>
          </div>

          <Badge variant={categoryBadgeVariant}>
            {challenge.type}
          </Badge>
        </div>

        {/* Progress Bar */}
        {(!challenge.isHidden || revealed) && (
          <div style={{ marginTop: '14px' }}>
            <HudGauge
              label="CHALLENGE PROGRESSION"
              value={challenge.currentProgress}
              max={challenge.targetProgress}
              variant={challenge.type === 'SPECIAL' ? 'purple' : challenge.type === 'HIDDEN' ? 'gold' : 'primary'}
            />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
        <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: '14px', fontWeight: 800, color: 'var(--primary-neon)' }}>
          +{challenge.xp} XP
        </span>

        {challenge.isHidden && !revealed ? (
          <Button variant="gold" size="sm" icon={HelpCircle} onClick={() => setRevealed(true)}>
            REVEAL CHALLENGE
          </Button>
        ) : isCompleted ? (
          <Button variant="gold" size="sm" icon={Trophy} onClick={() => onClaim(challenge)}>
            CLAIM REWARD
          </Button>
        ) : (
          <Button variant="primary" size="sm" icon={Zap} onClick={() => onProgress(challenge.id)}>
            PROGRESS (+1)
          </Button>
        )}
      </div>
    </motion.div>
  );
}
