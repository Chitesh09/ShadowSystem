"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, ShieldAlert, Zap, CheckCircle2, RefreshCw, BarChart3, Calendar, Plus } from 'lucide-react';
import SystemNotification from './SystemNotification';
import HudPanel from '../ui/HudPanel/HudPanel';
import Badge from '../ui/Badge/Badge';
import Button from '../ui/Button/Button';
import { systemAiEngine } from '../../lib/systemAiEngine';
import styles from './SystemAi.module.css';

export default function SystemAiView() {
  const [briefing, setBriefing] = useState(systemAiEngine.getMorningBriefing());
  const [aiMissionsData, setAiMissionsData] = useState(systemAiEngine.generateAdaptiveMissions());
  const [performanceReview, setPerformanceReview] = useState(systemAiEngine.getPerformanceReview());
  const [recalibration, setRecalibration] = useState(systemAiEngine.getAdaptiveRecalibration('Morning Hydration Target'));
  const [dailyReport, setDailyReport] = useState(systemAiEngine.getDailyReport());
  const [weeklyReport, setWeeklyReport] = useState(systemAiEngine.getWeeklyReport());

  const [generatedCount, setGeneratedCount] = useState(0);

  const handleRegenerateMissions = () => {
    const updated = systemAiEngine.generateAdaptiveMissions({
      strength: 14 + Math.floor(Math.random() * 5),
      intelligence: 18,
      focus: 12 + Math.floor(Math.random() * 6),
      discipline: 10 + Math.floor(Math.random() * 4)
    });
    setAiMissionsData(updated);
    setGeneratedCount(c => c + 1);
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 1. Cold AI Morning Briefing HUD Banner */}
      <SystemNotification
        code={briefing.code}
        title={briefing.title}
        status={briefing.status}
        directives={briefing.directives}
        recommendation={briefing.recommendation}
      />

      {/* 2. AI Adaptive Mission Generation Hub */}
      <HudPanel glow="primary" title="THE SYSTEM — ADAPTIVE MISSION GENERATOR" icon={Cpu}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                SYSTEM WEAKNESS ANALYSIS: DETECTED LOW METRIC &lt;<span style={{ color: 'var(--primary-neon)', fontWeight: 700 }}>{aiMissionsData.analyzedWeakness}</span>&gt;
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <Badge variant="purple">DATA-DRIVEN GENERATION</Badge>
                <Badge variant="gold">SYSTEM RECALIBRATED x{generatedCount}</Badge>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={RefreshCw}
              onClick={handleRegenerateMissions}
            >
              RUN MATRIX RECALIBRATION
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {aiMissionsData.missions.map(m => (
              <div key={m.id} className={styles.missionBox}>
                <div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '14px', color: 'var(--text-main)' }}>
                    {m.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-gold)', marginTop: '4px' }}>
                    {m.reason}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Badge variant="cyan">+{m.xp} XP</Badge>
                  <Button variant="purple" size="sm" icon={Plus}>
                    ACCEPT MISSION
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HudPanel>

      {/* 3. Performance Review & Adaptive Recalibration */}
      <div className={styles.reportsGrid}>
        <HudPanel glow="purple" title="COLD PERFORMANCE REVIEW" icon={BarChart3}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className={styles.metricRow}>
              <span>SYSTEM EFFICIENCY</span>
              <span style={{ color: 'var(--primary-neon)', fontWeight: 700 }}>{performanceReview.efficiency}</span>
            </div>
            <div className={styles.metricRow}>
              <span>OPERATIVE RATING</span>
              <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>{performanceReview.rating}</span>
            </div>

            <div className={styles.directiveList} style={{ margin: 0 }}>
              {performanceReview.analysis.map((a, i) => (
                <div key={i}>&gt; {a}</div>
              ))}
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-gold)' }}>
              {performanceReview.action}
            </div>
          </div>
        </HudPanel>

        <HudPanel title="ADAPTIVE MATRIX RECALIBRATION" icon={ShieldAlert}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className={styles.metricRow}>
              <span>TRIGGER EVENT</span>
              <span style={{ color: 'var(--accent-gold)' }}>{recalibration.event}</span>
            </div>

            <div className={styles.directiveList} style={{ margin: 0, borderColor: 'var(--accent-gold)' }}>
              <div>&gt; {recalibration.recalibration}</div>
              <div>&gt; {recalibration.penalty}</div>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--primary-neon)' }}>
              SYSTEM RE-BALANCING COMPLETED. ZERO LAG RECORDED.
            </div>
          </div>
        </HudPanel>
      </div>

      {/* 4. Daily & Weekly System Summary Reports */}
      <div className={styles.reportsGrid}>
        <div className={styles.reportCard}>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', color: 'var(--primary-neon)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={16} />
            <span>DAILY SYSTEM REPORT</span>
          </div>

          <div className={styles.metricRow}>
            <span>QUESTS CLEARED</span>
            <span style={{ color: 'var(--primary-neon)', fontWeight: 700 }}>{dailyReport.questsCleared} CLEARED</span>
          </div>
          <div className={styles.metricRow}>
            <span>TOTAL RECLAIMED EXP</span>
            <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>+{dailyReport.xpEarned} XP</span>
          </div>
          <div className={styles.metricRow}>
            <span>FOCUS PRODUCTIVITY</span>
            <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>{dailyReport.focusMinutes} MINS</span>
          </div>
          <div className={styles.metricRow}>
            <span>CYCLE STATUS</span>
            <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>{dailyReport.status}</span>
          </div>
        </div>

        <div className={styles.reportCard}>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', color: 'var(--accent-gold)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} />
            <span>WEEKLY SYSTEM REPORT</span>
          </div>

          <div className={styles.metricRow}>
            <span>REPORT CYCLE</span>
            <span style={{ color: 'var(--text-main)' }}>{weeklyReport.cycle}</span>
          </div>
          <div className={styles.metricRow}>
            <span>TOTAL WEEKLY EXP</span>
            <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>+{weeklyReport.totalWeeklyXp} XP</span>
          </div>
          <div className={styles.metricRow}>
            <span>LEVEL ASCENSIONS</span>
            <span style={{ color: 'var(--primary-neon)', fontWeight: 700 }}>+{weeklyReport.levelsAscended} LEVELS</span>
          </div>
          <div className={styles.metricRow}>
            <span>CONSISTENCY GRADE</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{weeklyReport.consistencyGrade}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
