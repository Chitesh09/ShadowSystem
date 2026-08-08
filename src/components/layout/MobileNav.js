"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, CheckSquare, Trophy, Dumbbell, Target, Zap, User, BarChart3, Cpu, Play, LogOut } from 'lucide-react';
import Badge from '../ui/Badge/Badge';
import { soundEngine } from '../../lib/soundEngine';
import styles from './MobileNav.module.css';

export default function MobileNav({
  activeView,
  onSelectView,
  playerProfile,
  onReplayIntro,
  onLogout
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    soundEngine.playBeep(800, 0.05);
    setIsOpen(prev => !prev);
  };

  const handleSelect = (viewId) => {
    soundEngine.playBeep(900, 0.05);
    onSelectView(viewId);
    setIsOpen(false);
  };

  const handleReplay = () => {
    soundEngine.playBeep(800, 0.05);
    onReplayIntro();
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    soundEngine.playBeep(600, 0.08);
    onLogout();
    setIsOpen(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'HEADQUARTERS', icon: LayoutDashboard, category: 'OVERVIEW' },
    { id: 'quests', label: 'QUEST MATRIX', icon: CheckSquare, category: 'TASKS & RAID' },
    { id: 'challenges', label: 'CHALLENGES', icon: Trophy, category: 'TASKS & RAID', gold: true },
    { id: 'training', label: 'TRAINING CENTER', icon: Dumbbell, category: 'TRAINING & FOCUS' },
    { id: 'focus', label: 'FOCUS MODE', icon: Target, category: 'TRAINING & FOCUS', purple: true },
    { id: 'progression', label: 'PROGRESSION', icon: Zap, category: 'SYSTEM & ANALYTICS', gold: true },
    { id: 'profile', label: 'CHARACTER PROFILE', icon: User, category: 'SYSTEM & ANALYTICS' },
    { id: 'analytics', label: 'SYSTEM ANALYTICS', icon: BarChart3, category: 'SYSTEM & ANALYTICS' },
    { id: 'system_ai', label: 'THE SYSTEM AI', icon: Cpu, category: 'SYSTEM & ANALYTICS' },
  ];

  return (
    <>
      {/* Top Mobile Header (Visible < 768px) */}
      <div className={styles.mobileHeader}>
        <div className={styles.brandGroup}>
          <button
            className={styles.menuBtn}
            onClick={toggleDrawer}
            aria-label="Open mobile navigation menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <span className={styles.brandTitle}>SHADOW SYSTEM</span>
        </div>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Badge variant="cyan">● LIVE</Badge>
          <Badge variant="gold">LVL {playerProfile?.level || 1}</Badge>
        </div>
      </div>

      {/* Slide-out Navigation Drawer & Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className={styles.drawer}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            >
              <div className={styles.drawerHeader}>
                <span className={styles.drawerTitle}>SYSTEM MENU</span>
                <button
                  className={styles.menuBtn}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                <div className={styles.drawerSectionLabel}>NAVIGATION MATRIX</div>

                <div className={styles.navLinks}>
                  {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;

                    return (
                      <button
                        key={item.id}
                        className={`${styles.navItem} 
                          ${isActive ? styles.navItemActive : ''} 
                          ${item.gold ? styles.navItemGold : ''} 
                          ${item.purple ? styles.navItemPurple : ''}`}
                        onClick={() => handleSelect(item.id)}
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <button className={styles.navItem} onClick={handleReplay}>
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
