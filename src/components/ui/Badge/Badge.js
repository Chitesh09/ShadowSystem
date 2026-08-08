"use client";

import React from 'react';
import styles from './Badge.module.css';

export default function Badge({
  children,
  variant = 'cyan',
  icon: Icon,
  className = ''
}) {
  const variantClass = styles[variant] || styles.cyan;

  return (
    <span className={`${styles.badge} ${variantClass} ${className}`}>
      {Icon && <Icon size={12} />}
      <span>{children}</span>
    </span>
  );
}
