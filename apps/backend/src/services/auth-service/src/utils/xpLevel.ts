import User from "../models/User.model";

/**
 * Calculate XP earned from a given quiz score.
 * @param score Quiz score
 * @returns XP earned (rounded integer)
 */
const calculateXPFromScore = (score: number): number => {
  return Math.floor(score * 0.25); // Slightly increased XP multiplier for balance
};

/**
 * Get required XP to reach the next level based on current level.
 * Uses exponential growth formula to make leveling harder.
 * @param level Current user level
 * @returns Required XP for next level (rounded integer)
 */
export const getRequiredXPForLevel = (level: number): number => {
  const baseXP = 20; // Increased base
  const multiplier = 1.8; // Steeper curve
  return Math.round(baseXP * Math.pow(multiplier, level - 1));
};

/**
 * Increment a user's XP and handle leveling up if thresholds are crossed.
 * Handles multiple level-ups in a loop if enough XP is gained at once.
 * XP is always rounded down before saving.
 * @param userId User's ID
 * @param xpEarned XP to add
 */
export const incrementXPAndLevel = async (userId: string, xpEarned: number) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.xp += Math.floor(xpEarned); // Ensure XP is a whole number

  while (user.xp >= getRequiredXPForLevel(user.level)) {
    user.xp -= getRequiredXPForLevel(user.level);
    user.level += 1;
  }

  user.xp = Math.floor(user.xp); // Final XP should be integer
  await user.save();
};

/**
 * Public function to calculate XP from a score and update user's XP & level.
 * @param userId User's ID
 * @param score Quiz score
 */
export const calculateXPandLevelFromScore = async (
  userId: string,
  score: number
) => {
  const xpEarned = calculateXPFromScore(score);
  await incrementXPAndLevel(userId, xpEarned);
};

/**
 * Get user progress toward next level.
 * All XP values are integers.
 * @param userId User's ID
 * @returns Progress data: current XP, required XP, remaining XP, and progress percent
 */
export const getUserProgress = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const currentXP = Math.floor(user.xp);
  const requiredXPForNextLevel = getRequiredXPForLevel(user.level);
  const remainingXPToLevelUp = requiredXPForNextLevel - currentXP;
  const progressPercent = Math.min(
    100,
    Math.floor((currentXP / requiredXPForNextLevel) * 100)
  );

  return {
    currentXP,
    requiredXPForNextLevel,
    remainingXPToLevelUp,
    progressPercent,
    level: user.level,
  };
};
