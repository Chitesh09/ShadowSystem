"use client";

import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import HeaderHUD from './HeaderHUD';
import styles from './AppLayout.module.css';

export default function AppLayout({
  children,
  activeView,
  onSelectView,
  onReplayIntro,
  onLogout
}) {
  const { scanlines } = useTheme();

  return (
    <div className={styles.container}>
      {scanlines && <div className="scanlines" />}
      <HeaderHUD
        activeView={activeView}
        onSelectView={onSelectView}
        onReplayIntro={onReplayIntro}
        onLogout={onLogout}
      />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
