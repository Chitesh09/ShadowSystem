"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import Badge from '../ui/Badge/Badge';
import Button from '../ui/Button/Button';
import HudGauge from '../ui/HudGauge/HudGauge';
import styles from './TrainingSystem.module.css';

export default function SkillsTab({ onTrainSkill }) {
  const [skills, setSkills] = useState([
    { id: 1, title: 'React & Next.js Architecture', level: 7, xp: 450, maxThreshold: 500, category: 'CODING' },
    { id: 2, title: 'Algorithmic Problem Solving', level: 5, xp: 280, maxThreshold: 400, category: 'STUDY' },
    { id: 3, title: 'Physical Endurance & Conditioning', level: 8, xp: 620, maxThreshold: 700, category: 'FITNESS' },
    { id: 4, title: 'Mindfulness & Mental Resilience', level: 6, xp: 320, maxThreshold: 450, category: 'MEDITATION' },
  ]);

  const trainSkill = (id) => {
    let gainedXp = 35;
    setSkills(prev =>
      prev.map(s => {
        if (s.id === id) {
          let nextXp = s.xp + gainedXp;
          let nextLvl = s.level;
          let nextThresh = s.maxThreshold;

          if (nextXp >= s.maxThreshold) {
            nextLvl += 1;
            nextXp -= s.maxThreshold;
            nextThresh = Math.round(nextThresh * 1.2);
          }

          return { ...s, level: nextLvl, xp: nextXp, maxThreshold: nextThresh };
        }
        return s;
      })
    );

    if (onTrainSkill) onTrainSkill(gainedXp);
  };

  return (
    <div className={styles.cardsGrid}>
      {skills.map(s => (
        <motion.div
          key={s.id}
          className={styles.routineCard}
          whileHover={{ y: -4 }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '16px', color: 'var(--text-main)' }}>
                {s.title}
              </h3>
              <Badge variant="gold">SKILL</Badge>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: '16px', fontWeight: 800, color: 'var(--accent-gold)' }}>
                LEVEL {s.level}
              </span>
              <Badge variant="muted">{s.category}</Badge>
            </div>

            <div style={{ marginTop: '12px' }}>
              <HudGauge
                label="SKILL LEVEL PROGRESSION"
                value={s.xp}
                max={s.maxThreshold}
                variant="gold"
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--primary-neon)' }}>
              +35 XP / TRAIN
            </span>

            <Button
              variant="gold"
              size="sm"
              icon={Sparkles}
              onClick={() => trainSkill(s.id)}
            >
              TRAIN SKILL
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
