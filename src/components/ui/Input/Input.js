"use client";

import React from 'react';
import styles from './Input.module.css';

export default function Input({
  label,
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
  ...props
}) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        {Icon && <Icon size={16} className={styles.icon} />}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.input} ${Icon ? styles.inputWithIcon : ''}`}
          {...props}
        />
      </div>
    </div>
  );
}
