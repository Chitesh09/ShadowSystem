"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Dumbbell, BookOpen, Brain, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';
import Badge from '../ui/Badge/Badge';
import { soundEngine } from '../../lib/soundEngine';
import styles from './OnboardingScreen.module.css';

export default function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(1);
  const [designation, setDesignation] = useState('');
  const [selectedClass, setSelectedClass] = useState('shadow');

  const classes = [
    { id: 'warrior', name: 'WARRIOR', icon: Dumbbell, desc: 'Specialized in Physical Conditioning & Heavy Strength.', bonus: '+5 STR, +3 VIT' },
    { id: 'scholar', name: 'SCHOLAR', icon: BookOpen, desc: 'Master of Deep Learning, Architecture & Problem Solving.', bonus: '+5 INT, +3 FOC' },
    { id: 'monk', name: 'MONK', icon: Brain, desc: 'Focused on Mental Endurance, Meditation & Vitality.', bonus: '+5 VIT, +3 DIS' },
    { id: 'shadow', name: 'SHADOW MONARCH', icon: Sparkles, desc: 'Balanced Operating System Mastery & Sovereign Power.', bonus: '+3 ALL STATS' },
  ];

  const handleNextStep = () => {
    soundEngine.playBeep(1000, 0.06);
    if (step === 2 && !designation.trim()) return;

    if (step < 4) {
      setStep(s => s + 1);
    } else {
      soundEngine.playLevelUp();
      if (onComplete) {
        onComplete({
          designation: designation || 'Shadow Operative',
          playerClass: selectedClass,
          level: 1
        });
      }
    }
  };

  return (
    <motion.div
      className={styles.onboardingContainer}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.card}>

        {/* STEP 1: INITIAL SYSTEM PROMPT */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}
          >
            <Shield size={64} style={{ color: 'var(--primary-neon)', filter: 'drop-shadow(0 0 20px var(--primary-neon))' }} />
            <div className={styles.stepBadge}>[ SYSTEM INITIALIZATION ]</div>
            <h2 className={styles.stepTitle}>NO COMPATIBLE PROFILE DETECTED</h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>
              THE SYSTEM IS READY TO SYNCHRONIZE WITH A NEW HOST. CREATE YOUR HUNTER IDENTITY TO PROCEED.
            </p>

            <Button variant="primary" size="lg" icon={ArrowRight} onClick={handleNextStep}>
              CREATE IDENTITY
            </Button>
          </motion.div>
        )}

        {/* STEP 2: HUNTER DESIGNATION */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div className={styles.stepHeader}>
              <div className={styles.stepBadge}>STEP 1 OF 3</div>
              <h2 className={styles.stepTitle}>ENTER HUNTER DESIGNATION</h2>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                This handle will identify your operative profile within the system matrix.
              </p>
            </div>

            <Input
              label="PLAYER NAME / DESIGNATION"
              placeholder="e.g. Sung Jin-Woo / Shadow Monarch"
              icon={User}
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />

            <Button variant="primary" size="lg" icon={ArrowRight} onClick={handleNextStep} disabled={!designation.trim()}>
              CONFIRM DESIGNATION
            </Button>
          </motion.div>
        )}

        {/* STEP 3: CLASS SELECTION */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div className={styles.stepHeader}>
              <div className={styles.stepBadge}>STEP 2 OF 3</div>
              <h2 className={styles.stepTitle}>CHOOSE YOUR HUNTER CLASS</h2>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                Your class dictates initial stat point multipliers and daily quest allocations.
              </p>
            </div>

            <div className={styles.classGrid}>
              {classes.map(c => {
                const Icon = c.icon;
                const isActive = selectedClass === c.id;

                return (
                  <div
                    key={c.id}
                    className={`${styles.classCard} ${isActive ? styles.classCardActive : ''}`}
                    onClick={() => {
                      soundEngine.playBeep(800, 0.05);
                      setSelectedClass(c.id);
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Icon size={18} style={{ color: isActive ? 'var(--primary-neon)' : 'var(--text-main)' }} />
                        <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>
                          {c.name}
                        </span>
                      </div>
                      {isActive && <CheckCircle2 size={16} style={{ color: 'var(--primary-neon)' }} />}
                    </div>

                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: 'var(--text-muted)' }}>
                      {c.desc}
                    </p>

                    <Badge variant={isActive ? 'cyan' : 'muted'}>{c.bonus}</Badge>
                  </div>
                );
              })}
            </div>

            <Button variant="primary" size="lg" icon={ArrowRight} onClick={handleNextStep}>
              LOCK IN CLASS SELECTION
            </Button>
          </motion.div>
        )}

        {/* STEP 4: SYSTEM LINK ESTABLISHED */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}
          >
            <CheckCircle2 size={64} style={{ color: 'var(--status-success)', filter: 'drop-shadow(0 0 20px rgba(0, 230, 118, 0.5))' }} />
            <div className={styles.stepBadge}>[ SYNCHRONIZATION COMPLETE ]</div>
            <h2 className={styles.stepTitle} style={{ color: 'var(--status-success)' }}>
              SYSTEM LINK ESTABLISHED
            </h2>

            <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '32px', fontWeight: 900, color: 'var(--primary-neon)' }}>
              LEVEL 1 OPERATIVE
            </div>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>
              WELCOME TO THE SHADOW SYSTEM. YOUR EVOLUTION BEGINS NOW.
            </p>

            <Button variant="gold" size="lg" icon={Sparkles} onClick={handleNextStep}>
              BEGIN YOUR JOURNEY
            </Button>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
