"use client";

import React from 'react';
import { Shield, Eye, Settings } from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button/Button';
import styles from './HeaderHUD.module.css';

export default function HeaderHUD() {
  const { systemStatus, playerProfile } = useSystem();
  const { scanlines, toggleScanlines } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Shield size={20} style={{ color: 'var(--primary-neon)' }} />
        <span className={styles.logoText}>SHADOW SYSTEM</span>
      </div>

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
  );
}
