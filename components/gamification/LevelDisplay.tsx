'use client';

import { XPProgressBar } from './XPProgressBar';

interface LevelDisplayProps {
  level: number;
  currentXP: number;
  xpForNextLevel: number;
  realmColor: string;
  realmColorLight: string;
  icon?: string;
}

export function LevelDisplay({
  level,
  currentXP,
  xpForNextLevel,
  realmColor,
  realmColorLight,
  icon = '⚡',
}: LevelDisplayProps) {
  const xpNeeded = xpForNextLevel - currentXP;

  return (
    <div className="level-display">
      <div className="level-header">
        <div className="level-icon">{icon}</div>
        <div className="level-info">
          <div className="level-label">Level</div>
          <div className="level-number">{level}</div>
        </div>
      </div>

      <div className="level-progress">
        <XPProgressBar
          current={currentXP}
          max={xpForNextLevel}
          realmColor={realmColor}
          realmColorLight={realmColorLight}
          showNumbers={false}
        />
        <div className="level-next">
          {xpNeeded} XP to Level {level + 1}
        </div>
      </div>

      <style jsx>{`
        .level-display {
          background: rgba(26, 26, 26, 0.8);
          border: 2px solid ${realmColor}60;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow:
            0 0 20px ${realmColor}40,
            inset 0 2px 4px rgba(0, 0, 0, 0.5);
          transition: all 0.3s;
        }

        .level-display:hover {
          border-color: ${realmColor};
          box-shadow:
            0 0 30px ${realmColor}60,
            inset 0 2px 4px rgba(0, 0, 0, 0.5);
          transform: translateY(-2px);
        }

        .level-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .level-icon {
          font-size: 48px;
          filter: drop-shadow(0 0 10px ${realmColor});
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 10px ${realmColor});
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 15px ${realmColor});
          }
        }

        .level-info {
          flex: 1;
        }

        .level-label {
          font-size: 12px;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }

        .level-number {
          font-family: var(--font-display);
          font-size: 48px;
          font-weight: 700;
          color: ${realmColor};
          line-height: 1;
          text-shadow: 0 0 20px ${realmColor}80;
        }

        .level-progress {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .level-next {
          font-size: 14px;
          color: var(--text-secondary);
          text-align: center;
        }
      `}</style>
    </div>
  );
}
