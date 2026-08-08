"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, Maximize2, Minimize2, Sparkles, CloudRain, Trees, Orbit, Radio, Zap 
} from 'lucide-react';
import CircularTimer from './CircularTimer';
import AmbientBackground from './AmbientBackground';
import FocusHistory from './FocusHistory';
import Tabs from '../ui/Tabs/Tabs';
import Button from '../ui/Button/Button';
import Badge from '../ui/Badge/Badge';
import { useSystem } from '../../context/SystemContext';
import styles from './FocusMode.module.css';

export default function FocusView() {
  const { playerProfile, logFocusSession } = useSystem();

  // Modes: 'pomodoro' (25m), 'deepwork' (50m), 'custom' (user duration)
  const [activeMode, setActiveMode] = useState('pomodoro');
  const [customMinutes, setCustomMinutes] = useState(30);

  // Ambient Themes: 'space', 'rain', 'forest', 'noise'
  const [ambientTheme, setAmbientTheme] = useState('space');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Timer State
  const [totalSeconds, setTotalSeconds] = useState(1500); // 25 mins
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionXp, setSessionXp] = useState(0);

  const totalFocusMins = playerProfile.focusTimeToday || 0;
  const focusSessions = playerProfile.focusSessions || [];
  const totalSessions = focusSessions.length;

  // Mode Switch Handler
  useEffect(() => {
    setIsActive(false);
    setIsPaused(false);
    setSessionXp(0);

    let secs = 1500;
    if (activeMode === 'pomodoro') secs = 1500; // 25 mins
    if (activeMode === 'deepwork') secs = 3000; // 50 mins
    if (activeMode === 'custom') secs = customMinutes * 60;

    setTotalSeconds(secs);
    setSecondsLeft(secs);
  }, [activeMode, customMinutes]);

  // Timer Ticker Loop
  useEffect(() => {
    let timer = null;
    if (isActive && !isPaused && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }

          // XP Accumulation ticker every 60s
          if ((totalSeconds - prev + 1) % 60 === 0) {
            setSessionXp(xp => xp + 1);
          }

          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, isPaused, secondsLeft, totalSeconds]);

  // Session Completion Handler
  const handleSessionComplete = () => {
    setIsActive(false);
    setIsPaused(false);

    const bonusXp = activeMode === 'deepwork' ? 55 : activeMode === 'custom' ? Math.round(customMinutes * 1.1) : 30;
    const finalEarnedXp = sessionXp + bonusXp;
    const minutesDone = Math.round(totalSeconds / 60);

    logFocusSession(minutesDone, finalEarnedXp);
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setSecondsLeft(totalSeconds);
    setSessionXp(0);
  };

  const ambientThemes = [
    { id: 'space', label: 'SPACE VOID', icon: Orbit },
    { id: 'rain', label: 'CYBER RAIN', icon: CloudRain },
    { id: 'forest', label: 'NEON FOREST', icon: Trees },
    { id: 'noise', label: 'WHITE NOISE', icon: Radio },
  ];

  return (
    <motion.div
      className={`${styles.container} ${isFullscreen ? styles.fullscreenViewport : ''}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Ambient Particle Background Layer */}
      <AmbientBackground theme={ambientTheme} />

      {/* Main Focus Control Center Card */}
      <div className={styles.focusCard}>
        
        {/* Mode Selector & Fullscreen Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <Tabs
              items={[
                { id: 'pomodoro', label: 'POMODORO (25M)' },
                { id: 'deepwork', label: 'DEEP WORK (50M)' },
                { id: 'custom', label: 'CUSTOM' },
              ]}
              activeTab={activeMode}
              onChange={setActiveMode}
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={isFullscreen ? Minimize2 : Maximize2}
            onClick={() => setIsFullscreen(prev => !prev)}
          >
            {isFullscreen ? 'EXIT FULLSCREEN' : 'FULLSCREEN'}
          </Button>
        </div>

        {/* Custom Duration Slider (When Custom mode active) */}
        {activeMode === 'custom' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
              DURATION: {customMinutes} MINS
            </span>
            <input
              type="range"
              min="10"
              max="180"
              step="5"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(Number(e.target.value))}
              disabled={isActive}
              style={{ flex: 1, accentColor: 'var(--primary-neon)', cursor: 'pointer' }}
            />
          </div>
        )}

        {/* Circular Sci-Fi Timer Ring */}
        <CircularTimer
          secondsLeft={secondsLeft}
          totalSeconds={totalSeconds}
          status={isActive ? (isPaused ? 'PAUSED' : 'FOCUS ACTIVE') : 'STANDBY'}
          modeLabel={activeMode.toUpperCase()}
        />

        {/* Live Session XP Bonus Indicator */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Badge variant="cyan" icon={Zap}>
            +{sessionXp} XP ACCUMULATED
          </Badge>
          <Badge variant="purple" icon={Sparkles}>
            +{activeMode === 'deepwork' ? 55 : activeMode === 'custom' ? Math.round(customMinutes * 1.1) : 30} XP SESSION BONUS
          </Badge>
        </div>

        {/* Playback Controls */}
        <div className={styles.controlsRow}>
          {!isActive ? (
            <Button variant="primary" size="lg" icon={Play} onClick={handleStart}>
              START FOCUS
            </Button>
          ) : isPaused ? (
            <Button variant="primary" size="lg" icon={Play} onClick={handleResume}>
              RESUME FOCUS
            </Button>
          ) : (
            <Button variant="purple" size="lg" icon={Pause} onClick={handlePause}>
              PAUSE FOCUS
            </Button>
          )}

          <Button variant="outline" size="lg" icon={RotateCcw} onClick={handleReset}>
            RESET
          </Button>
        </div>

        {/* Ambient Theme Selector Pills */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            AMBIENT SOUND / VISUAL THEME
          </div>
          <div className={styles.ambientRow}>
            {ambientThemes.map(t => {
              const Icon = t.icon;
              const isActiveTheme = ambientTheme === t.id;

              return (
                <button
                  key={t.id}
                  className={`${styles.ambientPill} ${isActiveTheme ? styles.ambientPillActive : ''}`}
                  onClick={() => setAmbientTheme(t.id)}
                >
                  <Icon size={13} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Focus Statistics & Session History */}
      {!isFullscreen && (
        <FocusHistory
          history={focusSessions}
          totalMinutes={totalFocusMins}
          totalSessions={totalSessions}
        />
      )}
    </motion.div>
  );
}
