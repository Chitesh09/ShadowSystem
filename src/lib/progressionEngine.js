/**
 * Shadow System - Pure Mathematical Progression Engine
 * Handles RPG formulas for XP, Leveling, Ranks, Titles, Multipliers, and Feature Unlocks.
 */

// Rank Tiers Mapping
export const RANKS = [
  { minLevel: 1, maxLevel: 5, rank: 'E-Rank Hunter', color: '#CD7F32', badge: 'BRONZE' },
  { minLevel: 6, maxLevel: 15, rank: 'D-Rank Operative', color: '#A0A0A0', badge: 'IRON' },
  { minLevel: 16, maxLevel: 30, rank: 'C-Rank Specialist', color: '#C0C0C0', badge: 'SILVER' },
  { minLevel: 31, maxLevel: 50, rank: 'B-Rank Commander', color: '#FFD700', badge: 'GOLD' },
  { minLevel: 51, maxLevel: 75, rank: 'A-Rank Sovereign', color: '#00C8FF', badge: 'PLATINUM' },
  { minLevel: 76, maxLevel: 99, rank: 'S-Rank Monarch', color: '#7B27FF', badge: 'SHADOW' },
  { minLevel: 100, maxLevel: 999, rank: 'National Level Shadow Monarch', color: '#FFD700', badge: 'COSMIC' },
];

// Title Unlocks Mapping
export const TITLES = [
  { level: 1, title: 'Shadow Trainee' },
  { level: 5, title: 'Awakened Initiate' },
  { level: 10, title: 'System Specialist' },
  { level: 20, title: 'Focus Virtuoso' },
  { level: 30, title: 'Dungeon Conqueror' },
  { level: 50, title: 'Shadow Sovereign' },
  { level: 75, title: 'Monarch of Shadows' },
  { level: 100, title: 'Ruler of the System' },
];

// Feature Unlocks Matrix
export const UNLOCKS = [
  { level: 1, name: 'Daily Missions Matrix', desc: 'Access to Daily Quest checklist & XP rewards' },
  { level: 3, name: 'Pomodoro Focus HUD', desc: 'Access to 25m Focus Timer & session XP bonuses' },
  { level: 5, name: 'Stat Point Allocation', desc: 'Unlock STR, INT, DEX attribute distribution' },
  { level: 10, name: 'Streak Multiplier Overdrive', desc: '1.5x XP bonus for 7+ day active streaks' },
  { level: 15, name: 'Extreme Difficulty Quests', desc: 'High-yield +100 XP Extreme Quest challenges' },
  { level: 25, name: 'Shadow Guild Matrix', desc: 'Guild network & global leaderboard sync' },
  { level: 50, name: 'Monarch Awakening Core', desc: '2.0x XP multiplier & custom aura flares' },
];

/**
 * Calculates XP required for next level.
 * Formula: 1000 XP base for Level 1, scaling exponentially with level.
 */
export function getRequiredXp(level) {
  if (level <= 1) return 1000;
  return Math.floor(1000 * Math.pow(level, 1.15));
}

/**
 * Gets Rank object based on current level.
 */
export function getRankForLevel(level) {
  const matched = RANKS.find(r => level >= r.minLevel && level <= r.maxLevel);
  return matched || RANKS[RANKS.length - 1];
}

/**
 * Gets active Title based on current level.
 */
export function getTitleForLevel(level) {
  let activeTitle = TITLES[0].title;
  for (const t of TITLES) {
    if (level >= t.level) {
      activeTitle = t.title;
    }
  }
  return activeTitle;
}

/**
 * Calculates streak multiplier.
 * 1-6 days: 1.0x, 7-13 days: 1.25x, 14-29 days: 1.5x, 30+ days: 2.0x
 */
export function getXpMultiplier(streakDays = 0) {
  if (streakDays >= 30) return 2.0;
  if (streakDays >= 14) return 1.5;
  if (streakDays >= 7) return 1.25;
  return 1.0;
}

/**
 * Calculates final XP gain applying multipliers.
 */
export function calculateXpGain(baseXp, streakDays = 0) {
  const mult = getXpMultiplier(streakDays);
  return {
    baseXp,
    multiplier: mult,
    finalXp: Math.round(baseXp * mult)
  };
}

/**
 * Checks for new feature unlocks unlocked at new level.
 */
export function getUnlockedFeatures(oldLevel, newLevel) {
  return UNLOCKS.filter(u => u.level > oldLevel && u.level <= newLevel);
}

/**
 * Pure function: Adds XP to a profile and computes level rollover.
 * Returns: { updatedProfile, leveledUp, oldLevel, newLevel, newUnlocks, xpGained }
 */
export function processXpAddition(currentProfile, baseXp, streakDays = 0) {
  let { level = 1, xp = 0 } = currentProfile;
  const oldLevel = level;
  
  const { finalXp, multiplier } = calculateXpGain(baseXp, streakDays);
  let totalCurrentXp = xp + finalXp;
  let requiredForCurrent = getRequiredXp(level);
  let leveledUp = false;

  // Level Rollover Loop
  while (totalCurrentXp >= requiredForCurrent) {
    totalCurrentXp -= requiredForCurrent;
    level += 1;
    leveledUp = true;
    requiredForCurrent = getRequiredXp(level);
  }

  const newRankObj = getRankForLevel(level);
  const newTitle = getTitleForLevel(level);
  const newUnlocks = leveledUp ? getUnlockedFeatures(oldLevel, level) : [];

  const updatedProfile = {
    ...currentProfile,
    level,
    xp: totalCurrentXp,
    requiredXp: requiredForCurrent,
    rank: newRankObj.rank,
    title: newTitle,
  };

  return {
    updatedProfile,
    leveledUp,
    oldLevel,
    newLevel: level,
    newUnlocks,
    xpGained: finalXp,
    multiplier
  };
}
