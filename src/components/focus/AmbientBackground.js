"use client";

import React, { useMemo } from 'react';
import styles from './FocusMode.module.css';

export default function AmbientBackground({ theme = 'space' }) {
  const rainDrops = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 0.8 + 0.6,
    }));
  }, []);

  const forestSpores = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 6 + 3,
      delay: Math.random() * 3,
    }));
  }, []);

  const spaceStars = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2.5,
    }));
  }, []);

  const noiseTiles = useMemo(() => {
    const chars = '01SYS_NEXUS_MATRIX_99_';
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      top: Math.random() * 95,
      char: chars[Math.floor(Math.random() * chars.length)],
    }));
  }, []);

  return (
    <div className={styles.ambientLayer}>
      {theme === 'rain' && rainDrops.map(r => (
        <div
          key={r.id}
          className={styles.rainDrop}
          style={{
            left: `${r.left}%`,
            animationDelay: `${r.delay}s`,
            animationDuration: `${r.duration}s`,
          }}
        />
      ))}

      {theme === 'forest' && forestSpores.map(s => (
        <div
          key={s.id}
          className={styles.forestSpore}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {theme === 'space' && spaceStars.map(s => (
        <div
          key={s.id}
          className={styles.spaceStar}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {theme === 'noise' && noiseTiles.map(n => (
        <div
          key={n.id}
          className={styles.whiteNoiseTile}
          style={{
            left: `${n.left}%`,
            top: `${n.top}%`,
          }}
        >
          {n.char}
        </div>
      ))}
    </div>
  );
}
