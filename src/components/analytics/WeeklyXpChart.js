"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './AnalyticsSystem.module.css';

export default function WeeklyXpChart() {
  const [activeHover, setActiveHover] = useState(null);

  const data = [
    { day: 'MON', xp: 240, label: 'Mon: +240 XP' },
    { day: 'TUE', xp: 380, label: 'Tue: +380 XP' },
    { day: 'WED', xp: 190, label: 'Wed: +190 XP' },
    { day: 'THU', xp: 450, label: 'Thu: +450 XP' },
    { day: 'FRI', xp: 310, label: 'Fri: +310 XP' },
    { day: 'SAT', xp: 520, label: 'Sat: +520 XP' },
    { day: 'SUN', xp: 410, label: 'Sun: +410 XP' },
  ];

  const width = 360;
  const height = 160;
  const padding = 30;

  const maxXp = 600;

  // Convert data points to SVG coordinates
  const points = data.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - (d.xp / maxXp) * (height - 2 * padding);
    return { x, y, ...d };
  });

  const svgPath = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaPath = `${svgPath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {activeHover && (
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '10px',
          padding: '4px 10px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--primary-neon)',
          borderRadius: '4px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--primary-neon)',
          boxShadow: '0 0 10px var(--primary-neon-glow)'
        }}>
          {activeHover.label}
        </div>
      )}

      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary-neon)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--primary-neon)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="var(--border-color)" strokeDasharray="3 3" />
        <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="var(--border-color)" strokeDasharray="3 3" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--border-color)" />

        {/* Gradient Area Fill */}
        <motion.path
          d={areaPath}
          fill="url(#lineGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Glowing Path Line */}
        <motion.path
          d={svgPath}
          fill="none"
          stroke="var(--primary-neon)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 8px var(--primary-neon-glow))' }}
        />

        {/* Interactive Glowing Nodes */}
        {points.map((p, i) => (
          <g key={i} onMouseEnter={() => setActiveHover(p)} onMouseLeave={() => setActiveHover(null)} style={{ cursor: 'pointer' }}>
            <circle
              cx={p.x}
              cy={p.y}
              r={activeHover?.day === p.day ? 7 : 5}
              fill="var(--bg-card)"
              stroke="var(--primary-neon)"
              strokeWidth="2.5"
              style={{ filter: 'drop-shadow(0 0 6px var(--primary-neon))', transition: 'all 0.2s ease' }}
            />
            <text
              x={p.x}
              y={height - 10}
              textAnchor="middle"
              fill="var(--text-muted)"
              fontFamily="var(--font-mono)"
              fontSize="10"
            >
              {p.day}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
