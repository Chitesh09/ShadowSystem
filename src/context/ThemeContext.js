"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  scanlines: true,
  hudIntensity: 'normal',
  soundEffects: false,
  toggleScanlines: () => {},
  setHudIntensity: () => {},
  toggleSoundEffects: () => {},
});

export function ThemeProvider({ children }) {
  const [scanlines, setScanlines] = useState(true);
  const [hudIntensity, setHudIntensity] = useState('normal');
  const [soundEffects, setSoundEffects] = useState(false);

  useEffect(() => {
    const savedScanlines = localStorage.getItem('shadow_scanlines');
    if (savedScanlines !== null) {
      setScanlines(savedScanlines === 'true');
    }
    const savedIntensity = localStorage.getItem('shadow_hud_intensity');
    if (savedIntensity) {
      setHudIntensity(savedIntensity);
    }
  }, []);

  const toggleScanlines = () => {
    setScanlines(prev => {
      const next = !prev;
      localStorage.setItem('shadow_scanlines', String(next));
      return next;
    });
  };

  const handleSetHudIntensity = (level) => {
    setHudIntensity(level);
    localStorage.setItem('shadow_hud_intensity', level);
  };

  const toggleSoundEffects = () => {
    setSoundEffects(prev => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        scanlines,
        hudIntensity,
        soundEffects,
        toggleScanlines,
        setHudIntensity: handleSetHudIntensity,
        toggleSoundEffects,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
