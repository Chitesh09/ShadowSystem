"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Flame, Zap, Award, Users, Sparkles, Calendar, Shield, HelpCircle, CheckCircle2 } from 'lucide-react';
import ChallengeCard from './ChallengeCard';
import BossCompletionModal from './BossCompletionModal';
import HudPanel from '../ui/HudPanel/HudPanel';
import HudGauge from '../ui/HudGauge/HudGauge';
import Badge from '../ui/Badge/Badge';
import Button from '../ui/Button/Button';
import Tabs from '../ui/Tabs/Tabs';
import styles from './ChallengeSystem.module.css';

export default function ChallengeSystemView({ onAddXp }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [bossModalOpen, setBossModalOpen] = useState(false);
  const [completedBossChallenge, setCompletedBossChallenge] = useState(null);

  const [challenges, setChallenges] = useState([
    { id: 1, type: 'DAILY', title: '100 Pushups Conditioning Challenge', desc: 'Complete 100 total pushups within 24 hours.', currentProgress: 75, targetProgress: 100, xp: 50, isHidden: false },
    { id: 2, type: 'WEEKLY', title: '14-Day Streak Sovereign Challenge', desc: 'Maintain an active daily streak for 14 straight days.', currentProgress: 12, targetProgress: 14, xp: 150, isHidden: false },
    { id: 3, type: 'SPECIAL', title: 'RAID BOSS: Monarch Shadow Awakening', desc: 'Complete 5 Deep Work Sessions & 10 Extreme Quests.', currentProgress: 5, targetProgress: 5, xp: 300, isHidden: false },
    { id: 4, type: 'COMMUNITY', title: 'Global Operatives 100,000 Focus Hours', desc: 'Co-op community goal: 100K focus hours collective progress.', currentProgress: 78500, targetProgress: 100000, xp: 200, isHidden: false },
    { id: 5, type: 'HIDDEN', title: 'Secret Quest: Extreme Matrix Overdrive', desc: 'Complete 5 Extreme difficulty quests in a single day.', currentProgress: 3, targetProgress: 5, xp: 250, isHidden: true },
    { id: 6, type: 'SEASONAL', title: 'Season 1: Shadow Solstice Ascension', desc: 'Reach Level 15 & earn 5,000 total reclaimed XP.', currentProgress: 9, targetProgress: 15, xp: 500, isHidden: false },
  ]);

  const handleProgress = (id) => {
    setChallenges(prev =>
      prev.map(c => {
        if (c.id === id) {
          const nextProg = Math.min(c.targetProgress, c.currentProgress + 1);
          return { ...c, currentProgress: nextProg };
        }
        return c;
      })
    );
  };

  const handleClaimReward = (challenge) => {
    if (onAddXp) onAddXp(challenge.xp);

    if (challenge.type === 'SPECIAL' || challenge.xp >= 300) {
      setCompletedBossChallenge(challenge);
      setBossModalOpen(true);
    }

    setChallenges(prev => prev.filter(c => c.id !== challenge.id));
  };

  const filteredChallenges = challenges.filter(c => {
    if (activeCategory === 'ALL') return true;
    return c.type === activeCategory;
  });

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 1. Special Event Raid Boss Banner */}
      <div className={styles.bossBanner}>
        <div>
          <Badge variant="purple" icon={Flame}>ACTIVE RAID EVENT</Badge>
          <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: '22px', fontWeight: 900, color: 'var(--accent-gold)', letterSpacing: '0.12em', marginTop: '6px' }}>
            RAID BOSS: MONARCH SHADOW AWAKENING
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Co-op Raid Event | High-Yield Reward: +300 Base XP + Sovereign Aura Skin
          </p>
        </div>

        <Button
          variant="gold"
          size="lg"
          icon={Trophy}
          onClick={() => {
            const raid = challenges.find(c => c.type === 'SPECIAL');
            if (raid) handleClaimReward(raid);
          }}
        >
          CLAIM RAID REWARD (+300 XP)
        </Button>
      </div>

      {/* 2. Co-op Community Progress & Season Pass */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <HudPanel glow="cyan" title="GLOBAL COMMUNITY CO-OP GOAL" icon={Users}>
          <HudGauge
            label="GLOBAL OPERATIVES 100,000 FOCUS HOURS"
            value={78500}
            max={100000}
            variant="primary"
          />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
            Current Community Progress: 78.5% Complete (+200 XP Reward at 100%)
          </div>
        </HudPanel>

        <HudPanel glow="gold" title="SEASON 1: SHADOW SOLSTICE PASS" icon={Sparkles}>
          <HudGauge
            label="SEASONAL ASCENSION TIER (LEVEL 9 / 15)"
            value={9}
            max={15}
            variant="gold"
          />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-gold)', marginTop: '8px' }}>
            Unlock Level 15 to Claim Season 1 Sovereign Title & Aura
          </div>
        </HudPanel>
      </div>

      {/* 3. Category Filter Tabs */}
      <Tabs
        items={[
          { id: 'ALL', label: 'ALL CHALLENGES' },
          { id: 'DAILY', label: 'DAILY' },
          { id: 'WEEKLY', label: 'WEEKLY' },
          { id: 'MONTHLY', label: 'MONTHLY' },
          { id: 'SPECIAL', label: 'SPECIAL EVENTS' },
          { id: 'COMMUNITY', label: 'COMMUNITY' },
          { id: 'HIDDEN', label: 'HIDDEN' },
          { id: 'SEASONAL', label: 'SEASONAL' },
        ]}
        activeTab={activeCategory}
        onChange={setActiveCategory}
      />

      {/* 4. Challenge Cards Grid */}
      <div className={styles.challengeGrid}>
        <AnimatePresence>
          {filteredChallenges.map(c => (
            <ChallengeCard
              key={c.id}
              challenge={c}
              onProgress={handleProgress}
              onClaim={handleClaimReward}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Boss Completion Celebration Modal */}
      <BossCompletionModal
        isOpen={bossModalOpen}
        onClose={() => setBossModalOpen(false)}
        challenge={completedBossChallenge}
      />
    </motion.div>
  );
}
