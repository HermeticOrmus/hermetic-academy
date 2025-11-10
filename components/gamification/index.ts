// Gamification Components
// The Divine Middle: Polish of AAA games + Heart of Hermetic wisdom
// For 11-18 year olds ready to level up in REAL LIFE

// ===== HEART-CENTERED COMPONENTS (Primary) =====
// Use these for production - aligned with Hermetic principles

export { WeeklyRhythm } from './WeeklyRhythm';
export { PathDisplay } from './PathDisplay';
export type { PathStage } from './PathDisplay';
export { WisdomProgress } from './WisdomProgress';
export { InvitationCard } from './InvitationCard';
export type { InvitationDepth } from './InvitationCard';
export { HeartCheck } from './HeartCheck';
export type { HeartFeeling } from './HeartCheck';
export { SabbathCard } from './SabbathCard';
export { ReflectionPrompt } from './ReflectionPrompt';

// ===== KEPT FROM ORIGINAL (Still Aligned) =====
// These work beautifully without toxicity

export { Badge } from './Badge';
export { AchievementToast } from './AchievementToast';
export type { Achievement } from './AchievementToast';
export { ParticleEffect } from './ParticleEffect';

// ===== DEPRECATED (Toxic Patterns) =====
// Available for reference but NOT recommended for production
// These create anxiety, comparison, and grind mentality

// @deprecated Use WeeklyRhythm instead (Sabbath-integrated)
export { StreakCounter } from './StreakCounter';

// @deprecated Use PathDisplay instead (journey not hierarchy)
export { RankDisplay } from './RankDisplay';
export type { Rank } from './RankDisplay';

// @deprecated Use InvitationCard instead (optional not mandatory)
export { QuestCard } from './QuestCard';
export type { QuestDifficulty, QuestStatus } from './QuestCard';

// @deprecated Use WeeklyInvitations instead (Sabbath rhythm)
export { DailyChallenges } from './DailyChallenges';
export type { DailyChallenge } from './DailyChallenges';

// @deprecated Needs refactoring (competitive vs cooperative)
export { SkillTree } from './SkillTree';
export type { SkillNode } from './SkillTree';

// @deprecated Use WisdomProgress instead (depth not points)
export { XPProgressBar } from './XPProgressBar';
export { LevelDisplay } from './LevelDisplay';
