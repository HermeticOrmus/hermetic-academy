'use client';

export type QuestDifficulty = 'Daily' | 'Weekly' | 'Epic' | 'Legendary';
export type QuestStatus = 'available' | 'in_progress' | 'completed';

interface QuestCardProps {
  title: string;
  description: string;
  difficulty: QuestDifficulty;
  status: QuestStatus;
  progress: number;
  maxProgress: number;
  xpReward: number;
  lpReward?: number;
  realmColor: string;
  icon?: string;
  onAccept?: () => void;
  onClaim?: () => void;
}

const DIFFICULTY_COLORS: Record<QuestDifficulty, string> = {
  Daily: '#4ECDC4',
  Weekly: '#9D4EDD',
  Epic: '#F77F00',
  Legendary: '#D4AF37',
};

export function QuestCard({
  title,
  description,
  difficulty,
  status,
  progress,
  maxProgress,
  xpReward,
  lpReward,
  realmColor,
  icon = '📜',
  onAccept,
  onClaim,
}: QuestCardProps) {
  const difficultyColor = DIFFICULTY_COLORS[difficulty];
  const progressPercent = (progress / maxProgress) * 100;
  const isComplete = progress >= maxProgress;

  return (
    <div className={`quest-card ${status} ${isComplete ? 'complete' : ''}`}>
      <div className="quest-header">
        <div className="quest-icon">{icon}</div>
        <div className="quest-difficulty" style={{ color: difficultyColor }}>
          {difficulty}
        </div>
      </div>

      <div className="quest-content">
        <h3 className="quest-title">{title}</h3>
        <p className="quest-description">{description}</p>

        {status !== 'available' && (
          <div className="quest-progress">
            <div className="quest-progress-bar">
              <div
                className="quest-progress-fill"
                style={{
                  width: `${progressPercent}%`,
                  background: `linear-gradient(90deg, ${realmColor}80 0%, ${realmColor} 100%)`,
                }}
              />
            </div>
            <div className="quest-progress-text">
              {progress} / {maxProgress}
            </div>
          </div>
        )}

        <div className="quest-rewards">
          <div className="quest-reward">
            <span className="reward-icon">✨</span>
            <span className="reward-value">{xpReward} XP</span>
          </div>
          {lpReward && (
            <div className="quest-reward">
              <span className="reward-icon">⚡</span>
              <span className="reward-value">{lpReward} LP</span>
            </div>
          )}
        </div>
      </div>

      <div className="quest-actions">
        {status === 'available' && (
          <button className="quest-btn accept" onClick={onAccept}>
            Accept Quest
          </button>
        )}
        {status === 'in_progress' && !isComplete && (
          <button className="quest-btn in-progress" disabled>
            In Progress...
          </button>
        )}
        {isComplete && (
          <button className="quest-btn claim" onClick={onClaim}>
            Claim Rewards
          </button>
        )}
      </div>

      <style jsx>{`
        .quest-card {
          background: rgba(26, 26, 26, 0.9);
          border: 2px solid ${realmColor}40;
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .quest-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: ${difficultyColor};
          box-shadow: 0 0 15px ${difficultyColor};
        }

        .quest-card.complete::before {
          background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
          box-shadow: 0 0 20px #10b981;
        }

        .quest-card:hover {
          border-color: ${realmColor}80;
          transform: translateY(-4px);
          box-shadow:
            0 0 30px ${realmColor}40,
            0 8px 32px rgba(0, 0, 0, 0.5);
        }

        .quest-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .quest-icon {
          font-size: 32px;
          filter: drop-shadow(0 0 8px ${realmColor});
        }

        .quest-difficulty {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 4px 12px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 12px;
          border: 1px solid currentColor;
          box-shadow: 0 0 10px currentColor;
        }

        .quest-content {
          margin-bottom: 20px;
        }

        .quest-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .quest-description {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .quest-progress {
          margin-bottom: 16px;
        }

        .quest-progress-bar {
          height: 20px;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid ${realmColor}40;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 6px;
        }

        .quest-progress-fill {
          height: 100%;
          transition: width 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
          box-shadow: 0 0 10px ${realmColor};
          position: relative;
        }

        .quest-progress-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          animation: shimmer-quest 2s infinite;
        }

        @keyframes shimmer-quest {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .quest-progress-text {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-tertiary);
          text-align: right;
        }

        .quest-rewards {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .quest-reward {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }

        .reward-icon {
          font-size: 16px;
        }

        .reward-value {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--gold-divine);
        }

        .quest-actions {
          margin-top: 16px;
        }

        .quest-btn {
          width: 100%;
          padding: 12px 24px;
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          border-radius: 12px;
          border: 2px solid;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .quest-btn.accept {
          background: ${realmColor}20;
          border-color: ${realmColor};
          color: ${realmColor};
        }

        .quest-btn.accept:hover {
          background: ${realmColor}40;
          box-shadow: 0 0 20px ${realmColor}60;
          transform: translateY(-2px);
        }

        .quest-btn.in-progress {
          background: rgba(100, 100, 100, 0.2);
          border-color: rgba(150, 150, 150, 0.4);
          color: var(--text-tertiary);
          cursor: not-allowed;
        }

        .quest-btn.claim {
          background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
          border-color: #10b981;
          color: #000000;
          animation: pulse-claim 2s ease-in-out infinite;
        }

        @keyframes pulse-claim {
          0%,
          100% {
            box-shadow: 0 0 20px #10b98180;
          }
          50% {
            box-shadow: 0 0 40px #10b981;
          }
        }

        .quest-btn.claim:hover {
          transform: scale(1.05);
          box-shadow: 0 0 40px #10b981;
        }
      `}</style>
    </div>
  );
}
