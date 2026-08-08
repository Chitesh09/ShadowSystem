"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, KeyRound, Mail, Lock, User, CheckCircle2, Globe, ArrowRight } from 'lucide-react';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';
import Tabs from '../ui/Tabs/Tabs';
import HudDialog from '../ui/HudDialog/HudDialog';
import { soundEngine } from '../../lib/soundEngine';
import styles from './AuthScreen.module.css';

export default function AuthScreen({ onAuthSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [verifyingText, setVerifyingText] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEngine.playBeep(900, 0.06);

    setIsLoading(true);
    setVerifyingText('AUTHENTICATION VERIFIED');

    setTimeout(() => setVerifyingText('Loading...'), 800);
    setTimeout(() => setVerifyingText('Synchronizing Player Data...'), 1600);

    setTimeout(() => {
      soundEngine.playLevelUp();
      const isNew = activeTab === 'register';
      if (onAuthSuccess) {
        onAuthSuccess(
          { designation: designation || 'Shadow Operative', email },
          isNew
        );
      }
    }, 2400);
  };

  const handleGoogleLogin = () => {
    soundEngine.playBeep(1000, 0.08);
    setIsLoading(true);
    setVerifyingText('AUTHENTICATION VERIFIED');
    setTimeout(() => setVerifyingText('Synchronizing Player Data...'), 1200);

    setTimeout(() => {
      soundEngine.playLevelUp();
      if (onAuthSuccess) {
        onAuthSuccess({ designation: 'Google Hunter', email: 'hunter@shadowsystem.io' }, false);
      }
    }, 2200);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSent(true);
  };

  return (
    <motion.div
      className={styles.authContainer}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.glassCard}>
        {isLoading ? (
          /* Post-Login Verification State */
          <div className={styles.verificationBox}>
            <ShieldAlert size={56} style={{ color: 'var(--primary-neon)', filter: 'drop-shadow(0 0 15px var(--primary-neon))' }} />
            <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '20px', fontWeight: 900, color: 'var(--primary-neon)', letterSpacing: '0.15em' }}>
              {verifyingText}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
              SYSTEM LINKING IN PROGRESS...
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className={styles.headerBox}>
              <h2 className={styles.title}>SYSTEM AWAKENING</h2>
              <p className={styles.subtitle}>Every decision shapes your evolution.</p>
            </div>

            {/* Login / Register Tabs */}
            <Tabs
              items={[
                { id: 'login', label: 'ENTER SYSTEM' },
                { id: 'register', label: 'CREATE ACCOUNT' },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className={styles.formGrid}>
              {activeTab === 'register' && (
                <Input
                  label="PLAYER DESIGNATION"
                  placeholder="Enter your Operative handle"
                  icon={User}
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                />
              )}

              <Input
                label="EMAIL ADDRESS"
                type="email"
                placeholder="operative@shadowsystem.io"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="SYSTEM PASSWORD"
                type="password"
                placeholder="••••••••••••"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className={styles.authOptions}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: 'var(--primary-neon)', cursor: 'pointer' }}
                  />
                  <span>REMEMBER USER</span>
                </label>

                {activeTab === 'login' && (
                  <span
                    className={styles.forgotLink}
                    onClick={() => {
                      setForgotSent(false);
                      setForgotModalOpen(true);
                    }}
                  >
                    FORGOT PASSWORD?
                  </span>
                )}
              </div>

              <Button variant="primary" size="lg" type="submit" icon={ArrowRight}>
                {activeTab === 'login' ? 'INITIALIZE LOGIN' : 'ESTABLISH LINK'}
              </Button>
            </form>

            <div className={styles.divider}>OR CONNECT WITH</div>

            <Button variant="outline" size="md" icon={Globe} onClick={handleGoogleLogin}>
              GOOGLE SINGLE SIGN-ON
            </Button>
          </>
        )}
      </div>

      {/* Forgot Password Modal */}
      <HudDialog
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="SYSTEM PASSWORD RECOVERY"
      >
        {forgotSent ? (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <CheckCircle2 size={40} style={{ color: 'var(--status-success)', margin: '0 auto' }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-main)' }}>
              RECOVERY LINK DISPATCHED TO <strong>{forgotEmail}</strong>.
            </p>
            <Button variant="outline" size="sm" onClick={() => setForgotModalOpen(false)}>
              CLOSE RECOVERY
            </Button>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
              Enter your registered operative email address to receive a secure access reset token.
            </p>

            <Input
              label="OPERATIVE EMAIL"
              type="email"
              placeholder="operative@shadowsystem.io"
              icon={Mail}
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Button variant="outline" size="sm" type="button" onClick={() => setForgotModalOpen(false)}>Cancel</Button>
              <Button variant="primary" size="sm" type="submit">DISPATCH RESET TOKEN</Button>
            </div>
          </form>
        )}
      </HudDialog>
    </motion.div>
  );
}
