'use client';

import { useState } from 'react';
import {
  WeeklyRhythm,
  PathDisplay,
  InvitationCard,
  HeartCheck,
  SabbathCard,
  ReflectionPrompt,
  Badge,
  AchievementToast,
  type Achievement,
  type HeartFeeling,
} from '@/components/gamification';

export default function HeartPreview() {
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [feeling, setFeeling] = useState<HeartFeeling | null>(null);

  const showAchievement = () => {
    setAchievement({
      id: 'demo',
      icon: '💛',
      title: 'Heart Check',
      description: 'You took a moment to notice how you feel',
      realmColor: '#D4AF37',
    });
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-realm-1-mentalism via-gold-divine to-realm-7-gender bg-clip-text text-transparent">
            The Divine Middle
          </h1>
          <p className="text-2xl text-text-secondary mb-4">
            The polish of AAA games. The heart of Hermetic wisdom.
          </p>
          <p className="text-lg text-text-tertiary max-w-3xl mx-auto">
            For 11-18 year olds who've mastered virtual worlds and are ready to apply that
            dedication to the game that actually matters: <strong className="text-gold-divine">their own consciousness</strong>.
          </p>
        </div>

        {/* Heart Check First */}
        <div className="mb-16">
          <HeartCheck
            onFeelingSelect={(feeling) => {
              setFeeling(feeling);
              showAchievement();
            }}
          />
        </div>

        {/* Rhythm + Path */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <WeeklyRhythm
            activeDaysThisWeek={6}
            currentStreak={3}
          />

          <PathDisplay
            stage="Practicing"
            currentWisdom={450}
            wisdomForNextStage={600}
            realmColor="#9D4EDD"
            realmColorLight="#C5A4E8"
          />
        </div>

        {/* Sabbath Card (if Day 7) */}
        <div className="mb-16">
          <SabbathCard weekNumber={3} />
        </div>

        {/* Invitations (not challenges) */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center font-display">
            <span className="bg-gradient-to-r from-gold-divine to-gold-radiant bg-clip-text text-transparent">
              Open Invitations
            </span>
          </h2>
          <p className="text-center text-text-tertiary mb-12 max-w-2xl mx-auto">
            These never expire. Accept when you're ready. Skip if it doesn't call to you.
            This is your journey, your timing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InvitationCard
              title="Notice Your Thoughts"
              description="For 5 minutes, observe your thoughts without judgment. Just notice them like clouds passing."
              depth="Gentle"
              wisdomReward={25}
              realmColor="#9D4EDD"
              icon="🧠"
              expiresNever={true}
            />

            <InvitationCard
              title="Find Three Patterns"
              description="Look for patterns that repeat in different areas of your life. Write them down."
              depth="Deeper"
              wisdomReward={50}
              realmColor="#4CC9F0"
              icon="🔍"
              expiresNever={true}
            />

            <InvitationCard
              title="Sacred Rest Practice"
              description="Take a full day to rest deeply. No achievements, no productivity. Just being."
              depth="Sacred"
              wisdomReward={150}
              realmColor="#D4AF37"
              icon="🌙"
              expiresNever={true}
            />
          </div>
        </div>

        {/* Reflection */}
        <div className="mb-16">
          <ReflectionPrompt
            principle="Mentalism"
            prompts={[
              'What thoughts dominated your mind today? What does that tell you?',
              'When did you feel most mentally clear this week? What created that?',
              'How has your inner dialogue changed since beginning this practice?',
            ]}
            onReflectionSave={(reflection) => console.log('Saved:', reflection)}
          />
        </div>

        {/* Badges (Personal Milestones) */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4 text-center font-display">
            <span className="bg-gradient-to-r from-gold-divine to-gold-radiant bg-clip-text text-transparent">
              Your Milestones
            </span>
          </h2>
          <p className="text-center text-text-tertiary mb-12">
            These mark moments of genuine understanding, not competition with others.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            <Badge
              icon="🧠"
              name="Mind Observer"
              description="Watched thoughts without judgment"
              realmColor="#9D4EDD"
              unlocked={true}
            />
            <Badge
              icon="🔍"
              name="Pattern Finder"
              description="Saw correspondences across life"
              realmColor="#4CC9F0"
              unlocked={true}
            />
            <Badge
              icon="⚡"
              name="Energy Shifter"
              description="Changed your vibration consciously"
              realmColor="#F77F00"
              unlocked={false}
            />
            <Badge
              icon="⚖️"
              name="Balance Keeper"
              description="Held two truths at once"
              realmColor="#10B981"
              unlocked={false}
            />
            <Badge
              icon="🌊"
              name="Rhythm Dancer"
              description="Honored rest and work cycles"
              realmColor="#60A5FA"
              unlocked={false}
            />
            <Badge
              icon="🎯"
              name="Cause Creator"
              description="Chose deliberately, saw effects"
              realmColor="#EC4899"
              unlocked={false}
            />
            <Badge
              icon="☯️"
              name="Unity Holder"
              description="Balanced opposing energies"
              realmColor="#8B5CF6"
              unlocked={false}
            />
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="text-center py-16 px-8 bg-gradient-to-r from-realm-1-mentalism/10 via-gold-divine/10 to-realm-7-gender/10 rounded-3xl border-2 border-gold-divine/30">
          <h2 className="text-5xl font-bold mb-6 font-display bg-gradient-to-r from-gold-divine to-gold-radiant bg-clip-text text-transparent">
            What Makes This Different?
          </h2>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-8">
            <div>
              <h3 className="text-xl font-bold mb-3 text-gold-divine">✅ We Keep:</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• Beautiful animations & polish</li>
                <li>• Clear progress tracking</li>
                <li>• Satisfying celebrations</li>
                <li>• Engaging experiences</li>
                <li>• Visual feedback</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-realm-4-polarity">❌ We Remove:</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• Comparison with others</li>
                <li>• FOMO & urgency</li>
                <li>• Streak anxiety</li>
                <li>• Grind mentality</li>
                <li>• External validation addiction</li>
              </ul>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gold-divine">💛 We Add:</h3>
            <ul className="space-y-3 text-text-secondary text-left max-w-2xl mx-auto">
              <li>• <strong>Sabbath Rest:</strong> Day 7 is sacred integration, not grinding</li>
              <li>• <strong>Heart Checks:</strong> Notice how you feel, adjust accordingly</li>
              <li>• <strong>Invitations:</strong> Accept when ready, skip if it doesn't call</li>
              <li>• <strong>Depth Over Speed:</strong> Reflection matters more than completing tasks</li>
              <li>• <strong>Journey Not Rank:</strong> Where YOU are, not compared to others</li>
            </ul>
          </div>

          <div className="flex gap-6 justify-center flex-wrap">
            <a
              href="/"
              className="px-8 py-4 bg-gold-divine text-cosmic-black font-display font-bold text-lg rounded-xl hover:bg-gold-radiant transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
            >
              Begin Your Journey
            </a>
            <a
              href="/shop"
              className="px-8 py-4 bg-transparent border-2 border-gold-divine text-gold-divine font-display font-bold text-lg rounded-xl hover:bg-gold-divine/20 transition-all hover:scale-105"
            >
              Optional Cosmetics
            </a>
          </div>
        </div>
      </div>

      {/* Achievement Toast */}
      <AchievementToast achievement={achievement} onClose={() => setAchievement(null)} />
    </div>
  );
}
