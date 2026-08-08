"use client";

import React from 'react';

export default function HudSkeleton() {
  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '32px 24px',
      background: 'rgba(13, 24, 38, 0.6)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{
        width: '60%',
        height: '28px',
        background: 'var(--bg-secondary)',
        borderRadius: '4px',
        animation: 'skeletonPulse 1.2s infinite alternate ease-in-out'
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px'
      }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: '110px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              animation: 'skeletonPulse 1.2s infinite alternate ease-in-out',
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes skeletonPulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
