'use client';

// Rank tiers inspired by competitive games (League, Valorant, etc.)
export type Rank =
  | 'Seeker'
  | 'Apprentice'
  | 'Adept'
  | 'Master'
  | 'Sage'
  | 'Ascended'
  | 'Enlightened';

interface RankDisplayProps {
  rank: Rank;
  division?: number; // 1-4 like League divisions
  lp: number; // "Life Points" instead of LP
  lpForNextDivision: number;
  realmColor: string;
}

const RANK_ICONS: Record<Rank, string> = {
  Seeker: '🔍',
  Apprentice: '📖',
  Adept: '⚡',
  Master: '🔮',
  Sage: '👁️',
  Ascended: '✨',
  Enlightened: '🌟',
};

const RANK_DESCRIPTIONS: Record<Rank, string> = {
  Seeker: 'Just beginning the journey',
  Apprentice: 'Learning the fundamentals',
  Adept: 'Applying the principles',
  Master: 'Living the wisdom',
  Sage: 'Teaching others',
  Ascended: 'Transcending limitations',
  Enlightened: 'One with the All',
};

export function RankDisplay({
  rank,
  division = 1,
  lp,
  lpForNextDivision,
  realmColor,
}: RankDisplayProps) {
  const progress = (lp / lpForNextDivision) * 100;
  const lpNeeded = lpForNextDivision - lp;

  return (
    <div className="rank-display">
      <div className="rank-badge">
        <div className="rank-icon">{RANK_ICONS[rank]}</div>
        <div className="rank-glow" />
      </div>

      <div className="rank-info">
        <div className="rank-title">
          {rank}
          {division && division < 4 && (
            <span className="rank-division"> {['I', 'II', 'III', 'IV'][4 - division]}</span>
          )}
        </div>
        <div className="rank-description">{RANK_DESCRIPTIONS[rank]}</div>

        <div className="rank-progress">
          <div className="rank-bar">
            <div className="rank-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="rank-lp">
            {lp} / {lpForNextDivision} LP
          </div>
        </div>

        {division && division < 4 ? (
          <div className="rank-next">
            {lpNeeded} LP to {rank} {['I', 'II', 'III'][4 - division - 1]}
          </div>
        ) : (
          <div className="rank-next">
            {lpNeeded} LP to {rank === 'Enlightened' ? 'Perfection' : getNextRank(rank)}
          </div>
        )}
      </div>

      <style jsx>{`
        .rank-display {
          background: rgba(10, 10, 10, 0.9);
          border: 3px solid ${realmColor};
          border-radius: 20px;
          padding: 24px;
          display: flex;
          gap: 24px;
          align-items: center;
          box-shadow:
            0 0 40px ${realmColor}60,
            0 8px 32px rgba(0, 0, 0, 0.5),
            inset 0 2px 4px rgba(0, 0, 0, 0.8);
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .rank-display::before {
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

        .rank-display:hover {
          transform: translateY(-4px);
          box-shadow:
            0 0 60px ${realmColor}80,
            0 12px 48px rgba(0, 0, 0, 0.6),
            inset 0 2px 4px rgba(0, 0, 0, 0.8);
        }

        .rank-badge {
          position: relative;
          width: 120px;
          height: 120px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(26, 26, 26, 0.8);
          border: 4px solid ${realmColor};
          border-radius: 50%;
          box-shadow:
            0 0 30px ${realmColor}80,
            inset 0 0 20px ${realmColor}40;
        }

        .rank-icon {
          font-size: 64px;
          filter: drop-shadow(0 0 15px ${realmColor});
          animation: float-rank 3s ease-in-out infinite;
          z-index: 2;
        }

        @keyframes float-rank {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(5deg);
          }
        }

        .rank-glow {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            ${realmColor}60 0%,
            ${realmColor}30 40%,
            transparent 70%
          );
          animation: pulse-rank-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-rank-glow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        .rank-info {
          flex: 1;
          min-width: 0;
        }

        .rank-title {
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 700;
          color: ${realmColor};
          text-shadow:
            0 0 20px ${realmColor}80,
            0 2px 4px rgba(0, 0, 0, 0.8);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rank-division {
          font-size: 28px;
          opacity: 0.8;
        }

        .rank-description {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 16px;
          font-style: italic;
        }

        .rank-progress {
          margin-bottom: 8px;
        }

        .rank-bar {
          height: 24px;
          background: rgba(0, 0, 0, 0.6);
          border: 2px solid ${realmColor}40;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 8px;
          position: relative;
        }

        .rank-fill {
          height: 100%;
          background: linear-gradient(90deg, ${realmColor}80 0%, ${realmColor} 100%);
          transition: width 1s cubic-bezier(0.4, 0.0, 0.2, 1);
          box-shadow: 0 0 15px ${realmColor};
          position: relative;
        }

        .rank-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          animation: shimmer-rank 2s infinite;
        }

        @keyframes shimmer-rank {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .rank-lp {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
          text-align: right;
        }

        .rank-next {
          font-size: 13px;
          color: var(--text-tertiary);
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}

function getNextRank(currentRank: Rank): Rank {
  const ranks: Rank[] = [
    'Seeker',
    'Apprentice',
    'Adept',
    'Master',
    'Sage',
    'Ascended',
    'Enlightened',
  ];
  const currentIndex = ranks.indexOf(currentRank);
  return ranks[Math.min(currentIndex + 1, ranks.length - 1)];
}
