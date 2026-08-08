"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Check, Award, Plus } from 'lucide-react';
import Badge from '../ui/Badge/Badge';
import Button from '../ui/Button/Button';
import HudDialog from '../ui/HudDialog/HudDialog';
import Input from '../ui/Input/Input';
import { useSystem } from '../../context/SystemContext';
import styles from './DashboardView.module.css';

export default function MissionsWidget() {
  const { playerProfile, toggleQuest, addQuest } = useSystem();
  const missions = playerProfile.quests || [];

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Study');
  const [newDifficulty, setNewDifficulty] = useState('EASY');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newTitle.trim()) {
      let xpVal = newDifficulty === 'HARD' ? 50 : newDifficulty === 'MEDIUM' ? 25 : 15;
      addQuest({
        title: newTitle.trim(),
        category: newCategory,
        difficulty: newDifficulty,
        xp: xpVal
      });
      setNewTitle('');
      setAddModalOpen(false);
    }
  };

  return (
    <div className={styles.floatCard}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className={styles.sectionTitle}>
          <CheckSquare size={16} style={{ color: 'var(--primary-neon)' }} />
          <span>TODAY'S MISSIONS</span>
        </div>

        <Button variant="outline" size="sm" icon={Plus} onClick={() => setAddModalOpen(true)}>
          ADD MISSION
        </Button>
      </div>

      <div className={styles.missionList}>
        {missions.length === 0 ? (
          <div style={{
            padding: '30px 20px',
            textAlign: 'center',
            background: 'var(--bg-secondary)',
            border: '1px border-color var(--border-color)',
            borderRadius: '8px'
          }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>
              No missions generated yet.
            </p>
            <div style={{ marginTop: '12px' }}>
              <Button variant="primary" size="sm" icon={Plus} onClick={() => setAddModalOpen(true)}>
                CREATE YOUR FIRST MISSION
              </Button>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            {missions.map(m => (
              <motion.div
                key={m.id}
                className={styles.missionItem}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.missionLeft}>
                  <div
                    className={`${styles.missionCheckbox} ${m.done ? styles.missionChecked : ''}`}
                    onClick={() => toggleQuest(m.id)}
                  >
                    {m.done && <Check size={14} style={{ color: 'var(--primary-neon)' }} />}
                  </div>

                  <div>
                    <div className={`${styles.missionTitle} ${m.done ? styles.missionTitleDone : ''}`}>
                      {m.title}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                      <Badge
                        variant={m.difficulty === 'HARD' ? 'purple' : m.difficulty === 'MEDIUM' ? 'gold' : 'cyan'}
                      >
                        {m.difficulty || 'EASY'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: m.done ? 'var(--text-dim)' : 'var(--primary-neon)'
                }}>
                  +{m.xp} XP
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Add Mission Modal */}
      <HudDialog
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="CREATE SYSTEM MISSION"
      >
        <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="MISSION TITLE"
            placeholder="e.g. Read 15 Pages of Systems Architecture"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontFamily: 'var(--font-orbitron)', fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                CATEGORY
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
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
                <option value="Study">Study</option>
                <option value="Fitness">Fitness</option>
                <option value="Coding">Coding</option>
                <option value="Health">Health</option>
              </select>
            </div>

            <div>
              <label style={{ fontFamily: 'var(--font-orbitron)', fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                DIFFICULTY
              </label>
              <select
                value={newDifficulty}
                onChange={(e) => setNewDifficulty(e.target.value)}
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
                <option value="EASY">EASY (+15 XP)</option>
                <option value="MEDIUM">MEDIUM (+25 XP)</option>
                <option value="HARD">HARD (+50 XP)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="outline" size="sm" type="button" onClick={() => setAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">INITIALIZE MISSION</Button>
          </div>
        </form>
      </HudDialog>
    </div>
  );
}
