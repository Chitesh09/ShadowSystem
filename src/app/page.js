"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '../context/SystemContext';
import AppLayout from '../components/layout/AppLayout';
import HudSkeleton from '../components/ui/HudSkeleton/HudSkeleton';
import ErrorBoundary from '../components/ui/ErrorBoundary/ErrorBoundary';
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
        <AppLayout
          activeView={activeView}
          onSelectView={handleNavClick}
          onReplayIntro={() => setAppStage('SPLASH')}
          onLogout={handleLogout}
        >
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
        </AppLayout>
      )}
    </ErrorBoundary>
  );
}
