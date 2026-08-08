"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, KeyRound, LayoutDashboard, CheckSquare, Zap, Target, Dumbbell, User, BarChart3, Cpu, Trophy, LogOut } from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import Button from '../components/ui/Button/Button';
import Badge from '../components/ui/Badge/Badge';
import HudSkeleton from '../components/ui/HudSkeleton/HudSkeleton';
import ErrorBoundary from '../components/ui/ErrorBoundary/ErrorBoundary';
import MobileNav from '../components/layout/MobileNav';
import { soundEngine } from '../lib/soundEngine';

// Dynamic Code-Split Imports
const CinematicStartup = dynamic(() => import('../components/startup/CinematicStartup'), { ssr: false });
const AuthScreen = dynamic(() => import('../components/auth/AuthScreen'), { loading: () => <HudSkeleton /> });
const OnboardingScreen = dynamic(() => import('../components/onboarding/OnboardingScreen'), { loading: () => <HudSkeleton /> });
const DashboardView = dynamic(() => import('../components/dashboard/DashboardView'), { loading: () => <HudSkeleton /> });
const QuestSystemView = dynamic(() => import('../components/quests/QuestSystemView'), { loading: () => <HudSkeleton /> });
const ProgressionView = dynamic(() => import('../components/progression/ProgressionView'), { loading: () => <HudSkeleton /> });
const FocusView = dynamic(() => import('../components/focus/FocusView'), { loading: () => <HudSkeleton /> });
const TrainingView = dynamic(() => import('../components/training/TrainingView'), { loading: () => <HudSkeleton /> });
const ProfileView = dynamic(() => import('../components/profile/ProfileView'), { loading: () => <HudSkeleton /> });
const AnalyticsView = dynamic(() => import('../components/analytics/AnalyticsView'), { loading: () => <HudSkeleton /> });
const SystemAiView = dynamic(() => import('../components/system-ai/SystemAiView'), { loading: () => <HudSkeleton /> });
const ChallengeSystemView = dynamic(() => import('../components/challenges/ChallengeSystemView'), { loading: () => <HudSkeleton /> });

