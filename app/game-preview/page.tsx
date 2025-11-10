'use client';

import { useState } from 'react';
import {
  RankDisplay,
  StreakCounter,
  LevelDisplay,
  QuestCard,
  Badge,
  DailyChallenges,
  AchievementToast,
  type Achievement,
  type DailyChallenge,
} from '@/components/gamification';

// Demo data for preview
const DEMO_CHALLENGES: DailyChallenge[] = [
  {
    id: '1',
    title: 'Practice Mentalism',
    description: 'Observe your thoughts without judgment for 5 minutes',
    icon: '🧠',
    xpReward: 50,
    completed: true,
    realmColor: '#9D4EDD',
  },
  {
    id: '2',
    title: 'Find Correspondences',
    description: 'Identify 3 patterns that repeat across different areas of your life',
    icon: '🔍',
    xpReward: 75,
    completed: false,
    realmColor: '#4CC9F0',
  },
  {
    id: '3',
    title: 'Elevate Your Vibration',
    description: 'Move your body with intention for 10 minutes',
    icon: '⚡',
    xpReward: 60,
    completed: false,
    realmColor: '#F77F00',
  },
];

export default function GamePreview() {
  const [achievement, setAchievement] = useState<Achievement | null>(null);

  const showAchievement = () => {
    setAchievement({
      id: 'demo',
      icon: '🏆',
      title: 'First Steps',
      description: 'Completed your first daily challenge!',
      realmColor: '#D4AF37',
    });
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-realm-1-mentalism via-gold-divine to-realm-7-gender bg-clip-text text-transparent">
            Level Up IRL
          </h1>
          <p className="text-2xl text-text-secondary mb-4">
            AAA Game Experience. Real Life Transformation.
          </p>
          <p className="text-lg text-text-tertiary max-w-3xl mx-auto">
            For League of Legends, WoW, and Fortnite players ready to apply their gaming mastery
            to the ultimate challenge: <strong>mastering reality itself</strong>.
          </p>
        </div>

        {/* Demo Achievement */}
        <div className="text-center mb-12">
          <button
            onClick={showAchievement}
            className="px-8 py-4 bg-gold-divine/20 border-2 border-gold-divine rounded-xl font-display font-bold text-lg hover:bg-gold-divine/30 transition-all hover:scale-105"
          >
            🎮 Preview Achievement Notification
          </button>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Rank Display */}
          <div className="lg:col-span-2">
            <RankDisplay
              rank="Adept"
              division={2}
              lp={175}
              lpForNextDivision={250}
              realmColor="#9D4EDD"
            />
          </div>

          {/* Streak */}
          <div className="flex items-center justify-center">
            <StreakCounter streakDays={7} />
          </div>
        </div>

        {/* Level & Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <LevelDisplay
            level={12}
            currentXP={850}
            xpForNextLevel={1000}
            realmColor="#4CC9F0"
            realmColorLight="#7DE2F6"
          />

          <LevelDisplay
            level={8}
            currentXP={320}
            xpForNextLevel={600}
            realmColor="#F77F00"
            realmColorLight="#FFB547"
            icon="🔥"
          />
        </div>

        {/* Daily Challenges */}
        <div className="mb-16">
          <DailyChallenges
            challenges={DEMO_CHALLENGES}
            timeUntilReset={43200} // 12 hours
            onComplete={(id) => console.log('Complete challenge:', id)}
          />
        </div>

        {/* Quest System */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center font-display">
            <span className="bg-gradient-to-r from-gold-divine to-gold-radiant bg-clip-text text-transparent">
              Available Quests
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuestCard
              title="Master Your Mind"
              description="Complete all 7 Mentalism exercises and unlock advanced mental techniques"
              difficulty="Weekly"
              status="in_progress"
              progress={4}
              maxProgress={7}
              xpReward={500}
              lpReward={50}
              realmColor="#9D4EDD"
              icon="🧠"
            />

            <QuestCard
              title="Pattern Recognition Elite"
              description="Identify 20 correspondences across different life areas"
              difficulty="Epic"
              status="in_progress"
              progress={12}
              maxProgress={20}
              xpReward={1000}
              lpReward={100}
              realmColor="#4CC9F0"
              icon="🔍"
            />

            <QuestCard
              title="The Sacred Seven"
              description="Master all 7 Hermetic Principles and transcend ordinary consciousness"
              difficulty="Legendary"
              status="available"
              progress={3}
              maxProgress={7}
              xpReward={5000}
              lpReward={500}
              realmColor="#D4AF37"
              icon="🌟"
            />
          </div>
        </div>

        {/* Badges Showcase */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center font-display">
            <span className="bg-gradient-to-r from-gold-divine to-gold-radiant bg-clip-text text-transparent">
              Unlock Badges
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            <Badge
              icon="🧠"
              name="Mind Master"
              description="Mastered Mentalism"
              realmColor="#9D4EDD"
              unlocked={true}
            />
            <Badge
              icon="🔍"
              name="Pattern Seeker"
              description="Mastered Correspondence"
              realmColor="#4CC9F0"
              unlocked={true}
            />
            <Badge
              icon="⚡"
              name="Energy Wizard"
              description="Mastered Vibration"
              realmColor="#F77F00"
              unlocked={false}
            />
            <Badge
              icon="⚖️"
              name="Balance Keeper"
              description="Mastered Polarity"
              realmColor="#10B981"
              unlocked={false}
            />
            <Badge
              icon="🌊"
              name="Flow Master"
              description="Mastered Rhythm"
              realmColor="#60A5FA"
              unlocked={false}
            />
            <Badge
              icon="🎯"
              name="Cause Creator"
              description="Mastered Cause & Effect"
              realmColor="#EC4899"
              unlocked={false}
            />
            <Badge
              icon="☯️"
              name="Unity Sage"
              description="Mastered Gender"
              realmColor="#8B5CF6"
              unlocked={false}
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16 px-8 bg-gradient-to-r from-realm-1-mentalism/10 via-gold-divine/10 to-realm-7-gender/10 rounded-3xl border-2 border-gold-divine/30">
          <h2 className="text-5xl font-bold mb-6 font-display bg-gradient-to-r from-gold-divine to-gold-radiant bg-clip-text text-transparent">
            Ready to Play the Real Game?
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            You've mastered virtual worlds. Now master the only world that truly matters:{' '}
            <strong className="text-gold-divine">your reality</strong>.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <a
              href="/"
              className="px-8 py-4 bg-gold-divine text-cosmic-black font-display font-bold text-lg rounded-xl hover:bg-gold-radiant transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
            >
              Begin Your Quest
            </a>
            <a
              href="/shop"
              className="px-8 py-4 bg-transparent border-2 border-gold-divine text-gold-divine font-display font-bold text-lg rounded-xl hover:bg-gold-divine/20 transition-all hover:scale-105"
            >
              Customize Your Character
            </a>
          </div>
        </div>
      </div>

      {/* Achievement Toast */}
      <AchievementToast achievement={achievement} onClose={() => setAchievement(null)} />
    </div>
  );
}
