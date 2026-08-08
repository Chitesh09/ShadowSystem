"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function RadarChart({
  stats = { strength: 0, intelligence: 0, focus: 0, vitality: 0, discipline: 0 }
}) {
  const size = 260;
  const center = size / 2;
  const radius = 90;
  const maxVal = 25;

  const axes = [
    { key: 'strength', label: `STR (${stats.strength || 0})`, val: stats.strength || 0 },
    { key: 'intelligence', label: `INT (${stats.intelligence || 0})`, val: stats.intelligence || 0 },
    { key: 'focus', label: `FOC (${stats.focus || 0})`, val: stats.focus || 0 },
    { key: 'vitality', label: `VIT (${stats.vitality || 0})`, val: stats.vitality || 0 },
    { key: 'discipline', label: `DIS (${stats.discipline || 0})`, val: stats.discipline || 0 },
  ];

  const numAxes = axes.length;
  const angleStep = (2 * Math.PI) / numAxes;

  // Calculate coordinates for a polygon ring level
  const getPolygonPoints = (ratio) => {
    return axes.map((_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const r = radius * ratio;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Calculate coordinates for player stat polygon
  const playerPolygonPoints = axes.map((a, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const statVal = Math.max(1, Math.min(maxVal, a.val)); // minimum 1 for visibility
    const r = radius * (statVal / maxVal);
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', maxWidth: '280px', height: 'auto', overflow: 'visible' }}>
        <defs>
          <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--primary-neon)" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Concentric Grid Rings */}
        <polygon points={getPolygonPoints(1)} fill="none" stroke="var(--border-color)" strokeWidth="1" />
        <polygon points={getPolygonPoints(0.75)} fill="none" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="2 2" />
        <polygon points={getPolygonPoints(0.5)} fill="none" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="2 2" />
        <polygon points={getPolygonPoints(0.25)} fill="none" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="2 2" />

        {/* Axis Spokes */}
        {axes.map((a, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          const labelX = center + (radius + 22) * Math.cos(angle);
          const labelY = center + (radius + 16) * Math.sin(angle);

          return (
            <g key={a.key}>
              <line x1={center} y1={center} x2={x} y2={y} stroke="var(--border-color)" strokeWidth="1" />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--primary-neon)"
                fontFamily="var(--font-orbitron)"
                fontSize="10"
                fontWeight="700"
              >
                {a.label}
              </text>
            </g>
          );
        })}

        {/* Glowing Player Stat Polygon */}
        <motion.polygon
          points={playerPolygonPoints}
          fill="url(#radarGrad)"
          stroke="var(--accent-purple)"
          strokeWidth="2.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 10px var(--accent-purple-glow))' }}
        />
      </svg>
    </div>
  );
}