export default function Home() {
  const { loadProfile, createProfile, playerProfile } = useSystem();

  // Application Lifecycle States: 'SPLASH' | 'AUTH' | 'ONBOARDING' | 'APP'
  const [appStage, setAppStage] = useState('SPLASH');
  const [activeView, setActiveView] = useState('dashboard');
  const [pendingUserId, setPendingUserId] = useState('');

  // Splash Screen once-per-session check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasPlayedSplash = sessionStorage.getItem('shadow_splash_played');
      if (hasPlayedSplash === 'true') {
        setAppStage('AUTH');
      }
    }
  }, []);

  const handleSplashComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('shadow_splash_played', 'true');
    }
    setAppStage('AUTH');
  };

  const handleAuthSuccess = async (userData, isNewAccountTab) => {
    const targetUserId = userData.email || userData.designation || 'shadow_hunter';
    setPendingUserId(targetUserId);

    if (isNewAccountTab) {
      setAppStage('ONBOARDING');
      return;
    }

    // Check if profile document exists
    const res = await loadProfile(targetUserId);
    if (res.exists) {
      setAppStage('APP');
      setActiveView('dashboard');
    } else {
      // Profile does not exist -> Redirect to onboarding
      setAppStage('ONBOARDING');
    }
  };

  const handleOnboardingComplete = async (onboardingData) => {
    const targetUserId = pendingUserId || onboardingData.designation || 'shadow_hunter';
    await createProfile(targetUserId, {
      designation: onboardingData.designation,
      playerClass: onboardingData.playerClass,
      level: 1,
      xp: 0,
      currentXP: 0,
      rank: 'F',
      streak: 0,
      disciplineScore: 0,
      strength: 0,
      intelligence: 0,
      focus: 0,
      perception: 0,
      vitality: 0,
      completedTasks: 0,
      achievements: [],
      titles: ['Shadow Initiate'],
      trainingLogs: [],
      focusSessions: [],
      quests: [],
    });

    setAppStage('APP');
    setActiveView('dashboard');
  };

  const handleNavClick = (viewName) => {
    soundEngine.playBeep(900, 0.05);
    setActiveView(viewName);
  };

  const handleLogout = () => {
    soundEngine.playBeep(600, 0.08);
    setAppStage('AUTH');
  };

  return (
    <ErrorBoundary>
      {/* 1. CINEMATIC SPLASH INTRO STAGE */}
      <AnimatePresence>
        {appStage === 'SPLASH' && (
          <CinematicStartup onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      {/* 2. AUTHENTICATION GATE STAGE */}
      {appStage === 'AUTH' && (
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      )}

      {/* 3. FIRST TIME USER ONBOARDING STAGE */}
      {appStage === 'ONBOARDING' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}

      {/* 4. MAIN OPERATING SYSTEM APP (Mounted ONLY AFTER Auth & Onboarding) */}
      {appStage === 'APP' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '100%' }}>
          
          {/* Mobile Top Header & Drawer Navigation (< 768px) */}
          <MobileNav
            activeView={activeView}
            onSelectView={handleNavClick}
            playerProfile={playerProfile}
            onReplayIntro={() => setAppStage('SPLASH')}
            onLogout={handleLogout}
          />

          {/* Desktop Navigation Bar (>= 768px) */}
          <nav
            aria-label="Desktop System Navigation"
            className="desktopNav"
            style={{
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              padding: '12px 18px',
              background: 'rgba(13, 24, 38, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                fontFamily: 'var(--font-orbitron)',
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: 'var(--primary-neon)',
                textShadow: '0 0 10px var(--primary-neon-glow)'
              }}>
                SHADOW SYSTEM OS
              </span>
              <Badge variant="cyan">{playerProfile.designation || 'OPERATIVE'}</Badge>
              <Badge variant="gold">LVL {playerProfile.level || 1}</Badge>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Button
                variant={activeView === 'dashboard' ? 'primary' : 'outline'}
                size="sm"
                icon={LayoutDashboard}
                onClick={() => handleNavClick('dashboard')}
              >
                HEADQUARTERS
              </Button>

              <Button
                variant={activeView === 'quests' ? 'primary' : 'outline'}
                size="sm"
                icon={CheckSquare}
                onClick={() => handleNavClick('quests')}
              >
                QUEST MATRIX
              </Button>

              <Button
                variant={activeView === 'challenges' ? 'gold' : 'outline'}
                size="sm"
                icon={Trophy}
                onClick={() => handleNavClick('challenges')}
              >
                CHALLENGES
              </Button>

              <Button
                variant={activeView === 'training' ? 'primary' : 'outline'}
                size="sm"
                icon={Dumbbell}
                onClick={() => handleNavClick('training')}
              >
                TRAINING
              </Button>

              <Button
                variant={activeView === 'focus' ? 'purple' : 'outline'}
                size="sm"
                icon={Target}
                onClick={() => handleNavClick('focus')}
              >
                FOCUS MODE
              </Button>

              <Button
                variant={activeView === 'progression' ? 'gold' : 'outline'}
                size="sm"
                icon={Zap}
                onClick={() => handleNavClick('progression')}
              >
                PROGRESSION
              </Button>

              <Button
                variant={activeView === 'profile' ? 'gold' : 'outline'}
                size="sm"
                icon={User}
                onClick={() => handleNavClick('profile')}
              >
                PROFILE
              </Button>

              <Button
                variant={activeView === 'analytics' ? 'primary' : 'outline'}
                size="sm"
                icon={BarChart3}
                onClick={() => handleNavClick('analytics')}
              >
                ANALYTICS
              </Button>

              <Button
                variant={activeView === 'system_ai' ? 'primary' : 'outline'}
                size="sm"
                icon={Cpu}
                onClick={() => handleNavClick('system_ai')}
              >
                THE SYSTEM
              </Button>

              <Button
                variant="outline"
                size="sm"
                icon={Play}
                onClick={() => setAppStage('SPLASH')}
              >
                REPLAY INTRO
              </Button>

              <Button
                variant="outline"
                size="sm"
                icon={LogOut}
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </div>
          </nav>

          <style jsx>{`
            @media (max-width: 767px) {
              .desktopNav {
                display: none !important;
              }
            }
          `}</style>

          {/* Holographic Viewport Router */}
          <AnimatePresence mode="wait">
            {activeView === 'dashboard' && (
              <motion.div
                key="dashboard-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <DashboardView />
              </motion.div>
            )}

            {activeView === 'quests' && (
              <motion.div
                key="quests-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <QuestSystemView />
              </motion.div>
            )}

            {activeView === 'challenges' && (
              <motion.div
                key="challenges-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <ChallengeSystemView />
              </motion.div>
            )}

            {activeView === 'training' && (
              <motion.div
                key="training-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <TrainingView />
              </motion.div>
            )}

            {activeView === 'focus' && (
              <motion.div
                key="focus-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <FocusView />
              </motion.div>
            )}

            {activeView === 'progression' && (
              <motion.div
                key="progression-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <ProgressionView />
              </motion.div>
            )}

            {activeView === 'profile' && (
              <motion.div
                key="profile-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <ProfileView />
              </motion.div>
            )}

            {activeView === 'analytics' && (
              <motion.div
                key="analytics-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <AnalyticsView />
              </motion.div>
            )}

            {activeView === 'system_ai' && (
              <motion.div
                key="system_ai-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <SystemAiView />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </ErrorBoundary>
  );
}
