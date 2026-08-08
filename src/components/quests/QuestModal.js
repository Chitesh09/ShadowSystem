"use client";

import React, { useState, useEffect } from 'react';
import HudDialog from '../ui/HudDialog/HudDialog';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';
import { Plus, Edit2, Zap } from 'lucide-react';

export default function QuestModal({
  isOpen,
  onClose,
  onSave,
  editQuest = null
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('FITNESS');
  const [frequency, setFrequency] = useState('DAILY');
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [timeMinutes, setTimeMinutes] = useState(30);
  const [xp, setXp] = useState(25);

  useEffect(() => {
    if (editQuest) {
      setTitle(editQuest.title || '');
      setCategory(editQuest.category?.toUpperCase() || 'FITNESS');
      setFrequency(editQuest.frequency?.toUpperCase() || 'DAILY');
      setDifficulty(editQuest.difficulty || 'MEDIUM');
      setTimeMinutes(editQuest.timeMinutes || 30);
      setXp(editQuest.xp || 25);
    } else {
      setTitle('');
      setCategory('FITNESS');
      setFrequency('DAILY');
      setDifficulty('MEDIUM');
      setTimeMinutes(30);
      setXp(25);
    }
  }, [editQuest, isOpen]);

  // Update recommended XP when difficulty changes
  const handleDifficultyChange = (newDiff) => {
    setDifficulty(newDiff);
    if (newDiff === 'EASY') setXp(10);
    if (newDiff === 'MEDIUM') setXp(25);
    if (newDiff === 'HARD') setXp(50);
    if (newDiff === 'EXTREME') setXp(100);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: editQuest ? editQuest.id : Date.now(),
      title,
      category,
      frequency,
      difficulty,
      timeMinutes: Number(timeMinutes) || 0,
      xp: Number(xp) || 10,
      completed: editQuest ? editQuest.completed : false,
    });
    onClose();
  };

  return (
    <HudDialog
      isOpen={isOpen}
      onClose={onClose}
      title={editQuest ? 'EDIT SYSTEM QUEST' : 'CREATE NEW SYSTEM QUEST'}
    >
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input
          label="QUEST TITLE"
          placeholder="e.g. Read 20 Pages of System Architecture"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ fontFamily: 'var(--font-orbitron)', fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              CATEGORY
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                outline: 'none'
              }}
            >
              <option value="FITNESS">FITNESS 🏋️‍♂️</option>
              <option value="STUDY">STUDY 📚</option>
              <option value="MEDITATION">MEDITATION 🧘</option>
              <option value="READING">READING 📖</option>
              <option value="CODING">CODING 💻</option>
              <option value="HEALTH">HEALTH 💖</option>
              <option value="CUSTOM">CUSTOM ✨</option>
            </select>
          </div>

          <div>
            <label style={{ fontFamily: 'var(--font-orbitron)', fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              FREQUENCY
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                outline: 'none'
              }}
            >
              <option value="DAILY">DAILY MISSION</option>
              <option value="WEEKLY">WEEKLY MISSION</option>
              <option value="MONTHLY">MONTHLY MISSION</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ fontFamily: 'var(--font-orbitron)', fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              DIFFICULTY
            </label>
            <select
              value={difficulty}
              onChange={(e) => handleDifficultyChange(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                outline: 'none'
              }}
            >
              <option value="EASY">EASY (+10 XP)</option>
              <option value="MEDIUM">MEDIUM (+25 XP)</option>
              <option value="HARD">HARD (+50 XP)</option>
              <option value="EXTREME">EXTREME (+100 XP)</option>
            </select>
          </div>

          <div>
            <Input
              label="DURATION (MINS)"
              type="number"
              value={timeMinutes}
              onChange={(e) => setTimeMinutes(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Input
            label="SYSTEM XP REWARD"
            type="number"
            value={xp}
            onChange={(e) => setXp(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
          <Button variant="outline" size="sm" type="button" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" type="submit" icon={editQuest ? Edit2 : Plus}>
            {editQuest ? 'SAVE QUEST CHANGES' : 'INITIALIZE QUEST'}
          </Button>
        </div>
      </form>
    </HudDialog>
  );
}
