"use client";

import React from 'react';
import { Search, Dumbbell, BookOpen, Brain, Book, Code, Heart, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';
import Input from '../ui/Input/Input';
import Tabs from '../ui/Tabs/Tabs';
import styles from './QuestSystem.module.css';

export default function QuestFilterBar({
  searchQuery,
  onSearchChange,
  activeFrequency,
  onFrequencyChange,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange
}) {
  const categories = [
    { id: 'ALL', label: 'ALL CATEGORIES', icon: Sparkles },
    { id: 'FITNESS', label: 'FITNESS', icon: Dumbbell },
    { id: 'STUDY', label: 'STUDY', icon: BookOpen },
    { id: 'MEDITATION', label: 'MEDITATION', icon: Brain },
    { id: 'READING', label: 'READING', icon: Book },
    { id: 'CODING', label: 'CODING', icon: Code },
    { id: 'HEALTH', label: 'HEALTH', icon: Heart },
    { id: 'CUSTOM', label: 'CUSTOM', icon: Sparkles },
  ];

  return (
    <div className={styles.filterCard}>
      {/* Search & Sort Controls Row */}
      <div className={styles.topFilterRow}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <Input
            icon={Search}
            placeholder="Search missions by title or category..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Frequency Segmented Control */}
        <div style={{ minWidth: '280px' }}>
          <Tabs
            items={[
              { id: 'ALL', label: 'ALL' },
              { id: 'DAILY', label: 'DAILY' },
              { id: 'WEEKLY', label: 'WEEKLY' },
              { id: 'MONTHLY', label: 'MONTHLY' },
            ]}
            activeTab={activeFrequency}
            onChange={onFrequencyChange}
          />
        </div>

        {/* Sort Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SlidersHorizontal size={16} style={{ color: 'var(--text-dim)' }} />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              padding: '10px 14px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-orbitron)',
              fontSize: '11px',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="XP_DESC">SORT: XP (HIGH TO LOW)</option>
            <option value="TIME_ASC">SORT: DURATION (TIME)</option>
            <option value="DIFFICULTY">SORT: DIFFICULTY</option>
            <option value="STATUS">SORT: INCOMPLETE FIRST</option>
          </select>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className={styles.categoryPills}>
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              className={`${styles.categoryPill} ${isActive ? styles.categoryPillActive : ''}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              <Icon size={12} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
