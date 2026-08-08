"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Tabs.module.css';

export default function Tabs({
  items = [],
  activeTab,
  onChange,
  className = ''
}) {
  return (
    <div className={`${styles.tabList} ${className}`}>
      {items.map(item => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`${styles.tabItem} ${isActive ? styles.tabItemActive : ''}`}
          >
            {isActive && (
              <motion.div
                layoutId="tabIndicator"
                className={styles.tabIndicator}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {Icon && <Icon size={14} style={{ zIndex: 1 }} />}
            <span style={{ zIndex: 1 }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
