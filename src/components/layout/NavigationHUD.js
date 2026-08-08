"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Cpu, BarChart3, Sliders } from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import styles from './NavigationHUD.module.css';

export default function NavigationHUD() {
  const { activeTab, setActiveTab } = useSystem();

  const navItems = [
    { id: 'overview', label: 'OVERVIEW', icon: LayoutDashboard },
    { id: 'modules', label: 'MODULES', icon: Cpu },
    { id: 'analytics', label: 'ANALYTICS', icon: BarChart3 },
    { id: 'config', label: 'CONFIG', icon: Sliders },
  ];

  return (
    <nav className={styles.navDock}>
      {navItems.map(item => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
          >
            {isActive && (
              <motion.div
                layoutId="navDockGlow"
                className={styles.activeGlow}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <Icon size={16} style={{ zIndex: 1 }} />
            <span style={{ zIndex: 1 }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
