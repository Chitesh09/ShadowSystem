"use client";

import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import HeaderHUD from './HeaderHUD';
import NavigationHUD from './NavigationHUD';
import styles from './AppLayout.module.css';

export default function AppLayout({ children }) {
  const { scanlines } = useTheme();

  return (
    <div className={styles.container}>
      {scanlines && <div className="scanlines" />}
      <HeaderHUD />
      <main className={styles.mainContent}>
        {children}
      </main>
      <NavigationHUD />
    </div>
  );
}
