"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dumbbell, BookOpen, Sparkles, Award, TrendingUp, Clock, Zap, Plus, Flame, Shield, Activity 
} from 'lucide-react';
import Tabs from '../ui/Tabs/Tabs';
import Badge from '../ui/Badge/Badge';
import Button from '../ui/Button/Button';
import Input from '../ui/Input/Input';
import HudPanel from '../ui/HudPanel/HudPanel';
import HudDialog from '../ui/HudDialog/HudDialog';
import WorkoutTab from './WorkoutTab';
import StudyTab from './StudyTab';
import SkillsTab from './SkillsTab';
import styles from './TrainingSystem.module.css';

export default function TrainingView({ onAddXp }) {
  const [activeTab, setActiveTab] = useState('workout'); // 'workout' | 'study' | 'skills'

  // Stat Growth Summary
  const [stats, setStats] = useState({
    strength: { val: 16, gain: '+4 THIS WEEK' },
    intelligence: { val: 18, gain: '+6 THIS WEEK' },
    agility: { val: 14, gain: '+3 THIS WEEK' },
    vitality: { val: 15, gain: '+5 THIS WEEK' },
    perception: { val: 12, gain: '+4 THIS WEEK' },
  });

  // Personal Records (PR)
  const prs = [
    { title: 'PR: 100 Pushups Set' },
    { title: 'PR: 3 Hrs Deep Coding' },
    { title: 'PR: 5KM Sprint (22m)' },
    { title: 'PR: 15 Hard LeetCode' },
  ];

  // Weekly Graph Hours (Mon - Sun)
  const weeklyData = [
    { day: 'MON', hours: 2.5 },
    { day: 'TUE', hours: 3.8 },
    { day: 'WED', hours: 1.5 },
    { day: 'THU', hours: 4.2 },
    { day: 'FRI', hours: 3.0 },
    { day: 'SAT', hours: 5.5 },
    { day: 'SUN', hours: 4.0 },
  ];

  // Activity History Log
  const [historyLogs, setHistoryLogs] = useState([
    { id: 1, time: '10:30 AM', title: 'Completed Full Body Conditioning Workout', duration: '45 Mins', xp: 45 },
    { id: 2, time: '08:15 AM', title: 'Logged Algorithms & Data Structures Study', duration: '60 Mins', xp: 60 },
  ]);

  // Log Custom Activity Modal
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDuration, setCustomDuration] = useState(30);
  const [customIntensity, setCustomIntensity] = useState('MEDIUM');

  const handleXpGained = (earnedXp) => {
    if (onAddXp) onAddXp(earnedXp);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setHistoryLogs(prev => [
      { id: Date.now(), time: timeStr, title: `Completed Training Session (+${earnedXp} XP)`, duration: 'Session', xp: earnedXp },
      ...prev
    ]);
  };

  const handleCustomLogSubmit = (e) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    let xpGain = Math.round(customDuration * 1.1);
    handleXpGained(xpGain);

    setCustomTitle('');
    setLogModalOpen(false);
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 1. Header & Stat Growth Summary */}
      <div className={styles.statGrowthGrid}>
        <div className={styles.statCard}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>STRENGTH (STR)</div>
          <div className={styles.statVal}>
            <span>{stats.strength.val}</span>
            <span className={styles.statGain}>{stats.strength.gain}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>INTELLIGENCE (INT)</div>
          <div className={styles.statVal}>
            <span>{stats.intelligence.val}</span>
            <span className={styles.statGain}>{stats.intelligence.gain}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>AGILITY (AGI)</div>
          <div className={styles.statVal}>
            <span>{stats.agility.val}</span>
            <span className={styles.statGain}>{stats.agility.gain}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>VITALITY (VIT)</div>
          <div className={styles.statVal}>
            <span>{stats.vitality.val}</span>
            <span className={styles.statGain}>{stats.vitality.gain}</span>
          </div>
        </div>
      </div>

      {/* 2. Personal Records (PR) Badges Row */}
      <div className={styles.weeklyGraphBox}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', color: 'var(--accent-gold)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={16} />
            <span>PERSONAL RECORDS (PR) & ACHIEVEMENTS</span>
          </div>

          <Button variant="outline" size="sm" icon={Plus} onClick={() => setLogModalOpen(true)}>
            LOG CUSTOM TRAINING
          </Button>
        </div>

        <div className={styles.prGrid}>
          {prs.map((p, i) => (
            <div key={i} className={styles.prBadge}>
              <Award size={14} />
              <span>{p.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Interactive Weekly Training Graph */}
      <div className={styles.weeklyGraphBox}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', color: 'var(--primary-neon)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={16} />
            <span>WEEKLY TRAINING HOURS (MON - SUN)</span>
          </div>
          <Badge variant="cyan">+14.5% VS LAST WEEK</Badge>
        </div>

        <div className={styles.graphBarRow}>
          {weeklyData.map(d => {
            const heightPercent = Math.min(100, (d.hours / 6) * 100);

            return (
              <div key={d.day} className={styles.graphCol}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--primary-neon)', fontWeight: 700 }}>
                  {d.hours}h
                </div>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ height: `${heightPercent}%` }} />
                </div>
                <div className={styles.dayLabel}>{d.day}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Training Tabs Navigation (WORKOUT, STUDY, SKILLS) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Tabs
          items={[
            { id: 'workout', label: 'WORKOUT ROUTINES', icon: Dumbbell },
            { id: 'study', label: 'STUDY SESSIONS', icon: BookOpen },
            { id: 'skills', label: 'SKILL TREE PROGRESSION', icon: Sparkles },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === 'workout' && <WorkoutTab onLogWorkout={(r) => handleXpGained(r.xp)} />}
        {activeTab === 'study' && <StudyTab onLogStudy={(s) => handleXpGained(s.xp)} />}
        {activeTab === 'skills' && <SkillsTab onTrainSkill={(xp) => handleXpGained(xp)} />}
      </div>

      {/* 5. Training History Log */}
      <HudPanel title="TRAINING HISTORY & RECENT LOGS" icon={Clock}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {historyLogs.map(h => (
            <div
              key={h.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                padding: '12px 16px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={14} style={{ color: 'var(--text-dim)' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                    {h.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                    {h.time} | Duration: {h.duration}
                  </div>
                </div>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--status-success)' }}>
                +{h.xp} XP
              </div>
            </div>
          ))}
        </div>
      </HudPanel>

      {/* Log Custom Activity Modal */}
      <HudDialog
        isOpen={logModalOpen}
        onClose={() => setLogModalOpen(false)}
        title="LOG CUSTOM TRAINING SESSION"
      >
        <form onSubmit={handleCustomLogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="SESSION TITLE"
            placeholder="e.g. 10KM Outdoor Cycling Workout"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="DURATION (MINS)"
              type="number"
              value={customDuration}
              onChange={(e) => setCustomDuration(Number(e.target.value))}
              required
            />

            <div>
              <label style={{ fontFamily: 'var(--font-orbitron)', fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                INTENSITY
              </label>
              <select
                value={customIntensity}
                onChange={(e) => setCustomIntensity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="EXTREME">EXTREME</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="outline" size="sm" type="button" onClick={() => setLogModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit" icon={Zap}>
              LOG SESSION (+{Math.round(customDuration * 1.1)} XP)
            </Button>
          </div>
        </form>
      </HudDialog>
    </motion.div>
  );
}
