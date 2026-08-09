"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Shield, Eye, LayoutDashboard, CheckSquare, Trophy, Dumbbell, Target, Zap, User, BarChart3, Cpu, Play, LogOut 
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button/Button';
import Badge from '../ui/Badge/Badge';
import { soundEngine } from '../../lib/soundEngine';
import styles from './HeaderHUD.module.css';

export default function HeaderHUD({ activeView, onSelectView, onReplayIntro, onLogout }) {
  const { systemStatus, playerProfile } = useSystem();
  const { scanlines, toggleScanlines } = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    soundEngine.playBeep(800, 0.05);
    setIsDrawerOpen(prev => !prev);
  };

  const handleSelectTab = (viewId) => {
    soundEngine.playBeep(900, 0.05);
    if (onSelectView) onSelectView(viewId);
    setIsDrawerOpen(false);
  };

  const handleReplayClick = () => {
    soundEngine.playBeep(800, 0.05);
    if (onReplayIntro) onReplayIntro();
    setIsDrawerOpen(false);
  };

  const handleLogoutClick = () => {
    soundEngine.playBeep(600, 0.08);
    if (onLogout) onLogout();
    setIsDrawerOpen(false);
  };

  const navCategories = [
    {
      label: 'COMMAND MATRIX',
      items: [
        { id: 'dashboard', label: 'HEADQUARTERS', icon: LayoutDashboard },
        { id: 'quests', label: 'QUEST MATRIX', icon: CheckSquare },
        { id: 'challenges', label: 'CHALLENGES', icon: Trophy, gold: true },
      ]
    },
    {
      label: 'MASTERY & PROGRESS',
      items: [
        { id: 'training', label: 'TRAINING CENTER', icon: Dumbbell },
        { id: 'focus', label: 'FOCUS MODE', icon: Target, purple: true },
        { id: 'progression', label: 'PROGRESSION', icon: Zap, gold: true },
      ]
    },
    {
      label: 'SYSTEM & ANALYTICS',
      items: [
        { id: 'profile', label: 'CHARACTER PROFILE', icon: User },
        { id: 'analytics', label: 'SYSTEM ANALYTICS', icon: BarChart3 },
        { id: 'system_ai', label: 'THE SYSTEM AI', icon: Cpu },
      ]
    }
  ];

  return (
    <>
      <header className={styles.header}>
        {/* Left: Hamburger Button & Logo Branding */}
        <div className={styles.left}>
          <button
            className={styles.hamburgerBtn}
            onClick={toggleDrawer}
            aria-label="Toggle System Menu"
          >
            {isDrawerOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Shield size={20} style={{ color: 'var(--primary-neon)' }} />
          <span className={styles.logoText}>SHADOW SYSTEM</span>

          <div className={styles.badgeGroup}>
            <Badge variant="cyan">{playerProfile?.designation || 'OPERATIVE'}</Badge>
            <Badge variant="gold">LVL {playerProfile?.level || 1}</Badge>
          </div>
        </div>

        {/* Right: Status Indicator & CRT Scanline Toggle */}
        <div className={styles.right}>
          <div className={styles.statusIndicator}>
            <span className={styles.statusDot} />
            <span>{systemStatus}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleScanlines}
            icon={Eye}
          >
            {scanlines ? 'CRT ON' : 'CRT OFF'}
          </Button>
        </div>
      </header>

      {/* Holographic Slide-Out Navigation Drawer & Backdrop */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className={styles.drawer}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            >
              <div className={styles.drawerHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={18} style={{ color: 'var(--primary-neon)' }} />
                  <span className={styles.drawerTitle}>NAVIGATION MATRIX</span>
                </div>
                <button
                  className={styles.hamburgerBtn}
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                {navCategories.map((cat, idx) => (
                  <div key={idx}>
                    <div className={styles.drawerSectionLabel}>{cat.label}</div>
                    <div className={styles.navLinks}>
                      {cat.items.map(item => {
                        const Icon = item.icon;
                        const isActive = activeView === item.id;

                        return (
                          <button
                            key={item.id}
                            className={`${styles.navItem} 
                              ${isActive ? styles.navItemActive : ''} 
                              ${item.gold ? styles.navItemGold : ''} 
                              ${item.purple ? styles.navItemPurple : ''}`}
                            onClick={() => handleSelectTab(item.id)}
                          >
                            <Icon size={18} />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer Footer Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
                <button className={styles.navItem} onClick={handleReplayClick}>
                  <Play size={18} />
                  <span>REPLAY INTRO</span>
                </button>

                <button className={styles.navItem} onClick={handleLogoutClick}>
                  <LogOut size={18} />
                  <span>LOGOUT</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
