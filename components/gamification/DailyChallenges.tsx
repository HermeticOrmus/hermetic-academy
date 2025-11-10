'use client';

import { useState } from 'react';

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  completed: boolean;
  realmColor: string;
}

interface DailyChallengesProps {
  challenges: DailyChallenge[];
  onComplete?: (challengeId: string) => void;
  timeUntilReset?: number; // seconds
}

export function DailyChallenges({
  challenges,
  onComplete,
  timeUntilReset = 86400,
}: DailyChallengesProps) {
  const [expanded, setExpanded] = useState(true);
  const completedCount = challenges.filter((c) => c.completed).length;
  const totalXP = challenges.reduce((sum, c) => (c.completed ? sum + c.xpReward : sum), 0);

  const formatTimeRemaining = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="daily-challenges">
      <div className="challenges-header" onClick={() => setExpanded(!expanded)}>
        <div className="challenges-title">
          <span className="challenges-icon">🎯</span>
          <h2>Daily Challenges</h2>
          <div className="challenges-badge">
            {completedCount}/{challenges.length}
          </div>
        </div>

        <div className="challenges-meta">
          <div className="challenges-xp">+{totalXP} XP earned today</div>
          <div className="challenges-reset">Resets in {formatTimeRemaining(timeUntilReset)}</div>
        </div>

        <div className={`challenges-toggle ${expanded ? 'expanded' : ''}`}>▼</div>
      </div>

      {expanded && (
        <div className="challenges-list">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`challenge-item ${challenge.completed ? 'completed' : ''}`}
            >
              <div className="challenge-icon-wrapper">
                <div className="challenge-icon">{challenge.icon}</div>
                {challenge.completed && <div className="challenge-check">✓</div>}
              </div>

              <div className="challenge-content">
                <h3 className="challenge-title">{challenge.title}</h3>
                <p className="challenge-description">{challenge.description}</p>
              </div>

              <div className="challenge-reward" style={{ color: challenge.realmColor }}>
                +{challenge.xpReward} XP
              </div>

              {!challenge.completed && (
                <button
                  className="challenge-complete-btn"
                  onClick={() => onComplete?.(challenge.id)}
                  style={{ borderColor: challenge.realmColor, color: challenge.realmColor }}
                >
                  Complete
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .daily-challenges {
          background: rgba(10, 10, 10, 0.9);
          border: 2px solid var(--gold-divine);
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 0 40px var(--gold-glow),
            inset 0 2px 4px rgba(0, 0, 0, 0.8);
        }

        .challenges-header {
          padding: 24px;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 100%);
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .challenges-header:hover {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, transparent 100%);
        }

        .challenges-title {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }

        .challenges-icon {
          font-size: 32px;
          filter: drop-shadow(0 0 10px var(--gold-divine));
          animation: rotate-challenge 3s linear infinite;
        }

        @keyframes rotate-challenge {
          0%,
          100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        .challenges-title h2 {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 700;
          color: var(--gold-divine);
          margin: 0;
          text-shadow: 0 0 20px var(--gold-glow);
        }

        .challenges-badge {
          background: var(--gold-divine);
          color: #000000;
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 12px;
          box-shadow: 0 0 15px var(--gold-glow);
        }

        .challenges-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .challenges-xp {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          color: var(--gold-divine);
        }

        .challenges-reset {
          font-size: 12px;
          color: var(--text-tertiary);
        }

        .challenges-toggle {
          font-size: 20px;
          color: var(--gold-divine);
          transition: transform 0.3s;
        }

        .challenges-toggle.expanded {
          transform: rotate(180deg);
        }

        .challenges-list {
          padding: 8px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .challenge-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: rgba(26, 26, 26, 0.8);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: all 0.3s;
        }

        .challenge-item:hover {
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateX(4px);
        }

        .challenge-item.completed {
          opacity: 0.6;
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }

        .challenge-icon-wrapper {
          position: relative;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
        }

        .challenge-icon {
          font-size: 48px;
        }

        .challenge-check {
          position: absolute;
          bottom: -4px;
          right: -4px;
          width: 24px;
          height: 24px;
          background: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #000000;
          box-shadow: 0 0 15px #10b981;
        }

        .challenge-content {
          flex: 1;
          min-width: 0;
        }

        .challenge-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }

        .challenge-description {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0;
        }

        .challenge-reward {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .challenge-complete-btn {
          padding: 8px 16px;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          background: transparent;
          border: 2px solid;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .challenge-complete-btn:hover {
          background: currentColor;
          color: #000000;
          box-shadow: 0 0 20px currentColor;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
