'use client';

export type InvitationDepth = 'Gentle' | 'Deeper' | 'Profound' | 'Sacred';

interface InvitationCardProps {
  title: string;
  description: string;
  depth: InvitationDepth;
  wisdomReward: number;
  realmColor: string;
  icon?: string;
  onAccept?: () => void;
  expiresNever?: boolean; // Make it clear these don't expire
}

const DEPTH_COLORS: Record<InvitationDepth, string> = {
  Gentle: '#4ECDC4',
  Deeper: '#9D4EDD',
  Profound: '#F77F00',
  Sacred: '#D4AF37',
};

const DEPTH_DESCRIPTIONS: Record<InvitationDepth, string> = {
  Gentle: 'A simple practice to begin',
  Deeper: 'Requires more presence',
  Profound: 'Challenges your understanding',
  Sacred: 'Transforms your being',
};

export function InvitationCard({
  title,
  description,
  depth,
  wisdomReward,
  realmColor,
  icon = '🌟',
  onAccept,
  expiresNever = true,
}: InvitationCardProps) {
  const depthColor = DEPTH_COLORS[depth];

  return (
    <div className="invitation-card">
      <div className="invitation-header">
        <div className="invitation-icon">{icon}</div>
        <div className="invitation-depth" style={{ color: depthColor }}>
          {depth}
        </div>
      </div>

      <div className="invitation-content">
        <h3 className="invitation-title">{title}</h3>
        <p className="invitation-description">{description}</p>
        <p className="invitation-depth-desc">{DEPTH_DESCRIPTIONS[depth]}</p>

        <div className="invitation-reward">
          <span className="reward-icon">✨</span>
          <span className="reward-value">{wisdomReward} Wisdom</span>
        </div>

        {expiresNever && (
          <div className="invitation-expires">
            <span className="expires-icon">∞</span>
            <span className="expires-text">No timer. Accept whenever. Skip if it doesn't hit.</span>
          </div>
        )}
      </div>

      <div className="invitation-actions">
        <button
          className="invitation-btn"
          onClick={onAccept}
          style={{ borderColor: realmColor }}
        >
          Accept Quest
        </button>
      </div>

      <style jsx>{`
        .invitation-card {
          background: rgba(26, 26, 26, 0.9);
          border: 2px solid ${realmColor}40;
          border-radius: 16px;
          padding: 20px;
          transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .invitation-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: ${depthColor};
          box-shadow: 0 0 12px ${depthColor};
        }

        .invitation-card:hover {
          border-color: ${realmColor}80;
          transform: translateY(-6px);
          box-shadow:
            0 0 30px ${realmColor}40,
            0 12px 40px rgba(0, 0, 0, 0.5);
        }

        .invitation-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .invitation-icon {
          font-size: 40px;
          filter: drop-shadow(0 0 8px ${realmColor});
          animation: gentle-breathe 4s ease-in-out infinite;
        }

        @keyframes gentle-breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        .invitation-depth {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 6px 14px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 12px;
          border: 1px solid currentColor;
          box-shadow: 0 0 10px currentColor;
        }

        .invitation-content {
          margin-bottom: 20px;
        }

        .invitation-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .invitation-description {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .invitation-depth-desc {
          font-size: 13px;
          color: var(--text-tertiary);
          font-style: italic;
          margin-bottom: 16px;
        }

        .invitation-reward {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(212, 175, 55, 0.15);
          border: 1px solid var(--gold-divine);
          border-radius: 10px;
          margin-bottom: 12px;
        }

        .reward-icon {
          font-size: 18px;
        }

        .reward-value {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          color: var(--gold-divine);
        }

        .invitation-expires {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          font-size: 12px;
          color: var(--text-tertiary);
        }

        .expires-icon {
          font-size: 18px;
          color: #4ECDC4;
        }

        .expires-text {
          font-style: italic;
        }

        .invitation-actions {
          margin-top: 16px;
        }

        .invitation-btn {
          width: 100%;
          padding: 14px 24px;
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 600;
          border-radius: 12px;
          border: 2px solid;
          cursor: pointer;
          transition: all 0.3s;
          background: ${realmColor}15;
          color: ${realmColor};
          letter-spacing: 0.02em;
        }

        .invitation-btn:hover {
          background: ${realmColor}30;
          box-shadow: 0 0 20px ${realmColor}50;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
