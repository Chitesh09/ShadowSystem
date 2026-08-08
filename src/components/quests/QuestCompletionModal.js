"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Sparkles, CheckCircle2 } from 'lucide-react';
import HudDialog from '../ui/HudDialog/HudDialog';
import Button from '../ui/Button/Button';

export default function QuestCompletionModal({
  isOpen,
  onClose,
  completedQuest
}) {
  if (!completedQuest) return null;

  return (
    <HudDialog isOpen={isOpen} onClose={onClose} title="MISSION ACCOMPLISHED">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '16px',
          padding: '12px 0'
        }}
      >
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'rgba(0, 200, 255, 0.15)',
          border: '2px solid var(--primary-neon)',
          boxShadow: '0 0 30px var(--primary-neon-glow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary-neon)'
        }}>
          <Award size={36} />
        </div>

        <div>
          <h3 style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: '18px',
            color: 'var(--primary-neon)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            MISSION COMPLETE!
          </h3>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
            fontSize: '15px',
            color: 'var(--text-main)',
            marginTop: '6px'
          }}>
            {completedQuest.title}
          </p>
        </div>

        <div style={{
          padding: '10px 24px',
          background: 'rgba(0, 230, 118, 0.12)',
          border: '1px solid var(--status-success)',
          borderRadius: '20px',
          fontFamily: 'var(--font-orbitron)',
          fontSize: '16px',
          fontWeight: 800,
          color: 'var(--status-success)',
          boxShadow: '0 0 15px rgba(0, 230, 118, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={18} />
          <span>+{completedQuest.xp} XP CLAIMED</span>
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: 'var(--text-muted)'
        }}>
          SYSTEM SYNCHRONIZATION UPGRADED. KEEP LEVELING UP OPERATIVE!
        </p>

        <Button variant="primary" size="md" onClick={onClose} icon={CheckCircle2}>
          ACKNOWLEDGE & CONTINUE
        </Button>
      </motion.div>
    </HudDialog>
  );
}
