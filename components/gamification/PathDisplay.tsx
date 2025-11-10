'use client';

import { WisdomProgress } from './WisdomProgress';

// Journey stages (not competitive ranks)
export type PathStage =
  | 'Awakening'
  | 'Learning'
  | 'Practicing'
  | 'Integrating'
  | 'Embodying'
  | 'Sharing'
  | 'Unified';

interface PathDisplayProps {
  stage: PathStage;
  currentWisdom: number;
  wisdomForNextStage: number;
  realmColor: string;
  realmColorLight: string;
  icon?: string;
}

const STAGE_DESCRIPTIONS: Record<PathStage, string> = {
  Awakening: 'Opening your eyes to the principles',
  Learning: 'Understanding the wisdom',
  Practicing: 'Applying in daily life',
  Integrating: 'Making it part of who you are',
  Embodying: 'Living the principles naturally',
  Sharing: 'Teaching others through your example',
  Unified: 'One with the wisdom',
};

const STAGE_ICONS: Record<PathStage, string> = {
  Awakening: '🌅',
  Learning: '📖',
  Practicing: '🎯',
  Integrating: '🌊',
  Embodying: '✨',
  Sharing: '🌟',
  Unified: '🌌',
};

export function PathDisplay({
  stage,
  currentWisdom,
  wisdomForNextStage,
  realmColor,
  realmColorLight,
  icon,
}: PathDisplayProps) {
  const wisdomNeeded = wisdomForNextStage - currentWisdom;
  const isUnified = stage === 'Unified';

  return (
    <div className="path-display">
      <div className="path-header">
        <div className="path-icon">{icon || STAGE_ICONS[stage]}</div>
        <div className="path-info">
          <div className="path-label">Your Rank (Solo Queue)</div>
          <div className="path-stage" style={{ color: realmColor }}>
            {stage}
          </div>
          <div className="path-description">{STAGE_DESCRIPTIONS[stage]}</div>
        </div>
      </div>

      {!isUnified && (
        <div className="path-progress">
          <WisdomProgress
            current={currentWisdom}
            max={wisdomForNextStage}
            realmColor={realmColor}
            realmColorLight={realmColorLight}
            showNumbers={false}
          />
          <div className="path-wisdom-text">
            {wisdomNeeded} wisdom to {getNextStage(stage)}
          </div>
        </div>
      )}

      {isUnified && (
        <div className="path-unified">
          <p>🌌 You hit max rank.</p>
          <p className="unified-sub">Now you teach others. Share what you learned. The grind never truly ends.</p>
        </div>
      )}

      <style jsx>{`
        .path-display {
          background: rgba(10, 10, 10, 0.9);
          border: 3px solid ${realmColor};
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow:
            0 0 40px ${realmColor}40,
            0 8px 32px rgba(0, 0, 0, 0.5),
            inset 0 2px 4px rgba(0, 0, 0, 0.8);
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .path-display::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            ${realmColor}10 0%,
            transparent 50%,
            ${realmColor}10 100%
          );
          pointer-events: none;
        }

        .path-display:hover {
          transform: translateY(-4px);
          box-shadow:
            0 0 60px ${realmColor}60,
            0 12px 48px rgba(0, 0, 0, 0.6),
            inset 0 2px 4px rgba(0, 0, 0, 0.8);
        }

        .path-header {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .path-icon {
          font-size: 64px;
          filter: drop-shadow(0 0 15px ${realmColor});
          animation: gentle-float 4s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes gentle-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .path-info {
          flex: 1;
        }

        .path-label {
          font-size: 12px;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }

        .path-stage {
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 700;
          line-height: 1.2;
          text-shadow: 0 0 20px currentColor;
          margin-bottom: 8px;
        }

        .path-description {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.5;
          font-style: italic;
        }

        .path-progress {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .path-wisdom-text {
          font-size: 14px;
          color: var(--text-tertiary);
          text-align: right;
        }

        .path-unified {
          background: rgba(212, 175, 55, 0.1);
          border: 2px solid var(--gold-divine);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }

        .path-unified p {
          margin: 0;
          color: var(--gold-divine);
          font-size: 16px;
          line-height: 1.6;
        }

        .unified-sub {
          margin-top: 8px !important;
          font-size: 13px !important;
          color: var(--text-secondary) !important;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

function getNextStage(currentStage: PathStage): PathStage {
  const stages: PathStage[] = [
    'Awakening',
    'Learning',
    'Practicing',
    'Integrating',
    'Embodying',
    'Sharing',
    'Unified',
  ];
  const currentIndex = stages.indexOf(currentStage);
  return stages[Math.min(currentIndex + 1, stages.length - 1)];
}
