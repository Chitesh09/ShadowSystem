"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FastForward, RotateCcw } from 'lucide-react';
import Button from '../ui/Button/Button';
import styles from './CinematicStartup.module.css';

export default function CinematicStartup({ onComplete }) {
  // Scene 1: Initial Grid & Particles (0s - 1.5s)
  // Scene 2: Messages & Percentage Ticker (1.5s - 3.5s)
  // Scene 3: Energy Gathering & Portal Opening (3.5s - 4.5s)
  // Scene 4: Logo Reveal, WELCOME & ARISE (4.5s - 6s)
  const [scene, setScene] = useState(1);
  const [msgIndex, setMsgIndex] = useState(0);
  const [syncPercent, setSyncPercent] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showArise, setShowArise] = useState(false);

  const particles = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  const systemMessages = [
    'SYSTEM INITIALIZING...',
    'SEARCHING FOR HOST...',
    'LIFE SIGNATURE DETECTED',
    'VERIFYING COMPATIBILITY...',
    'SYSTEM SYNCHRONIZATION'
  ];

  const percentSteps = [12, 34, 57, 81, 100];

  useEffect(() => {
    // Timeline Sequence Execution
    const t1 = setTimeout(() => setScene(2), 1500);

    const t2 = setTimeout(() => setScene(3), 3500);

    const t3 = setTimeout(() => setScene(4), 4500);

    const t4 = setTimeout(() => setShowWelcome(true), 4800);

    const t5 = setTimeout(() => setShowArise(true), 5300);

    const t6 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 6200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  // Message & Percent Ticker Interval in Scene 2
  useEffect(() => {
    if (scene === 2) {
      const msgTimer = setInterval(() => {
        setMsgIndex(prev => {
          if (prev < systemMessages.length - 1) {
            setSyncPercent(percentSteps[prev + 1]);
            return prev + 1;
          }
          return prev;
        });
      }, 400);
      return () => clearInterval(msgTimer);
    }
  }, [scene]);

  const handleSkip = () => {
    if (onComplete) onComplete();
  };

  return (
    <motion.div
      className={styles.startupContainer}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Holographic Grid */}
      <div className={`${styles.gridLayer} ${scene >= 1 ? styles.gridLayerActive : ''}`} />

      {/* Cyber Scanline Line */}
      <div className={styles.scanLine} />

      {/* Particle Canvas Layer */}
      <div className={styles.particleCanvas}>
        {particles.map(p => (
          <div
            key={p.id}
            className={styles.particle}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      {/* Scene 3: Portal Explosion Ring */}
      {scene === 3 && (
        <motion.div
          className={styles.portalRing}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          exit={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      )}

      {/* Scene 2: System Initialization Text & Ticker */}
      {scene === 2 && (
        <motion.div
          className={styles.terminalBox}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
        >
          <Shield size={48} style={{ color: 'var(--primary-neon)', filter: 'drop-shadow(0 0 10px var(--primary-neon))' }} />
          <div className={styles.msgText}>
            {systemMessages[msgIndex]}
          </div>
          <div className={styles.syncPercent}>
            {syncPercent}%
          </div>
        </motion.div>
      )}

      {/* Scene 4: Logo Reveal, WELCOME & ARISE */}
      {scene === 4 && (
        <motion.div
          className={styles.logoBox}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.logoTitle}>
            SHADOW SYSTEM
          </div>

          <AnimatePresence>
            {showWelcome && (
              <motion.div
                className={styles.welcomeText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                WELCOME
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showArise && (
              <motion.div
                className={styles.ariseText}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                ARISE.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Skip Button Control */}
      <div className={styles.controlsDock}>
        <Button variant="outline" size="sm" icon={FastForward} onClick={handleSkip}>
          SKIP INTRO
        </Button>
      </div>
    </motion.div>
  );
}
